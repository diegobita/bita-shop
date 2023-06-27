import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";

const Custom404: NextPage = () => {
    return (
      <ShopLayout title='Pagina no encontrada' pageDescription='No hay nada que mostrar'>
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection: {sx:'column', sm:'row'}}}
        >
            <Typography variant='h1' component='h1' fontSize={50} fontWeight={80}>404 |</Typography>
            <Typography marginLeft={2}>Página no encontrada</Typography>
        </Box>
      </ShopLayout>
    )
  }
  
  export default Custom404;
  