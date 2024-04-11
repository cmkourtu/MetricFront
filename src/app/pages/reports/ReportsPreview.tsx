import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../modules/auth';
import { getAdsetsPreview } from '../../modules/apps/core/_appRequests';

const ReportsPreview: React.FC = () => {
  const { auth } = useAuth();
  const { facebookId, adId } = useParams<{
    facebookId: string;
    adId: string;
  }>();
  const [currentFacebookId, setCurrentFacebookId] = useState<string | null>(
    null
  );
  const [currentAdId, setCurrentAdId] = useState<string | null>(null);

  useEffect(() => {
    if (facebookId) {
      setCurrentFacebookId(facebookId);
    }
    if (adId) {
      setCurrentAdId(adId);
    }
  }, [facebookId, adId]);

  useEffect(() => {
    const token = auth?.accessToken;
    const fetchPreview = async () => {
      if (token && currentFacebookId && currentAdId) {
        try {
          const { data } = await getAdsetsPreview(
            token,
            currentFacebookId,
            currentAdId
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPreview();
  }, [currentFacebookId, currentAdId]);

  return (
    <div>
      <h1>Reports Preview</h1>
    </div>
  );
};

export default ReportsPreview;
