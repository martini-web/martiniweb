// import { useEffect, useState } from 'react';
// import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const webRedirectionUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI

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


//     useEffect(() => {
//       if (token) {
//         const redirectUri = 'martiniapp://auth?token=' + token;
    
//         window.location.replace(redirectUri);
    
//         setTimeout(() => {
//           window.location.href = webRedirectionUri;
//         }, 1500);
//       }
//     }, [token]);

//   const login = useGoogleLogin({
//     onSuccess: (tokenResponse) => {
//       const token = tokenResponse.access_token;
//       setToken(token);
//     },
//     onError: (error) => {
//       console.log('Login Failed', error);
//     },
//   });

//   const handleOpenInBrowser = () => {
//     // Open the login in the system browser if in WebView
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
//       // Persist WebView state in sessionStorage
//       sessionStorage.setItem('inWebView', 'true');
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


// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
