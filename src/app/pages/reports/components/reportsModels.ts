export interface TemporaryReportsDataProps {
  ads: string;
  spent?: string;
  purchaseValue?: string;
  roas?: number;
  purchaseRatio?: string;
  purchases?: number;
  thumbstop?: string;
  selected?: boolean;
}

export interface ReportsTableDataProps {
  reportsTableData: TemporaryReportsDataProps[];
  setChosenReports: React.Dispatch<
    React.SetStateAction<TemporaryReportsDataProps[]>
  >;
}
