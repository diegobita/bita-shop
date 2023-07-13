import { NextPage } from "next";
import { AdminLayout } from "@/components/layouts";
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import {  Grid, Typography } from "@mui/material";
import { WrapperInfoDash } from "@/components/admin";
import useSWR from "swr";
import { useEffect, useState } from "react";

interface InformationDashboardResponse {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWithNoInventory: number;
    lowInventory: number;
}

const DashboardPage: NextPage = () => {
    
    const {data, error} = useSWR<InformationDashboardResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000,
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30); 
        }, 1000);

        return() => clearInterval(interval);

    }, []);

    if(!error && !data)
        return <></>
    if(error){
        console.log(error);
        return <Typography>Error al cargar la infomración</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    } = data!;
  
    return (
      <AdminLayout title={"Dashboard"} subtitle="Estadisticas generales" icon={<DashboardOutlined/>} >
        <Grid container spacing={2}>
            <WrapperInfoDash
                value={ numberOfOrders }
                nameLabel={"Ordenes totales"}
                icon={<CreditCardOffOutlined color="secondary" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ paidOrders }
                nameLabel={"Ordenes pagadas"}
                icon={<AttachMoneyOutlined color="success" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ notPaidOrders }
                nameLabel={"Ordenes pendientes"}
                icon={<CreditCardOffOutlined color="error" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ numberOfClients }
                nameLabel={"Clientes"}
                icon={<GroupOutlined color="primary" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ numberOfProducts }
                nameLabel={"Productos"}
                icon={<CategoryOutlined color="warning" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ productsWithNoInventory }
                nameLabel={"Sin existencias"}
                icon={<CancelPresentationOutlined color="error" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ lowInventory }
                nameLabel={"Bajo inventario"}
                icon={<ProductionQuantityLimitsOutlined color="warning" sx={{fontSize: 40}}/>}
            />
            <WrapperInfoDash
                value={ refreshIn }
                nameLabel={"Actualización en"}
                icon={<AccessTimeOutlined color="secondary" sx={{fontSize: 40}}/>}
            />
        </Grid>
      </AdminLayout>
    )
  }

  export default DashboardPage;