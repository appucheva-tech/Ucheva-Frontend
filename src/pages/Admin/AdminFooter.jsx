import React from 'react'
import './AdminFooter.css'
import { FaRegCopyright } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <div className='BMain'>
      <h1 className='BMainLeft'> <FaRegCopyright className='BMainLeftIcon'/>
        2026 Ucheva school operating management system. All right reserved.
      </h1>
      <h2 className='BMainRight'>Need help? 
        <span className='BMainRightSpan'> Contact support</span>
      </h2>
    </div>
  )
}

export default AdminFooter
