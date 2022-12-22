import { Server } from 'socket.io'
import pkg from 'youtubei.js'
const { Innertube } = pkg
import Downloader from 'nodejs-file-downloader'
import fs from 'fs'
import fetch from 'node-fetch'

const io = new Server(1234, { cors: { origin: ['https://l2g.montazu.pl', 'http://192.168.1.84:3000'] } })

const playlist = []
let song

const addNewSong = async (link) => {
	const url = new URL(link).search
	const params = new URLSearchParams(url)
	const id = params.get('v')
	try {
		const yt = await Innertube.create()
		const videoInfo = await yt.actions.execute('/player', { videoId: id, client: 'YTMUSIC_ANDROID', parse: true })
		const { title, author } = await videoInfo.video_details
		const { url } = await videoInfo.streaming_data.adaptive_formats.pop()
		const thumbnail = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

		const downloader = new Downloader({ url, directory: './downloads', fileName: id })
	  	await downloader.download()

		const transfer = await fetch(`https://transfer.sh/${id}`, {
			method: "PUT",
			body: fs.createReadStream(`./downloads/${id}`),
			redirect: "follow",
		}).then(res => res.text())

		fs.unlinkSync(`./downloads/${id}`)

		const data = { id: playlist.length, title, author, thumbnail, url: transfer.replace('.sh/', '.sh/get/') }
		playlist.push(data)
		io.emit('newSong', data)
	} catch (error) {
		console.log(error)
	}
}

const sendSong = (arg) => {
	song = arg
	io.emit('song', arg)
}

io.on('connection', async (socket) => {
	socket.emit('playlist', playlist)
	socket.emit('song', song)
	socket.on('newSong', (arg) => addNewSong(arg))
	socket.on('song', sendSong)
	socket.on('progress', (arg) => socket.broadcast.emit('progress', arg))
	socket.on('clear', () => {
		song = null
		playlist.length = 0
	})
})