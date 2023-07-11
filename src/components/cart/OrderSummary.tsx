import { useContext } from "react"
import { CartContext } from "@/context"
import { currency } from '@/utils';
import { Grid, Typography } from "@mui/material"

interface Props {
     orderValues?: {
          numberOfItems: number;
          subtotal: number;
          tax: number;
          total: number;
     }
}

export const OrderSummary = (props: Props) =>{
     const {orderValues} = props;
     const {numberOfItems, subtotal, tax, total} = useContext(CartContext);

     const summaryValues = orderValues ? orderValues : {numberOfItems, subtotal, tax, total};

    return(
        <Grid container>
           <Grid item xs={6}>
                <Typography>Nº Productos</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'items' : 'item'}</Typography>
           </Grid>
           <Grid item xs={6}>
                <Typography>Subtotal</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>{currency.format(summaryValues.subtotal)}</Typography>
           </Grid>
           <Grid item xs={6}>
                <Typography>IVA ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100}%)</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography>{currency.format(summaryValues.tax)}</Typography>
           </Grid>
           <Grid item xs={6} sx={{mt: 2}}>
                <Typography variant="subtitle1">Total:</Typography>
           </Grid>
           <Grid item xs={6} display={'flex'} justifyContent={'end'}>
                <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
           </Grid>
        </Grid>
    )
}