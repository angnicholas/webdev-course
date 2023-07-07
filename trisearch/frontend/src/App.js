import logo from './logo.svg';
import React, { Component }  from 'react';
import './App.css';
// import LoginPage from "./pages/login";
import PatientPage from "./pages/question_list";
import DetailPage from "./pages/question_details";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

function App() {
  return (
    <div>
    <AppShell/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientPage />} />
          <Route path="detail" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function AppShell() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          style={{ flexGrow: 1, textAlign: "left" }}
        >
          Diar.io Therapist Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
)}

export default App;
