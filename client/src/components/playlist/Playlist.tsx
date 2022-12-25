import { useAppState } from '../../contexts/appContext'
import { Song } from './song/Song'
import styles from './playlist.module.css'

export const Playlist = () => {
	const { playlist } = useAppState()

	return (
		<div className={styles.playlist}>
			{playlist.map(song => <Song active={false} key={song.id} {...song} />)}
		</div>
	)
}