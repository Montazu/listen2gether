import { useEffect, useRef } from 'react'
import { io, ManagerOptions, SocketOptions } from 'socket.io-client'

interface useSocketProps {
	url: string;
	options: Partial<ManagerOptions & SocketOptions> | undefined;
}

export const useSocket = ({ url, options }: useSocketProps ) => {
	const { current: socket } = useRef(io(url, options))

	useEffect(() => {
		if (socket) socket.close()
	}, [socket])

	return socket
}