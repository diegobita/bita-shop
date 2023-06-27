import { NextPage } from "next";
import { ShopLayout } from "@/components/layouts";
import { Button, FormControl, Grid, Box, MenuItem, Select, TextField, Typography } from "@mui/material";

const AddressPage: NextPage = () => {
    return (
      <ShopLayout title={"Dirección - Checkout"} pageDescription={"Dirección de envío"}>
        <Typography variant='h1' component='h1'>Dirección</Typography>
        <Grid container spacing={2} sx={{mt: 2}}> 
            <Grid item xs={12} sm={6}>
                <TextField label="Nombre" variant="filled" fullWidth></TextField>
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField label="Apellido" variant="filled" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Correo electrónico" variant="filled" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Telefono" variant="filled" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Dirección" variant="filled" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Dirección 2" variant="filled" fullWidth></TextField>
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField label="Codigo postal" variant="filled" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Ciudad" variant="filled" fullWidth></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <Select
                        variant="filled"
                        label="País"
                        value={1}
                    >
                        <MenuItem value={1}>Uruguay</MenuItem>
                        <MenuItem value={2}>Argentina</MenuItem>
                        <MenuItem value={3}>Brasil</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField label="Departamento" variant="filled" fullWidth></TextField>
            </Grid>
        </Grid>
        <Box sx={{mt: 5}} display={'flex'} justifyContent={'center'}>
            <Button color="secondary" className="circular-btn" size="large">
                Realizar pedido
            </Button>
        </Box>
  
      </ShopLayout>
    )
  }
  
  export default AddressPage;