import { Form } from '../components/form/Form'
import { Playlist } from '../components/playlist/Playlist'
import { Song } from '../components/playlist/song/Song'
import { useAppState } from '../contexts/appContext'
import styles from '../styles/home.module.css'

export const Home = () => {
	const { song } = useAppState()

	return (
		<div className={styles.main}>
			<Form />
			{song && (
				<>
					<Playlist />
					<Song active={true} {...song} />
				</>
			)}
		</div>
	)
}