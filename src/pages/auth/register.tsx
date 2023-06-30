import { useContext, useState } from "react";

import { NextPage } from "next";
import NextLink from "next/link";
import { Box, Button,  Chip,  Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";
import { AuthContext } from "@/context";
import { useRouter } from "next/router";

type FormData = {
    email: string,
    password: string,
    name: string,
}

const RegisterPage: NextPage = () => {

    const {registerUser} = useContext(AuthContext);
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterUser = async (formData: FormData) => {
        const {email, password, name} = formData;
        setShowError(false);
        const validRegister = await registerUser(name, email, password);

        if(validRegister.hasError){
            setShowError(true);
            setErrorMessage(validRegister.message || '');
            return
        }
        const destination = router.query.p?.toString() || '/'//Esto es para volver a la misma pagina que me encontraba antes del register
        router.replace(destination);
    }
    return (
      <AuthLayout title={"Registrar cuenta"} pageDescription={"Registrar una cuenta"}>
       <form onSubmit={handleSubmit(onRegisterUser)}>
            <Box sx={{width:350, padding: '10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Registrar usuario</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Nombre" 
                            fullWidth
                            {...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 3, message: 'Minimo 3 caracteres'}
                            })
                        }
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="email" 
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
                                label={errorMessage}
                                color={"error"}
                                variant={'outlined'}
                                icon={<ErrorOutline/>}
                                className={"fadeIn"}
                                sx={{display: showError ? 'flex' : 'none', marginBottom: 2}}
                            />
                        <Button type={'submit'} color="secondary" className="circular-btn" size="large" >
                            Registrar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                        <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`} passHref>
                            <Link underline="always" component={'span'}>
                                ¿Ya tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
      </AuthLayout>
    )
  }
  
  export default RegisterPage;