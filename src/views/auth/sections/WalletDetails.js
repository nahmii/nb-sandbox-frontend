import React, { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Image from '../../../components/elements/Image'
import Button from '../../../components/elements/Button'
import { shortenAddress } from '../../../utils/address'

const WalletDetails = (props) => {
    const { address, image } = props

    const [isHovering, setIsHovering] = useState(false)
    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const handleRename = () => {
        alert("You clicked me! Rename")
    }

    const handleRemove = () => {
        alert("You clicked Remove")
    }

    const HoverDetails = () => (
        <Stack direction='row' spacing={2}>
            <Button className='button-wallet' onClick={handleRename}>RENAME</Button>
            <Button className='button-wallet' onClick={handleRemove}>REMOVE</Button>
        </Stack>
    )
    return (
        <Stack className="wallet-details" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} direction='row' spacing={2}>
            <Image className='wallet-image' src={image} />
            <Box style={{ marginTop: '-10px' }}>
                <Typography variant='p' color='text.secondary' sx={{ fontSize: 12 }}>
                    DNB
                </Typography>
                <Typography className='card-text' variant='h6'>
                    {shortenAddress(address)}
                </Typography>
            </Box>
            {isHovering ? 
                (<span style={{float: "right", position: "absolute", right: 0}}><HoverDetails /></span>) :
                null    
            }
        </Stack>
    )
}

export default WalletDetails