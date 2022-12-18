import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'

let socket

export default () => {
	const [activeMusic, setActiveMusic] = useState()
	const [playlist, setPlaylist] = useState()

	useEffect(() => {
		getPlaylist()
		socketInitializer()
	}, [])

	const getPlaylist = async () => {
		const response = await fetch('/api/playlist')
		const result = await response.json()
		setPlaylist(result)
		setActiveMusic(result[0])
	}

	const socketInitializer = async () => {
		await fetch('/api/socket')
		socket = io()
		socket.on('elo', arg => setPlaylist(e => [...e, arg]))
	}

	const audio = useRef()

	const playMusic = () => {
		audio.current.play()
	}

	const nextMusic = () => {
		const e = playlist.indexOf(activeMusic)
		const a = playlist[e+1]
		setActiveMusic(a)
	}

	return activeMusic
	? (
		<>
			<h1>{activeMusic.title}</h1>
			<img src={activeMusic.thumbnail} />
			<audio
				src={activeMusic.url}
				ref={audio}
				onEnded={nextMusic}
				autoPlay={true}
				controls={true}
			/>
			<button onClick={playMusic}>Play</button>
		</>
	) : <p>Loading...</p>
}