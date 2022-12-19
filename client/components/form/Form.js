import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from './form.module.css'

let socket

export const Form = () => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		socketInitializer()
	}, [])

	const socketInitializer = async () => {
		await fetch('/api/socket')
		socket = io()
	}

	const sendMessage = (e) => {
		e.preventDefault()
		console.log(message)
		socket.emit('musicUrl', message)
		setMessage('')
	}

	// return (
		
	// )
}