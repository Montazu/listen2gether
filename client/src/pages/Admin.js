import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

export const Admin = () => {
	const { socket, playlist, song, progress } = useContext(SocketContext)

	console.log(playlist)

	return (
		<>
			Admin
		</>
	)
}