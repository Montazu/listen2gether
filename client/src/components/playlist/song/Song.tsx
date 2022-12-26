import { useAppState } from '../../../contexts/appContext'
import styles from './song.module.css'

interface SongProps {
	id: number
	title: string
	author: string
	thumbnail: string
	active: boolean
	url: string | null
}

export const Song = ({ id, title, author, thumbnail, active, url }: SongProps) => {
	const { song, progress } = useAppState()

	const scrollHandle = () => {
		const activeSong = document.getElementById('activeSong')
		if (activeSong) activeSong.scrollIntoView({ behavior: 'smooth' })
	}

	if (progress === 0) scrollHandle()

	return active ? (
		<div className={styles.active} onClick={scrollHandle}>
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
			style={id === song?.id ? { background: 'var(--gray)' } : {}}
		>
			<div className={styles.container}>
				<img className={styles.image} src={thumbnail} alt={title} />
			</div>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.author}>{author}</p>
		</div>
	)
}
