import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
    currentValue: number;
    maxValue: number;
    
    updatedQuantity: (newValue: number) => void;
}

export const ItemCounter = (props: Props) =>{

    const {currentValue, updatedQuantity, maxValue} = props;

    const addCounter = () =>{
        if(currentValue >= maxValue)
            return;
        updatedQuantity(currentValue + 1)
    }
    const removeCounter = () =>{
        if(currentValue === 1)
            return;
        updatedQuantity(currentValue - 1)
    }

    return(
        <Box display='flex' alignItems='center'>
            <IconButton
                onClick={() => removeCounter()}
                disabled={currentValue <= 1}
            >
                <RemoveCircleOutline/>
            </IconButton>
            <Typography sx={{width:40, textAlign:'center'}}>{currentValue}</Typography>
            <IconButton
                onClick={() => addCounter()}
                disabled={currentValue >= maxValue}
            >
                <AddCircleOutline/>
            </IconButton>
        </Box>
    )
}