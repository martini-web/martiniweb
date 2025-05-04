import { useEffect } from 'react';

const ProfileRedirect = () => {
  useEffect(() => {
    const schemeUrl = 'martiniapp://profile';
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.sunpro.freyrenergycx&pcampaignid=web_share';

    // Attempt to open the app
    window.location.href = schemeUrl;

    // Fallback after 2s if app not installed
    const timeout = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <p>Opening Martini App...</p>;
};

export default ProfileRedirect;
