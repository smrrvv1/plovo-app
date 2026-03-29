import type { IBasketState } from "../../types"
import { Typography, Button, TextField, Paper, Box, Container } from "@mui/material";
import { axiosApi } from "../../axiosApi"
import { useState, type FormEvent } from "react"
import { useNavigate } from 'react-router'

interface Props{
    basketState: IBasketState
    onIncrease: (id: string) => void
    onDecrease: (id: string) => void
    onClear: () => void
}

export const Basket = ({basketState, onIncrease, onDecrease, onClear}:Props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [customer, setCustomer] = useState({ name: '', address: '' })

    const {items, totalPrice} = basketState

    if (items.length === 0){
        return(
            <Container sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h5" align="center">
                    your basket is empty!
                </Typography>
                <Button onClick={() => navigate('/')}>
                    go to menu
                </Button>
            </Container>
        )
    }

    const handleOrderSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!customer.name || !customer.address) {
            return alert("fill delivery info!")
        }

        setLoading(true)
        try {
        const order = {
            items: items,
            customer: customer,
            totalPrice: totalPrice,
        }

      await axiosApi.post('/orders.json', order)
      onClear()
      alert("oorder placed successfully!")
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography 
      variant="h4" 
      sx={{ mb: 3 }}>
        Basket
        </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        {items.map((item) => (
          <Box 
          key={item.dish.id} 
          sx={{ display: 'flex', 
          alignItems: 'center', 
          mb: 2, 
          borderBottom: '1px solid #eee', 
          pb: 1 }}>
            <Typography 
            sx={{ flexGrow: 1 }}>
                {item.dish.name} (x{item.count})
            </Typography>
            <Typography 
            sx={{ mx: 2 }}>
                {item.dish.price * item.count} $
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
        <Typography 
        variant="h6" 
        align="right">
            Total: {totalPrice} $
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography 
        variant="h6" 
        sx={{ mb: 2 }}>
            Delivery Details
        </Typography>
        <form onSubmit={handleOrderSubmit}>
          <TextField
            fullWidth 
            label="Name" 
            required
            sx={{ mb: 2 }}
            value={customer.name}
            onChange={(e) => setCustomer({...customer, name: e.target.value})}
          />
          <TextField
            fullWidth 
            label="Address" 
            required
            sx={{ mb: 2 }}
            value={customer.address}
            onChange={(e) => setCustomer({...customer, address: e.target.value})}
          />
          <Button 
            fullWidth 
            variant="contained" 
            color="success" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "sending..." : "order now"}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}