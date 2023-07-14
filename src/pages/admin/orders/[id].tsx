import { GetServerSideProps, NextPage } from "next";
import { AdminLayout } from "@/components/layouts";
import {Box,  Card, CardContent, Chip, Divider, Grid, Typography} from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { CreditCardOffOutlined, CreditScoreOutlined, InventoryOutlined } from "@mui/icons-material";

import { dbOrder } from "@/database";
import { IOrder } from "@/interfaces";
import { countries } from "@/utils";

interface Props {
    order: IOrder,
}


const OrderPage: NextPage<Props> = (props) => {
    const {order} = props;
    const {shippingAddress} = order;


    return (
      <AdminLayout title={"Resumen de Orden"} subtitle={`Orden #${order._id}`} icon={<InventoryOutlined/>}>
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
                                flexDirection={'column'}
                                justifyContent={'center'}
                                className={'fadeIn'}
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
                                            <Chip
                                                sx={{my: 2}}
                                                label="Pendiente de pago"
                                                variant="outlined"
                                                color="error"
                                                icon={<CreditCardOffOutlined/>}
                                            />
                                        )
                                }
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
      </AdminLayout>
    )
  }

  export const getServerSideProps: GetServerSideProps = async (ctx) =>{

    const {req, query} = ctx;
    const {id = ''}  = query as {id: string};

    const order = await dbOrder.getOrderById(id);

    if(!order){
        return {
            redirect: {
                destination: `/admin/orders`,
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