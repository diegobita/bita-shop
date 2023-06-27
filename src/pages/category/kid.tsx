import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { ScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { ProductList } from "@/components/products";

const KidPage: NextPage = () => {

    const {products, isLoading} = useProducts("/products?gender=kid");
    return (
      <ShopLayout title={"Bita-Shop - Niños"} pageDescription={"Productos de niños"}>
        <Typography variant='h1' component='h1'>NIños</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Todos lo productos para niños</Typography>
        {
            isLoading
            ? <ScreenLoading/>
            : <ProductList products={products}/>
        }
      
      </ShopLayout>
    )
  }

  export default KidPage;