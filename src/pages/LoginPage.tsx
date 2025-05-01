// pages/LoginPage.tsx
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

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
      }, 2000);
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Martini</h1>
        <p style={styles.subtitle}>Please sign in with your Google account to continue</p>

        <button
          onClick={() => {
            if (inWebView) {
              handleOpenInBrowser();
            } else {
              login();
            }
          }}
          style={styles.googleButton}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:'98vw',
    backgroundColor: '#f5f7fa', // Light grey background
    margin: '0', // Remove default margin
    padding: '0', // Remove default padding
  },
  card: {
    width: '100%',
    maxWidth: '400px', // Card width limit
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center',
    boxSizing: 'border-box', // Ensure padding doesn't affect the width calculation
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#333',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%', // Ensure it spans the width of the card
  },
  googleIcon: {
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
};

export default LoginPage;
