import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from '../../../components/elements/Image';
import Button from '../../../components/elements/Button'

const sectionStyle = {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center",
};

const WalletDetails = (props) => {
    const { address, image } = props

    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
      };

    const HoverDetails = () => (
        <Stack direction="row" spacing={2}>
            <Button className="button-wallet">EDIT</Button>
            <Button className="button-wallet">SELECT</Button>
        </Stack>
    )
    return (
        <Stack onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} direction="row" spacing={2} sx={{mb: 2}}>
            <Image className="wallet-image" src={image} width="50" />
            <Box style={{marginTop: "-10px"}}>
                <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                    WALLET
                </Typography>
                <Typography className="card-text" variant="h6">
                    {address}
                </Typography>
            </Box>
            {isHovering && <HoverDetails/> }
        </Stack> 
    )
}

export default WalletDetails