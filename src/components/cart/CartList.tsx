import NextLink from 'next/link';
import { initialData } from "@/database/products"
import { Box, CardActionArea, CardMedia, Grid, IconButton, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

interface Props {
    editable: boolean;
}

const productsCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CartList = (props: Props) =>{
    const {editable = false} = props;
    return(
        <>
            {
                productsCart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{mb:1}}>
                        <Grid item xs={3}>
                            <NextLink href={'/product/slug'} passHref >
                                <Link component={'span'}>
                                    <CardActionArea>
                                        <CardMedia
                                            component={'img'}
                                            image={`/products/${product.images[0]}`}
                                            alt={product.title}
                                            sx={{borderRadius: '20px'}}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>M</strong></Typography>
                                {
                                    editable ?
                                    <ItemCounter/> :
                                    <Typography variant='body1'>Cantidad: <strong>2</strong></Typography>

                                }
                            </Box>
                        </Grid> 
                        <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Typography variant='subtitle1'>${product.price}</Typography>
                            {
                                editable && (
                                    <IconButton>
                                        <DeleteSweepOutlinedIcon fontSize='small' color='error'/>
                                    </IconButton>
                                )
                            }
                        </Grid>
                    </Grid>                
                   )
                )
            }
        </>
    )
}