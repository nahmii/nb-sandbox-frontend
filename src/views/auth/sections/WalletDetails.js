import React, { useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Image from '../../../components/elements/Image'
import Button from '../../../components/elements/Button'
import { shortenAddress } from '../../../utils/address'
import RenameAddress from '../elements/RenameAddress'
import { deleteItemByAddress, retrieveItem } from '../../../utils/localStorage'
import { setGlobalState } from '../../../state'

const WalletDetails = (props) => {
    const { address, image, addressName } = props

    // handle modal
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [walletName, setWalletName] = useState('')
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const handleRename = (address) => {
        setOpen(true)
    }

    const handleRemove = (address) => {
        deleteItemByAddress('wallets', address)
        setGlobalState('wallets', retrieveItem('wallets'))
    }

    const HoverDetails = ({ address }) => (
        <Stack direction='row' spacing={2}>
            <Button className='button-wallet' onClick={handleRename}>RENAME</Button>
            <Button className='button-wallet' onClick={() => handleRemove(address)}>REMOVE</Button>
        </Stack>
    )
    return (
        <div>
            { open ? (
                <RenameAddress open={open} addressName={addressName} onClose={handleClose} />
            ) : null }
            <Stack className='wallet-details' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} direction='row' spacing={2}>
                <Image className='wallet-image' src={image} />
                <Box style={{ marginTop: '-10px' }}>
                    <Typography variant='p' color='text.secondary' sx={{ fontSize: 12 }}>
                        {addressName}
                    </Typography>
                    <Typography className='card-text' variant='h6'>
                        {shortenAddress(address)}
                    </Typography>
                </Box>
                {isHovering ? 
                    (<span style={{float: 'right', position: 'absolute', right: 0}}><HoverDetails address={address} /></span>) :
                    null    
                }
            </Stack>
        </div>
    )
}

export default WalletDetails