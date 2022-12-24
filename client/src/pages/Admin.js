import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export const Admin = () => {
	const { playlist } = useContext(SocketContext)

	console.log(playlist)

	return (
		<>
			Admin
		</>
	)
}