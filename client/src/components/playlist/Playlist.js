import { useContext } from 'react'
import { SocketContext } from '../../context/SocketContext'
import { Song } from './song/Song'
import styles from './playlist.module.css'

export const Playlist = () => {
	const { playlist } = useContext(SocketContext)

	return (
		<div className={styles.playlist}>
			{playlist.map(song => <Song key={song.id} {...song} />)}
		</div>
	)
}