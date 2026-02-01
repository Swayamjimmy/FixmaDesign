import React, { useState } from 'react'
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch"
import { LoadingStatusType, useCanvas } from '../../context/canvas-context';
import { cn } from '../../lib/utils';
import { Spinner } from '../ui/spinner';
import CanvasFloatingToolbar from './canvas-floating-toolbar';
import { TOOL_MODE_ENUM, ToolModeType } from '../../constant/canvas';
import CanvasControls from './canvas-controls';
import DeviceFrame from './device-frame';
import { transform } from 'next/dist/build/swc/generated-native';
import DeviceFrameSkeleton from './device-frame-skeleton';
import HtmlDialog from './html-dialog';

const DEMO_HTML = `<div class="w-full h-full p-8 space-y-6">
  <div class="space-y-2">
    <h1 class="text-4xl font-bold">Welcome to Demo</h1>
    <p class="text-lg opacity-80">This is a theme preview component</p>
  </div>

  <div class="space-y-4">
    <h2 class="text-2xl font-semibold">Color Palette</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 rounded-lg bg-blue-500 text-white font-semibold">Primary Color</div>
      <div class="p-4 rounded-lg bg-green-500 text-white font-semibold">Success Color</div>
      <div class="p-4 rounded-lg bg-yellow-500 text-white font-semibold">Warning Color</div>
      <div class="p-4 rounded-lg bg-red-500 text-white font-semibold">Error Color</div>
    </div>
  </div>

  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">Typography</h2>
    <p class="text-sm">Small text sample</p>
    <p class="text-base">Base text sample</p>
    <p class="text-lg font-medium">Medium text sample</p>
    <p class="text-xl font-bold">Bold text sample</p>
  </div>

  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">Interactive Elements</h2>
    <button class="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:opacity-90">Primary Button</button>
    <button class="px-6 py-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold hover:bg-blue-50">Secondary Button</button>
  </div>

  <div class="space-y-3">
    <h2 class="text-2xl font-semibold">Card Example</h2>
    <div class="p-4 rounded-lg border border-gray-300 space-y-2">
      <h3 class="font-semibold">Card Title</h3>
      <p class="text-sm opacity-75">This is a card component with some content inside to demonstrate the theme colors and typography.</p>
    </div>
  </div>
</div>
`;

const Canvas = ({
    projectId,
    isPending,
    projectName,
} : {
    projectId: string;
    isPending: boolean;
    projectName: string | null;
}) => {
    const { theme, frames, selectedFrame, loadingStatus} = useCanvas();

    const [toolMode, setToolMode] = useState<ToolModeType>(
        TOOL_MODE_ENUM.SELECT
    )
    const [zoomPercent, setZoomPercent] = useState<number>(53)
    const [currentScale, setCurrentScale] = useState<number>(0.53)
    const [openHtmlDialog, setOpenHtmlDialog] = useState(false);


    const currentStatus = isPending 
    ? "fetching" 
    : loadingStatus !== "idle" && loadingStatus !== "completed"
    ? loadingStatus
    : null;

    const onOpenHtmlDialog = () => {
        setOpenHtmlDialog(true);
    };

    return (
        <>
            <div className='relative w-full h-full'>
                <CanvasFloatingToolbar 
                projectId={projectId}
                />
                {currentStatus && <CanvasLoader status={currentStatus}/>}
                <TransformWrapper
                    initialScale={0.53}
                    initialPositionX={40}
                    initialPositionY={5}
                    minScale={0.1}
                    maxScale={3}
                    wheel={{step: 0.1}}
                    pinch={{step: 0.1}}
                    doubleClick={{disabled: true}}
                    centerZoomedOut={false}
                    centerOnInit={false}
                    smooth={true}
                    limitToBounds={false}
                    panning={{disabled: toolMode !== TOOL_MODE_ENUM.HAND,}}
                    onTransformed={(ref) => {
                        setZoomPercent(Math.round(ref.state.scale * 100));
                        setCurrentScale(ref.state.scale);
                    }}
                >
                    {({zoomIn, zoomOut}) => (
                        <>
                            <div
                            className={cn(`
                                absolute inset-0 w-full h-full bg-[#eee]
                                dark:bg-[#242423] p-3`,
                                toolMode === TOOL_MODE_ENUM.HAND 
                                ? "cursor-grab active:cursor-grabbing"
                                : "cursor-default"
                            )}
                            style={{
                                backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                            }}
                            >
                                <TransformComponent
                                 wrapperStyle={{
                                    width: "100%",
                                    height: "100%",
                                    overflow: "unset",
                                }}
                                contentStyle={{
                                    width: "100%",
                                    height: "100%",
                                 }}
                                >
                                    <div>{frames?.map((frame, index:number) => {
                                        const baseX = 100 + index * 480;
                                        const y = 100;
                                        if(frame.isLoading) {
                                            return (
                                                <DeviceFrameSkeleton
                                                    key={index}
                                                    style={{
                                                        transform: `translate(${baseX}px, ${y}px)`,
                                                    }}
                                                />
                                            )
                                        }
                                        return (
                                            <DeviceFrame 
                                                key={frame.id}
                                                frameId={frame.id}
                                                title={frame.title}
                                                html={frame.htmlContent}
                                                scale={currentScale}
                                                initialPosition={{
                                                    x:baseX,
                                                    y,
                                                }}
                                                toolMode={toolMode}
                                                theme_style={theme?.style}
                                                onOpenHtmlDialog={onOpenHtmlDialog}
                                            />
                                        )
                                    })}</div>
                                    {frames.length === 0 && loadingStatus === 'idle' && (
                                        <DeviceFrame 
                                        frameId="demo"
                                        title="Demo Frame"
                                        html={DEMO_HTML}
                                        scale={currentScale}
                                        initialPosition={{
                                            x:1000,
                                            y: 100,
                                        }}
                                        toolMode={toolMode}
                                        theme_style={theme?.style}
                                        onOpenHtmlDialog={onOpenHtmlDialog} />
                                    )}
                                </TransformComponent>
                            </div>

                            <CanvasControls 
                            zoomIn={zoomIn}
                            zoomOut={zoomOut}
                            zoomPercent={zoomPercent}
                            toolMode={toolMode}
                            setToolMode={setToolMode}
                            />
                        </>

                    )}
                </TransformWrapper>
            </div>
            <HtmlDialog 
                html={selectedFrame?.htmlContent || DEMO_HTML}
                theme_style={theme?.style}
                open={openHtmlDialog}
                onOpenChange={setOpenHtmlDialog}
                
            />
        </>
    );
};

function CanvasLoader({status} : {status?: LoadingStatusType | "fetching"}) {
    return (
        <div className={cn(`
            absolute top-8 left-1/2 -translate-x-1/2 min-w-40
            max-w-full px-4 pt-1.5 pb-2
            rounded-br-xl rounded-bl-xl shadow-md
            flex items-center space-x-2 z-10`,

            status === "fetching" && "bg-gray-500 text-white",
            status === "running" && "bg-amber-500 text-white",
            status === "analyzing" && "bg-blue-500 text-white",
            status === "generating" && "bg-purple-500 text-white",
            )}
        >
            <Spinner className="w-4 h-4 stroke-3!" />
            <span className='text-sm font-semibold capitalize'>
                {status === "fetching" ? "Loading Project" : status}
            </span>

        </div>
    )
}

export default Canvas