import { useContext, useEffect, useRef, useState } from 'react'
import { Form } from '../components/form/Form'
import { SocketContext } from '../context/SocketContext'

export const Host = () => {
	const [activeSong, setActiveSong] = useState()

	const { playlist, socket, song } = useContext(SocketContext)
	const audio = useRef()

	useEffect(() => {
		if (!activeSong) setActiveSong(song)
	}, [song])

	if (activeSong) document.title = activeSong.title

	const play = () => {
		audio.current.play()
		setInterval(() => {
			const progress = Math.floor(audio.current.currentTime / audio.current.duration * 100)
			socket.emit('progress', progress)
		}, 5000)
	}

	const nextSong = () => {
		const e = playlist.indexOf(activeSong)
		const a = playlist[e+1]
		setActiveSong(a)
		socket.emit('song', a)
		socket.emit('progress', 0)
	}

	const clear = () => {
		socket.emit('clear', 'clear')
	}

	return (
		<div>
			<Form />
			{activeSong && (
				<>
					<h1>{activeSong.title}</h1>
					<audio
						preload={'true'}
						src={activeSong.url}
						ref={audio}
						onEnded={nextSong}
						autoPlay={true}
						controls={true}
					/>
					<button onClick={play}>Play</button>
					<button onClick={nextSong}>Next</button>
					<button onClick={clear}>Clear playlist</button>
				</>
			)}
		</div>
	)
}