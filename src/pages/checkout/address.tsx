import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Button, FormControl, Grid, Box, MenuItem, TextField, Typography } from "@mui/material";
import { validations } from "@/utils";
import { countries } from "@/utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context";

type FormData = {
    firstName: string;
    lastName: string;
    email:string
    address: string;
    address2?: string;
    zip: string;
    departament: string;
    city: string,
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
       firstName: Cookies.get('firstName') || '',
       lastName: Cookies.get('lastName') || '',
       email: Cookies.get('email') || '',
       address: Cookies.get('address') || '',
       address2: Cookies.get('address2') || '',
       zip: Cookies.get('zip') || '',
       departament: Cookies.get('departament') || '',
       city: Cookies.get('city') || '',
       country: 'URY',
       phone: Cookies.get('phone') || '', 
    }
}

const AddressPage: NextPage = () => {

    const router = useRouter();
    const {updateAddress} = useContext(CartContext);
    const [countryValueDefault, setCountryDefault] = useState('URY');

    const {register, handleSubmit, resetField, setValue, getValues, formState: {errors}} = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    useEffect(() => {
        console.log(Cookies.get("country"))
        resetField("country")
        setValue("country", Cookies.get("country") || 'BOL');
    }, [])
 

    
    const onSubmitAddress = async (formData: FormData) => {
        updateAddress(formData)
        router.push("/checkout/summary");
    }

    return (
      <ShopLayout title={"Dirección - Checkout"} pageDescription={"Dirección de envío"}>
        <form onSubmit={handleSubmit(onSubmitAddress)}>
        <Typography variant='h1' component='h1'>Dirección</Typography>
        <Grid container spacing={2} sx={{mt: 2}}> 
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Nombre" 
                    variant="filled" 
                    fullWidth
                    {...register('firstName', {
                            required: 'Este campo es requerido',
                            minLength: { value: 3, message: 'Minimo 3 caracteres'}
                        })
                    }
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Apellido" 
                    variant="filled" 
                    fullWidth
                    {...register('lastName', {
                            required: 'Este campo es requerido',
                            minLength: { value: 3, message: 'Minimo 3 caracteres'}
                        })
                    }
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type="email" 
                    label="Correo electrónico" 
                    variant="filled" 
                    fullWidth
                    {...register('email',{
                        required: 'Este campo es requerido',
                        validate: validations.isEmail
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Telefono" 
                    variant="filled"
                    fullWidth
                    {...register('phone',{
                        required: 'Este campo es requerido',
                        minLength: { value: 6, message: 'Minimo 6 caracteres'},
                        maxLength: { value: 10, message: 'Maximo 10 caracteres'}
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Dirección" 
                    variant="filled" 
                    fullWidth
                    {...register('address',{
                        required: 'Este campo es requerido',
                        minLength: { value: 10, message: 'Minimo 10 caracteres'},
                        maxLength: { value: 256, message: 'Maximo 256 caracteres'}
                    })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Dirección 2 (Opcional)"
                    variant="filled" 
                    fullWidth
                    {...register('address2',{
                        maxLength: { value: 256, message: 'Maximo 256 caracteres'}
                    })}
                    error={!!errors.address2}
                    helperText={errors.address2?.message}
                />
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField 
                    type="number"
                    label="Codigo postal"
                    variant="filled" 
                    fullWidth
                    {...register('zip',{
                        required: 'Este campo es requerido',
                        minLength: { value: 1, message: 'Minimo 1 caracteres'},
                        maxLength: { value: 5, message: 'Maximo 5 caracteres'}
                    })}
                    error={!!errors.zip}
                    helperText={errors.zip?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Ciudad"
                    variant="filled"
                    fullWidth
                    {...register('city',{
                        required: 'Este campo es requerido',
                        minLength: { value: 1, message: 'Minimo 1 caracteres'},
                        maxLength: { value: 30, message: 'Maximo 30 caracteres'}
                    })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <TextField
                        select
                        defaultValue={'URY'}
                        variant="filled"
                        label="País"
                        {...register('country',{
                            required: 'Este campo es requerido',
                        })}
                        error={!!errors.country}
                        helperText={errors.phone?.message}
                    >
                        {
                            countries.map(country =>(
                                <MenuItem
                                    key={country.code} 
                                    value={country.code}
                                >
                                    {country.name}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Departamento" 
                    variant="filled" 
                    fullWidth
                    {...register('departament',{
                        required: 'Este campo es requerido',
                        minLength: { value: 1, message: 'Minimo 1 caracteres'},
                        maxLength: { value: 30, message: 'Maximo 30 caracteres'}
                    })}
                    error={!!errors.departament}
                    helperText={errors.departament?.message}
                />
            </Grid>
        </Grid>
        <Box sx={{mt: 5}} display={'flex'} justifyContent={'center'}>
            <Button type="submit" color="secondary" className="circular-btn" size="large">
                Realizar pedido
            </Button>
        </Box>
        </form>
      </ShopLayout>
    )
  }
/*
  export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {req} = ctx;
    const {token = ''} = req.Cookiess;
    let userId = '';
    let isValidToken = false;
    try {
        userId = await jwt.isValidToken(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }
    if(!isValidToken){
        return{
            redirect:{
                destination:'/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }
    return{
        props:{
        }
    }
  }
  */
  export default AddressPage;