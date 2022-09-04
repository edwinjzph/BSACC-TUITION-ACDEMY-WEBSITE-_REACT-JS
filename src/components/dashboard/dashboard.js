import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser } from '../../features/userSlice';
import { auth } from '../../firebase';
import "./style.css"
function Dashboard() {
    const user = useSelector(selectUser);
    let history = useHistory();

    useEffect(() => {
        if(user===null){
            history.push("/signin")     
 }
      }, [ user,history])
  return <div>
<div className='sign_out'>
    <p >{user&& user.email}</p>
    <p onClick={() => auth.signOut()}>Sign out</p>
</div>
  </div>;
}

export default Dashboard;
