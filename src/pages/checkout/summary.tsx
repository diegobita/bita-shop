import {useContext, useEffect, useState} from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link"

import { ShopLayout } from "@/components/layouts";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import Cookies from "js-cookie";

const SummaryPage: NextPage = () => {

    const {shippingAddress, numberOfItems, createOrder} = useContext(CartContext);
    const router = useRouter();

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(!Cookies.get('firstName')){
            router.push('/checkout/address')
        }
    }, [router])

    const onCreateOrder = () =>{
        setIsPosting(true);
        createOrder();
    }

    if(!shippingAddress){
        return(<></>)
    }

    const {firstName, lastName, address, address2, city, zip, departament, country, phone} = shippingAddress;

    return (
      <ShopLayout title={"Resumen de compra"} pageDescription={"Resumen de compras"}>
        <Typography variant="h1" component='h1'>Resumen de la compra</Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={false}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <NextLink href={'/checkout/address'} passHref legacyBehavior>
                                <Link underline="always">
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        
                        <Typography>{firstName} {lastName} </Typography>
                        <Typography>{address}</Typography>
                        <Typography sx={{display: address2 ? '' : 'none'}}>{address2}</Typography>
                        <Typography>{city} {zip}</Typography>
                        <Typography>{countries.find(c => c.code === country )?.name}, {departament}</Typography>
                        <Typography>{phone}</Typography>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href={'/cart'} passHref legacyBehavior>
                                <Link underline="always">
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <OrderSummary/>
                        <Box sx={{mt: 3}}>
                            <Button color="secondary" className="circular-btn" fullWidth onClick={onCreateOrder}
                                disabled={isPosting}
                            >
                                Confirmar orden
                            </Button>
                        </Box>

                    </CardContent>
                    
                </Card>
            </Grid>


        </Grid>  
      </ShopLayout>
    )
  }

  export default SummaryPage;