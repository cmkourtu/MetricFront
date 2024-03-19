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
import { Dropdown1 } from '../../../_metronic/partials';

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
          <span className="card-label fw-bold fs-3 mb-1">Facebook Ads</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className="card-body py-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <div className="d-flex align-items-center position-relative my-1 ">
            <KTIcon
              iconName="magnifier"
              className="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              className="form-control form-control-solid w-300px ps-14"
              placeholder="Search"
            />
          </div>
          <div className="m-0">
            <a
              href="#"
              className="btn  btn-secondary  btn-flex fw-bold"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
            >
              <KTIcon
                iconName="filter"
                className="ki-duotone fs-2 text-muted me-1"
              />
              Filter
            </a>
            <Dropdown1 />
          </div>
        </div>
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
          <table className="table align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-200px">Facebook Account</th>
                <th className="ps-4 min-w-200px">Ad Account Name</th>
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
                      <div key={idx} className="ps-1">
                        {account.name}
                      </div>
                    ))}
                  </td>
                  <td>
                    {ad.adAccounts.map((account, idx) => (
                      <div key={idx} className="ps-1">
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
      {!facebookAuthCode && <FacebookAuth />}
    </div>
  );
};

export default FacebookAds;
