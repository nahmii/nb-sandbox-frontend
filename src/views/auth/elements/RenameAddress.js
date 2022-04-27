import React, { useState } from 'react';
import { Box, Typography, Modal, CardActions, Backdrop, Card, CardContent, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import WalletFace from '../../../assets/images/Wallet-Face.png'
import Button from '../../../components/elements/Button'

const RenameAddress = (props) => {
    const { onClose, open } = props
    const [addressName, setAddressName] = useState('')

    const handleSaveAddress = () => {
        return
    }

    const handleChange = (event) => {
        setAddressName(event.target.value)
    }

    return (
        <Modal
                open={open}
                onClose={onClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box className='modal-box'>
                    <Card>
                        <Box sx={{ mt: 2, p: 2, borderBottom: "1px solid #CBE5EE"}}>
                            <Typography id='modal-modal-title' variant='p' sx={{ pl: 2 }}>
                                {addressName} <span style={{ float: 'right', cursor: "pointer" }}><HighlightOffIcon onClick={onClose} /></span>
                            </Typography>
                        </Box>
                        
                        <CardContent sx={{}}>
                            <Box
                                component='form'
                                sx={{
                                    '& .MuiTextField-root': { width: '100%' },
                                }}
                                noValidate
                                autoComplete='off'
                                style={{ marginTop: '20px', marginBottom: '20px' }}
                            >
                                <TextField
                                    label='Address Name'
                                    id='outlined-start-adornment'
                                    sx={{ width: '100%' }}
                                    value={addressName}
                                    onChange={handleChange}
                                />
                            </Box>
                        </CardContent>
                        <CardActions sx={{p: 2}}>
                            <Button sx={{ width: '100%' }} onClick={handleSaveAddress} className='button button-primary button-wide-mobile' wide>SAVE ADDRESS NAME</Button>
                        </CardActions>
                    </Card>
                    
                    {/* {selectWallet ? handleSelectWalletModal() : <CreateWalletModal />} */}
                </Box>
            </Modal>
    )
}

export default RenameAddress