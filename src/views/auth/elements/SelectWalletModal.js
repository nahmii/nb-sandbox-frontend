import React, { useState } from 'react'
import { Box, Typography, Modal, CardActions, Backdrop, Card, CardContent } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import WalletFace from '../../../assets/images/Wallet-Face.png'
import Button from '../../../components/elements/Button'

import PerfectScrollbar from 'react-perfect-scrollbar'

import WalletDetails from '../sections/WalletDetails'
import NewWallet from './NewWallet'

// TODO: Read address and cipher data (keystore file) from local storage.
const data = [
    { addressName: 'Norges Bank', address: '0x807fe5f6216240de3705f29fd80470b0e7b1df79' },
    { addressName: 'DEX Bank', address: '0x807fe5f6216240de3705f29fd80470b0e7b1df78' },
    { addressName: 'Test Bank', address: '0x807fe5f6216240de3705f29fd80470b0e7b1df77' },
    { addressName: 'Green Bank', address: '0x807fe5f6216240de3705f29fd80470b0e7b1df76' },
]

export default function SelectWalletModal(props) {
    const [addresses, setAddresses] = useState([
        {
            address: '',
            image: '',
            name: ''
        }
    ])
    const [selectWallet, showSelectWallet] = useState(true)
    const [, showImportWallet] = useState(false)
    const { onClose, open } = props

    const handleNewWallet = () => {
        showSelectWallet(false)
    }


    return (
        <div>
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
                    {
                        selectWallet ? (
                            <Card>
                                <Box sx={{ mt: 2, p: 2, borderBottom: "1px solid #CBE5EE"}}>
                                    <Typography id='modal-modal-title' variant='p' sx={{ pl: 2 }}>
                                        WALLETS <span style={{ float: 'right', cursor: "pointer" }}><HighlightOffIcon onClick={onClose} /></span>
                                    </Typography>
                                </Box>
                                
                                <CardContent sx={{}}>
                                    <PerfectScrollbar style={{ height: '300px' }}>
                                        {data.map((d, index) => (
                                            <WalletDetails key={index} addressList={data} address={d.address} addressName={d.addressName} image={`https://avatars.dicebear.com/api/jdenticon/${d.address}.svg?r=50`} />
                                        ))}
                                    </PerfectScrollbar>
                                </CardContent>
                                <CardActions sx={{p: 2}}>
                                    <Button sx={{ width: '100%' }} onClick={handleNewWallet} className='button button-primary button-wide-mobile' wide>CONNECT NEW WALLET</Button>
                                </CardActions>
                            </Card>
                        ) : (
                            <NewWallet onClose={onClose} open={open} />
                        )
                    }
                    
                    {/* {selectWallet ? handleSelectWalletModal() : <CreateWalletModal />} */}
                </Box>
            </Modal>
        </div>
    )
}
