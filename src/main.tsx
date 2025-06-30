import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import './index.css'
import App from './App.tsx'

dayjs.locale('ja')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
    <App />
    </MantineProvider>
  </StrictMode>,
)
