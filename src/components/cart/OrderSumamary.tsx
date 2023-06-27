import { Grid, Typography } from "@mui/material"

interface Props {
   
}

export const OrderSummary = (props: Props) =>{
    return(
        <Grid container>
           <Grid item xs={6}>
                <Typography>Nº Productos</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>3</Typography>
           </Grid>
           <Grid item xs={6}>
                <Typography>Subtotal</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>$162.20</Typography>
           </Grid>
           <Grid item xs={6}>
                <Typography>IVA</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>$12</Typography>
           </Grid>
           <Grid item xs={6} sx={{mt: 2}}>
                <Typography variant="subtitle1">Total:</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography variant="subtitle1">$174.20</Typography>
           </Grid>
        </Grid>
    )
}