// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


// function App() {

  // const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
//   const onSuccess = (credentialResponse:any) => {
//     console.log('Login Success:', credentialResponse);
//     // after success redirect to your local website
//     window.location.href = redirectUri;
//   };

//   const onError = () => {
//     console.log('Login Failed');
//   };

//   return (
//    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',width:'100vw'}}>

//       <GoogleOAuthProvider clientId={clientId}>
//       <div style={{ marginTop: 100, textAlign: 'center' }}>
//         <GoogleLogin
//           onSuccess={onSuccess}
//           onError={onError}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   </div>
//   );
// }

// export default App;


// App.tsx (Web app)


//close solution ---

// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

// const buttonStyle: React.CSSProperties = {
//   padding: '12px 24px',
//   fontSize: '16px',
//   borderRadius: '8px',
//   border: 'none',
//   backgroundColor: '#4285F4',
//   color: 'white',
//   cursor: 'pointer',
// };

// function InnerApp() {
//   const [inWebView, setInWebView] = useState(false);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       console.log('Login Success:', tokenResponse);
//       window.location.href = redirectUri;
//     },
//     onError: (error) => {
//       console.log('Login Failed', error);
//     },
//   });

//   const handleOpenInBrowser = () => {
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage('open_browser_for_login');
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const forceWeb = params.get('forceWeb');

//     const userAgent = navigator.userAgent.toLowerCase();

//     if (forceWeb === 'true') {
//       setInWebView(false); // Force as browser
//       // (Optional) Clean URL after load
//       const url = new URL(window.location.href);
//       url.searchParams.delete('forceWeb');
//       window.history.replaceState({}, '', url.toString());
//     } else if (
//       userAgent.includes('wv') ||
//       userAgent.includes('webview') ||
//       userAgent.includes('iphone') ||
//       userAgent.includes('android')
//     ) {
//       setInWebView(true);
//     } else {
//       setInWebView(false);
//     }
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
//       <div style={{ marginTop: 100, textAlign: 'center' }}>
//         <button
//           onClick={() => {
//             if (inWebView) {
//               handleOpenInBrowser();
//             } else {
//               login();
//             }
//           }}
//           style={buttonStyle}
//         >
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <InnerApp />
//     </GoogleOAuthProvider>
//   );
// }

// export default App;



import { MouseEventHandler, useEffect, useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#4285F4',
  color: 'white',
  cursor: 'pointer',
};

function InnerApp() {
  const [inWebView, setInWebView] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      window.location.href = redirectUri;
    },
    onError: (error) => {
      console.log('Login Failed', error);
    },
  });

  // Wrap login call in an event handler to avoid type issues
  const handleLoginClick: MouseEventHandler<HTMLButtonElement> = () => {
    login(); // Trigger the login function
  };
  
  const handleOpenInBrowser: MouseEventHandler<HTMLButtonElement> = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('open_browser_for_login');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceWeb = params.get('forceWeb');
    const auto = params.get('autoLogin');

    const userAgent = navigator.userAgent.toLowerCase();

    if (forceWeb === 'true') {
      setInWebView(false);
    } else if (
      userAgent.includes('wv') ||
      userAgent.includes('webview') ||
      userAgent.includes('iphone') ||
      userAgent.includes('android')
    ) {
      setInWebView(true);
    } else {
      setInWebView(false);
    }

    if (auto === 'true') {
      setAutoLogin(true);
    }
  }, []);

  useEffect(() => {
    if (autoLogin) {
      // Automatically trigger login without user click
      login();
    }
  }, [autoLogin, login]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        {inWebView ? (
          <button onClick={handleOpenInBrowser} style={buttonStyle}>
            Continue with Google
          </button>
        ) : (
          <button onClick={handleLoginClick} style={buttonStyle}>
            Continue with Google
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <InnerApp />
    </GoogleOAuthProvider>
  );
}

export default App;
