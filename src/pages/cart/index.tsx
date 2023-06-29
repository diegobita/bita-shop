import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { useContext } from "react";
import { CartContext } from "@/context";

const CartPage: NextPage = () => {
    
    const {numberOfItmes} = useContext(CartContext);
    
    return (
      <ShopLayout title={"Carrito - " + numberOfItmes + (numberOfItmes > 1 ? " items" : " items")} pageDescription={"Carrito de compras"}>
        <Typography variant="h1" component='h1'>Carrito</Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={true}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{my:1}}/>
                        <OrderSummary/>
                        <Box sx={{mt: 3}}>
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Checkout
                            </Button>
                        </Box>

                    </CardContent>
                    
                </Card>
            </Grid>


        </Grid>  
      </ShopLayout>
    )
  }

  export default CartPage;