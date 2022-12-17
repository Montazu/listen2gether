import { useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import { SocketContext } from './SocketContext'

export const SocketContextComponent = (props) => {
	const [socketState, setSocketState] = useState([])

	const { children } = props

	const socket = useSocket('ws://localhost:8000', {
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		autoConnect: false
	})

	useEffect(() => {
		socket.connect()
		startListeners()
	}, [])
		
	const startListeners = () => {
		socket.on('playlist', (arg) => {
			setSocketState(arg)
		})
	}
		

	return <SocketContext value={{ socketState }}>{children}</SocketContext>
}