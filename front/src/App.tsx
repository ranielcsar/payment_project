import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
