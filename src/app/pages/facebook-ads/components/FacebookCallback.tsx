import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../modules/auth';

const FacebookCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setFacebookAuthCode } = useAuth();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  useEffect(() => {
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      setFacebookAuthCode(authorizationCode);
      navigate('/facebook-ads');
    } else {
      console.error('Authorization code not found');
    }
  }, []);

  return <div>FacebookCallback</div>;
};

export default FacebookCallback;
