import { useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import styles from '../styles/Home.module.css'

export const Home = () => {
	const [playlist, setPlaylist] = useState([])
	const [song, setSong] = useState()
	const [newSong, setNewSong] = useState('')

	const socket = useSocket('ws://apil2g.montazu.pl')

	useEffect(() => {
		socket.connect()
		startListeners()
	}, [])

	const startListeners = () => {
		socket.on('playlist', (arg) => setPlaylist(arg))
		socket.on('song', (arg) => setSong(arg))
		socket.on('newSong', (arg) => setPlaylist(e => [...e, arg]))
	}

	const addNewSong = (event) => {
		event.preventDefault()
		socket.emit('newSong', newSong)
		setNewSong('')
	}

	if (!song && playlist.length > 0) setSong(playlist[0])

	return (
		<div className={styles.main}>
			<form className={styles.form} onSubmit={addNewSong}>
				<input className={styles.input} type={'url'} placeholder={'Wpisz link z YouTube'} onChange={e => setNewSong(e.target.value)} value={newSong} required={true} />
				<button className={styles.button} type={'submit'}>Dodaj</button>
			</form>
			{song && (
				<>
					<div className={styles.playlist}>
						{playlist.map((item) => (
							<div className={styles.song} key={item.id} style={item.id === song.id ? { background: '#1A1A1A' } : {}}>
								<div className={styles.container}>
									<img className={styles.image} src={item.thumbnail} alt={item.title} />
								</div>
								<h2 className={styles.title}>{item.title}</h2>
								<p className={styles.author}>{item.author}</p>
							</div>
						))}
					</div>
					<div className={styles.active}>
						<div className={styles.container}>
							<img className={styles.image} src={song.thumbnail} alt={song.title} />
						</div>
						<h2 className={styles.title}>{song.title}</h2>
						<p className={styles.author}>{song.author}</p>
					</div>
				</>
			)}
		</div>
	)
}