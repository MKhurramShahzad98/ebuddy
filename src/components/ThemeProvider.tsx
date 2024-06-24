"use client";

import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '../app/theme';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
