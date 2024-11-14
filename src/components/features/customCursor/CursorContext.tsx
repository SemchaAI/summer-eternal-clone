// CursorContext.tsx
import { createContext, useState, useCallback } from 'react';

type CursorStyle = {
  baseClass: string;
  hoverClass: string;
  colorClass: string;
};

type CursorContextType = {
  position: { x: number; y: number };
  cursorStyle: CursorStyle;
  setPosition: (position: { x: number; y: number }) => void;
  setCursorStyle: (style: Partial<CursorStyle>) => void;
};

export const CursorContext = createContext<CursorContextType | undefined>(
  undefined
);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>({
    baseClass: '',
    hoverClass: '',
    colorClass: '',
  });

  const updatePosition = useCallback((pos: { x: number; y: number }) => {
    setPosition(pos);
  }, []);

  const updateCursorStyle = useCallback((style: Partial<CursorStyle>) => {
    setCursorStyle((prev) => ({ ...prev, ...style }));
  }, []);

  return (
    <CursorContext.Provider
      value={{
        position,
        cursorStyle,
        setPosition: updatePosition,
        setCursorStyle: updateCursorStyle,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};
