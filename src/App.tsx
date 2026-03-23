import './App.css'
import { Route, Routes } from 'react-router'
import { Dish } from './pages/dish/Dish'
import { Home } from './pages/home/Home'
import { Header } from './components/header/Header'
import { AddDish } from './pages/add-dish/AddDish'
import { Container } from '@mui/material'
import { EditDish } from './pages/edit-dish/EditDish'

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
        <Route path='/dish/edit/:id' element={<EditDish/>}/>
      </Routes>
    </Container>
    </>
  )
}

export default App
