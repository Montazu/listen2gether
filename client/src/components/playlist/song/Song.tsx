import { useAppState } from '../../../contexts/appContext'
import styles from './song.module.css'

interface SongProps {
	id: number;
	title: string;
	author: string;
	thumbnail: string;
	active: boolean;
}

export const Song = ({ id, title, author, thumbnail, active }: SongProps) => {
	const { song, progress } = useAppState()

	if (progress === 0) {
		const activeSong = document.getElementById('activeSong')
		if (activeSong) activeSong.scrollIntoView({ behavior: 'smooth' })
	}

	return active
	? (
		<div className={styles.active}>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<img className={styles.image} src={thumbnail} alt={title} />
				</div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.author}>{author}</p>
			</div>
			<progress className={styles.progress} max={100} value={progress}>
				{`${progress}%`}
			</progress>
		</div>
	) : (
		<div 
			className={styles.song} 
			id={id === song?.id ? 'activeSong' : undefined}
			style={id === song?.id ? { background: 'var(--gray)' } : {}}>
			<div className={styles.container}>
				<img className={styles.image} src={thumbnail} alt={title} />
		 	</div>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.author}>{author}</p>
		</div>
	)
}