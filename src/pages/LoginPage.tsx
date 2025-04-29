// pages/LoginPage.tsx
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const buttonStyle: React.CSSProperties = {
  padding: '12px 24px',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#4285F4',
  color: 'white',
  cursor: 'pointer',
};

// const webRedirectionUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

function LoginPage() {
  const [inWebView, setInWebView] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const token = tokenResponse.access_token;
      sessionStorage.setItem('auth_token', token);

      const redirectUri = 'martiniapp://auth?token=' + token;
      window.location.replace(redirectUri);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
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
      setInWebView(false);
      const url = new URL(window.location.href);
      url.searchParams.delete('forceWeb');
      window.history.replaceState({}, '', url.toString());
    } else if (
      userAgent.includes('wv') ||
      userAgent.includes('webview') ||
      userAgent.includes('iphone') ||
      userAgent.includes('android')
    ) {
      sessionStorage.setItem('inWebView', 'true');
      setInWebView(true);
    } else {
      setInWebView(false);
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
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
  );
}

export default LoginPage;
