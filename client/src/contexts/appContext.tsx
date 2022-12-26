import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'

interface AppStateContextTypes {
	playlist: SongTypes[]
	progress: number
	socket: any
	song: SongTypes | null
}

interface AppProviderProps {
	children: ReactNode
}

interface SongTypes {
	id: number
	title: string
	author: string
	thumbnail: string
	url: string | null
}

const AppStateContext = createContext<AppStateContextTypes | null>(null)

export const AppProvider = ({ children }: AppProviderProps) => {
	const [playlist, setPlaylist] = useState<SongTypes[]>([])
	const [song, setSong] = useState<SongTypes | null>(null)
	const [progress, setProgress] = useState<number>(0)

	const socket = useSocket({
		url: process.env.REACT_APP_API!,
		options: { transports: ['websocket'] },
	})

	useEffect(() => {
		socket.connect()
		socket.on('playlist', setPlaylist)
		socket.on('song', setSong)
		socket.on('newSong', (song) => setPlaylist((playlist) => [...playlist, song]))
		socket.on('progress', setProgress)
		socket.on('newSongUrl', (newSong: SongTypes) => {
			setSong((s) => {
				if (s && s.id === newSong.id) return newSong
				return s
			})

			setPlaylist((playlist: SongTypes[]) => {
				const selectSong = playlist.find((s) => s.id === newSong.id)
				if (!selectSong) return playlist
				const index = playlist.indexOf(selectSong)
				playlist.splice(index, 1, newSong)
				return playlist
			})
		})
	}, [socket])

	if (!song && playlist.length > 0) setSong(playlist[0])

	const value = { playlist, progress, socket, song }

	return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export const useAppState = () => {
	const context = useContext(AppStateContext)
	if (!context) throw new Error('useAppState must be used within a AppProvider')
	return context
}
