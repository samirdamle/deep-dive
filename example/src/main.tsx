import React from 'react'
import { createRoot } from 'react-dom/client'
import './scss/index.scss'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Failed to find the root element')
}

const root = createRoot(rootElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
