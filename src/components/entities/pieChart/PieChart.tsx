// import { useState } from 'react';
// import css from './pieChart.module.scss';

// export const PieChart = ({ data, colors, images, size = 200 }) => {
//   const [hoveredIndex, setHoveredIndex] = useState(null); // Хранит индекс наведенного сегмента
//   const total = data.reduce((sum, value) => sum + value, 0);
//   let cumulativePercent = 0;

//   const getCoordinatesForPercent = (percent) => {
//     const x = Math.cos(2 * Math.PI * percent);
//     const y = Math.sin(2 * Math.PI * percent);
//     return [x, y];
//   };

//   return (
//     <div className={css.pieChartContainer}>
//       <div
//         className={css.chartContainer}
//         style={{ width: size, height: size }}
//       >
//         <svg
//           width={size}
//           height={size}
//           viewBox="-1 -1 2 2"
//           style={{ transform: 'rotate(-0.25turn)' }}
//         >
//           <defs>
//             <pattern
//               id="imagePattern"
//               patternUnits="objectBoundingBox"
//               width="2"
//               height="2"
//               patternTransform={`rotate(90)`}
//             >
//               <image
//                 preserveAspectRatio="none"
//                 href={images[hoveredIndex || 0].src}
//                 transform={`translate(${images[hoveredIndex || 0].translate})`}
//                 width="2" // Размер паттерна будет 100% от размера элемента
//                 height="2"
//               />
//             </pattern>
//           </defs>
//           {data.map((value, index) => {
//             const percent = value / total;
//             const [startX, startY] =
//               getCoordinatesForPercent(cumulativePercent);
//             cumulativePercent += percent;
//             const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
//             const largeArcFlag = percent > 0.5 ? 1 : 0;

//             return (
//               <path
//                 key={index}
//                 d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0 Z`}
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//                 className={css.pieSlice}
//                 // fill={
//                 //   hoveredIndex === index ? 'url(#imagePattern)' : colors[index]
//                 // }
//                 style={{ fill: colors[index] }}
//               ></path>
//             );
//           })}
//         </svg>
//       </div>
//       <div className={css.text}>
//         {hoveredIndex !== null
//           ? images[hoveredIndex].text
//           : 'Hover over each area for more information.'}
//       </div>
//     </div>
//   );
// };
// //"M 208 208 L 208 0 L 0 0 L 0 417 L 277 417 Z

import css from './PieChart.module.scss';
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
