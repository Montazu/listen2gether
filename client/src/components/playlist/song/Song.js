import { useContext } from 'react'
import { SocketContext } from '../../../context/SocketContext'
import styles from './song.module.css'

export const Song = ({ id, title, author, thumbnail }) => {
	const { song } = useContext(SocketContext)

	return (
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