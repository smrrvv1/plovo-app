import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { IDish } from '../../types';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Props {
    dish: IDish;
    addDishToBasket: (dish: IDish) => void
  }

export const DishCard = ({ dish, addDishToBasket }: Props) => {
    const navigate = useNavigate()

    const handleAddDishToBasket = (dish:IDish) => {
        addDishToBasket(dish)
    }

    return(
        <Card>
            <CardContent>
                <Typography variant='body1'>
                    {dish.name}
                </Typography>
                <Typography variant='body2'>
                    price: {dish.price} $
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={()=> navigate(`/dish/${dish.id}`)}>
                    Show more   
                </Button>

                <Button 
                onClick={() => handleAddDishToBasket(dish)}
                endIcon={<AddShoppingCartIcon/>}>
                    Add to basket
                </Button>
            </CardActions>
        </Card>
    )
}