import { Server } from 'socket.io'

export default (req, res) => {
	if (res.socket.server.io) {
		console.log("Already set up")
		res.end()
		return
	}

	const io = new Server(res.socket.server)
	res.socket.server.io = io

	const playlist = [
		{
			id: 1,
			title: 'Góralko',
			image: 'https://lh3.googleusercontent.com/alkmJH7B8rZnwNJ2x2Ja4wfxta0OXO4-wZA559KKouGJhcSHIQUqlNJfdxgRWxOVHgnQrArwQYCyF0V7Lg=w544-h544-l90-rj',
			url: 'https://x2convert.com/Thankyou?token=U2FsdGVkX18sTDQIU6aJVCbQYcRYfZIfCdKY%2bE1AZSQwSKNXBX4efnr3a1elY7w6eiPb7PmrZ7e0GAzjypZ1vv%2fi4cH1WSakEwH1bapAUqZSTuxWo8%2bJJLUhK24%2f3UEqanj4QXirFmqdKBWpwXxfByAuDq6u7rXzQpDIMKKy1VY%3d&s=youtube&id=&h=8076912343788754291',
		}
	]

	io.on("connection", (socket) => {
		// socket.emit('playlist', 'elo')

		socket.on('musicUrl', arg => console.log(arg))
	})

	console.log("Setting up socket")
	res.end()
}