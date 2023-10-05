import React from 'react'
import { useGetUserProfileQuery } from '../slices/userApiSlices'

const ProfileScreen = () => {

  return (
    <div>
        <div className="name">
            <div className="AS"></div>
        </div>
        <div className="info"></div>
        <div className="logout">
            <button>logout</button>
        </div>
    </div>
  )
}

export default ProfileScreen