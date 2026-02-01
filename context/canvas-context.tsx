"use client"
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { createContext, useContext, ReactNode, useCallback, useState, useEffect } from "react";
import { THEME_LIST, ThemeType } from "../lib/themes";
import { FrameType } from "../types/project";
import { fetchRealtimeSubscriptionToken } from "../app/action/realtime";

export type LoadingStatusType = 
    | "idle"
    | "running"
    | "analyzing"
    | "generating"
    | "completed";

interface CanvasContextType {
    theme?: ThemeType;
    setTheme: (id: string) => void;
    themes: ThemeType[];

    frames: FrameType[];
    setFrames: (frames: FrameType[]) => void;
    updateFrame: (id: string, data: Partial<FrameType>) => void;
    addFrame: (frame: FrameType) => void;

    selectedFrameId: string | null;
    selectedFrame: FrameType | null;
    setSelectedFrameId: (id: string | null) => void;

    loadingStatus: LoadingStatusType;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({
    children,
    initialFrames,
    initialThemeId,
    hasInitialData,
    projectId,
}: {
    children: ReactNode;
    initialFrames: FrameType[];
    initialThemeId?: string;
    hasInitialData: boolean;
    projectId?: string;
}) => {
    const [themeId, setThemeId] = useState<string>(
        initialThemeId || THEME_LIST[0].id
    );

    const [frames, setFrames] = useState<FrameType[]>(initialFrames);
    const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);

    const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
        hasInitialData ? "idle" : "running"
    );

    const [prevProjectId, setPrevProjectId] = useState(projectId);
    if(projectId !== prevProjectId) {
        setPrevProjectId(projectId);
        setFrames(initialFrames);
        setThemeId(initialThemeId || THEME_LIST[0].id);
        setSelectedFrameId(null);
    }

    const theme = THEME_LIST.find((t) => t.id === themeId);
    const selectedFrame = 
        selectedFrameId && frames.length !== 0 
            ? frames.find((f) => f.id === selectedFrameId) || null
            : null;

    
    //Update the LoadingStatus by Inngest
      const { freshData } = useInngestSubscription({
    refreshToken: fetchRealtimeSubscriptionToken,
  });

    useEffect(() => {
        if(!freshData || freshData.length === 0) return;

        freshData.forEach((message) => {
            const {data, topic} = message;
        
            if(data.projectId !== projectId) return;
            switch (topic) {
                case "generation.start":
                    setLoadingStatus("running");
                    break;
                case "analysis.start":
                    setLoadingStatus("analyzing");
                    break;
                case "analysis.complete":
                    if (data.theme) setThemeId(data.theme);

                    if(data.screens && data.screens.length > 0) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const skeletonFrames: FrameType[] = data.screens.map((s: any) => ({
                            id: s.id,
                            htmlContent: "",
                            title: s.name,
                            isLoading: true,
                        }));
                        setFrames((prev) => [...prev, ...skeletonFrames]);
                    }
                    break;
                case "frame.created":
                    if(data.frame) {
                        setFrames((prev) => {
                            // Replace loading skeleton with actual frame
                            const newFrames = [...prev];
                            const idx = newFrames.findIndex((f) => f.id === data.screenId);
                            if(idx !== -1) {
                                newFrames[idx] = data.frame;
                            } else {
                                newFrames.push(data.frame);
                            }
                            return newFrames;
                        });
                    }
                    break;
                case "generation.complete":
                    console.log("[Canvas] Generation complete");
                    setLoadingStatus("completed");
                    setTimeout(() => {
                        setLoadingStatus("idle");
                    }, 1000);
                    break;
                default:
                    break;
            }
        });
    }, [freshData, projectId]);

    const addFrame = useCallback((frame: FrameType) => {
        setFrames((prev) => [...prev, frame]);
    }, []);

    const updateFrame = useCallback((id: string, data: Partial<FrameType>) => {
        setFrames((prev) => {
            return prev.map((frame) => 
                frame.id === id ? {...frame, ...data} : frame 
            );
        });
    }, []);

    return (
        <CanvasContext.Provider
            value={{
                theme,
                setTheme: setThemeId,
                themes: THEME_LIST,
                frames,
                setFrames,
                selectedFrameId,
                selectedFrame,
                setSelectedFrameId,
                updateFrame,
                addFrame,
                loadingStatus,
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export function useCanvas() {
    const context = useContext(CanvasContext);
    if (context === undefined) {
        throw new Error("useCanvas must be used within a CanvasProvider");
    }
    return context;
}
