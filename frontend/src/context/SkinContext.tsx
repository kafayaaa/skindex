import { getAnalyzeSkin } from "@/services/skin.service";
import { getSkinLogs } from "@/services/skinLog.service";
import { AnalysisResult, SkinLog } from "@/types/Skin";
import { createContext, useContext, useEffect, useState } from "react";

interface SkinContextProps {
  logs: SkinLog[];
  setLogs: (logs: SkinLog[]) => void;

  analysis: AnalysisResult[];
  setAnalysis: (analysis: AnalysisResult[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const SkinContext = createContext<SkinContextProps | undefined>(undefined);

export const SkinProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<SkinLog[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getSkinLogs();
        setLogs(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalyzeSkin();
        setAnalysis(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <SkinContext.Provider
      value={{
        logs,
        setLogs,
        analysis,
        setAnalysis,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </SkinContext.Provider>
  );
};

export const useSkin = () => {
  const context = useContext(SkinContext);
  if (!context) {
    throw new Error("useSkin must be used within a SkinProvider");
  }
  return context;
};
