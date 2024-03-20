import React, { useEffect, useState } from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import {
  FacebookAdsFilters,
  FacebookAuth,
  PaginationComponent,
} from './components';
import { useAuth } from '../../modules/auth';
import {
  getFacebookAds,
  getFacebookToken,
} from '../../modules/apps/core/_appRequests';
import { FacebookAdsProps } from '../../modules/apps/core/_appModels';
import { useNavigate } from 'react-router-dom';

const FacebookAds: React.FC = () => {
  const navigate = useNavigate();
  const { facebookAuthCode, auth } = useAuth();
  const [facebookAds, setFacebookAds] = useState<FacebookAdsProps[]>([]);
  const [facebookToken, setFacebookToken] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const itemsPerPage: number = 10;

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
            setFacebookToken(response?.data?.access_token);
          }

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

  // Filtered items based on search input and selected currency
  const filteredItems: FacebookAdsProps[] = (facebookAds || [])
    .map((ad) => {
      if (ad) {
        if (selectedCurrency) {
          const adAccountsUAH = ad.adAccounts.filter(
            (account) => account.currency === selectedCurrency
          );
          if (adAccountsUAH.length > 0) {
            return {
              ...ad,
              adAccounts: adAccountsUAH,
            };
          } else {
            return null;
          }
        } else {
          return ad;
        }
      }
      return null;
    })
    .filter((item): item is FacebookAdsProps => item !== null)
    .filter(
      (ad) =>
        ad &&
        `${ad.facebookAccount.firstName} ${ad.facebookAccount.lastName}`
          .toLowerCase()
          .includes(searchInput.toLowerCase())
    );

  // Pagination logic
  const currentItems: FacebookAdsProps[] = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleNavigateToFacebookAccountAds = (facebookId: string) => {
    navigate(`/facebook-ads/${facebookId}`);
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleRemoveFilters = () => {
    setSelectedCurrency('');
  };

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
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="d-flex align-items-center flex-row">
            {selectedCurrency && (
              <div
                className="btn  btn-secondary  btn-flex fw-bold position-relative "
                onClick={handleRemoveFilters}
              >
                <span className="mr-5">{selectedCurrency}</span>
                <KTIcon
                  iconName="cross"
                  className="ki-duotone fs-2 text-muted"
                />
              </div>
            )}

            <div className="m-0 ps-4">
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
              <FacebookAdsFilters onCurrencySelect={handleCurrencyChange} />
            </div>
          </div>
        </div>
        {/* begin::Table container */}
        {facebookAds?.length > 0 ? (
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table align-top gs-0 gy-4">
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
                  <tr key={index} className="border-bottom">
                    <td>
                      <div
                        className="ps-4 text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6 cursor-pointer"
                        onClick={() =>
                          handleNavigateToFacebookAccountAds(
                            ad.facebookAccount.facebookId
                          )
                        }
                      >
                        {ad.facebookAccount.firstName}{' '}
                        {ad.facebookAccount.lastName}
                      </div>
                    </td>
                    <td>
                      {ad.adAccounts.map((account, idx) => (
                        <div key={idx} className="ps-1 pb-3">
                          {account.name}
                        </div>
                      ))}
                    </td>
                    <td>
                      {ad.adAccounts.map((account, idx) => (
                        <div key={idx} className="ps-1 pb-3">
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
        ) : (
          <div className="d-flex justify-content-center">
            <span className="fw-bold text-muted mt-5 mb-5">
              There are no ads associated with the specified Facebook account.
            </span>
          </div>
        )}
        {/* end::Table container */}

        {/* Pagination */}
        {/* Pagination Component */}
        {facebookAds?.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>
      {/* begin::Body */}
      {!facebookAuthCode && <FacebookAuth />}
    </div>
  );
};

export default FacebookAds;
