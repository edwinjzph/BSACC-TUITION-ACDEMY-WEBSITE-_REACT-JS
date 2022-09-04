import React from 'react';
import "./style.css"
import img from "./bobby.png"

const Aboutus = ()=> {
  return<div className='about-us_1'>
    <div className="bascc_question">    
    <h1>What is <span className='bsacc'>BSACC ?</span></h1>
    </div>
     <div className='about-us'>
    
    <div className="about_us_box">
     
    <h3>
      Bobby's Accademy of Commerce is a successfull institution running since 2019. The students will learn more things from this institution. The academic session of the students are well-maintained in this institution. We provide both offline and online class in the institution. The pass rate of students since 2019 were 100%.<br></br><br></br>Bobby philip<br></br>
Founder of Bobby's Accadamy Of Commerce
      </h3>
    </div>
    <div className="about_us_box">
      <img  src={img}></img>
    </div>
   
  </div>
  </div>
}

export default Aboutus;
