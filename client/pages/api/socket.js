import { Server } from 'socket.io'
import { Innertube } from 'youtubei.js'

export default (req, res) => {
	if (res.socket.server.io) {
		console.log("Already set up")
		res.end()
		return
	}

	const io = new Server(res.socket.server)
	res.socket.server.io = io

	const getInfo = async (link) => {
		const params = new URLSearchParams(new URL(link).search)
		const id = params.get('v')

		const yt = await Innertube.create()
		const videoInfo = await yt.actions.execute('/player', {
			videoId: id,
			client: 'YTMUSIC_ANDROID', 
			parse: true 
		  });
	  
		  const title = videoInfo.video_details.title
		  const { url } = videoInfo.streaming_data.adaptive_formats.pop()

		const info = {
			id: 3,
			title,
			thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
			url
		}
		console.log(info)
	}

	io.on("connection", (socket) => {
		socket.on('musicUrl', getInfo)
	})

	console.log("Setting up socket")
	res.end()
}