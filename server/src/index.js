import { Server } from 'socket.io'
import fetch from 'node-fetch'

const io = new Server(8000, {
	cors: { origin: ['http://192.168.1.81:3000', 'http://localhost:3000'] }
})

io.on('connection', (socket) => {
	socket.emit('playlist', [
		{ title: 'Góralko', url: 'https://x2convert.com/Thankyou?token=U2FsdGVkX18sTDQIU6aJVCbQYcRYfZIfCdKY%2bE1AZSQwSKNXBX4efnr3a1elY7w6eiPb7PmrZ7e0GAzjypZ1vv%2fi4cH1WSakEwH1bapAUqZSTuxWo8%2bJJLUhK24%2f3UEqanj4QXirFmqdKBWpwXxfByAuDq6u7rXzQpDIMKKy1VY%3d&s=youtube&id=&h=8076912343788754291' },
		{ title: 'Dziewczyna ze wsi', url: 'https://x2convert.com/Thankyou?token=U2FsdGVkX188MKfnJwRZ7LLO1WQDKXho6ZecHOKjhsnyL5OSb6%2fcOmMUYbp6ofcsb0Pw4zGgaw38E7UIbU0mPxR3x5FnEeChJJJjc9nn66uqEbgIBAowrIP6oq3faC1%2fBWhcyxaWMTG5fxH%2bfPV1gfOH9rOHzK7lCCog%2fZQqebP0rM6UoX0y6wHxzkxub6phezrxfqhrFn6OJvAT76Xlvg%3d%3d&s=youtube&id=&h=8076912343788754291' }
	])

	const send = (arg) => {
		io.emit('elo', { title: 'test', url: arg })
	}

	socket.on('newMusic', (arg) => send(arg))
})