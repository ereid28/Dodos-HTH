import React, { useState, useEffect } from 'react';
import '../WidgetLayout.css';
import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import PetsIcon from '@mui/icons-material/Pets';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FeedIcon from '@mui/icons-material/Feed';
import GrassIcon from '@mui/icons-material/Grass';

const ResourceWidget = () => {
    const ecoScore = useSelector((state: RootState) => state.layout.ecoScore);
    const iconSize = 75;
    const [iconColor, setIconColor] = useState('#00ff00');

    useEffect(() => {
        if (ecoScore < 20) setIconColor('#ff0000'); // Red
        else if (ecoScore < 40) setIconColor('#ff4500'); // Orange-Red
        else if (ecoScore < 60) setIconColor('#ffa500'); // Orange
        else if (ecoScore < 80) setIconColor('#9acd32'); // Yellow-Green
        else setIconColor('#00ff00'); // Green
    }, [ecoScore]);


    return (
        <Paper 
            elevation={4} 
            sx={{ 
                p: 2, 
                width: '500px', 
                height: '200px', 
                background: 'linear-gradient(135deg, #a0c4ff, #cce1ff)', 
                borderRadius: '12px',
                opacity: '0.9',
            }}
        >
            <Typography 
                variant="h5" 
                color="#1565c0" 
                fontWeight="bold" 
                textAlign="center"
                mb={7}
            >
                External Resources
            </Typography>
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                gap={4}
            >
                <a href="https://www.worldwildlife.org/" target="_blank" rel="noopener noreferrer">
                    <PetsIcon sx={{ fontSize: iconSize, color: iconColor, cursor: 'pointer' }} />
                </a>
                <a href="https://eartheasy.com/" target="_blank" rel="noopener noreferrer">
                    <GrassIcon sx={{ fontSize: iconSize, color: iconColor }} />
                </a>
                <a href="https://www.epa.gov/watersense" target="_blank" rel="noopener noreferrer">
                    <WaterDropIcon sx={{ fontSize: iconSize, color: iconColor }} />
                </a>
                <a href="https://www.recyclecoach.com/blog" target="_blank" rel="noopener noreferrer">
                    <RecyclingIcon sx={{ fontSize: iconSize, color: iconColor }} />
                </a>
                <a href="https://grist.org/" target="_blank" rel="noopener noreferrer">
                    <FeedIcon sx={{ fontSize: iconSize, color: iconColor }} />
                </a>
            </Box>
        </Paper>
    );
}

export default ResourceWidget;