import React, { useState, useEffect } from 'react';

import { FaBars } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { RiStethoscopeLine } from 'react-icons/ri';
import { FaWrench } from 'react-icons/fa';
import { GrCatalogOption } from 'react-icons/gr';
import { VscGraphLine } from 'react-icons/vsc';
import { IoMdAddCircle } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import logo from './Logo.png';

function Header({ show, setShow }) {
  const visibleToogle = ()=> setShow(!show);

  const NavShow = () => {
    if(show) {
      return <GrClose size={`1.5em`} className='nav-bar' onClick={visibleToogle} />
    } else {
      return <FaBars size={`1.5em`} className='nav-bar' onClick={visibleToogle} />
    }
  }

  return (
    <header className="main-header">
      <NavShow />
      <img src={logo} alt='Logo'/>
    </header>
  )
}

function SideBar({ show }) {
  const sidebarClass = 'sidebar ' + (show ? 'sidebar-show' : '');
  return (
    <aside className={sidebarClass} >
      <div className="side-content">
        <ul>
          <li className='active-page-link'><div className='nav-content'>
           <VscGraphLine size={`2em`}/> 
           <p>Reports</p>
          </div></li>
          <li><div className='nav-content'>
           <FaWrench size={`2em`} style={{fill: 'white', strokeWidth: '2rem'}}/> 
           <p>Strategy</p>
          </div></li>
          <li><div className='nav-content'>
           <RiStethoscopeLine size={`2em`}/> 
           <p>Assessments</p>
          </div></li>
          <li><div className='nav-content'>
           <GrCatalogOption size={`2em`}/> 
           <p>Catalogue</p>
          </div></li>
          <li><div className='nav-content'>
           <AiOutlineSetting size={`2em`}/> 
           <p>Settings</p>
          </div></li>
        </ul>
      </div>
    </aside>
  )
}

function KeyMeasure({value, index, setMeasure}){
  const [keyMeasure, setKeyMeasure] = useState(value);

  useEffect(()=>{
    setMeasure[index] = keyMeasure;
  },[setMeasure, index, keyMeasure]);

  return (
    <input type='text' name='key-measure' value={keyMeasure} onChange={(e)=>setKeyMeasure(e.target.value)} required />
  )
}

function ObjectiveBox({ obj, windowWidth}) {
  const [objective, setObjective] = useState(obj.objective);
  const [startDate, setStartDate] = useState(obj.startDate);
  const [endDate, setEndDate] = useState(obj.endDate);
  const [keyMeasures, setKeyMeasures] = useState(obj.keyMeasures);
  const [updateMessageShow, setUpdateMessageShow] = useState(false);

  const updateData = (e) => {
    e.preventDefault();
    
    localStorage.setItem(`objective ${obj.id}`,JSON.stringify({
      id: obj.id,
      objective,
      startDate,
      endDate,
      keyMeasures
    }))

    setUpdateMessageShow(true);
    setTimeout(()=> {
      setUpdateMessageShow(false);
    }, 2000)
  }

  const addkeyMeasureField = ()=> {
    if(keyMeasures.length < 3)
      setKeyMeasures([...keyMeasures, '']);
  }

  const date = new Date();
  const month = date.getMonth()<9 ? `0`+(date.getMonth() +1) : (date.getMonth() +1);
  const today = `${date.getFullYear()}-${month}-${date.getDate()}`;
  
  const updateMessageClass = 'update-message ' + (updateMessageShow ? 'update-message-show' : '');
  
  return (
    <form className='form objective-box' onSubmit={updateData}>
      <div className={updateMessageClass} >
        <p>Data Updated!</p>
      </div>

      <div className='objective-content'>
        <div className='objective'>
          <h4>Objective {obj?.id +1 || 1}</h4>
          <input type='text' name='objective' value={objective} onChange={(e)=>setObjective(e.target.value)} required />
        </div>

        <div className='date-field'>
          <div className='start-date-field'>
            <h4>Start Date</h4>
            <input type='date' name='start-date' min={today} value={startDate} onChange={(e)=>setStartDate(e.target.value)} required />
          </div>
          <div className='end-date-field'>
            <h4>End Date</h4>
            <input type='date' name='end-date' min={startDate} value={endDate} onChange={(e)=>setEndDate(e.target.value)} required />
          </div>
        </div>

        <div className='keyMeasure-field'>
          <div className='keyMeasure-head'>
            <h4>Key Measures</h4>
            <div className='addKey-btn' onClick={addkeyMeasureField}>
              <p>{windowWidth>400 ? `Add additional key measure` : `Add key`}</p>
              <IoMdAddCircle size={`1.4em`}/>
            </div>
          </div>
          {
            keyMeasures.map((measure, i) =>
             <KeyMeasure key={i} value={measure} index={i} setMeasure={keyMeasures}/>
            )
          }
        </div>
      </div>

      <div className='update-btn-field'>
        <button type='submit' className='btn update-btn'>Update</button>
      </div>

    </form>
  )
}

function MainBody({ windowWidth }) {
  const rawData = {
    id: 0,
    objective: '',
    startDate: '',
    endDate: '',
    keyMeasures: ['']
  };

  const [objectivesArray, setObjectivesArray] = useState(()=>{
    if(localStorage.length === 0) {
      return [rawData]
    } else {
      return Object.values(localStorage)
              .map((data)=>JSON.parse(data))
              .sort((first, second)=> first.id - second.id )
    }
  });

  const addObjectiveField = () => {
    if (objectivesArray.length < 3) {
      rawData.id = objectivesArray.length;
      setObjectivesArray([...objectivesArray, rawData])
    }
  }

  return (
    <div className='main-body'>
      <p className='main-top'>Set Security Strategy</p>
      <div className='body-link-div'>
        <h4 className='body-link'>{`Mission & Vission`}</h4>
        <h4 className='body-link page-active-link'>Strategic Business Objectives</h4>
      </div>

      <div className='content-wrapper'>
        {
          objectivesArray.map((objective, i)=>
            <ObjectiveBox key={objective.id} obj={objective} windowWidth={windowWidth} />
          )
        }

        <div className='addObjective-btn-field'>
          <button className='btn btn-wrap' onClick={addObjectiveField}>
            <IoMdAddCircle fill='white' size={`1.5em`}/>
            <p className='addObjective-btn'>Add Objective</p>
          </button>
        </div>

      </div>
      
    </div>
  )
}

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarShow, setSidebarShow] = useState(false, ()=>!sidebarShow);

  window.addEventListener('resize', ()=> {
    setWindowWidth(window.innerWidth);
  })

  useEffect (()=> {
    if (windowWidth < 600) 
      setSidebarShow();
  }, [windowWidth])
  
  return (
    <div className="App">
      <Header show={sidebarShow} setShow={setSidebarShow} />
      <main className='main-content'>
        <SideBar show={sidebarShow} />
        <MainBody windowWidth={windowWidth} />
      </main>
    </div>
  );
}

export default App;
