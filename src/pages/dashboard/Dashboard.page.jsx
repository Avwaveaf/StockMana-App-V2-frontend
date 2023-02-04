import React from 'react'
import useRedirectLoggedOut from '../../components/customHook/useRedirectLoggedOut.component';

const Dashboard = () => {
    useRedirectLoggedOut("/login")
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard