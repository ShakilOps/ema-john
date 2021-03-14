import React, {  useState } from 'react';
import { useContext } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFrameWork, handleGoogleSignIn, handleSignOut, handleFbSignIn } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn : false,
    name : '',
    email : '',
    photo : ''
  })

  initializeLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }

  const FbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isFormedValid = true;
    if(e.target.name === 'email'){
      const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isEmailValid);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      console.log(isPasswordValid && isPasswordHasNumber);
    }
    if(isFormedValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    //console.log(user.email, user.password);
    if(newUser && user.email && user.password){

    }
    if(!newUser && user.email && user.password){
      
    }
  e.preventDefault();
  }

  return (
    <div style = {{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={FbSignIn}>Facebook Sign In</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your mail : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>  
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange = {() => setNewUser(!newUser)} name="toggle"/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit} action="">
        {newUser && <input name='name' type="text" onBlur={handleBlur} placeholder="Name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your e-mail address" required/>
        <br/>
        <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style = {{color : 'red'}}>{user.error}</p>
       {user.success && <p style = {{color : 'green'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;

//short circuit ta jana lagbe,,,use hoy majhe majhe 
//select then press f2 and thats will rename
