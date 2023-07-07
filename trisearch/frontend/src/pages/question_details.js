import React, { Component }  from 'react';
import { useLocation } from 'react-router-dom';

import { getFromApi } from '../services/requests';

import { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";


const DetailPage = (props) => {
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
    getFromApi(`question/${state.id}/`, setContent, setLoading, resDataToContent);
  }, []);


  return (
    <div>
      <h1>{`${content['part']} ${content['year']} Sect${content['section']} ${content['number']}`}</h1>
      <p>{content['hint']}</p>
    </div>
  );
}

export default DetailPage;
