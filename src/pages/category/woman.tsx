import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { ScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { ProductList } from "@/components/products";

const WomanPage: NextPage = () => {

    const {products, isLoading} = useProducts("/products?gender=women");
    return (
      <ShopLayout title={"Bita-Shop - Mujeres"} pageDescription={"Productos de mujeres"}>
        <Typography variant='h1' component='h1'>Mujeres</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Todos lo productos para mujeres</Typography>
        {
            isLoading
            ? <ScreenLoading/>
            : <ProductList products={products}/>
        }
      
      </ShopLayout>
    )
  }

  export default WomanPage;