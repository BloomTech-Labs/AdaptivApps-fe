import React, { useState, useEffect } from 'react';
import axios from 'axios';
import chif from './photos/chif.chif';



const Home = () => {
  // Set message received from server.
  const [response, setResponse] = useState("");

    useEffect(() => {
        window.chifPlayer.streamFiles();

        // GET Request to AdaptivApps API to retrieve data and setResponse with a message
        axios.get('https://angel-city-sports.herokuapp.com/')
        .then(res =>  {
          const message = res.data.api;
          console.log(message);
          setResponse(message);
        })
        .catch(err => {
          console.log('Error retrieving data from API.', err);
        });
        
    }, []);
    return (
        <div className= "chifContain">
          <h1>{response}</h1>
          <chear className="chifOne" src={chif}></chear>
          <chear className="chifOne" src={require('./photos/chif2.chif')}></chear>
          <chear className="chifOne" src={require('./photos/chif3.chif')}></chear>
        </div>
    )
}

export default Home