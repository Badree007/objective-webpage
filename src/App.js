import { FaBars } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { RiStethoscopeLine } from 'react-icons/ri';
import { FaWrench } from 'react-icons/fa';
import { GrCatalogOption } from 'react-icons/gr';
import { VscGraphLine } from 'react-icons/vsc';
import { IoMdAddCircle } from 'react-icons/io';
import logo from './Logo.png';

function Header() {
  return (
    <header className="main-header">
      <FaBars size={`1.5em`} className='nav-bar'/>
      <img src={logo} alt='Logo'/>
    </header>
  )
}

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="side-content">
        <ul>
          <li className='active-page-link'><a href={"#"}>
           <VscGraphLine size={`2em`}/> 
           <p>Reports</p>
          </a></li>
          <li><a href={"#"}>
           <FaWrench size={`2em`} style={{fill: 'white', strokeWidth: '2rem'}}/> 
           <p>Strategy</p>
          </a></li>
          <li><a href={"#"}>
           <RiStethoscopeLine size={`2em`}/> 
           <p>Assessments</p>
          </a></li>
          <li><a href={"#"}>
           <GrCatalogOption size={`2em`}/> 
           <p>Catalogue</p>
          </a></li>
          <li><a href={"#"}>
           <AiOutlineSetting size={`2em`}/> 
           <p>Settings</p>
          </a></li>
        </ul>
      </div>
    </aside>
  )
}

function ObjectiveBox() {
  return (
    <div className='objective-box'>

     <div className='objective-content'>
      <div className='objective'>
          <h4>Objective 1</h4>
          <input type='text' name='objective'/>
        </div>

        <div className='date-field'>
          <div className='start-date-field'>
            <h4>Start Date</h4>
            <input type='date' name='start-date'/>
          </div>
          <div className='end-date-field'>
            <h4>End Date</h4>
            <input type='date' name='end-date'/>
          </div>
        </div>

        <div className='keyMeasure-field'>
          <div className='keyMeasure-head'>
            <h4>Key Measures</h4>
            <div className='addKey-btn'>
              <p>Add additional key measure </p>
              <IoMdAddCircle size={`1.4em`}/>
            </div>
          </div>
          <input type='text' name='key-measure'/>
        </div>
     </div>

      <div className='update-btn-field'>
        <button className='btn update-btn'>Update</button>
      </div>

    </div>
  )
}

function MainBody() {
  return (
    <div className='main-body'>
      <p className='main-top'>Set Security Strategy</p>
      <div className='body-link-div'>
        <h4 className='body-link'>{`Mission & Vission`}</h4>
        <h4 className='body-link page-active-link'>Strategic Business Objectives</h4>
      </div>
      <div className='content-wrapper'>
        <ObjectiveBox/>
      <div className='addObjective-btn-field'>
        <div className=' btn btn-wrap'>
          <IoMdAddCircle fill='white' size={`1.5em`}/>
          <p className='addObjective-btn'>Add Objective</p>
        </div>
      </div>
      </div>
      
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header/>
      <main className='main-content'>
        <SideBar/>
        <MainBody/>
      </main>
    </div>
  );
}

export default App;
