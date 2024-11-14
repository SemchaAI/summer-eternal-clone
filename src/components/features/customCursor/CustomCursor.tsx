// CustomCursor.tsx
import { useEffect, useCallback } from 'react';

import css from './customCursor.module.scss';
import { useCursor } from '@/utils/hooks';
import { MoveRight } from 'lucide-react';

export const CustomCursor = () => {
  const isTouchScreen =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const { position, cursorStyle, setPosition, setCursorStyle } = useCursor();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    },
    [setPosition]
  );
  const handleMouseDown = useCallback(() => {
    setCursorStyle({ baseClass: 'click' });
    setTimeout(() => setCursorStyle({ baseClass: 'click-release' }), 300);
  }, [setCursorStyle]);

  const handleMouseUp = useCallback(() => {
    setTimeout(() => setCursorStyle({ baseClass: '' }), 300);
  }, [setCursorStyle]);

  const handleMouseEnter = useCallback(
    (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isHover = target.classList.contains('red-hover');
      const isWaitlist = target.classList.contains('waitlist-hover');
      if (isHover) {
        setCursorStyle({ hoverClass: 'redHover' });
      } else if (isWaitlist) {
        setCursorStyle({ hoverClass: 'waitlistHover' });
      } else {
        setCursorStyle({ hoverClass: 'hover' });
      }
    },
    [setCursorStyle]
  );

  const handleMouseLeave = useCallback(() => {
    setCursorStyle({ hoverClass: '' });
  }, [setCursorStyle]);

  useEffect(() => {
    if (isTouchScreen) return;
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const hoverElements = document.querySelectorAll(
      '.red-hover, .waitlist-hover'
    );
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    isTouchScreen,
  ]);

  return (
    <div
      id="cursor"
      className={`${css.customCursor} ${css[cursorStyle.baseClass] || ''} ${
        css[cursorStyle.hoverClass] || ''
      } ${css[cursorStyle.colorClass] || ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* {cursorStyle.hoverClass === 'waitlistHover' &&  (*/}
      <div className={css.waitlistWrapper}>
        <p className={css.waitlistText}>support us</p>
        <MoveRight
          color="var(--text-active)"
          width={32}
        />
      </div>
      {/* )} */}
    </div>
  );
};
