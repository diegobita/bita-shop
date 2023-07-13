import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography} from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrder } from "@/database";
import { IOrder } from "@/interfaces";
import { countries } from "@/utils";
import {shopApi} from "@/api";
import {useRouter} from "next/router";
import {useState} from "react";

export type OrderResponseBody = {
    id: string;
    status:
        | "COMPLETED"
        | "SAVED"
        | "APPROVED"
        | "VOIDED"
        | "PAYER_ACTION_REQUIRED"
        | "CREATED";
};
interface Props {
    order: IOrder,
}


const OrderPage: NextPage<Props> = (props) => {
    const {order} = props;
    const {shippingAddress} = order;
    const router = useRouter();
    const [isPaying, setIsPaying] = useState(false);

    const onOrderCompleted = async (details: OrderResponseBody) => {
        if(details.status !== 'COMPLETED')
            return alert("No hay pago en Paypal");
        setIsPaying(true);

        try{
            const {data} = await shopApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id,
            });
            router.reload();
        }catch(error){
            setIsPaying(false);
            console.log(error)
        }
    }

    return (
      <ShopLayout title={"Resumen de Orden"} pageDescription={"Resumen de orden"}>
        <Typography variant="h1" component='h1'>{`Orden Nº ${order._id}`}</Typography>
        {
            order.isPaid
            ? (
                <Chip
                    sx={{my: 2}}
                    label="La orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined/>}
                />
            ): (
                <Chip
                    sx={{my: 2}}
                    label="Pendiente de pago"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined/>}
                />
            )
        }

        <Grid container className="fadeIn">
            <Grid item xs={12} sm={7}>
                <CartList editable={false} products={order.orderItems}/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? "productos" : "producto"})</Typography>
                        <Divider sx={{my:1}}/>

                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="subtitle1">Dirección de entrega</Typography>
                        </Box>


                        <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography>{shippingAddress.address}{shippingAddress.address2 ? `, ${shippingAddress.address2}`: ""}</Typography>
                        <Typography>{shippingAddress.departament}, {shippingAddress.city}, {shippingAddress.zip}</Typography>
                        <Typography>{countries.find(c => c.code === shippingAddress.country )?.name}</Typography>
                        <Typography>{shippingAddress.phone}</Typography>

                        <OrderSummary
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subtotal: order.subtotal,
                                tax: order.tax,
                                total: order.total
                            }}
                        />
                        <Box sx={{mt: 3}} display={'flex'} flexDirection={'column'}>
                            <Box
                                display={'flex'}
                                justifyContent={'center'}
                                className={'fadeIn'}
                                sx={{display: isPaying ? 'flex' : 'none'}}
                            >
                                <CircularProgress/>
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                className={'fadeIn'}
                                sx={{display: !isPaying ? 'flex' : 'none', flex: 1}}
                            >
                                {
                                    order.isPaid
                                        ? (
                                            <Chip
                                                sx={{my: 2}}
                                                label="La orden ya fue pagada"
                                                variant="outlined"
                                                color="success"
                                                icon={<CreditScoreOutlined/>}
                                            />
                                        ):(
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: `${order.total}`,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order!.capture().then((details) => {
                                                        onOrderCompleted(details);
                                                        console.log({details})

                                                    });
                                                }}
                                            />
                                        )
                                }
                            </Box>

                        </Box>

                    </CardContent>

                </Card>
            </Grid>


        </Grid>
      </ShopLayout>
    )
  }

  export const getServerSideProps: GetServerSideProps = async (ctx) =>{

    const {req, query} = ctx;
    const {id = ''}  = query as {id: string};

    const session: any = await getSession({req});
 
    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrder.getOrderByIdAndUser(id, session.user.id);

    if(!order){
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props:{
            order,
        }
    }
  }

  export default OrderPage;