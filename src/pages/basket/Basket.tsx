import { Typography } from "@mui/material"
import type { IBasketState } from "../../types"
import { Link } from "@mui/material"
import { Container } from "@mui/material"

interface Props{
    basketState: IBasketState
}

export const Basket = ({basketState}:Props) => {

    const {items, totalCount, totalPrice} = basketState

    if (items.length === 0){

        return(
            <Container>
                <Typography variant="h5" align="center">
                    your basket is empty!
                </Typography>
                <Link to='/'>
                <Typography>
                    go to home page
                </Typography>
                </Link>
            </Container>
        )
    }

    return(

        <div>
            Basket
        </div>

    )
}