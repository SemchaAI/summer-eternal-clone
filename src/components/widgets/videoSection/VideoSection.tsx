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

  const wdth = useRef(window.innerWidth);
  const [scale, setScale] = useState(0.62); // Initial scale set to 0.62
  const [translate, setTranslate] = useState(wdth.current / 2 - 54); // 252px is text width, 25%
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scaleMin = 0.62;
      const scaleMax = 1;

      const newScale = Math.max(
        scaleMin,
        Math.min(scaleMax, scaleMin + scrollY / 1000)
      );
      const translateMin = 0;
      const translateMax = wdth.current / 2 - 54;
      const newTranslate = Math.max(
        translateMin,
        translateMax - scrollY * 1.667 //number of steps 1.667 for 6 steps
      );

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
