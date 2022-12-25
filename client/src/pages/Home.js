import { useContext } from 'react'
import { Form } from '../components/form/Form'
import { Playlist } from '../components/playlist/Playlist'
import { Song } from '../components/playlist/song/Song'
import { SocketContext } from '../context/SocketContext'
import styles from '../styles/Home.module.css'

export const Home = () => {
	const { song } = useContext(SocketContext)

	return (
		<div className={styles.main}>
			<Form />
			{song && (
				<>
					<Playlist />
					<Song active />
				</>
			)}
		</div>
	)
}