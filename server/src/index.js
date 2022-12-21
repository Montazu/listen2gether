import { Server } from 'socket.io'
import pkg from 'youtubei.js'
const { Innertube } = pkg

const io = new Server(1234, { cors: { origin: ['wss://l2g.montazu.pl', 'https://l2g.montazu.pl', 'http://192.168.1.84:3000', 'http://localhost:3000'] } })

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
		const data = { id: playlist.length, title, author, thumbnail, url }
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