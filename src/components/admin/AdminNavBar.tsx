import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material"
import { useContext, useState } from 'react';
import { UIContext } from '@/context';


export const AdminNavBar = () => {

    const {toggleSideMenu} = useContext(UIContext);


    return (
        <AppBar>
            <Toolbar>
                <NextLink href={'/'} passHref legacyBehavior>
                    <Link display={'flex'} alignItems={'center'}>
                        <Typography variant="h6">Bita |</Typography>
                        <Typography sx={{ml: 0.6}}> SHOP</Typography>
                    </Link>
                </NextLink>
                
                <Box sx={{flex: 1}}/>


                <Button onClick={toggleSideMenu}>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}