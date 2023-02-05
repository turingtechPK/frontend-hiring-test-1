import { useState } from 'react';
import TuringNav from './components/Navbar/TuringNav'
import TuringTable from './components/Table/TuringTable';
import Data from './components/Table/Data';
import Login from './components/Auth/Login'
import Home from './components/Home/Home';

function App() {

  const [accesskey, setaccesskey] = useState("")

  return (
    <div >
      {/* { accesskey == ?
          (<Login  accesskey={accesskey} setaccesskey={setaccesskey}/>):
          <TuringNav/>
          <TuringTable/>
          <Data/>
      } */}

      <TuringNav />
      <Home />

    </div>
  );
}

export default App;
