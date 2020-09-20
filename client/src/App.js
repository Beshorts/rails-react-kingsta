import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

 useEffect(() => {
  axios.get('/api/logged_in', {withCredentials: true})
    .then(response => {
      console.log(response);

    })
      .catch(err => console.log(err))
}, []);

  return (
    <div className="App">
      <h1>React connected</h1>
    </div>
  );
}

export default App;
