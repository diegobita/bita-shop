import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { UIContext } from '@/context';


export const NavBar = () => {

    const router = useRouter();
    console.log(router);
    const {toggleSideMenu} = useContext(UIContext);

    const [search, setSearch] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearch=()=>{
        if(search.trim().length === 0)
            return;
        router.push(`/search/${search}`)
    }

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

                <Box sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm: 'block'}}}  
                        className= {'fadeIn'}>
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
                {/*Pantallas grandes*/
                    !isSearchVisible 
                    ? ( 
                        <IconButton
                            sx={{display: {xs: 'none', sm: 'flex'}}}
                            onClick={() => setIsSearchVisible(true)}
                        >
                            <SearchOutlined/>
                        </IconButton>
                        )
                    :(
                        <Input
                            sx={{display: {xs: 'none', sm: 'flex'}}}  
                            autoFocus
                            className='fadeIn'
                            value={search}
                            onChange={(event)=> setSearch(event.target.value)}
                            onKeyDown={(event) => event.key === 'Enter' ? onSearch() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        className='fadeIn'
                                        onClick={() => setIsSearchVisible(false)}
                                    >
                                    <ClearOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                }



                {/*Pantallas pequeñas*/}
                <IconButton
                    sx={{display:{xs: 'flex', sm: 'none'}}}
                    onClick={toggleSideMenu}
                >
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