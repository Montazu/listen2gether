import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Host } from './pages/Host'
import { Admin } from './pages/Admin'
import { NoMatch } from './pages/NoMatch'
import { SocketProvider } from './context/SocketContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SocketProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path={'/host'} element={<Host />} />
					<Route path={'/admin'} element={<Admin />} />
					<Route path={'*'} element={<NoMatch />} />
				</Routes>
			</BrowserRouter>
		</SocketProvider>
	</React.StrictMode>
)