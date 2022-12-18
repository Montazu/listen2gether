import { Server } from 'socket.io'
import { Innertube } from 'youtubei.js'
import info from './info'

export default async (req, res) => {
	if (res.socket.server.io) {
		console.log("Already set up")
		res.end()
		return
	}

	const io = new Server(res.socket.server)
	res.socket.server.io = io
	const yt = await Innertube.create()

	const getInfo = async (link) => {
		const elo = new URL(link).search
		const params = new URLSearchParams(elo)
		const id = params.get('v')
		
		const videoInfo = await yt.actions.execute('/player', {
			videoId: id,
			client: 'YTMUSIC_ANDROID', 
			parse: true 
		  });
	  
		  const title = videoInfo.video_details.title
		  const { url } = videoInfo.streaming_data.adaptive_formats.pop()

		const data = {
			id: Math.floor(Math.random() * 832061),
			title,
			thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
			url
		}
		info.push(data)
		console.log('Dodano pomyślnie')
		io.emit('elo', data)
	}

	io.on("connection", (socket) => {
		socket.on('musicUrl', getInfo)
	})

	console.log("Setting up socket")
	res.end()
}