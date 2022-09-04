import React from 'react';
import './youtube.css'
import ReactPlayer from 'react-player/lazy'
function Youtube({youtubevideo}) {
console.log(youtubevideo.one)

  return <div className="youtube_title">
      <h1>EXPERIENCE OUR TEACHING METHOD:</h1>
      <br></br>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sapiente cumque nobis aut accusamus tempore dolorum ratione, blanditiis, iure, quas perferendis. Delectus, mollitia animi qui asperiores quibusdam ea nihil saepe.</p>
      <div className='youtubevideo'>
      
      {youtubevideo&& youtubevideo?.two.map((video,index) => {
      return(
        <ReactPlayer  
        width='100%'
        height="100%"
        className="youtubecomp"
        key={index}   
        url={video} />
      )
  })}
    
  </div>;
  </div> 
}

export default Youtube;
