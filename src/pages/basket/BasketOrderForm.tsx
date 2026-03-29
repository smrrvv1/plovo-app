import { TextField, Button, Box, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";

interface Props {
  onSubmit: (customer: { name: string; address: string; phone: string }) => void
  loading: boolean
}

export const BasketOrderForm = ({ onSubmit, loading }: Props) => {
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '' })

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(customer)
  }

  return (
    <Box 
    component="form" 
    onSubmit={onFormSubmit} 
    sx={{ mt: 3, display: 'flex', 
    flexDirection: 'column', 
    gap: 2 }}>
      <Typography 
      variant="h6" 
      align="center">
        детали доставки
        </Typography>
      <TextField 
        label="имя" 
        value={customer.name} 
        onChange={(e) => setCustomer({...customer, name: e.target.value})} 
        required 
      />
      <TextField 
        label="адрес" 
        value={customer.address} 
        onChange={(e) => setCustomer({...customer, address: e.target.value})} 
        required 
      />
      <TextField 
        label="телефон" 
        value={customer.phone} 
        onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
        required 
      />
      <Button 
      type="submit" 
      variant="contained" 
      color="success" 
      disabled={loading}>
        {loading ? "загрузка.." : "оформить заказ"}
      </Button>
    </Box>
  )
}