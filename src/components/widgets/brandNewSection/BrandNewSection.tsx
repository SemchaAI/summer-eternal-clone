import { useEffect, useRef, useState } from 'react';
import css from './brandNewSection.module.scss';
// import useIntersectionObserver from '@/utils/hooks/useIntersectionObserver';
import { useInView } from 'react-intersection-observer';

// interface IProps {
//   //className?: string;
// }

export const BrandNewSection = () => {
  // const textRef = useRef(null);
  const [translate, setTranslate] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  // const isVisible = useIntersectionObserver(textRef, {
  //   root: null, // Use the viewport as the default root
  //   threshold: 0.8, // Trigger when 10% of the element is visible
  // });
  //observer
  const { ref: textRef, inView } = useInView({
    /* Optional options */
    threshold: 0.8,
  });
  //const container = `${ className }`;
  useEffect(() => {
    if (!elementRef.current) return;

    const scrollY = window.scrollY;

    const h = elementRef.current.offsetHeight; //168
    console.log('h', h);

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < scrollY) return setTranslate(0);
      const scrollDiff = currentScroll - scrollY;

      // Adjust the translate value smoothly
      setTranslate(Math.min(h, scrollDiff));
    };

    const optimizedScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    if (inView) {
      window.addEventListener('scroll', optimizedScroll);
    }

    return () => window.removeEventListener('scroll', optimizedScroll);
  }, [inView]);
  return (
    <section
      className={css.manifestoSection}
      ref={textRef}
    >
      <div className={css.spacer}></div>
      <div className={css.container}>
        <div className={css.manifestoLabel}>
          <div className={css.manifestoTag}>a brand</div>
          <div className={css.manifestoTag}>new</div>
        </div>
        <div className={css.manifestoTextBlock}>
          <div className={css.manifestoLineContainer}>
            <div className={css.manifestoHidden}>
              <div
                id="manifestoLine"
                style={{
                  willChange: 'transform',
                  transform: `translateY(-${translate}px)`,
                }}
                className={css.manifestoLine}
              >
                <div className={css.manifestoText}>
                  <h1
                    ref={elementRef}
                    className={css.manifestoTitle}
                  >
                    game
                  </h1>
                </div>
                <div className={css.manifestoText}>
                  <h1 className={css.manifestoTitle}>art</h1>
                </div>
              </div>
            </div>
            <div className={css.manifestoHidden}>
              <div
                style={{
                  willChange: 'transform',
                  transform: `translateY(-${translate}px)`,
                }}
                className={css.manifestoLine}
              >
                <div className={css.manifestoText}>
                  <h1 className={css.manifestoTitle}>studio</h1>
                </div>
                <div className={css.manifestoText}>
                  <h1 className={css.manifestoTitle}>collective</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.spacer}></div>
    </section>
  );
};
