import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';
import BaseForm from "./components/BaseForm";

function App() {
  const [isSignedIn, setSignedIn] =useState(!!localStorage.getItem('responseGoogle'));
  const responseGoogle = (response: any) => {
      localStorage.setItem('responseGoogle', JSON.stringify(response))
      console.log(chrome.identity);
      setSignedIn(!!localStorage.getItem('responseGoogle'))
  }
  return false ? (
    <div className="App">
        <h1 className="logo">AddToContact</h1>
        <h2 className="title">Please login to you Google account to add contacts</h2>
      <GoogleLogin
          clientId="1096724248642-n2h28ujpiqifmjkhns7k4h23nnurldpr.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
      />
    </div>
  ) : <BaseForm/>
}

export default App;
