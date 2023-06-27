import { ISize } from "@/interfaces";
import { Box, Button } from "@mui/material";

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector = (props: Props) =>{
    const {selectedSize, sizes} = props;
    return(
       <Box>
        {
            sizes.map(size => (
                <Button
                    key={size}
                    size="small"
                    color={selectedSize === size ? 'primary' : 'info'}
                >
                    {size}
                </Button>
            ))
        }
       </Box>
    )
}