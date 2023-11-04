import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Room from './components/Room/Room'
import JoinRoom from './pages/JoinRoom/JoinRoom'
import CreateRoom from './pages/createRoom/CreateRoom'
import Lobby from './pages/Lobby/Lobby'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Lobby />} />
        <Route element={<Room />} path='/room' />
        <Route element={<CreateRoom />} path='/create' />
        <Route element={<JoinRoom />} path='/join' />
      </Route>
    </Routes>
  )
}

export default App
