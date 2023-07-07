import logo from './logo.svg';
import React, { Component }  from 'react';
import './App.css';
import LoginPage from "./pages/login";
import PatientPage from "./pages/patientpage";
import JournalPage from "./pages/journaloverview";
import JournalEntry from "./pages/journalentry";
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
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="patients" element={<PatientPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="journalentry" element={<JournalEntry />} />
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
