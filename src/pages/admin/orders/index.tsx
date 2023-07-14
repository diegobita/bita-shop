import { NextPage } from "next";
import NextLink from "next/link"
import { AdminLayout } from "@/components/layouts";
import {  Chip, Grid, Link, MenuItem, Select } from "@mui/material";
import { ConfirmationNumberOutlined, PeopleOutline } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IOrder, IUser } from "@/interfaces";
import { shopApi } from "@/api";
import { useEffect, useState } from "react";


const columns: GridColDef[] = [
    {field: 'id', headerName: 'Order ID', width: 220},
    {field: 'createdAt', headerName: 'Fecha', width: 150},
    {field: 'email', headerName: 'Correo', width: 200},
    {field: 'name', headerName: 'Nombre Completo', width: 300},
    {field: 'total', headerName: 'Importe total', width: 100, align:'center'},
    {
        field: 'isPaid', 
        headerName: 'Pagada', 
        width: 120,
        renderCell: ({row}: GridRenderCellParams) => {
            return row.isPaid
                ?(
                    <Chip 
                        variant="outlined" label= 'Pagada' color="success"
                    />
                ):
                (
                    <Chip 
                        variant="outlined" label= 'Pendiente' color="error"
                    />
                )
        }
    },
    {field: 'numberOfItems', headerName: 'Nº Productos', width: 100, align:'center'},
    {
        field: 'check', 
        headerName: 'Ver orden', 
        width: 150,
        renderCell: ({row}: GridRenderCellParams) => {
            
            return(
                <NextLink href={`/admin/orders/${row.id}`} passHref target="_blank" prefetch={false}>
                    <Link underline="always" component={'span'}>
                        Ver orden
                    </Link>
                </NextLink>
                /*
                <a href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" >
                    Ver orden
                </a>
                */
              
            )
        }
    },
]

const OrdersPage: NextPage = () => {
    
    const {data, error } = useSWR<IOrder[]>('/api/admin/orders');

    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        if(data) {
            setOrders(data)
        }
    }, [data]);

    if(!data && !error)
        return <></>
  

    const ordersRows = orders.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        numberOfItems: order.numberOfItems,
        createdAt: order.createdAt,
    }));

    return (
      <AdminLayout title={"Ordenes"} subtitle="Mantenimiento de ordenes" icon={<ConfirmationNumberOutlined/>} >
        <Grid container spacing={2} pt={2}>
            <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
                <DataGrid
                            rows={ordersRows}
                            columns={columns}
                            //pageSizeOptions={[5, 10, 25]}
                            //disableRowSelectionOnClick= {false}
                            rowSelection={false}
                        />
            </Grid>
        </Grid>
      </AdminLayout>
    )
  }
  export default OrdersPage;