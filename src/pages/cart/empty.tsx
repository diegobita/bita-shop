import { NextPage } from "next"
import NextLink from 'next/link';
import { ShopLayout } from "@/components/layouts"
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"

const CartEmptyPage: NextPage = () => {
    return (
      <ShopLayout title={"Carrito vacío"} pageDescription={"No hay productos en el carrito"}>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection: {sx:'column', sm:'row'}}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 80}}/>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Typography marginLeft={2}>Su carrito esta vacío</Typography>
                <NextLink href={'/'} passHref legacyBehavior>
                    <Link >
                        <Typography variant="h4" component='h4' color='secondary'>Regresar</Typography>
                    </Link>
                </NextLink>
            </Box>
            
        </Box>
  
      </ShopLayout>
    )
  }

  export default CartEmptyPage;