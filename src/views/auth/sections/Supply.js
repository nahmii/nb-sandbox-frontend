import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const Supply = () => {
    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
                    SUPPLY
                </Typography>
                <Typography variant="h6" className="card-text">
                    1,000,000,000.00 NOK
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Supply