import NextLink from 'next/link';
import { Box, CardActionArea, CardMedia, Grid, IconButton, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { ICartProduct } from '@/interfaces';
import { useContext } from 'react';
import { CartContext } from '@/context';
import { currency } from '@/utils';

interface Props {
    editable: boolean;
    cartProduct: ICartProduct;
}


export const CartProduct = (props: Props) =>{
    const {editable, cartProduct} = props;
    const {changeQuantityProductInCart, removeProductCart} = useContext(CartContext); 
    
    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) =>{
        product.quantity = newQuantityValue;
        changeQuantityProductInCart(product);
    }
    return(
            <Grid container spacing={2}  sx={{mb:1}}>
                <Grid item xs={3} >
                    <NextLink href={`/product${cartProduct.slug}`} passHref >
                        <Link component={'span'}>
                            <CardActionArea>
                                <CardMedia
                                    component={'img'}
                                    image={`/products/${cartProduct.image}`}
                                    alt={cartProduct.title}
                                    sx={{borderRadius: '20px'}}
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={7}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant='body1'>{cartProduct.title}</Typography>
                        <Typography variant='body1'>Talla: <strong>{cartProduct.size}</strong></Typography>
                        {
                            editable 
                            ?<ItemCounter
                                currentValue={cartProduct.quantity}
                                maxValue={10} //se podria ir al backend a consultar cuandos quedan
                                updatedQuantity={(newValue) => {onNewCartQuantityValue(cartProduct, newValue)}}
                            /> 
                            :<Typography variant='body1'>Cantidad: <strong>{cartProduct.quantity}</strong></Typography>

                        }
                    </Box>
                </Grid> 
                <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                    <Typography variant='subtitle1'>{currency.format(cartProduct.price)}</Typography>
                    {
                        editable && (
                            <IconButton
                                onClick={() => removeProductCart(cartProduct)}
                            >
                                <DeleteSweepOutlinedIcon fontSize='small' color='error'/>
                            </IconButton>
                        )
                    }
                </Grid>
            </Grid>                
    )
}