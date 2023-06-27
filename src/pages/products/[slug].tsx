import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { ItemCounter, SlideShowImages } from "@/components/ui";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { SizeSelector } from "@/components/products";
import { IProduct } from "@/interfaces";
import { dbProducts } from "@/database";


interface Props {
  product: IProduct,
}


const ProductPage: NextPage<Props> = (props) => {

    const {product} = props;

    return (
      <ShopLayout title={product.title} pageDescription={product.description}>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <SlideShowImages images={product.images} duration={5000}/>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box display={'flex'} flexDirection={'column'}>
              <Typography variant='h1' component='h1'>{product.title}</Typography>
              <Typography variant='subtitle1' component='h2'>${product.price}</Typography>
              <Box sx={{my: 2}}>
                <Typography variant='subtitle2'>Cantidad</Typography>
                <ItemCounter/>
                <SizeSelector sizes={product.sizes}/>
              </Box>

                <Button color='secondary' className="circular-btn">Agregar al carrito</Button>
                <Chip label="No hay más disponibles" color="error" variant="outlined"></Chip>
                <Box sx={{mt: 3}}>
                  <Typography variant="subtitle2">Descripción</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </Box>

            </Box>
            
          </Grid>
        </Grid>
        
  
      </ShopLayout>
    )
  }
  export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    const slugs = await dbProducts.getAllProductSlugs();

    return {
      paths: slugs.map(({slug}) => ({ params: {slug}})),
      fallback: 'blocking'
      //en false controla que si la pagina no fue previamente renderizada en build, devuelve un 404. Si pongo "bloking" no controla
    }
  }

  export const getStaticProps: GetStaticProps = async (ctx) => {
    const {params} = ctx;
    const {slug} = params as {slug: string};

    const product = await dbProducts.getProductBySlug(slug);

    if(!product){
      return {
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }

    return {
      props:{
        product,
      },
      revalidate: 60 * 60 * 24 //Revalidacion de las paginas staticas cada 1 dia
    }
  }

/*
  //La pagina es pre-renderizada con los datos en servidor
  export const getServerSideProps: GetServerSideProps = async (ctx) =>{
      const {params} = ctx;
      const {slug = ''} = params as {slug: string};

      const product = await dbProducts.getProductBySlug(slug);

      if(!product){
        return {
          redirect:{
            destination: '/',
            permanent: false,
          }
        }
      }

      return {
        props:{
          product
        }
      }
  }
*/
  
  export default ProductPage;