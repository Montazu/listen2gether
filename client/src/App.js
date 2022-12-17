import { useEffect, useRef, useState } from 'react'
import { useSocket } from './hooks/useSocket'

export const App = () => {
	const [activeMusic, setActiveMusic] = useState()
	const [playlist, setPlaylist] = useState([])
	const [musicUrl, setMusicUrl] = useState('')

	const socket = useSocket('ws://192.168.1.81:8000', {
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		autoConnect: false
	})

	useEffect(() => {
		socket.connect()
		startListeners()
	}, [])

	const startListeners = () => {
		socket.on('playlist', (arg) => {
			setActiveMusic(arg[0])
			setPlaylist(arg)
		})
		socket.on('elo', (arg) => setPlaylist(oldArray => [...oldArray, arg]))
	}

	const sendMusic = (event) => {
		event.preventDefault()
		socket.emit('newMusic', musicUrl)
	}

	const audio = useRef()

	const nextMusic = () => {
		const e = playlist.indexOf(activeMusic)
		const a = playlist[e+1]
		setActiveMusic(a)
		if (audio.current.paused()) audio.current.play()
		// const playPromise = audio.current.play()
		// console.log(audio.current)
		// if (playPromise !== undefined) {
			// playPromise.then(() => playPromise)
		// }
	}

	const elo = () => {
		audio.current.play()
		audio.current.volume = .01
	}

	if(activeMusic) document.title = activeMusic.title

	return (
		<>
			<form onSubmit={(e) => sendMusic(e)}>
				<input onChange={(e) => setMusicUrl(e.target.value)} />
	 			<button type='submit'>Send</button>
			</form>
			{activeMusic
			? (
				<>
					<h1>{activeMusic.title}</h1>
					<audio
							ref={audio}
							controls={true}
							onEnded={nextMusic}
							autoPlay={true}
							src={activeMusic.url}
					/>
					<button onClick={elo}>Play</button>
					<ul>
						{playlist.map((e, index) => <li key={index}>{e.title}</li>)}
					</ul>
				</>
			) : (<div>Loading...</div>)}
		</>
	)
}