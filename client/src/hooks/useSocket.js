import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (url, options) => {
	const { current: socket } = useRef(io(url, options))

	useEffect(() => {
		if (socket.readyState === 1) socket.close()
	}, [socket])

	return socket
}