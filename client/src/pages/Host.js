import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

export const Host = () => {
	const [playlist, setPlaylist] = useState([])
	const [song, setSong] = useState()

	const socket = useSocket(process.env.REACT_APP_API, {
		transports: ["websocket"]
	  })

	useEffect(() => {
		socket.connect()
		startListeners()
	}, [])

	const startListeners = () => {
		socket.on('playlist', (arg) => setPlaylist(arg))
		socket.on('newSong', (arg) => {
			setPlaylist(e => [...e, arg])
			setPlaylist(e => [...new Set(e)])
		})
	}

	if (!song && playlist.length > 0) setSong(playlist[0])

	const audio = useRef()
	let progress = 0

	const sendTime = () => {
		progress = audio.current.currentTime / audio.current.duration
	}

	const play = () => {
		audio.current.play()
		socket.emit('song', song)
		// setInterval(() => {
		// 	socket.emit('progress', progress)
		// }, 1000)
	}

	const nextSong = () => {
		const e = playlist.indexOf(song)
		const a = playlist[e+1]
		setSong(a)
		socket.emit('song', a)
	}

	if(song) document.title = song.title

	return (
		<div>
			{song && (
				<>
					<h1>{song.title}</h1>
					<audio
						onTimeUpdate={sendTime}
						preload={'true'}
						src={song.url}
						ref={audio}
						onEnded={nextSong}
						autoPlay={true}
						controls={true}
					/>
					<button onClick={play}>Play</button>
				</>
			)}
		</div>
	)
}