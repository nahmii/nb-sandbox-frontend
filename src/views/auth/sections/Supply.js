import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { getTokenSupply } from '../../../hooks/useContract'
import { commify, formatUnits } from 'ethers/lib/utils'

const cardStyle = {
    boxShadow: 0, 
    borderRadius: 0,
}

const Supply = () => {
    const [totalSupply, setTotalSupply] = useState('0')

    useEffect(() => {
        getTokenSupply()
            .then((supply) => {
                setTotalSupply(commify(formatUnits(supply, 4)))
            })
    }, [])

    return (
        <Card sx={cardStyle}>
            <CardContent>
                <Typography variant="p" color="text.secondary" sx={{ fontSize: 10 }}>
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