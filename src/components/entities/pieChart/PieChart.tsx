import css from './pieChart.module.scss';
import React, { useMemo, useRef } from 'react';

interface PieChartProps {
  data: number[]; // Percentages for each segment
  colors: string[]; // Colors for each segment
  images: {
    src: string;
    // sizes: { width: number; height: number };
    translate: [number, number];
    scale?: number;
  }[]; // Paths to images for segments
  size: number; // Size of the pie chart
  handleHover: (index: number | null) => void;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  colors,
  images,
  size,
  handleHover,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);
  // Calculate the radius and circumference
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((acc, value) => acc + value, 0);
  let cumulativePercent = 0;

  // Calculate the stroke-dasharray for each segment
  const segments = useMemo(() => {
    return data.map((value, index) => {
      const percentage = (value / total) * 100;
      const length = (percentage / 100) * circumference;
      const startOffset = (cumulativePercent / 100) * circumference;

      cumulativePercent += percentage;

      return {
        percentage,
        length,
        startOffset,
        color: colors[index],
        image: images[index],
      };
    });
  }, [data, colors, images, total, circumference]);

  return (
    <svg
      ref={containerRef}
      className={css.pieChart}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(-0.25turn)' }}
    >
      <defs>
        {images.map((image, index) => (
          <pattern
            key={index}
            id={`pattern-${index}`}
            patternUnits="objectBoundingBox"
            width="1"
            height="1"
            patternTransform={`rotate(90)`}
          >
            <image
              preserveAspectRatio="xMinYMin meet"
              href={image.src}
              // style={{ aspectRatio: '1/1.5' }}
              // x="0"
              // y="0"
              // transform={`translate(${image.translate})`}
              // width={`${image.sizes.width}`}
              // height={image.sizes.height}
              // style={{ transform: `translate(${image.translate})` }}
              x={`${image.translate[0]}%`} // Convert translate x percentage
              y={`${image.translate[1]}%`} // Convert translate y percentage
              style={{ transform: `scale(${image.scale || 1})` }}
              width="100%"
              height="100%"
            />
          </pattern>
        ))}
      </defs>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            stroke={`url(#pattern-${index})`}
            strokeWidth={size}
            strokeDasharray={`${segment.length} ${
              circumference - segment.length
            }`}
            strokeDashoffset={-segment.startOffset}
            className={css.segmentPattern}
          />
          <circle
            className={css.piePart}
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth={size}
            strokeDasharray={`${segment.length} ${
              circumference - segment.length
            }`}
            strokeDashoffset={-segment.startOffset}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          ></circle>
        </React.Fragment>
      ))}
    </svg>
  );
};
