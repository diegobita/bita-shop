import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, CircularProgress, IconButton, Typography } from "@mui/material"

interface Props {
}

export const ScreenLoading = (props: Props) =>{
    return(
        <Box 
            display='flex'
            flexDirection='column'
            justifyContent='center' 
            alignItems='center'
            height='calc(100vh - 200px)'
        >
           <Typography sx={{mb: 3}} variant="h2" fontWeight={200} fontSize={30}>Cargando...</Typography>
           <CircularProgress thickness={2}/>
        </Box>
    )
}