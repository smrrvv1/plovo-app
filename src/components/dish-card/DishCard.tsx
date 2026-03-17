import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { IDish } from '../../types';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

interface Props {
    dish: IDish
}

export const DishCard = ({dish}:Props) => {
    const navigate = useNavigate()

    const goToDishPage = (id: string) => {
        navigate(`/dish/${id}`)
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
                <Button onClick={()=> goToDishPage(dish.id)}>
                    Show more
                </Button>
            </CardActions>
        </Card>
    )
}