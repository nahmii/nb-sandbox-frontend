import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { getTokenSupply } from '../../../hooks/useContract'
import { commify, insertDecimalSeparator } from '../../../utils/format'

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
    height: '110px'
}

const Supply = () => {
    const [totalSupply, setTotalSupply] = useState('0')

    useEffect(() => {
        getTokenSupply()
            .then((supply) => {
                setTotalSupply(commify(insertDecimalSeparator(supply.toString(), 4)))
            })
    }, [])

    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant="p" color="text.secondary" sx={{ fontSize: 12 }}>
                    SUPPLY
                </Typography>
                <Typography variant="h6" className="card-text">
                    {totalSupply} NOK
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Supply