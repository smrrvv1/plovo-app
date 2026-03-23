import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosApi } from "../../axiosApi";
import { IDishShort } from "../../types";
import DishForm from "../../components/dish-form/DishForm";
import { CircularProgress, Typography } from "@mui/material";
import styles from "./styles.module.css";

export const EditDish = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState<IDishShort | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchDish = async () => {
      const response = await axiosApi.get<IDishShort>(`/dishes/${id}.json`)
      setDish(response.data)
    }
    fetchDish()
  }, [id])

  const onEditSubmit = async (dishData: IDishShort) => {
    setLoading(true)
    try {
      await axiosApi.put(`/dishes/${id}.json`, dishData)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>Edit Dish</Typography>
      {dish ? (
        <DishForm onSubmit={onEditSubmit} loading={loading} initialData={dish} />
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}