import axios from 'axios';
import './App.css';
import List from './List';
import React, { useState } from "react";
import { render } from 'react-dom';

let listArr = []
let entries
function App() {
  const [lists, setList] = useState([]);
  let token = process.env.REACT_APP_SECRET_KEY


  //This function is called when the user clicks the Start button and it will call our express API endpoint to get the data
  const getData = () => {
    axios.get("http://localhost:8585/getData", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(async (res) => {
        listArr = res.data.nodes
        for (let i = 0; i < listArr.length; i++) {
          delete listArr[i].notes
          lists.push(listArr[i])
        }
        entries = listArr
      })
      .then(() => {
        // After the data has been recieved, we will call the function to render the data in a table using the List component
        const datalist = document.getElementById('datalist')
        render(<List obj={lists} />, datalist);
      })
      .catch(err => {
        console.log(err);
      });

  }

  return (
    <div className="App" onLoad={getData}>
      <button className='btn btn-secondary' onClick={getData}>Start</button>
      <div id="datalist"></div>
    </div>
  );
}

export default App;
