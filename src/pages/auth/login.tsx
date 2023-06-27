import { NextPage } from "next";
import NextLink from "next/link";
import { AuthLayout } from "@/components/layouts";
import { Box, Button,  Grid, Link, TextField, Typography } from "@mui/material";



const LoginPage: NextPage = () => {
    return (
      <AuthLayout title={"Ingresar"} pageDescription={"Ingreso al sistema"}>
       
        <Box sx={{width:350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1">Iniciar Sesión</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo"  fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" type="password"  fullWidth></TextField>
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                    <NextLink href={`/auth/register`} passHref>
                        <Link underline="always" component={'span'}>
                            ¿No tiene cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
      </AuthLayout>
    )
  }
  
  export default LoginPage;