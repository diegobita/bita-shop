import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { ScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { ProductList } from "@/components/products";

const MenPage: NextPage = () => {

    const {products, isLoading} = useProducts("/products?gender=men");
    return (
      <ShopLayout title={"Bita-Shop - Hombres"} pageDescription={"Productos de hombres"}>
        <Typography variant='h1' component='h1'>Hombres</Typography>
        <Typography variant='h2' sx={{mb: 1}}>Todos lo productos para hombres</Typography>
        {
            isLoading
            ? <ScreenLoading/>
            : <ProductList products={products}/>
        }
      
      </ShopLayout>
    )
  }

  export default MenPage;