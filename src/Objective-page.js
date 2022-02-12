import React, { useState, useEffect } from 'react';

import { IoMdAddCircle } from 'react-icons/io';

// This componenent helps to add key measures field to objectives
// It is rendered based on value array
function KeyMeasure({value, index, setMeasure}){
    const [keyMeasure, setKeyMeasure] = useState(value);
  
    useEffect(()=>{
      setMeasure[index] = keyMeasure;
    },[setMeasure, index, keyMeasure]);
  
    return (
      <input type='text' name='key-measure' value={keyMeasure} onChange={(e)=>setKeyMeasure(e.target.value)} required />
    )
}

// This component is used to render each objective field having all the input fields
// This componenet also handles all the input validations and updates data and stores in local storage
function ObjectiveBox({ obj, windowWidth}) {
    const [objective, setObjective] = useState(obj.objective);
    const [startDate, setStartDate] = useState(obj.startDate);
    const [endDate, setEndDate] = useState(obj.endDate);
    const [keyMeasures, setKeyMeasures] = useState(obj.keyMeasures);
    const [updateMessageShow, setUpdateMessageShow] = useState(false);
  
    // This method updates data and stores them to the local storage
    // It is called when update button is clicked
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
  
    // This method adds empty string to keyMeasures array which helps to render empty key measure field
    // It restrics to add more than 3 items
    const addkeyMeasureField = ()=> {
      if(keyMeasures.length < 3)
        setKeyMeasures([...keyMeasures, '']);
    }
  
    // This method returns today's date that can be used to Start Date min value
    const today = ()=> {
        const date = new Date();
        const month = date.getMonth()<9 ? `0`+(date.getMonth() +1) : (date.getMonth() +1);
        return `${date.getFullYear()}-${month}-${date.getDate()}`;      
    }

    // This is class for update message div which is shown when data are updated
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
              <input type='date' name='start-date' min={today()} value={startDate} onChange={(e)=>setStartDate(e.target.value)} required />
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

// This is the main component returned to the App.js page with all the components
// It gets data from local or initialize initial raw data and pass the data to the Objective component to render the data
// It also adds objective fields
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
            objectivesArray.map((objective)=>
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

export default MainBody;