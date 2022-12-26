import { useEffect, useRef, useState } from 'react'
import { Form } from '../components/form/Form'
import { useAppState } from '../contexts/appContext'

interface SongTypes {
	id: number
	title: string
	author: string
	thumbnail: string
	url: string | null
}

export const Host = () => {
	const [activeSong, setActiveSong] = useState<SongTypes | null>(null)
	const { playlist, socket, song } = useAppState()
	const audio = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if ((!activeSong && song) || !activeSong?.url) setActiveSong(song)
	}, [activeSong, song])

	if (activeSong) document.title = activeSong.title

	const play = () => {
		audio.current?.play()
		socket.emit('song', activeSong)
		setInterval(() => {
			const currentTime = audio.current?.currentTime || 0
			const duration = audio.current?.duration || 0
			socket.emit('progress', Math.floor((currentTime / duration) * 100))
		}, 5000)
	}

	const nextSong = () => {
		if (activeSong) {
			const e = playlist.indexOf(activeSong)
			const a = playlist[e + 1]
			setActiveSong(a || playlist[0])
			socket.emit('song', a)
			socket.emit('progress', 0)
		}
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
					{activeSong.url && (
						<audio
							preload={'true'}
							src={activeSong.url}
							ref={audio}
							onEnded={nextSong}
							autoPlay={true}
							controls={true}
						/>
					)}
					<button onClick={play}>Play</button>
					<button onClick={nextSong}>Next</button>
					<button onClick={clear}>Clear playlist</button>
				</>
			)}
		</div>
	)
}
