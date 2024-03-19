import React, { useEffect, useState } from 'react';
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers';
import { FacebookAuth } from './components';
import { useAuth } from '../../modules/auth';
import {
  getFacebookAccounts,
  getFacebookAds,
  getFacebookToken,
} from '../../modules/apps/core/_appRequests';

interface FacebookAccountsProps {
  facebookId: string;
  firstName: string;
  lastName: string;
}

interface AdAccountProps {
  id: string;
  name: string;
  currency: string;
}

interface FacebookAccountProps {
  facebookId: string;
  firstName: string;
  lastName: string;
}

interface FacebookAdsProps {
  facebookAccount: FacebookAccountProps;
  adAccounts: AdAccountProps[];
}

const FacebookAds: React.FC = () => {
  const { facebookAuthCode, auth } = useAuth();
  const [facebookAccounts, setFacebookAccounts] = useState<
    FacebookAccountsProps[]
  >([]);
  const [facebookAds, setFacebookAds] = useState<FacebookAdsProps[]>([]);

  //TemporaryToken
  const facebookToken =
    'EAAMC39KPoBYBO3c3lsRG5skqF7K7esJwzGl7aM6PDrNKcmnpD543cGB7v2n0z9PThTmdCdn686pwmg3PgUnhav1fVWtA6Mw4akEtBYjrwKeb8muxh4rJmdQEQLEPprKWSi8sEXPtYvPLzzqfOZCTUQZC5xpZCepCHfhGD9TDJA2Gypc23Xsm7hXDXZBcbRK3nDZBEnwwM69FcY7QPgJlZBzIonn1OrBWXhgdABPSzbnTBSsaQgZCMrZAZAqfNdGiukQRI2gZDZD';

  useEffect(() => {
    const accessToken = auth?.accessToken;
    if (!facebookAuthCode) {
      return;
    } else if (accessToken && facebookAuthCode) {
      const fetchData = async () => {
        try {
          const response = await getFacebookToken(
            accessToken,
            facebookAuthCode
          );

          if (response) {
            const { data } = await getFacebookAccounts(facebookToken);
            setFacebookAccounts(data);
            const response = await getFacebookAds(facebookToken);
            setFacebookAds(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [facebookAuthCode]);

  const handleOpenFacebookAccount = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`card`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Facebook Accounts
          </span>
          {/*<span className="text-muted mt-1 fw-semibold fs-7">
            Over 500 new products
            </span>*/}
        </h3>
        <div className="card-toolbar">
          <a href="#" className="btn btn-sm btn-light-primary">
            <KTIcon iconName="plus" className="fs-2" />
            New Member
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-200px">Facebook account</th>
                <th className="ps-4 min-w-200px">Ads name</th>
                <th className="ps-4 min-w-100px">Currency</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {facebookAds.map((ad) => (
                <tr key={ad?.facebookAccount?.facebookId}>
                  <td>
                    <div className="ps-4 text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                      {ad?.facebookAccount?.firstName}{' '}
                      {ad?.facebookAccount?.lastName}
                    </div>
                  </td>
                  <td>
                    {ad?.adAccounts.map((account) => (
                      <div
                        key={account?.id}
                        className="ps-4 text-gray-900 text-hover-primary fs-7"
                      >
                        {account.name}
                      </div>
                    ))}
                  </td>
                  <td>
                    {ad?.adAccounts.map((account) => (
                      <div key={account?.id} className="ps-4">
                        {account.currency}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {!facebookAuthCode && <FacebookAuth />}
      {/* begin::Body */}
    </div>
  );
};

export default FacebookAds;
