import NextLink from 'next/link';
import { initialData } from "@/database/seed-data"
import { Box, CardActionArea, CardMedia, Grid, IconButton, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { CartContext } from '@/context';
import { useContext } from 'react';
import { CartProduct } from './CartProduct';
import { ICartProduct, IOrderItems, IProduct } from '@/interfaces';

interface Props {
    editable: boolean;
    products?: IOrderItems[];
}

export const CartList = (props: Props) =>{
    const {editable = false, products} = props;
    const {cart} = useContext(CartContext); 

    const productsToShow = products ? products : cart;

    return(
        <Box pr = {3}>
            {
                productsToShow.map(product => (
                    <CartProduct
                        key={product.slug + product.size}
                        editable={editable}
                        cartProduct={product as ICartProduct}
                    />
                ))
            }
        </Box>
    )
}