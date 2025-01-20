import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import unapec from '../../assets/img/unapec.png';
import apap from '../../assets/img/apap.jpg';
import Navbar from "./Navbar";
import NewPull from './NewPull';
import NewPush from './NewPush';
import Pull from './Pull';
import Push from './Push';
import { useState } from 'react';
import { NominaContext } from './context';
import { Link } from "react-router-dom";

function Hello() {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm-6 col-md-3'>
          <div className='card'>
            <img className="card-img-top" src={unapec}></img>
            <div className='card-body'>
              <Link to="/push" className='card-title text-center stretched-link'>Push</Link>
            </div>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='card'>
            <img className="card-img-top" src={apap}></img>
            <div className='card-body'>
              <Link to="/pull" className='card-title text-center stretched-link'>Pull</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [nomina, setNomina] = useState([]);
 
  return (
    <>
      <NominaContext.Provider value={{nomina, setNomina}}>
      <Navbar />
      <Routes>
        <Route path="/push" element={<Push />}/>
        <Route path="/push/new" element={<NewPush />} />
        <Route path="/pull" element={<Pull/>}/>
        <Route path="/pull/new" element={<NewPull />}/>
        <Route path="*" element={<Hello />} />
      </Routes>
      </NominaContext.Provider>
    </>
  );
}
