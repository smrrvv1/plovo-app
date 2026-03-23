import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { axiosApi } from "../../axiosApi";
import { IDishShort } from "../../types";
import DishForm from "../../components/dish-form/DishForm";
import { CircularProgress, Typography } from "@mui/material";

export const EditDish = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dish, setDish] = useState<IDishShort | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axiosApi.get<IDishShort>(`/dishes/${id}.json`).then(res => setDish(res.data))
  }, [id])

  const onEdit = async (updatedDish: IDishShort) => {
    setLoading(true)
    try {
      await axiosApi.put(`/dishes/${id}.json`, updatedDish)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }} align="center">Edit Dish</Typography>
      {dish ? (
        <DishForm onSubmit={onEdit} loading={loading} initialData={dish} />
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}