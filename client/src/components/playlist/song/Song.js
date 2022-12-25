import { useContext } from 'react'
import { SocketContext } from '../../../context/SocketContext'
import styles from './song.module.css'

export const Song = ({ id, title, author, thumbnail, active }) => {
	const { song, progress } = useContext(SocketContext)

	if (progress === 0) {
		const activeSong = document.getElementById('activeSong')
		if (activeSong) activeSong.scrollIntoView({ behavior: 'smooth' })
	}

	return active
	? (
		<div className={styles.active}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img className={styles.image} src={song.thumbnail} alt={song.title} />
				</div>
				<h2 className={styles.title}>{song.title}</h2>
				<p className={styles.author}>{song.author}</p>
			</div>
			<progress className={styles.progress} max={100} value={progress}>
				{`${progress}%`}
			</progress>
		</div>
	) : (
		<div 
			className={styles.song} 
			id={id === song.id ? 'activeSong' : null}
			style={id === song.id ? { background: 'var(--gray)' } : {}}>
			<div className={styles.container}>
				<img className={styles.image} src={thumbnail} alt={title} />
		 	</div>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.author}>{author}</p>
		</div>
	)
}