import { NextPage } from "next";
import { AdminLayout } from "@/components/layouts";
import {  Grid, MenuItem, Select } from "@mui/material";
import { PeopleOutline } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { IUser } from "@/interfaces";
import { shopApi } from "@/api";
import { useEffect, useState } from "react";



const UsersPage: NextPage = () => {
    
    const {data, error } = useSWR<IUser[]>('/api/admin/users');

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if(data) {
            setUsers(data)
        }
    }, [data]);

    if(!data && !error)
        return <></>

    const roleValues = ['admin','client'];
    const updateRole = async (userId: string, newRole: string) =>{
        
        const previosUsers = users.map(user => ({...user}));
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(updatedUsers);

        try {
            const body = {
                userId,
                newRole,
            }
            await shopApi.put("/admin/users", body)
        } catch (error) {
            console.log(error);
            setUsers(previosUsers);
        }
    }

    const columns: GridColDef[] = [
        {field: 'email', headerName: 'Correo', width: 250},
        {field: 'name', headerName: 'Nombre completo', width: 300},
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 200,
            renderCell: ({row}: GridRenderCellParams) => {
                return (
                    <Select
                        value={row.role}
                        label={"Rol"}
                        sx={{width: '200px'}}
                        onChange={(event) => updateRole(row.id, event.target.value)}
                    >
                        {
                            roleValues.map((role, index) => (
                                <MenuItem key={index} value={role}>{role}</MenuItem>
                            ))
                        }
                    </Select>
                )
            }
        },
    ]

    const usersRows = users.map(user => ({
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