import { NextPage } from "next";
import NextLink from "next/link";
import { AuthLayout } from "@/components/layouts";
import {Box, Button, Chip, Grid, Link, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {validations} from '@/utils'
import {shopApi} from "@/api";
import {ErrorOutline} from "@mui/icons-material";
import {useContext, useState} from "react";
import { AuthContext } from "@/context";
import { useRouter } from "next/router";

type FormData = {
    email: string,
    password: string,
}

const LoginPage: NextPage = () => {

    const {loginUser} = useContext(AuthContext);
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [showError, setShowError] = useState(false);


    const onLoginUser = async (formData: FormData) => {
        const {email, password} = formData;
        setShowError(false);

        const validLogin = await loginUser(email, password);

        if(!validLogin){
            setShowError(true);
            return;
        }
        const destination = router.query.p?.toString() || '/'//Esto es para volver a la misma pagina que me encontraba antes del login
        router.replace(destination);
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
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
  }
  
  export default LoginPage;