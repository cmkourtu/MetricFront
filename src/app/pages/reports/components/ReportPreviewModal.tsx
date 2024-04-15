import React, { useState, useEffect } from 'react';

import { useAuth } from '../../../modules/auth';
import { getAdsetsPreview } from '../../../modules/apps/core/_appRequests';

interface ReportPreviewModalProps {
  facebookId: string | null;
  adsId: string | null;
  closeReportPreviewModal: () => void;
}

const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  facebookId,
  adsId,
  closeReportPreviewModal,
}) => {
  const { auth } = useAuth();

  const [facebookAdPreviewUrl, setFacebookAdPreviewUrl] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const token = auth?.accessToken;
        if (token && facebookId && adsId) {
          const { data } = await getAdsetsPreview(token, facebookId, adsId);

          setFacebookAdPreviewUrl(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPreview();
  }, [auth?.accessToken, facebookId, adsId]);

  return (
    <>
      <div
        className="modal fade show"
        id="kt_modal_new_target"
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        style={{ display: 'block', paddingLeft: '0px' }}
      >
        <div className="modal-dialog modal-dialog-centered mw-400px">
          <div className="modal-content rounded">
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div
                className="btn btn-sm btn-icon btn-active-color-primary"
                data-bs-dismiss="modal"
                onClick={closeReportPreviewModal}
              >
                <i className="ki-duotone ki-cross fs-1">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </div>
            </div>
            <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
              <div className="mb-8">
                <h2>Preview</h2>
              </div>
              {/* iframe to display Facebook ad preview */}
              {facebookAdPreviewUrl ? (
                <div
                  dangerouslySetInnerHTML={{ __html: facebookAdPreviewUrl }}
                />
              ) : (
                <div className="d-flex align-items-center flex-row w-100">
                  <span className="fw-bold text-muted text-center mt-5 mb-5">
                    There are no Ads to display
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ReportPreviewModal;
