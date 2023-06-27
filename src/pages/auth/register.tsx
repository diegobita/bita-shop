import { NextPage } from "next";
import NextLink from "next/link";
import { AuthLayout } from "@/components/layouts";
import { Box, Button,  Grid, Link, TextField, Typography } from "@mui/material";



const RegisterPage: NextPage = () => {
    return (
      <AuthLayout title={"Registrar cuenta"} pageDescription={"Registrar una cuenta"}>
       
        <Box sx={{width:350, padding: '10px 20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1">Registrar usuario</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Nombre" fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo" fullWidth></TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" type="password" fullWidth></TextField>
                </Grid>

                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" size="large" >
                        Registrar
                    </Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                    <NextLink href={`/auth/login`} passHref>
                        <Link underline="always" component={'span'}>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
      </AuthLayout>
    )
  }
  
  export default RegisterPage;