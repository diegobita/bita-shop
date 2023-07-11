import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link"
import { ShopLayout } from "@/components/layouts";
import {  Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueGetterParams } from "@mui/x-data-grid";
import { getSession } from "next-auth/react";
import { dbOrder } from "@/database";
import { IOrder } from "@/interfaces";

interface Props {
    orders: IOrder[];
}

const columns: GridColDef[] =[
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullName', headerName: 'Nombre completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestras información del estado del pago',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return(
                params.row.paid
                ? <Chip color="success" label='Pagada' variant='outlined'/>
                : <Chip color="error" label='No pagada' variant='outlined'/>
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        description: 'Link a la orden',
        sortable: false,
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return(
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline="always" component={'span'}>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
]

const rows: GridRowsProp = [
    {id: 1, paid: true, fullName: 'Diego Bitabares'},
    {id: 2, paid: true, fullName: 'Diego Bitabares'},
    {id: 3, paid: false, fullName: 'Diego Bitabares'},
    {id: 4, paid: true, fullName: 'Diego Bitabares'},
    {id: 5, paid: true, fullName: 'Diego Bitabares'},
    {id: 6, paid: true, fullName: 'Diego Bitabares'},
]

const HistoryOrdersPage: NextPage<Props> = (props) => {
    const {orders} = props;
    const ordersRows = orders.map((order, index) => {
        return {
            id: index + 1,
            paid: order.isPaid,
            fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
            orderId: order._id
        }
    } )

    return (
      <ShopLayout title={"Historial de ordenes"} pageDescription={"HIstorial de ordenes del cliente"}>
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{height: 450, width:'100%'}}>
                    <DataGrid
                        rows={ordersRows}
                        columns={columns}
                        //pageSizeOptions={[5, 10, 25]}
                        //disableRowSelectionOnClick= {false}
                        rowSelection={false}
                    />
                </Grid>


            </Grid>
      </ShopLayout>
    )
  }

  export const getServerSideProps: GetServerSideProps = async (ctx) =>{

    const {req} = ctx;
    const session: any = await getSession({req});

    if(!session){
        return {
            redirect: {
                destination: `/auth/login?p=/orders/history`,
                permanent: false,
            }
        }
    }

    const orders = await dbOrder.getOrdersByUser(session.user.id);
    return {
        props:{
            orders,
        }
    }
  }
  export default HistoryOrdersPage;