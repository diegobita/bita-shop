import Head from "next/head"
import { PropsWithChildren } from "react"
import { SideBar } from "../ui";
import { AdminNavBar } from "../admin";
import { Box, Typography } from "@mui/material";


interface Props {
    title?: string,
    subtitle?: string,
    icon?: JSX.Element,
}

export const AdminLayout = (props: PropsWithChildren<Props>) => {

    const {title, subtitle, icon} = props;
    return (
        <>
            <Head>
                <title>{`Admin - ${title}`}</title>
            </Head>
            <nav>
                <AdminNavBar/>
            </nav>

            <SideBar/>

            <main style={{
                padding: '0px 30px',
                margin: '80px auto',
                maxWidth: '1440px'
                }}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant= 'h1' component='h1'>
                            {icon} {" "}
                            {title}
                        </Typography>
                        <Typography variant='h2' component='h2' mb={1}>
                            {subtitle}
                        </Typography>
                    </Box>
                    <Box className='fadeIn'>
                        {props.children}
                    </Box>
            </main>
        </>
    )
}

export default AdminLayout;