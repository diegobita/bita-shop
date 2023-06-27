import { NextPage } from "next";
import NextLink from "next/link"
import { ShopLayout } from "@/components/layouts";
import {  Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridValueGetterParams } from "@mui/x-data-grid";


const columns: GridColDef[] =[
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullName', headerName: 'Nombre completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestras infomracion del estado del pago',
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
        description: 'Muestras infomracion del estado del pago',
        sortable: false,
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return(
                <NextLink href={`/orders/${params.row.id}`} passHref>
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

const HistoryOrdersPage: NextPage = () => {
    return (
      <ShopLayout title={"Historial de ordenes"} pageDescription={"HIstorial de ordenes del cliente"}>
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>
            <Grid container>
                <Grid item xs={12} sx={{height: 450, width:'100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        //pageSizeOptions={[5, 10, 25]}
                    />
                </Grid>


            </Grid>
      </ShopLayout>
    )
  }

  export default HistoryOrdersPage;