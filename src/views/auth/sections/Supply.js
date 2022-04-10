import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { useGlobalState } from '../../../state'

const cardStyle = {
    boxShadow: 0,
    borderRadius: 0,
    height: '110px'
}

const Supply = () => {
    const [totalSupply] = useGlobalState('totalSupply')

    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant='p' color='text.secondary' sx={{ fontSize: 12 }}>
                    SUPPLY
                </Typography>
                <Typography variant='h6' className='card-text'>
                    {totalSupply} NOK
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Supply