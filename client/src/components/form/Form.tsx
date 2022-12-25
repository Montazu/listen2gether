import { useState } from 'react'
import { useAppState } from '../../contexts/appContext'
import styles from './form.module.css'

export const Form = () => {
	const [url, setUrl] = useState('')
	const { socket } = useAppState()

	const sendUrl = (event: { preventDefault: () => void }) => {
		event.preventDefault()
		socket.emit('newSong', url)
		setUrl('')
	}

	return (
		<form className={styles.form} onSubmit={sendUrl}>
			<input 
				className={styles.input} 
				type={'url'} 
				placeholder={'Wpisz link z YouTube'} 
				onChange={e => setUrl(e.target.value)} 
				value={url} 
				required={true} />
			<button className={styles.button} type={'submit'}>Dodaj</button>
		</form>
	)
}