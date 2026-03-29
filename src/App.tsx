import './App.css'
import { Route, Routes } from 'react-router'
import { Dish } from './pages/dish/Dish'
import { Home } from './pages/home/Home'
import { Header } from './components/header/Header'
import { AddDish } from './pages/add-dish/AddDish'
import { Container } from '@mui/material'
import { EditDish } from './pages/edit-dish/EditDish'
import { Basket } from './pages/basket/Basket'
import { addDishToBasket } from './utils/basketHelpers';
import type { IBasketState, IDish } from './types';
import { useState } from 'react'

function App() {
  const [basket, setBasket] = useState<IBasketState>({
    items: [],
    totalCount: 0,
    totalPrice: 0
  })

  const handleAddDish = (dish: IDish) => {
    setBasket(prev => addDishToBasket(prev, dish));
  }

  return (
    <>
    <Header totalCount={basket.totalCount} totalPrice={basket.totalPrice} />
    <Container sx={{ mt: 4 }}>
      <Routes>
        <Route path='/' element={<Home addDishToBasket={handleAddDish} />}/>
        <Route path='/dish/:id' element={<Dish/>}/>
        <Route path='/dish/create' element={<AddDish/>}/>
        <Route path='/dish/edit/:id' element={<EditDish/>}/>
        <Route path='/basket' element={<Basket basketState={basket} />} />
      </Routes>
    </Container>
    </>
  )
}

export default App
