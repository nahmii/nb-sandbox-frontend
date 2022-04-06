import React, {useState} from 'react';
import { Box, Typography, Modal, CardActions, Backdrop, Card, CardContent, Grid, } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Scrollbar from './Scrollbar';
import CreateWalletModal from './CreateWalletModal';
import WalletFace from '../../../assets/images/Wallet-Face.png'
import Button from '../../../components/elements/Button';

import WalletDetails from '../sections/WalletDetails';
import ImportWallet from '../sections/ImportWallet';

const style = {
  bgcolor: 'background.paper',
  p: 2
};

const cardStyle = {
  boxShadow: 0
}

const data = [
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
  { address: "tyuik678999999ewsks...", image: WalletFace },
]

export default function SelectWalletModal(props) {
  const [walletForm, showWalletForm] = useState(false)
  const [selectWallet, showSelectWallet] = useState(true)
  const [importWallet, showImportWallet] = useState(false)
  const { onClose, open } = props

  const handleCreateWallet = () => {
    showSelectWallet(false)
  }

  const handleImportWallet = () => {
    showImportWallet(true)
  }

  const handleSelectWalletModal = () => {
    return (
      <Card sx={cardStyle}>
        <CardContent>
            <Box>
                <Scrollbar style={{height: 300}}>
                    {data.map((d, index) => (
                        <WalletDetails key={index} address={d.address} image={d.image} />
                    ))}
                </Scrollbar> 
            </Box>
        </CardContent>
        <CardActions>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Button sx={{width: "100%"}} onClick={handleCreateWallet} className="button button-primary button-wide-mobile" wide>CREATE WALLET</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Button sx={{width: "100%"}} onClick={handleImportWallet} className="button button-primary button-wide-mobile" wide>IMPORT WALLET</Button>
                </Grid>
            </Grid>
        </CardActions>
      </Card>
    )
  }

  
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Box className="modal-box" sx={style}>
            <Typography id="modal-modal-title" variant="p" sx={{pl: 2}}>
              { selectWallet ? 'WALLETS' : "CREATE WALLET"} <span style={{float: "right"}}><HighlightOffIcon onClick={onClose}/></span>
            </Typography>
            { selectWallet ? handleSelectWalletModal() : <CreateWalletModal/> }
            {/* { importWallet ? <ImportWallet/> : null } */}
          </Box>
      </Modal>
    </div>
  );
}
