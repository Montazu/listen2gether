import { useContext, useState } from 'react'
import { SocketContext } from '../../context/SocketContext'
import styles from './Form.module.css'

export const Form = () => {
	const [url, setUrl] = useState('')
	const { socket } = useContext(SocketContext)

	const sendUrl = (event) => {
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