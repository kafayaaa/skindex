import { EMPTY_SKIN_INSIGHT } from "@/constants/skinInsight";
import { getAnalysisDetail } from "@/services/analysisDetail.service";
import { getInterpretations } from "@/services/interpretation.service";
import { getPhoto } from "@/services/photo.service";
import { getAnalyzeSkin } from "@/services/skin.service";
import { getSkinInsight } from "@/services/skinInsight.service";
import { getSkinLogs } from "@/services/skinLog.service";
import { getTriggers } from "@/services/trigger.service";
import {
  AnalysisDetail,
  AnalysisInterpretation,
  AnalysisResult,
  Photo,
  SkinInsightResponse,
  SkinLog,
  TriggerDetected,
} from "@/types/Skin";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface SkinContextProps {
  logs: SkinLog[];
  setLogs: (logs: SkinLog[]) => void;

  analysis: AnalysisResult[];
  setAnalysis: (analysis: AnalysisResult[]) => void;

  refreshKey: number;
  refreshAnalysis: () => void;

  analysisDetails: Record<number, AnalysisDetail>;
  fetchAnalysisDetail: (photoId: number) => Promise<void>;

  interpretations: AnalysisInterpretation[];
  setInterpretations: (interpretations: AnalysisInterpretation[]) => void;

  skinInsight: SkinInsightResponse;
  fetchSkinInsight: (date: string) => Promise<void>;

  triggers: TriggerDetected[];
  setTriggers: (triggers: TriggerDetected[]) => void;

  photo: Photo | null;
  fetchPhoto: (logId: string) => Promise<void>;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  insightLoading: boolean;
  setInsightLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

const SkinContext = createContext<SkinContextProps | undefined>(undefined);

export const SkinProvider = ({ children }: { children: React.ReactNode }) => {
  const [logs, setLogs] = useState<SkinLog[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [analysisDetails, setAnalysisDetails] = useState<
    Record<number, AnalysisDetail>
  >({});
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [interpretations, setInterpretations] = useState<
    AnalysisInterpretation[]
  >([]);
  const [skinInsight, setSkinInsight] =
    useState<SkinInsightResponse>(EMPTY_SKIN_INSIGHT);
  const [triggers, setTriggers] = useState<TriggerDetected[]>([]);
  const [photo, setPhoto] = useState<Photo | null>(null);

  const [loading, setLoading] = useState(true);
  const [insightLoading, setInsightLoading] = useState(false);
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

  const refreshAnalysis = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const fetchAnalysisDetail = async (photoId: number) => {
    // Jika sudah ada → jangan fetch ulang
    if (analysisDetails[photoId]) return;

    try {
      const detail = await getAnalysisDetail(photoId);

      setAnalysisDetails((prev) => ({
        ...prev,
        [photoId]: detail,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSkinInsight = useCallback(async (date: string): Promise<void> => {
    try {
      setLoading(true);
      const data = await getSkinInsight(date);
      setSkinInsight(data);
    } catch (err) {
      setError("Gagal mengambil skin insight");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPhoto = useCallback(async (logId: string) => {
    try {
      setLoading(true);
      setPhoto(null);
      const data = await getPhoto(logId);
      setPhoto(data); // null = tidak ada foto
      setError(null); // ← penting
    } catch {
      setError("Gagal mengambil foto");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchInterpretations = async () => {
      try {
        const data = await getInterpretations();
        setInterpretations(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchInterpretations();
  }, []);

  useEffect(() => {
    const fetchTriggers = async () => {
      try {
        const data = await getTriggers();
        setTriggers(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTriggers();
  }, []);

  return (
    <SkinContext.Provider
      value={{
        logs,
        setLogs,
        analysis,
        setAnalysis,
        refreshKey,
        refreshAnalysis,
        analysisDetails,
        fetchAnalysisDetail,
        interpretations,
        setInterpretations,
        skinInsight,
        fetchSkinInsight,
        triggers,
        setTriggers,
        photo,
        fetchPhoto,
        loading,
        setLoading,
        insightLoading,
        setInsightLoading,
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
