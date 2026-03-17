import { useNavigate } from "react-router";
import DishForm from "../../components/dish-form/DishForm"
import type { IDishShort } from "../../types";
import { useState } from "react";
import { axiosApi } from "../../axiosApi";

export const AddDish = () => {

    const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onAddDishClick = async (dishData: IDishShort) => {
    setLoading(true)
    try {
      await axiosApi.post('/dishes.json', dishData)
    } finally {
      setLoading(false)
      navigate('/')
    }
  }

    return(
        <div>
            <DishForm onSubmit={onAddDishClick} loading={loading}/>
        </div>
    )
}