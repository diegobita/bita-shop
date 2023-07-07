import { useContext, useEffect, useState } from "react";

import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, getSession, getProviders } from "next-auth/react";

import { useForm } from "react-hook-form";
import { AuthLayout } from "@/components/layouts";
import { validations } from '@/utils';
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";

type FormData = {
    email: string,
    password: string,
}

const LoginPage: NextPage = () => {

    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders()
            .then( provider =>{
                setProviders(provider)
            })
    },[])

    const onLoginUser = async (formData: FormData) => {
        const {email, password} = formData;
        setShowError(false);
        /* Codigo para autenticacion manual, sin nextauth
        const validLogin = await loginUser(email, password);

        if(!validLogin){
            setShowError(true);
            return;
        }
        const destination = router.query.p?.toString() || '/'//Esto es para volver a la misma pagina que me encontraba antes del login
        router.replace(destination);
        */
        await signIn('credentials', {email, password});
    }

    return (
        <AuthLayout title={"Ingresar"} pageDescription={"Ingreso al sistema"}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{width:350, padding: '10px 20px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Iniciar Sesión</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type={'email'}
                                label="Correo"
                                fullWidth
                                {...register('email',{
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type="password"
                                fullWidth
                                {...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'Minimo 6 caracteres'}
                                    })
                                }
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Chip
                                label={"Credenciales invalidas"}
                                color={"error"}
                                variant={'outlined'}
                                icon={<ErrorOutline/>}
                                className={"fadeIn"}
                                sx={{display: showError ? 'flex' : 'none', marginBottom: 2}}
                            />
                            <Button fullWidth type={'submit'} color="secondary" className="circular-btn" size="large" >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register`} passHref>
                                <Link underline="always" component={'span'}>
                                    ¿No tiene cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs= {12} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <Divider sx={{width: '100%', mb: 2}}/>
                            {
                                Object.values(providers).map((provider: any) => {
                                    if(provider.id === 'credentials')
                                        return;
                                    return(
                                        <Button
                                            key={provider.id}
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1}}
                                            onClick={ () => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
  }

  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req, query } = ctx;
    const session = await getSession({ req });
    const { p = '/'} = query as {p: string};
    
    
    if(session){
        return {
            redirect:{
                destination: p,
                permanent: false,
            }
        }
    }
    return {
        props: { }
    }
  }
  
  export default LoginPage;