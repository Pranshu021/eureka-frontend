// @ts-ignore
import { createContext, useContext, useState, ReactNode } from "react";

interface ReportData {
  report: string;
  query: string;
  downloadUrl: string;
}

interface ReportContextType {
  reportData: ReportData | null;
  setReportData: (data: ReportData) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  return (
    <ReportContext.Provider value={{ reportData, setReportData }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
};
