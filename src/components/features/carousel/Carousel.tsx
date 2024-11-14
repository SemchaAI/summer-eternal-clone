import React, { useCallback, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
// import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from './CarouselDotButton';

import css from './carousel.module.scss';
import { OptimizedImage } from '@/components/shared';
import { useInView } from 'react-intersection-observer';

type PropType = {
  slides: {
    fullName: string;
    avatar: string;
    role: string | null;
    position: string;
  }[];
  options?: EmblaOptionsType;
};

export const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: false, stopOnInteraction: true, speed: 0.8 }),
  ]);
  const { ref: sliderRef, inView } = useInView({
    /* Optional options */
    threshold: 0.8,
  });

  const startAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    autoScroll.play();
  }, [emblaApi]);
  const stopAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    autoScroll.stop();
  }, [emblaApi]);

  useEffect(() => {
    if (!inView) return stopAutoplay();
    startAutoplay();
  }, [emblaApi, inView, startAutoplay, stopAutoplay]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    stopAutoplay
  );

  return (
    <div
      ref={sliderRef}
      className={css.embla}
    >
      <div
        className={css.emblaViewport}
        ref={emblaRef}
      >
        <div className={css.emblaContainer}>
          {slides.map(({ fullName, avatar, role, position }, index) => (
            <div
              className={css.emblaSlide}
              key={index}
            >
              <div className={css.emblaSlideContent}>
                <OptimizedImage
                  className={css.emblaSlideImg}
                  alt={fullName}
                  imgSrc={avatar}
                  webpSrc
                  style={{
                    objectPosition: `${position}`,
                  }}
                />
                <div
                  className={`${css.emblaSlideInfo} ${
                    role === null ? `${css.emblaSpecialSlideInfo}` : ''
                  }`}
                >
                  <div className={css.emblaSlideName}> {fullName}</div>
                  {role && <div className={css.emblaSlideRole}>{role}</div>}
                </div>
                {role === null && <div className={css.emblaSlideOverlay} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={css.emblaControls}>
        <div className={css.emblaDots}>
          {scrollSnaps.map((_, index: number) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={
                css.emblaDot +
                (index === selectedIndex ? ` ${css.emblaDotSelected}` : '')
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
