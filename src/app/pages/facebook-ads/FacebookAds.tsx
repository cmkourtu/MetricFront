import React, { useEffect, useState } from 'react';
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers';
import { FacebookAuth, PaginationComponent } from './components';
import { useAuth } from '../../modules/auth';
import {
  getFacebookAccounts,
  getFacebookAds,
  getFacebookToken,
} from '../../modules/apps/core/_appRequests';
import { FacebookAdsProps } from '../../modules/apps/core/_appModels';

const FacebookAds: React.FC = () => {
  const { facebookAuthCode, auth } = useAuth();
  const [facebookAds, setFacebookAds] = useState<FacebookAdsProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

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
            const { data } = await getFacebookAds(facebookToken);
            setFacebookAds(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [facebookAuthCode]);

  // Calculate total pages
  const totalPages: number = Math.ceil(facebookAds.length / itemsPerPage);

  // Get current items
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: FacebookAdsProps[] = facebookAds.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={`card`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Facebook Accounts
          </span>
        </h3>
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
                <th className="ps-4 min-w-200px">Facebook Account</th>
                <th className="ps-4 min-w-200px">Name</th>
                <th className="ps-4 min-w-100px">Currency</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {currentItems.map((ad, index) => (
                <tr key={index}>
                  <td>
                    <div className="ps-4 text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
                      {ad.facebookAccount.firstName}{' '}
                      {ad.facebookAccount.lastName}
                    </div>
                  </td>
                  <td>
                    {ad.adAccounts.map((account, idx) => (
                      <div key={idx} className="ps-4">
                        {account.name}
                      </div>
                    ))}
                  </td>
                  <td>
                    {ad.adAccounts.map((account, idx) => (
                      <div key={idx} className="ps-4">
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

        {/* Pagination */}
        {/* Pagination Component */}
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      {/* begin::Body */}
    </div>
  );
};

export default FacebookAds;
