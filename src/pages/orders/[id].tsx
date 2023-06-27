import { NextPage } from "next";
import NextLink from "next/link"
import { ShopLayout } from "@/components/layouts";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage: NextPage = () => {
    return (
      <ShopLayout title={"Resumen de orden 123456789"} pageDescription={"Resumen de ornde"}>
        <Typography variant="h1" component='h1'>Orden Nº 123456789</Typography>

        <Chip
            sx={{my: 2}}
            label="Pendiente de pago"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined/>}
        />
        <Chip
            sx={{my: 2}}
            label="La orden ya fue pagada"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined/>}
        />

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={false}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen (3 productos)</Typography>
                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <NextLink href={'/checkout/address'} passHref legacyBehavior>
                                <Link underline="always">
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>Diego Bitabares</Typography>
                        <Typography>Maldoando</Typography>
                        <Typography>Uruguay</Typography>
                        <Typography>12345678</Typography>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href={'/cart'} passHref legacyBehavior>
                                <Link underline="always">
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <OrderSummary/>
                        <Box sx={{mt: 3}}>
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>
                        <Chip
                            sx={{my: 2}}
                            label="La orden ya fue pagada"
                            variant="outlined"
                            color="success"
                            icon={<CreditScoreOutlined/>}
                        />

                    </CardContent>
                    
                </Card>
            </Grid>


        </Grid>  
      </ShopLayout>
    )
  }

  export default OrderPage;