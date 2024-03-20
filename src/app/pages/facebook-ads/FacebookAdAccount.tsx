import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getFacebookAdsByFacebookId } from '../../modules/apps/core/_appRequests';
import { useAuth } from '../../modules/auth';
import { FacebookAdsProps } from '../../modules/apps/core/_appModels';
import { KTIcon } from '../../../_metronic/helpers';

const FacebookAdAccount: React.FC = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { facebookId } = useParams<{ facebookId: string }>();
  const [adAccountData, setAdAccountData] = useState<FacebookAdsProps | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (facebookId && auth?.accessToken) {
        try {
          const response = await getFacebookAdsByFacebookId(
            auth.accessToken,
            facebookId
          );
          if (response) {
            setAdAccountData(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [facebookId, auth]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={`card`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-center flex-row">
          <button
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            onClick={handleGoBack}
          >
            <KTIcon iconName="black-left" className="fs-2" />
          </button>
          <span className="card-label fw-bold fs-3 ps-2">
            Facebook Ads by Account
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-top gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-200px">Facebook Account</th>
                <th className="ps-4 min-w-200px">Ad Account Name</th>
                <th className="ps-4 min-w-100px">Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bottom">
                <td>
                  <div className="ps-4 text-gray-900 fw-bold d-block mb-1 fs-6">
                    {adAccountData?.facebookAccount?.firstName}{' '}
                    {adAccountData?.facebookAccount?.lastName}
                  </div>
                </td>
                <td>
                  {adAccountData?.adAccounts.map((account, idx) => (
                    <div key={idx} className="ps-1 pb-3">
                      {account.name}
                    </div>
                  ))}
                </td>
                <td>
                  {adAccountData?.adAccounts.map((account, idx) => (
                    <div key={idx} className="ps-1 pb-3">
                      {account.currency}
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacebookAdAccount;
