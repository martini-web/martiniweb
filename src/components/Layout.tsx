// components/Layout.tsx
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

function Layout({ title, children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const showBack = location.pathname !== '/dashboard';

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        {showBack && (
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            ← Back
          </button>
        )}
        <h2 style={styles.title}>{title}</h2>
      </header>
      <main style={styles.content}>{children}</main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    width: '98vw',
    fontFamily: 'sans-serif',
    backgroundColor: '#f7f9fc', // Light background for the main container
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#ffffff',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  backButton: {
    marginRight: '1rem',
    padding: '6px 12px',
    borderRadius: '6px',
    background: '#d1d1d1',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    color: '#333', // Darker color for the title
  },
  content: {
    padding: '2rem',
    backgroundColor: '#ffffff', // White background for the content area
    color: '#333', // Dark text color to contrast the background
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow to separate content
  },
};

export default Layout;
