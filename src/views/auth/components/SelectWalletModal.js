import * as React from 'react';
import { Box, Typography, Modal, Fade, Backdrop } from '@mui/material';
import WalletList from '../sections/WalletList';
import CreateWalletModal from './CreateWalletModal';

const style = {
  bgcolor: 'background.paper',
  p: 2
};

export default function SelectWalletModal(props) {

  const { onClose, open } = props

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
            <WalletList/>
          </Box>
      </Modal>
    </div>
  );
}
