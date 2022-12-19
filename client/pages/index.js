import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from '../styles/Home.module.css'

let socket

export default function Home() {
	const [message, setMessage] = useState('')
	const [activeMusic, setActiveMusic] = useState(null)
	const [playlist, setPlaylist] = useState()

	useEffect(() => {
		getPlaylist()
		socketInitializer()
	}, [])

	const getPlaylist = async () => {
		const response = await fetch('/api/playlist')
		const result = await response.json()
		setPlaylist(result)
		setActiveMusic(result[0] || null)
	}

	const socketInitializer = async () => {
		await fetch('/api/socket')
		socket = io()
		socket.on('elo', arg => {
			if(activeMusic) {
				setPlaylist(e => [...e, arg])
			} else {
				setPlaylist([arg])
				setActiveMusic(arg)
			}
		})
	}

	const sendMessage = (e) => {
		e.preventDefault()
		console.log(message)
		socket.emit('musicUrl', message)
		setMessage('')
	}

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={sendMessage}>
				<input className={styles.input} type={'url'} placeholder={'Wpisz link z YouTube'} onChange={e => setMessage(e.target.value)} value={message} required={true} />
				<button className={styles.button} type={'submit'}>Dodaj</button>
			</form>
			{activeMusic && (
				<>
					<div className={styles.playlist}>
						{playlist.map((song) => (
							<div className={styles.song} key={song.id}>
								<div className={styles.container}>
									<img className={styles.image} src={song.thumbnail} alt={song.title} />
								</div>
								<h2 className={styles.title}>{song.title}</h2>
								<p className={styles.author}>{song.author}</p>
							</div>
						))}
					</div>
					<div className={styles.active}>
						<div className={styles.container}>
							<img className={styles.image} src={activeMusic.thumbnail} alt={activeMusic.title} />
						</div>
						<h2 className={styles.title}>{activeMusic.title}</h2>
						<p className={styles.author}>{activeMusic.author}</p>
					</div>
				</>
			)}
		</div>
	)
}