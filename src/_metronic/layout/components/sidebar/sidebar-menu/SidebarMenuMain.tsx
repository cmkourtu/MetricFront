import React, { useState } from 'react';
import { KTIcon } from '../../../../helpers';
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub';
import { SidebarMenuItem } from './SidebarMenuItem';
import { CreateReportModal } from '../../../../../app/pages/reports/components';

const SidebarMenuMain: React.FC = () => {
  const [showCreateReportModal, setShowCreateReportModal] =
    useState<boolean>(false);

  const openCreateReportModal = () => {
    setShowCreateReportModal(true);
  };

  const closeCreateReportModal = () => {
    setShowCreateReportModal(false);
  };

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="home"
        title="Home"
        fontIcon="bi-app-indicator"
      />

      <SidebarMenuItem
        to="/facebook-ads"
        icon="facebook"
        title="Facebook Ads"
        fontIcon="bi-layers"
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Folders
          </span>
        </div>
      </div>

      <SidebarMenuItemWithSub
        to="/error"
        title="Folders"
        fontIcon="bi-sticky"
        icon="folder"
      >
        <SidebarMenuItem to="/error/404" title="Folder 1" hasBullet={true} />
        <SidebarMenuItem to="/error/404" title="Folder 2" hasBullet={true} />
      </SidebarMenuItemWithSub>

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Reports
          </span>
        </div>
      </div>

      <div className="menu-item">
        <div className="menu-link without-sub" onClick={openCreateReportModal}>
          <span className="menu-icon">
            {' '}
            <KTIcon iconName="plus-square" className="fs-2" />
          </span>
          <i className="bi fs-3"></i>
          <span className="menu-title">Create report</span>
        </div>
      </div>

      <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="Reports"
        icon="element-7"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem to="/reports" title="Report 1" hasBullet={true} />
      </SidebarMenuItemWithSub>
      {showCreateReportModal && (
        <CreateReportModal closeCreateReportModal={closeCreateReportModal} />
      )}
    </>
  );
};

export { SidebarMenuMain };
