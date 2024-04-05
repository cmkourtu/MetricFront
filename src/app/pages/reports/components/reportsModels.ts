export interface TemporaryReportsDataProps {
  [key: string]: any;
  ads: string;
  spent?: string;
  purchaseValue?: string;
  roas?: string;
  purchaseRatio?: string;
  purchases?: number;
  thumbstop?: string;
  selected?: boolean;
}

export interface ReportsTableDataProps {
  reportsTableData: TemporaryReportsDataProps[];
  chosenReports: TemporaryReportsDataProps[];
  setChosenReports: React.Dispatch<
    React.SetStateAction<TemporaryReportsDataProps[]>
  >;
}

export interface ReportsChartsProps {
  chosenReports: TemporaryReportsDataProps[];
}
