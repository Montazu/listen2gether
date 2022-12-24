import { useContext } from 'react'
import { Form } from '../components/form/Form'
import { SocketContext } from '../context/SocketContext'
import styles from '../styles/Home.module.css'

export const Home = () => {
	const { playlist, song, progress } = useContext(SocketContext)

	if (progress === 0) {
		const activeSong = document.getElementById('activeSong')
		if (activeSong) activeSong.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className={styles.main}>
			<Form />
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