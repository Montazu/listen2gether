import { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'
import styles from '../styles/Home.module.css'

export const Home = () => {
	const [newSong, setNewSong] = useState('')

	const { socket, playlist, song, progress } = useContext(SocketContext)

	const addNewSong = (event) => {
		event.preventDefault()
		socket.emit('newSong', newSong)
		setNewSong('')
	}

	const scrollView = () => {
		const activeSong = document.getElementById('activeSong')
		if (activeSong) activeSong.scrollIntoView({ behavior: 'smooth' })
	}

	if (progress === 0) scrollView()

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
							<div className={styles.song} key={item.id} id={item.id === song.id ? 'activeSong' : null} style={item.id === song.id ? { background: '#1A1A1A' } : {}}>
								<div className={styles.container}>
									<img className={styles.image} src={item.thumbnail} alt={item.title} />
								</div>
								<h2 className={styles.title}>{item.title}</h2>
								<p className={styles.author}>{item.author}</p>
							</div>
						))}
					</div>
					<div className={styles.active}>
						<div className={styles.wrapper}>
							<div className={styles.container}>
								<img className={styles.image} src={song.thumbnail} alt={song.title} />
							</div>
							<h2 className={styles.title}>{song.title}</h2>
							<p className={styles.author}>{song.author}</p>
						</div>
						<progress className={styles.progress} max={100} value={progress} />
					</div>
				</>
			)}
		</div>
	)
}