import * as React from 'react';
import { Rect } from 'react-konva';
import { useEngine } from '../hooks/useEngine';
import { useConfig } from '../hooks/useConfig';
import { useData } from '../hooks/useData';

export const TrafficLight = (props: {}) => {
    const engine = useEngine();
    const config = useConfig();
    const data = useData();

    const handleClick = () => {
        if (data.trafficLightColor === 'green') {
            engine.red();
        } else {
            engine.green();
        }
    };

    return (
        <Rect
            x={config.trafficLightPosition / config.resolution}
            y={274}
            width={10}
            height={10}
            fill={data.trafficLightColor}
            onClick={handleClick}
        />
    );
};