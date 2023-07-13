import { NextPage } from "next";
import { AdminLayout } from "@/components/layouts";
import {  Grid } from "@mui/material";
import { PeopleOutline } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";
import { IUser } from "@/interfaces";



const UsersPage: NextPage = () => {
    
    const {data, error } = useSWR<IUser[]>('/api/admin/users');

    if(!data && !error)
        return <></>


    const columns: GridColDef[] = [
        {field: 'email', headerName: 'Correo', width: 250},
        {field: 'name', headerName: 'Nombre completo', width: 300},
        {field: 'role', headerName: 'Rol', width: 200},
    ]

    const usersRows = data!.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }));

    return (
      <AdminLayout title={"Usuarios"} subtitle="Mantenimiento de usuarios" icon={<PeopleOutline/>} >
        <Grid container spacing={2} pt={2}>
            <Grid item xs={12} sx={{ height: 650, width:'100%'}}>
                <DataGrid
                            rows={usersRows}
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

  export default UsersPage;