import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserName } from './redux/slice';
import './WidgetLayout.css';
import { Box, TextField, Button } from '@mui/material';
import './UserNameWidget.css';

interface UserNameWidgetProps {
    userName: string,
}

const UserNameWidget: React.FC<UserNameWidgetProps> = ({ userName }) => {
    const [name, setName] = useState(userName);
    const dispatch = useDispatch();

    const handleNameSubmit = () => {
        dispatch(setUserName(name));
    };

    return userName ? 
    (
        <Box className='game-footer' sx={{ width: "100%" }}>{userName}</Box>
    )
    :
    (
        <Box className="container">
            <TextField
            label="Enter Username"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            inputProps={{ readOnly: false }}
            />
            <Button disabled={!name.trim()} onClick={handleNameSubmit}>Confirm</Button>
        </Box>
    );
}

export default UserNameWidget;