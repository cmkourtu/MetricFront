import React, { useEffect } from 'react';

const CALLBACK_URL = import.meta.env.VITE_APP_FACEBOOK_CALLBACK_URL;
const FACEBOOK_APP_ID = import.meta.env.VITE_APP_FACEBOOK_APP_ID;

const FacebookAuth: React.FC = () => {
  useEffect(() => {
    const redirectUri = encodeURIComponent(CALLBACK_URL);
    const stateParam = encodeURIComponent('st=state123abc,ds=123456789');
    const responseType = 'code';
    const scope = encodeURIComponent(
      'pages_show_list,ads_management,ads_read,pages_read_engagement,public_profile,email'
    );

    try {
      const oauthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${redirectUri}&state=${stateParam}&response_type=${responseType}&scope=${scope}`;

      window.location.href = oauthUrl;
    } catch (error) {
      console.error('Error redirecting to Facebook:', error);
    }
  }, []);

  return <div>FacebookAuth</div>;
};

export default FacebookAuth;
