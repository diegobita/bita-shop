import { NextPage } from "next";
import NextLink from "next/link"
import { AdminLayout } from "@/components/layouts";
import {Box, Button, CardMedia, Chip, Grid, Link, MenuItem, Select} from "@mui/material";
import {AddOutlined, CategoryOutlined, ConfirmationNumberOutlined, PeopleOutline} from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IOrder, IProduct, IUser } from "@/interfaces";
import { shopApi } from "@/api";
import { useEffect, useState } from "react";


const columns: GridColDef[] = [
    {
        field: 'img', 
        headerName: 'Foto',
        renderCell: ({row}: GridRenderCellParams) => {
            return (
                <NextLink href={`/products/${row.slug}`} passHref target="_blank" prefetch={false}>
                    <CardMedia
                        component={'img'}
                        alt={row.t}
                        className="fadeIn"
                        image={`/products/${row.img}`}
                    />
                </NextLink>
            )
        }
    },
    {
        field: 'title', 
        headerName: 'Título', 
        width: 300,
        renderCell: ({row}: GridRenderCellParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline="always" component={'span'}>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    {field: 'gender', headerName: 'Genero'},
    {field: 'type', headerName: 'Tipo'},
    {field: 'inStock', headerName: 'Inventario'},
    {field: 'price', headerName: 'Precio'},
    {field: 'sizes', headerName: 'Talles', width: 150},
]

const ProductsPage: NextPage = () => {
    
    const {data, error } = useSWR<IProduct[]>('/api/admin/products');

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        if(data) {
            setProducts(data)
        }
    }, [data]);

    if(!data && !error)
        return <></>
  

    const productsRows = products.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }));

    return (
      <AdminLayout title={"Productos"} subtitle={`Mantenimiento de productos (${products.length})`} icon={<CategoryOutlined/>} >
          <Box display={'flex'} justifyContent={'end'}  sx={{mb: 2}}>
            <Button
                startIcon={<AddOutlined/>}
                color={'secondary'}
                href={'/admin/products/new'}
            >
                Nuevo producto
            </Button>
          </Box>
          <Grid container spacing={2} pt={2}>
            <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
                <DataGrid
                            rows={productsRows}
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
  export default ProductsPage;