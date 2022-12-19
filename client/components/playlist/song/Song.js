import { Thumbnail } from '../../thumbnail/Thumbnail'
import styles from './song.module.css'

export const Song = ({ song }) => {
	const { title, author, thumbnail, url } = song

	return (
		<div className={styles.wrapper}>
			<Thumbnail className={styles.elo} src={thumbnail} alt={title} />
		</div>
	)
}