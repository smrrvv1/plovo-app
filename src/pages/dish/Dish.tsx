import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosApi } from "../../axiosApi";
import { IDishShort } from "../../types";
import { Button, Typography, CircularProgress } from "@mui/material";
import styles from "./styles.module.css"

export const Dish = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState<IDishShort | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchDish = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axiosApi.get<IDishShort | null>(`/dishes/${id}.json`)
      setDish(response.data)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchDish()
  }, [fetchDish])

  const onDelete = async () => {
    setLoading(true)
    try {
      await axiosApi.delete(`/dishes/${id}.json`)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <CircularProgress />
  if (!dish) return <Typography>Dish not found</Typography>

  return (
    <div className={styles.details}>
      <Typography variant="h4">{dish.name}</Typography>
      <Typography variant="body1">{dish.description}</Typography>
      <Typography variant="h6">Price: {dish.price} $</Typography>
      
      <div className={styles.buttons}>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
          </Button>
        <Button variant="outlined" onClick={() => navigate(`/dish/edit/${id}`)}>
          Edit
          </Button>
      </div>
    </div>
  )
}