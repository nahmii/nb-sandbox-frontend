import React, { useState } from 'react';
import { Card, Typography, Box, CardContent, Stack } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Button from '../../../components/elements/Button';
import Image from '../../../components/elements/Image';
import keystore from '../../../assets/images/keystore.png'
import metamask from '../../../assets/images/metamask.png'
import KeystoreWallet from './KeystoreWallet';

const NewWallet = (props) => {
    const { onClose, open } = props
    const [keystoreWallet, showKeystoreWallet] = useState(false)

    const handlekeystore = () => {
        showKeystoreWallet(true)
    }

    return (
        <div>
            {
                keystoreWallet ? (
                    <KeystoreWallet/>
                ) : (
                    <Card>
                        <Box sx={{ mt: 2, p: 2, borderBottom: "1px solid #CBE5EE"}}>
                            <Typography id='modal-modal-title' variant='p' sx={{ pl: 2 }}>
                                CONNECT NEW WALLET <span style={{ float: 'right' }}><HighlightOffIcon onClick={onClose} /></span>
                            </Typography>
                        </Box>
                        
                        <CardContent sx={{}}>
                            <Box>
                                <Stack spacing={2}>
                                    <Button variant="contained" onClick={handlekeystore} className="keystore-button">
                                        VIA KEYSTORE FILE <span style={{position: "absolute", right: 40}}> <Image src={keystore} /></span>
                                    </Button>
                                    <Button disabled={true} className='keystore-button'>
                                        CONNECT TO METAMASK <span style={{position: "absolute", right: 40}}> <Image src={metamask} /></span>
                                    </Button>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                )
            }
        </div>
        
    )
}

export default NewWallet