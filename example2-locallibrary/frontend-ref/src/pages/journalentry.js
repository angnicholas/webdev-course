import React, { Component }  from 'react';
import { useLocation } from 'react-router-dom';

import { getFromApi } from '../services/requests';

import { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";


const JournalEntry = (props) => {
  const location = useLocation();
  const state = location.state;
  const title = state.title;
  const { id } = state.id;
  
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const resDataToContent = (resData) => {
      return resData;
    };
    console.log(state.id);
    getFromApi(`journalentry/${state.id}/`, setContent, setLoading, resDataToContent);
  }, []);


  return (
    <div>
      <h1>{content['title']}</h1>
      <p>{content['text']}</p>
    </div>
  );
}

export default JournalEntry;
