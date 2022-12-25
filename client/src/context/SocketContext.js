import { createContext, useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {
	const [playlist, setPlaylist] = useState([])
	const [song, setSong] = useState()
	const [progress, setProgress] = useState(0)

	const socket = useSocket(process.env.REACT_APP_API, { transports: ['websocket'] })

	useEffect(() => {
		socket.connect()
		socket.on('playlist', setPlaylist)
		socket.on('song', setSong)
		socket.on('newSong', song => setPlaylist(playlist => [...playlist, song]))
		socket.on('progress', setProgress)
	}, [socket])

	if (!song && playlist.length > 0) setSong(playlist[0])

	const value = { 
		playlist, 
		progress: progress || 0,
		socket, 
		song: song || null
	}
	
	return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export { SocketContext, SocketContextProvider }