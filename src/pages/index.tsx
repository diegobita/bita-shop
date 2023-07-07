import { NextPage } from 'next'


import { ShopLayout } from '@/components/layouts';
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { ScreenLoading } from '@/components/ui';

const HomePage: NextPage = () => {


  const {products, isLoading} = useProducts("/products");

  return (
    <ShopLayout title='Bita-Shop' pageDescription='Los mejores productos'>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{mb: 1}}>Todos lo productos</Typography>
      {
        isLoading
          ? <ScreenLoading/>
          : <ProductList products={products}/>
      }
      
    </ShopLayout>
  )
}

export default HomePage;
