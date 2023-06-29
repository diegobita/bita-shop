import NextLink from 'next/link';
import { initialData } from "@/database/seed-data"
import { Box, CardActionArea, CardMedia, Grid, IconButton, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { CartContext } from '@/context';
import { useContext } from 'react';
import { CartProduct } from './CartProduct';

interface Props {
    editable: boolean;
}

export const CartList = (props: Props) =>{
    const {editable = false} = props;
    const {cart} = useContext(CartContext); 

    return(
        <Box>
            {
                cart.map(product => (
                    <CartProduct
                        key={product.slug + product.size}
                        editable={editable}
                        cartProduct={product}
                    />
                ))
            }
        </Box>
    )
}