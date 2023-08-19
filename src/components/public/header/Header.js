

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppHeader from '../../../common/AppHeader';



const Header = () => {

    const user=useSelector(state=>state.auth);

    const history=useHistory();

    const dispatch=useDispatch(); 

  return (
    <div>
          {!user.authenticated && <AppHeader authenticated={user.authenticated} onLogout={()=>dispatch(authActions.handleLogout())} /> }
     {user.authenticated && <AppHeader authenticated={user.authenticated} onLogout={()=>{setCourses([]);dispatch(authActions.handleLogout())}} /> }
   
    </div>
  )
}

export default Header