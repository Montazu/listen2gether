import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Thumbnail } from '../components/thumbnail/Thumbnail'

let socket

export default () => {
	const [musicUrl, setMusicUrl] = useState('')
	const [playlist, setPlaylist] = useState()

	useEffect(() => {
		getPlaylist()
		socketInitializer()
	}, [])

	const getPlaylist = async () => {
		const response = await fetch('/api/playlist')
		const result = await response.json()
		setPlaylist(result)
	}

	const socketInitializer = async () => {
		await fetch('/api/socket')
		socket = io()
		socket.on('playlist', arg => console.log(arg))
	}

	const sendMusic = (e) => {
		e.preventDefault()
		socket.emit('musicUrl', musicUrl)
	}

	return (
		<>
			<form onSubmit={sendMusic}>
				<input type={'url'} onChange={e => setMusicUrl(e.target.value)} />
				<button type={'submit'}>Dodaj</button>
			</form>
			{playlist && (
				<ul>
					{playlist.map(music => (
						<li key={music.id}>
							<Thumbnail src={music.thumbnail} alt={music.title} />
							<p>{music.title}</p>
						</li>
					))}
				</ul>
			)}
		</>
	)
}