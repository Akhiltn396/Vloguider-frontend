import React from 'react';
import "./BuyCoffee.scss";
import Buy from "../../img/Buy.png"

const BuyCoffee = () => {
  return (
    <div className='buyCoffee'>
      <div className='container'>
        <div>
            <img src={Buy} alt="" />

        </div>
        <p style={{textAlign:"center", width:"max-content",zIndex:"1"}}>Buy me a coffee</p>
      </div>
    </div>
  )
}

export default BuyCoffee
