import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

export const Host = () => {
	const [playlist, setPlaylist] = useState([])
	const [song, setSong] = useState()

	const socket = useSocket('ws://apil2g.montazu.pl')

	useEffect(() => {
		socket.connect()
		startListeners()
	}, [])

	const startListeners = () => {
		socket.on('playlist', (arg) => setPlaylist(arg))
		socket.on('newSong', (arg) => setPlaylist(e => [...e, arg]))
	}

	if (!song && playlist.length > 0) setSong(playlist[0])

	const audio = useRef()

	const play = () => {
		audio.current.play()
		socket.emit('song', song)
	}

	const nextSong = () => {
		const e = playlist.indexOf(song)
		const a = playlist[e+1]
		setSong(a)
		socket.emit('song', a)
	}

	return (
		<div>
			{song && (
				<>
					<h1>{song.title}</h1>
					<audio
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