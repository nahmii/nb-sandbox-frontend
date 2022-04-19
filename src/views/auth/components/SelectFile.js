import React, { useState, useRef } from 'react'
import { Card, CardContent, CardActions, Typography, Grid, Box, TextField } from '@mui/material'
import Button from '../../../components/elements/Button'

const SelectFile = () => {
    //creating the useref references for the uploads
    const keystoreFileRef = useRef(null)

    const [keystoreFile, setKeystoreFile] = useState(null)
    const [keystoreFileName, setKeystoreFileName] = useState("")
    const [isFileUploaded, setIsFileUploaded] = useState(false)

    const handleKeystoreFileChange = (event) => {
        const fileUploaded = event.target.files[0]
        setKeystoreFile(fileUploaded)
        setKeystoreFileName(event.target.files[0].name)
        setIsFileUploaded(true)
        // alert(event.target.files[0].name)

    }

    const handleKeystoreFileClick = (event) => {
        keystoreFileRef.current.click()
    }

    return (
        <Box>
            <CardContent sx={{}}>
                <Typography id='modal-modal-title' variant='p' sx={{ fontWeight: 'bold', fontSize: '15px', color: "#153443" }}>
                    SELECT YOUR KEYSTORE FILE</Typography><br />
                <Typography variant='p' sx={{ fontWeight: 'bold', fontSize: '13px', color: "#153443" }}>
                    Select keystore file that unlocks your wallet </Typography>
            </CardContent>
            <CardActions sx={{p: 2}}>
                <Grid container spacing={3}>
                    <Grid item xs={4} sm={4} md={4}>
                        <Button sx={{ width: '100%' }} className='keystore-button' wide>BACK</Button>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <Button sx={{ width: '100%' }} onClick={handleKeystoreFileClick} className='button button-primary button-wide-mobile' wide>SELECT FILE</Button>
                        <input
                            type="file"
                            ref={keystoreFileRef}
                            onChange={handleKeystoreFileChange}
                            style={{ display: 'none' }}
                        />
                    </Grid>
                </Grid>
            </CardActions>
        </Box>
    )
}

export default SelectFile