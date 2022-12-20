import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from './pages/Home'
import { Host } from './pages/Host'
import { NoMatch } from './pages/NoMatch'
import './styles/index.css'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path={'/host'} element={<Host />} />
				<Route path={'*'} element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)