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





// App.tsx (Web app)
// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// function AppContent() {
//   const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
//   const [inWebView, setInWebView] = useState(false);

//   useEffect(() => {
//     const userAgent = navigator.userAgent.toLowerCase();
//     if (userAgent.includes('wv') || userAgent.includes('webview') || userAgent.includes('iphone') || userAgent.includes('android')) {
//       setInWebView(true);
//     }
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       console.log('Login Success:', tokenResponse);

//       const accessToken = tokenResponse.access_token;
//       if (accessToken) {
//         const deepLinkUrl = `martiniapp://auth-callback?access_token=${accessToken}`;

//         // Try to open the app
//         window.location.href = deepLinkUrl;

//         // fallback to web success page if app not installed
//         setTimeout(() => {
//           window.location.href = redirectUri;
//         }, 2000);
//       } else {
//         console.log('No access token received.');
//         window.location.href = redirectUri;
//       }
//     },
//     onError: (error) => {
//       console.log('Login Failed', error);
//     },
//     flow: 'implicit',
//   });

//   const handleOpenInBrowser = () => {
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage('open_browser_for_login');
//     }
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     backgroundColor: '#4285F4',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//   };

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
//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <AppContent />
//     </GoogleOAuthProvider>
//   );
// }

// export default App;


// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// function AppContent() {
//   const mobileRedirectUri = 'https://martiniweb.vercel.app/oauth/callback'; // Your web callback URL
//   const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

//   const [inWebView, setInWebView] = useState(false);

//   useEffect(() => {
//     const userAgent = navigator.userAgent.toLowerCase();
//     if (
//       userAgent.includes('wv') ||
//       userAgent.includes('webview') ||
//       userAgent.includes('iphone') ||
//       userAgent.includes('android')
//     ) {
//       setInWebView(true);
//     }
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       console.log('Login Success:', tokenResponse);

//       const accessToken = tokenResponse.access_token;
//       if (accessToken) {
//         // For web, just redirect directly to the callback URL with the access token
//         window.location.href = `${redirectUri}?access_token=${accessToken}`;
//       } else {
//         console.log('No access token received.');
//         window.location.href = redirectUri; // fallback
//       }
//     },
//     onError: (error) => {
//       console.log('Login Failed', error);
//     },
//     flow: 'implicit',
//   });

//   const handleOpenInBrowser = () => {
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage('open_browser_for_login');
//     }
//   };

//   const buttonStyle: React.CSSProperties = {
//     padding: '10px 20px',
//     backgroundColor: '#4285F4',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//   };

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
//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <AppContent />
//     </GoogleOAuthProvider>
//   );
// }

// export default App;





// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// function AppContent() {
//   const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI; // This should match the one in the Google Console
//   const [inWebView, setInWebView] = useState(false);

//   useEffect(() => {
//     const userAgent = navigator.userAgent.toLowerCase();
//     if (
//       userAgent.includes('wv') ||
//       userAgent.includes('webview') ||
//       userAgent.includes('iphone') ||
//       userAgent.includes('android')
//     ) {
//       setInWebView(true);
//     }
//   }, []);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       console.log('Login Success:', tokenResponse);

//       const accessToken = tokenResponse.access_token;
//       if (accessToken) {
//         // On successful login, directly redirect to the callback URL.
//         // Ensure that `redirectUri` points to a valid URL for handling the token
//         // window.location.href = `${redirectUri}?access_token=${accessToken}`;
//         window.location.href = `${redirectUri}#access_token=${accessToken}`;

//       } else {
//         console.log('No access token received.');
//         // Fallback if no token received
//         window.location.href = redirectUri;
//       }
//     },
//     onError: (error) => {
//       console.log('Login Failed', error);
//     },
//     flow: 'implicit',
//   });

//   const handleOpenInBrowser = () => {
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage('open_browser_for_login');
//     }
//   };

//   const buttonStyle: React.CSSProperties = {
//     padding: '10px 20px',
//     backgroundColor: '#4285F4',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//   };

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
//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <AppContent />
//     </GoogleOAuthProvider>
//   );
// }

// export default App;




// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
//   const [token, setToken] = useState<string | null>(null);

//   // useEffect(() => {
//   //   if (token) {
//   //     const redirectUri = 'martiniapp://auth?token=' + token;
  
//   //     // Create a temporary link and click it
//   //     const a = document.createElement('a');
//   //     a.href = redirectUri;
//   //     a.style.display = 'none';
//   //     document.body.appendChild(a);
//   //     a.click();
  
//   //     // Optional: Fallback to store or browser page after delay if app not installed
//   //     setTimeout(() => {
//   //       // fallback to Play Store or landing page (optional)
//   //       // window.location.href = 'https://play.google.com/store/apps/details?id=com.yourapp';
//   //     }, 1500);
//   //   }
//   // }, [token]);

//   useEffect(() => {
//     if (token) {
//       const redirectUri = 'martiniapp://auth?token=' + token;
  
//       // If inside a WebView, send the URL to React Native App
//       if (window.ReactNativeWebView) {
//         window.ReactNativeWebView.postMessage(redirectUri);
//       } else {
//         window.location.replace(redirectUri); // Fallback for normal web usage
//       }
//     }
//   }, [token]);

//   const login = useGoogleLogin({
//     // onSuccess: (tokenResponse) => {
//     //   console.log('Login Success:', tokenResponse);
//     //   window.location.href = redirectUri;
//     // },

//     // onSuccess: (tokenResponse) => {
//     //   const token = tokenResponse.access_token;
//     //   const redirectUri = 'martiniapp://auth?token=' + token
//     //   // const redirectUri = inWebView
//     //   //   ? 'martiniapp://auth?token=' + token
//     //   //   : import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    
//     //   window.location.href = redirectUri;
//     // },
//     onSuccess: (tokenResponse) => {
//       const token = tokenResponse.access_token;
//       setToken(token); // Triggers useEffect
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


import { useEffect, useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const redirectUri = 'martiniapp://auth?token=' + token;
  
      // If inside a WebView, send the URL to React Native App
      if (inWebView && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(redirectUri);
      } else {
        // For normal web usage, redirect to the Google redirect URI
        window.location.replace(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
      }
    }
  }, [token]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("RESPONSE:inWebView:::",inWebView)
      const token = tokenResponse.access_token;
      setToken(token); // Triggers useEffect
    },
    onError: (error) => {
      console.log('Login Failed', error);
    },
  });

  const handleOpenInBrowser = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('open_browser_for_login');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceWeb = params.get('forceWeb');

    const userAgent = navigator.userAgent.toLowerCase();

    if (forceWeb === 'true') {
      setInWebView(false); // Force as browser
      // (Optional) Clean URL after load
      const url = new URL(window.location.href);
      url.searchParams.delete('forceWeb');
      window.history.replaceState({}, '', url.toString());
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
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        <button
          onClick={() => {
            if (inWebView) {
              handleOpenInBrowser();
            } else {
              login();
            }
          }}
          style={buttonStyle}
        >
          Continue with Google
        </button>
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
