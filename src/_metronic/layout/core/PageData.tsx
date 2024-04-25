/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FC, createContext, useContext, useEffect, useState } from 'react';
import { WithChildren } from '../../helpers';
import {
  FacebookAdsProps,
  ReportsProps,
} from '../../../app/modules/apps/core/_appModels';
import { getReportsByUserId } from '../../../app/modules/apps/core/_appRequests';
import { useAuth } from '../../../app/modules/auth';

export interface PageLink {
  title: string;
  path: string;
  isActive: boolean;
  isSeparator?: boolean;
}

export interface PageDataContextModel {
  pageTitle?: string;
  setPageTitle: (_title: string) => void;
  pageDescription?: string;
  setPageDescription: (_description: string) => void;
  pageBreadcrumbs?: Array<PageLink>;
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void;
  facebookAds?: FacebookAdsProps[];
  setFacebookAds: (_facebookAds: FacebookAdsProps[]) => void;
  reports?: ReportsProps[];
  setReports: (_reports: ReportsProps[]) => void;
  updateReportsTrigger?: boolean;
  setUpdateReportsTrigger: (_updateReportsTrigger: boolean) => void;
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  facebookAds: [],
  setFacebookAds: (_facebookAds: FacebookAdsProps[]) => {},
  reports: [],
  setReports: (_reports: ReportsProps[]) => {},
  updateReportsTrigger: false,
  setUpdateReportsTrigger: (_updateReportsTrigger: boolean) => {},
});

const PageDataProvider: FC<WithChildren> = ({ children }) => {
  const { currentUser } = useAuth();
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageDescription, setPageDescription] = useState<string>('');
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([]);
  const [facebookAds, setFacebookAds] = useState<FacebookAdsProps[]>([]);
  const [reports, setReports] = useState<ReportsProps[]>([]);
  const [updateReportsTrigger, setUpdateReportsTrigger] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchReports = async () => {
      const userId = currentUser?.id;
      if (userId) {
        try {
          const { data } = await getReportsByUserId(userId);
          if (data) {
            setReports(data);
          }
        } catch (error) {
          console.log('Error fetching reports:', error);
        }
      }
    };

    fetchReports();
  }, [updateReportsTrigger]);

  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
    facebookAds,
    setFacebookAds,
    reports,
    setReports,
    updateReportsTrigger,
    setUpdateReportsTrigger,
  };
  return (
    <PageDataContext.Provider value={value}>
      {children}
    </PageDataContext.Provider>
  );
};

function usePageData() {
  return useContext(PageDataContext);
}

type Props = {
  description?: string;
  breadcrumbs?: Array<PageLink>;
};

const PageTitle: FC<Props & WithChildren> = ({
  children,
  description,
  breadcrumbs,
}) => {
  const { setPageTitle, setPageDescription, setPageBreadcrumbs } =
    usePageData();
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString());
    }
    return () => {
      setPageTitle('');
    };
  }, [children]);

  useEffect(() => {
    if (description) {
      setPageDescription(description);
    }
    return () => {
      setPageDescription('');
    };
  }, [description]);

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs);
    }
    return () => {
      setPageBreadcrumbs([]);
    };
  }, [breadcrumbs]);

  return <></>;
};

const PageDescription: FC<WithChildren> = ({ children }) => {
  const { setPageDescription } = usePageData();
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString());
    }
    return () => {
      setPageDescription('');
    };
  }, [children]);
  return <></>;
};

export { PageDescription, PageTitle, PageDataProvider, usePageData };
