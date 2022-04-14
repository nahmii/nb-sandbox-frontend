import React, { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Image from '../../../components/elements/Image'
import Button from '../../../components/elements/Button'
import { shortenAddress } from '../../../utils/address'

const WalletDetails = (props) => {
    const { address, image } = props

    const [isHovering, setIsHovering] = useState(false)
    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const handleRename = () => {
        return
    }

    const handleRemove = () => {
        return
    }

    const HoverDetails = () => (
        <Stack direction='row' spacing={2}>
            <Button className='button-wallet' onClick={handleRename}>RENAME</Button>
            <Button className='button-wallet' onClick={handleRemove}>REMOVE</Button>
        </Stack>
    )
    return (
        <Stack className="wallet-details" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} direction='row' spacing={2}>
            <Image className='wallet-image' src={image} />
            <Box style={{ marginTop: '-10px' }}>
                <Typography variant='p' color='text.secondary' sx={{ fontSize: 10 }}>
                    DNB
                </Typography>
                <Typography className='card-text' variant='h6'>
                    {shortenAddress(address)}
                </Typography>
            </Box>
            {isHovering && <span style={{float: "right"}}><HoverDetails /></span>}
        </Stack>
    )
}

export default WalletDetails