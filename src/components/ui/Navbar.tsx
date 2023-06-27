import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { UIContext } from '@/context';


export const NavBar = () => {

    const router = useRouter();
    console.log(router);
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

                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    <NextLink href={'/category/men'} passHref>
                        <Link component={'span'}>
                            <Button color={router.asPath === '/category/men' ? "primary" : "info"}>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/woman'} passHref>
                        <Link component={'span'}>
                            <Button color={router.asPath === "/category/woman" ? "primary" : "info"}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kid'} passHref legacyBehavior>
                        <Link component={'span'}>
                            <Button color={router.asPath === "/category/kid" ? "primary" : "info"}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box sx={{flex: 1}}/>

                <IconButton>
                    <SearchOutlined/>
                </IconButton>

                <NextLink href={'/cart'} passHref>
                    <Link component={'span'}>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartOutlined/>
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu}>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}