import React, { useState, useEffect } from 'react';

// Icons used from react-icons library
import { FaBars } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { RiStethoscopeLine } from 'react-icons/ri';
import { FaWrench } from 'react-icons/fa';
import { GrCatalogOption } from 'react-icons/gr';
import { VscGraphLine } from 'react-icons/vsc';
import { GrClose } from 'react-icons/gr';
import logo from './Logo.png';

// Page imports
import MainBody from './Objective-page';


// This is the header of the webpage.
// It can be used in other pages as a component
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

// This component contains the navigation links to other pages 
// It can be resued as well
function SideBar({ show }) {
  const sidebarClass = 'sidebar ' + (show ? 'sidebar-show' : '');
  return (
    <aside className={sidebarClass} >
      <div className="side-content">
        <ul>
          {/* Each of the div(nav-content) can be made a link to navigate to the respective pages */}
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

// This is the main App component
// It comnines the componenets to make a full webpage
// It is exported to the main rendering page i.e index.js
function App() {
  
  // These states tracks the window witdth 
  // They contribute in responsive design
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
