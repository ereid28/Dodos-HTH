import React, { useState, useEffect, useCallback } from 'react';
import './WidgetLayout.css';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';