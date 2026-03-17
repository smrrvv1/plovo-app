import './App.css'
import { Route, Routes } from 'react-router'
import { Dish } from './pages/dish/Dish'
import { Home } from './pages/home/Home'
import { Header } from './components/header/Header'
import { AddDish } from './pages/add-dish/AddDish'
import { Container } from '@mui/material'

function App() {

  return (
    <>
    <Header/>
    <Container style={{
      padding: '20px'
    }}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dish/:id' element={<Dish/>}/>
        <Route path='/dish/create' element={<AddDish/>}/>
      </Routes>
    </Container>
    </>
  )
}

export default App
