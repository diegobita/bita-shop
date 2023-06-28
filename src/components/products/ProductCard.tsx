import { useMemo, useState } from "react";

import NextLink from 'next/link';

import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from "@mui/material"

import { IProduct } from "@/interfaces"

interface Props {
    product: IProduct
}

export const ProductCard = ({product}: Props) =>{

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const productImage = useMemo(() => {
        return isHovered ?  `products/${product.images[1]}` : `products/${product.images[0]}`
    }, [isHovered, product.images])

    const inStockChip = (stock: number) =>{
        if(stock === 0){
            return (<Chip
                color="error"
                label="Agotado"
                size="small"
                sx={{position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
            />)
        }else{
            if(stock < 15){
                return (
                    <Chip
                        color="secondary"
                        label="Ultimas disponibles"
                        size="small"
                        sx={{position: 'absolute', zIndex: 99, top: '10px', left: '10px'}}
                    />
                )
            }
        } 
    }    
    return(
        <Grid 
            item 
            xs={6} 
            sm={3}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href={`/products/${product.slug}`} passHref prefetch={false}>
                    <Link component={'span'}>
                        <CardActionArea>
                            {
                                inStockChip(product.inStock)
                            }
                            <CardMedia
                                component={'img'}
                                className="fadeIn"
                                image={`/${productImage}`}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
               
            </Card>
            <Box sx={{mt: 1, display: isImageLoaded ? 'block': 'none'}}  className='fadeIn'>
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>${product.price}</Typography>
            </Box>
        </Grid>
    )

}