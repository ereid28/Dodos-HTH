import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import {decrementEcoScore} from './redux/slice';
import Game from './Game';
import './WidgetLayout.css';
import QuestionWidget from './QuestionWidget';
import LeaderboardWidget from './LeaderboardWidget';
import EcoScoreWidget from './EcoScoreWidget';
import { Box, Paper, Typography, TextField, InputAdornment } from '@mui/material';
import { inputBaseClasses } from '@mui/material/InputBase';

interface UserNameWidgetProps {
    userName: string,
}

const UserNameWidget: React.FC<UserNameWidgetProps> = ({ userName }) => {
    const [name, setName] = useState(userName);

    return name ? 
    (
        <Typography>{name}</Typography>
    )
    :
    (
        <TextField
        // id="outlined-suffix-shrink"
        label="Enter Username"
        variant="outlined"
        disabled={false}
        onChange={(e) => setName(e.target.value)}
        inputProps={{ readOnly: false }}
        />
    );
}

export default UserNameWidget;