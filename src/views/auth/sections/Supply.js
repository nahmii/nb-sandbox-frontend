import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
    height: '110px'
}

const Supply = () => {
    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant="p" color="text.secondary" sx={{ fontSize: 12 }}>
                    SUPPLY
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 22 }} className="card-text">
                    1,000,000,000.00 NOK
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Supply