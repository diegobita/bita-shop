import { CreditCardOffOutlined } from "@mui/icons-material"
import { Card, CardContent, Grid, Typography } from "@mui/material"

interface Props {
    value: string | number;
    nameLabel: string;
    icon: JSX.Element;
}

export const WrapperInfoDash = (props: Props) => {

    const {value, nameLabel, icon} = props;

    return(
        <Grid item xs={12} sm={4} md={3}>
            <Card  sx={{ display: 'flex' }}>
                <CardContent sx={{width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {icon}
                </CardContent>
                <CardContent sx={{flex:'1 0 auto', display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h3'>{value}</Typography>
                    <Typography variant='caption'>{nameLabel}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}