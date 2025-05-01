import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Dashboard() {
  return (
    <Layout title="Dashboard">
      <p>You're successfully logged in.</p>
      <div style={styles.links}>
        <Link to="/profile" style={styles.linkCard}>👤 Profile</Link>
        <Link to="/settings" style={styles.linkCard}>⚙️ Settings</Link>
      </div>
    </Layout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  links: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
    flexWrap: 'wrap',
  },
  linkCard: {
    flex: '1 1 150px',
    textAlign: 'center',
    textDecoration: 'none',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease-in-out',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default Dashboard;
