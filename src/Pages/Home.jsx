// import MatrixAnimation from "../Components/MatrixAnimation";
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import useTypingEffect from '../hooks/typingEffect';
import './home.css';
import React from 'react';

function Home() {
  const welcomeText = useTypingEffect('Clint Arneson-Hiles');
  const leadText =
    "I'm Clint, a passionate new web developer and a recent graduate from Lighthouse Labs. Here, you'll find my latest projects, showcasing my skills in creating interactive and user-friendly web applications. ";

  return (
    <>
      {/* <MatrixAnimation /> */}
      <div className='container'>
        <div className='row'>
          <div className='col-lg-15 col-md-6 col-sm-12'>
            <h2
              className='display-1'
              style={{ fontSize: '4rem' }}
              data-testid='welcome-text'
            >
              {welcomeText}
            </h2>
            <p className='lead'>{leadText}</p>
            <nav className='nav-homebtns'>
              <NavLink to='/about' className='btn btn-success'>
                About Me
              </NavLink>
              <NavLink to='/projects' className='btn btn-success'>
                View Projects
              </NavLink>
              <NavLink to='/contact' className='btn btn-success'>
                Contact
              </NavLink>
            </nav>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12' id='photo'>
            <img
              src='portImage.jpg'
              alt='Clint Arneson-Hiles'
              className='img-fluid'
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;
