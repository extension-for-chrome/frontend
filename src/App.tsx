import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isSignedIn, setSignedIn] =useState(!!localStorage.getItem('responseGoogle'));
  const responseGoogle = (response: any) => {
      localStorage.setItem('responseGoogle', JSON.stringify(response))
      setSignedIn(!!localStorage.getItem('responseGoogle'))
  }
  return !isSignedIn ? (
    <div className="App">
        <h2 className="title">Please login to you Google account to add contacts</h2>
      <GoogleLogin
          clientId="1096724248642-g2fpk80r33cjrdh7ht0itoivi9o00rfo.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
      />
    </div>
  ) : <div/>
}

export default App;
