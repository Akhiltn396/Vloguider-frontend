import React from 'react';
import "./Trending.scss"
import { Link } from 'react-router-dom'
import { destination } from '../../data';

const Trending = () => {
  return (
    <div className='trending'>
         <h2 style={{textAlign:"center", marginTop:"40px"}}>Trending Destinations</h2>
      <div className='container'>
      {destination.map((dest)=>(
        <div >

 <Link to="/feature" style={{textDecoration:"none"}}>
 <div className='destination'>
    <div >
     <img src={dest.img} />
    </div>
    <div className='dest'>
     <h3 className=''>{dest.district}</h3>
    </div>
 </div>

 </Link>

        </div>
        ))


      }


      </div>
    </div>
  )
}

export default Trending
