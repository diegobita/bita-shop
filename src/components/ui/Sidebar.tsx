import {useContext, useState} from "react";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { AuthContext, UIContext } from "@/context";


export const SideBar = () => {

    const {sideMenuOpen, toggleSideMenu} = useContext(UIContext);
    const {user, isLoggedIn, logout} = useContext(AuthContext);
    const router = useRouter();

    const [search, setSearch] = useState('');

    const onSearch=()=>{
        if(search.trim().length === 0)
            return;
        navigateTo(`/search/${search}`)
    }

    const navigateTo = (url: string) =>{
        toggleSideMenu();
        router.push(url)
    }

    const onLogout = () => {
        logout();
    }

    return (
        <Drawer
            open={ sideMenuOpen }
            onClose={toggleSideMenu}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={search}
                            onChange={(event)=> setSearch(event.target.value)}
                            onKeyDown={(event) => event.key === 'Enter' ? onSearch() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearch}
                                    >
                                    <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    { isLoggedIn &&
                        <>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItemButton>

                            <ListItemButton onClick={() => navigateTo("/orders/history")}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItemButton>
                        </>
                    }

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo("/category/men")}>
                        <ListItemIcon>
                            <MaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo("/category/woman")}>
                        <ListItemIcon>
                            <FemaleOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo("/category/kid")}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItemButton>


                    {   !isLoggedIn 
                        ?(
                            <>  
                                <ListItemButton 
                                    onClick={() => navigateTo(router.asPath !== '/' ? `/auth/login?p=${router.asPath}` : '/auth/login')}>
                                    <ListItemIcon>
                                        <VpnKeyOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Ingresar'} />
                                </ListItemButton>
                                <ListItemButton 
                                    onClick={() => navigateTo(router.asPath !== '/' ? `/auth/register?p=${router.asPath}` : '/auth/register')}>
                                    <ListItemIcon>
                                        <VpnKeyOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Registrarse'} />
                                </ListItemButton>
                            </>
                        )
                        :(
                            <ListItemButton onClick={onLogout}>
                                <ListItemIcon>
                                    <LoginOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItemButton>
                        )
                    }


                    {/* Admin */
                        user?.role === 'admin' &&
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton onClick={() => navigateTo("/admin")}>
                                <ListItemIcon>
                                    <DashboardOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItemButton>
                            <ListItemButton onClick={() => navigateTo("/admin/products")}>
                                <ListItemIcon >
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItemButton>
                            <ListItemButton onClick={() => navigateTo("/admin/orders")}>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItemButton>

                            <ListItemButton  onClick={() => navigateTo("/admin/users")}>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItemButton>
                        </>
                    }
                </List>
            </Box>
        </Drawer>
    )
}
