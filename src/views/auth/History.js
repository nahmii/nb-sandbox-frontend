import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, Snackbar, Menu, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReplayIcon from '@mui/icons-material/Replay'
import LayoutDefault from '../../layouts/LayoutDefault';

const cardStyle = {
    boxShadow: 0,
    borderRadius: 0,
}

const History = () => {
    //Snackbar alert parameter
    const [openAlert, setOpenAlert] = useState(false)
    const [success, setSuccess] = useState(false)
    const [msg, setMsg] = useState('')

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAlert = (_, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenAlert(false)
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
    })

    return (
        <LayoutDefault>
            <Box className='container' sx={{ mt: 12, mb: 10 }}>
                <Card sx={cardStyle}>
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={6000}
                        onClose={handleCloseAlert}
                    >
                        <Alert
                            onClose={handleCloseAlert}
                            severity={success ? 'success' : 'error'}
                            sx={{ width: '100%' }}
                        >
                            {msg}
                        </Alert>
                    </Snackbar>
                    <CardContent>
                        <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                            ALL TRANSACTIONS
                            <span style={{ position: 'absolute' }} 
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <KeyboardArrowDownIcon />
                            </span>

                            <span style={{ float: 'right' }}><span style={{ position: 'absolute', marginLeft: '-30px' }}><ReplayIcon /></span>Update</span>
                        </Typography>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>ALL TRANSACTIONS</MenuItem>
                            <MenuItem onClick={handleClose}>SELECT WALLET</MenuItem>
                        </Menu>

                        <Box
                            component='form'
                            sx={{
                                '& .MuiTextField-root': { width: '100%' },
                            }}
                            noValidate
                            autoComplete='off'
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                        >
                        
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </LayoutDefault>
    )
}

export default History