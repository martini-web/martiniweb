import { useEffect } from 'react';

const ProfileRedirect = () => {
  useEffect(() => {
    const schemeUrl = 'com.martiniappsso://auth/profile';
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.sunpro.freyrenergycx&pcampaignid=web_share';

    // Attempt to open the app
    const now = Date.now();
    window.location.href = schemeUrl;

    const timeout = setTimeout(() => {
      const elapsed = Date.now() - now;
      if (elapsed < 2000) {
        // App not installed, fallback
        window.location.href = fallbackUrl;
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Opening the Martini App...</p>
      <p>If it doesn't open, <a href="https://play.google.com/store/apps/details?id=com.sunpro.freyrenergycx&pcampaignid=web_share">click here</a> to install it.</p>
    </div>
  );
};

export default ProfileRedirect;
