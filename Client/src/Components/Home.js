import React from 'react'
import {FaUser} from 'react-icons/fa'
import {RiAdminFill} from 'react-icons/ri'


function Home() {
    return (
        <div className='home-page'>
           <div className='user'>
               <FaUser onClick={()=>{window.location.href='/user'}}/>
            </div>
            <div className='admin'>
               <RiAdminFill/>
            </div> 
            
        </div>
    )
}

export default Home
