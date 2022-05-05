import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Image from '../../../components/elements/Image'
import Button from '../../../components/elements/Button'
import { shortenAddress } from '../../../utils/address'
import RenameAddress from '../elements/RenameAddress'
import { deleteItemByAddress, retrieveItem } from '../../../utils/localStorage'
import { setGlobalState, useGlobalState } from '../../../state'
import PasswordPrompt from '../elements/PasswordPrompt'

const WalletDetails = (props) => {
    const { address, image } = props

    const [addressBook] = useGlobalState('addressBook')

    // handle modal
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [unlockWallet, setUnlockWallet] = useState(false)
    const handlePasswordPromptClose = () => setUnlockWallet(false)

    const [addressName, setAddressName] = useState('')
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        setIsHovering(true)
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    const handleRename = () => {
        setOpen(true)
    }

    const handleRemove = (address) => {
        deleteItemByAddress('wallets', address)
        setGlobalState('wallets', retrieveItem('wallets'))
    }

    const handlePasswordPrompt = () => {
        setUnlockWallet(true)
    }

    const HoverDetails = ({ address }) => (
        <Stack direction='row' spacing={2}>
            <Button className='button-wallet' onClick={handleRename}>RENAME</Button>
            <Button className='button-wallet' onClick={() => handleRemove(address)}>REMOVE</Button>
        </Stack>
    )

    useEffect(() => {
        const addressEntry = addressBook.find((ab) => {
            return ab.address.toLowerCase() === address.toLowerCase()
        })

        if (addressEntry && addressEntry?.addressName) {
            setAddressName(addressEntry.addressName)
        } else {
            setAddressName('noname')
        }
    }, [address, addressName, addressBook])

    return (
        <div>
            {open ? (
                <RenameAddress address={address} name={addressName} open={open} onClose={handleClose} />
            ) : null}
            {unlockWallet ? (
                <PasswordPrompt address={address} name={addressName} open={unlockWallet} onClose={handlePasswordPromptClose} />
            ): null}
            <Stack style={{ justifyContent: 'space-between' }} className='wallet-details' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} direction='row' spacing={2}>
                <Stack style={{ cursor: 'pointer' }} direction='row' spacing={2} onClick={handlePasswordPrompt}>
                    <Image className='wallet-image' src={image} />
                    <Box style={{ marginTop: '-10px' }}>
                        <Typography variant='p' color='text.secondary' sx={{ fontSize: 12 }}>
                            {addressName}
                        </Typography>
                        <Typography className='card-text' variant='h6'>
                            {shortenAddress(address)}
                        </Typography>
                    </Box>
                </Stack>
                {isHovering ?
                    (<span><HoverDetails address={address} /></span>) :
                    null
                }
            </Stack>
        </div>
    )
}

export default WalletDetails