import { createContext, useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
	const [playlist, setPlaylist] = useState([])
	const [song, setSong] = useState()
	const [progress, setProgress] = useState(0)

	const socket = useSocket(process.env.REACT_APP_API, { transports: ['websocket'] })

	useEffect(() => {
		socket.connect()
		listeners()
	}, [])

	const listeners = () => {
		socket.on('playlist', setPlaylist)
		socket.on('song', setSong)
		socket.on('newSong', song => setPlaylist(playlist => [...playlist, song]))
		socket.on('progress', setProgress)
	}

	if (!song && playlist.length > 0) setSong(playlist[0])

	const value = { socket, playlist, song, progress }
	
	return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export { SocketProvider, SocketContext }