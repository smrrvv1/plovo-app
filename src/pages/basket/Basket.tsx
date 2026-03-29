import type { IBasketState } from "../../types"
import { Typography, Button, TextField, Paper, Box, Container, Divider } from "@mui/material";
import { axiosApi } from "../../axiosApi"
import { useState, type FormEvent } from "react"
import { useNavigate } from 'react-router'
import { BasketOrderForm } from "./BasketOrderForm"

interface Props{
    basketState: IBasketState
    onIncrease: (id: string) => void
    onDecrease: (id: string) => void
    onClear: () => void
}

export const Basket = ({basketState, onIncrease, onDecrease, onClear}:Props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const {items, totalPrice} = basketState

    if (items.length === 0) {
        return (
          <Container sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h5">your basket is empty!</Typography>
            <Button onClick={() => navigate('/')}>go to menu</Button>
          </Container>
        )
      }

      const handlePlaceOrder = async (customerData: { name: string; address: string; phone: string }) => {
        setLoading(true)
        try {
          const order = {
            items: items,
            customer: customerData,
            totalPrice: totalPrice,
            totalCount: totalCount,
          }

          await axiosApi.post('/orders.json', order)
            onClear();
            alert("заказ оформлен!")
            navigate('/')
            } catch (e) {
            alert("jшибка при оформлении заказа")
            } finally {
            setLoading(false)
            }
        }

  return (
    <Container maxWidth="sm">
        <Typography 
        variant="h4" 
        align="center" 
        sx={{ my: 3 }}>
            Корзина
        </Typography>
    <Box>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        {items.map((item, index) => (
          <Box 
          key={item.dish.id} 
          sx={{ display: 'flex', 
          alignItems: 'center', 
          mb: 2}}>
            <Typography 
            sx={{ flexGrow: 1 }}>
                {index + 1}.{item.dish.name}
            </Typography>
            <Typography 
            sx={{ mx: 2 }}>
                кол-во: {item.count} 
            </Typography>
            
            <Button 
            size="small" 
            variant="outlined" 
            onClick={() => onDecrease(item.dish.id)}>
                --
            </Button>
            <Button 
            size="small" 
            variant="outlined" 
            sx={{ ml: 1 }} 
            onClick={() => onIncrease(item.dish.id)}>
                +
            </Button>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography>
            total count: <strong>{totalCount} </strong>
        </Typography>
        <Typography>
            total sum: <strong>{totalPrice} $ </strong>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
      <BasketOrderForm onSubmit={handlePlaceOrder} loading={loading} />
      </Paper>
    </Box>
    </Container>
  )
}