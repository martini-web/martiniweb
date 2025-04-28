import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


function App() {

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const onSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // after success redirect to your local website
    window.location.href = redirectUri;
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
   <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>

      <GoogleOAuthProvider clientId={clientId}>
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </GoogleOAuthProvider>
  </div>
  );
}

export default App;