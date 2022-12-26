import { Server } from 'socket.io'
import pkg from 'youtubei.js'
const { Innertube } = pkg
import Downloader from 'nodejs-file-downloader'
import fs from 'fs'
import fetch from 'node-fetch'
import elo from 'pg'
const { Pool } = elo

const io = new Server(1234, {
	cors: { origin: ['https://l2g.montazu.pl', 'http://192.168.1.84:3000'] },
})

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
})
pool.connect()

const getPlaylist = async () => {
	const sql = `SELECT * FROM ${process.env.DB_TABLE}`
	const result = await pool.query(sql)
	return result.rows
}

const addSong = async (url) => {
	let id

	try {
		if (!url) throw new Error('Nie podano parametru URL')

		if (/youtu\.be/gm.test(url)) {
			const params = new URL(url).pathname
			id = params.replace('/', '')
		} else {
			const parameters = new URLSearchParams(new URL(url).search)
			id = parameters.get('v')
		}
		// if (!parameters || !id) throw new Error('Podany URL jest nieprawidłowy')

		const yt = await Innertube.create()
		const musicData = await yt.actions.execute('/player', {
			videoId: id,
			client: 'YTMUSIC_ANDROID',
			parse: true,
		})
		const available = musicData.playability_status.status === 'OK'
		if (!available) throw new Error('To nie jest muzyka, lub jest niedostępna')

		const { title, author } = await musicData.video_details
		const thumbnail = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

		const sql = `INSERT INTO ${process.env.DB_TABLE} (title, author, thumbnail) VALUES ('${title}', '${author}', '${thumbnail}') RETURNING *`
		const result = await pool.query(sql)
		const data = result.rows[0]
		const musicId = data.id
		io.emit('newSong', data)

		const musicUrl = await musicData.streaming_data.adaptive_formats.pop().url
		const downloader = new Downloader({ url: musicUrl, directory: './downloads', fileName: id })
		await downloader.download()

		const uploader = await fetch(`https://transfer.sh/${id}`, {
			method: 'PUT',
			body: fs.createReadStream(`./downloads/${id}`),
			redirect: 'follow',
		}).then((res) => res.text())

		fs.unlinkSync(`./downloads/${id}`)

		const musicNewUrl = uploader.replace('.sh/', '.sh/get/')

		const sqlUpdate = `UPDATE ${process.env.DB_TABLE} SET url='${musicNewUrl}' WHERE id=${musicId} RETURNING *`
		const odp = await pool.query(sqlUpdate)
		io.emit('newSongUrl', odp.rows[0])
	} catch (error) {
		console.log(error)
	}
}

let song

const sendSong = (arg) => {
	song = arg
	io.emit('song', arg)
}

io.on('connection', async (socket) => {
	socket.emit('playlist', await getPlaylist())
	socket.emit('song', song)
	socket.on('newSong', addSong)
	socket.on('song', sendSong)
	socket.on('progress', (arg) => socket.broadcast.emit('progress', arg))
	socket.on('clear', () => {
		song = null
		const sql = `DELETE FROM ${process.env.DB_TABLE}`
		pool.query(sql)
	})
})
