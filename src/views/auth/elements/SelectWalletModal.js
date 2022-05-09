import React, { useEffect, useState } from 'react'
import { Box, Typography, Modal, CardActions, Backdrop, Card, CardContent } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Button from '../../../components/elements/Button'
import PerfectScrollbar from 'react-perfect-scrollbar'
import WalletDetails from '../sections/WalletDetails'
import NewWallet from './NewWallet'
import { retrieveItem } from '../../../utils/localStorage'
import { setGlobalState, useGlobalState } from '../../../state'

export default function SelectWalletModal(props) {
    const [wallets] = useGlobalState('wallets')
    const [selectWallet, showSelectWallet] = useState(true)
    const [, showImportWallet] = useState(false)
    const { onClose, open } = props

    const handleNewWallet = () => {
        showSelectWallet(false)
    }

    useEffect(() => {
        const _wallets = retrieveItem('wallets')
        setGlobalState('wallets', _wallets ? _wallets : [])
    }, [])

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
                                <Box sx={{ mt: 2, p: 2, borderBottom: '1px solid #CBE5EE' }}>
                                    <Typography id='modal-modal-title' variant='p' sx={{ pl: 2 }}>
                                        WALLETS <span style={{ float: 'right', cursor: 'pointer' }}><HighlightOffIcon onClick={onClose} /></span>
                                    </Typography>
                                </Box>

                                <CardContent sx={{}}>
                                    <PerfectScrollbar style={{ height: '300px' }}>
                                        {wallets.map((d, index) => (
                                            <WalletDetails key={index} address={d.address} image={`https://avatars.dicebear.com/api/jdenticon/${d.address}.svg?r=50`} onWalletPickerClose={onClose} />
                                        ))}
                                    </PerfectScrollbar>
                                </CardContent>
                                <CardActions sx={{ p: 2 }}>
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
