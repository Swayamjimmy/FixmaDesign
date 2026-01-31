"use client"

import { useRef, useState } from 'react';
import { ToolModeType } from '../../constant/canvas';
import { useCanvas } from '../../context/canvas-context';

type PropsType = {
    html: string;
    title?: string;
    width?: number;
    minHeight?: number | string;
    initialPosition?: {x: number; y: number};
    frameId: string;
    scale?: number;
    toolMode: ToolModeType;
    theme_style?: string;
};

const DeviceFrame = ({
    html,
    title = "Untitled",
    width = 420,
    minHeight = 800,
    initialPosition = { x: 0, y: 0},
    frameId,
    scale = 1,
    toolMode,
    theme_style,
}: PropsType) => {
    const { selectedFrameId, setSelectedFrameId } = useCanvas();
    const [frameSize, setFrameSize] = useState({
        width,
        height: minHeight,
    });
    const iframeRef = useRef<HTMLFrameElement>(null);
    const isSelected = selectedFrameId === frameId;
    const fullHtml = getHTMLWrapper(html, title, theme_style, frameId);
  return (
    <div>DeviceFrame</div>
  )
}

export default DeviceFrame