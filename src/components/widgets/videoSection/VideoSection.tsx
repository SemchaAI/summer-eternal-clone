import { useEffect, useRef, useState } from 'react';
import css from './videoSection.module.scss';
import { useInView } from 'react-intersection-observer';

export const VideoSection = () => {
  const videoRef = useRef(null);

  //observer
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const [scale, setScale] = useState(0.62);
  const [translate, setTranslate] = useState(900);
  useEffect(() => {
    const translateMax = 900; // in px
    const scaleMin = 0.62;
    const scaleMax = 1;
    const steps = 5;
    const scrollRange = steps * 100;

    const handleScroll = () => {
      const scrollY = Math.min(window.scrollY, scrollRange);

      const newScale =
        scaleMin + ((scaleMax - scaleMin) * scrollY) / scrollRange;

      // Calculate translate proportionally
      const newTranslate =
        translateMax - (translateMax * scrollY) / scrollRange;

      setScale(newScale);
      setTranslate(newTranslate);
    };

    const optimizedScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', optimizedScroll);

    return () => window.removeEventListener('scroll', optimizedScroll);
  }, []);

  //observer headerLine change
  useEffect(() => {
    const header = document.getElementById('headerLine');
    if (header) {
      // console.log('inView', inView, 'scale', scale);
      if (inView && scale > 0.8) {
        header.style.height = '1px';
      } else {
        header.removeAttribute('style');
      }
    }
  }, [inView, scale]);

  return (
    <section className={css.videoSection}>
      <div className={css.videoContainer}>
        <div className={css.stickyContainer}>
          <div
            ref={ref}
            className={css.container}
          >
            <video
              ref={videoRef}
              src="/movies/main.webm"
              loop
              preload="auto"
              muted
              autoPlay
              playsInline
              className={css.video}
              style={{
                willChange: 'transform',
                transform: `scale(${scale})`,
              }}
            />
            <div className={css.textContainer}>
              <div
                style={{
                  willChange: 'transform',
                  transform: `perspective(1200px) translateX(-${translate}px)`,
                }}
                className={css.textLeft}
              >
                <h2 className={css.title}>A SINGLE SPARK</h2>
              </div>
              <div
                style={{
                  willChange: 'transform',
                  transform: `perspective(1200px) translateX(${translate}px)`,
                }}
                className={css.textRight}
              >
                <h2 className={css.title}>A PRAIRIE FIRE</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
