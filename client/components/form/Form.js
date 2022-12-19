import { useState } from 'react'
import styles from './form.module.css'

export const Form = () => {
	const [message, setMessage] = useState('')

	const sendMessage = (e) => {
		e.preventDefault()
		console.log(message)
		setMessage('')
	}

	return (
		<form 
			className={styles.wrapper}
			onSubmit={sendMessage}
		>
			<input 
				className={styles.input} 
				type={'url'}
				placeholder={'Wpisz link z YouTube'}
				onChange={e => setMessage(e.target.value)}
				value={message}
				required={true}
			/>
			<button 
				className={styles.button} 
				type={'submit'}
			>
				Dodaj
			</button>
		</form>
	)
}