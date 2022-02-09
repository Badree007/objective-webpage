import { AiOutlineSetting } from 'react-icons/ai';
import { RiStethoscopeLine } from 'react-icons/ri';
import { FaWrench } from 'react-icons/fa';
import { GrCatalogOption } from 'react-icons/gr';
import { VscGraphLine } from 'react-icons/vsc';

function Header() {
  return (
    <header className="main-header">
        <h1>Welcome</h1>
    </header>
  )
}

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="side-content">
        <ul>
          <li><a href={"#"}>
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
        <h4>Key Measures</h4>
        <input type='text' name='key-measure'/>
      </div>
      <div className='update-btn-field'>
        <button className='update-btn'>Update</button>
      </div>

    </div>
  )
}

function MainBody() {
  return (
    <div className='main-body'>
      <p className='main-top'>Set Security Strategy</p>
      <div className='content-wrapper'>
        <ObjectiveBox/>
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
