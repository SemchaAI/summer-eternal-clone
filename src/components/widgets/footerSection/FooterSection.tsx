import { Footer } from '@/components/widgets';
import css from './footerSection.module.scss';
import {
  FacebookIcon,
  InstagramIcon,
  MailPlusIcon,
  TwitterIcon,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export const FooterSection = () => {
  const [translateX, setTranslateX] = useState(0);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (entry) {
        console.log(' entry.intersectionRatio', entry.intersectionRatio);
        const elementWidth = entry.boundingClientRect.width;
        const currentTranslate =
          elementWidth - entry.intersectionRatio * elementWidth;
        setTranslateX(currentTranslate);
      }
    };

    const optimizedScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    if (inView) {
      window.addEventListener('scroll', optimizedScroll);
    }

    return () => window.removeEventListener('scroll', optimizedScroll);
  }, [entry, inView]);

  return (
    <section className={css.footerSection}>
      <div className={css.footerTitlesContainer}>
        <h6 className={css.title}>what is genuine is proved in the fire</h6>
        <h6 className={css.title}>
          what is false we shall not miss in our ranks
        </h6>
      </div>
      <div className={css.socialsContainer}>
        <a
          className={`${css.socialsLink} red-hover`}
          target="_blank"
          href="https://www.facebook.com/profile.php?id=61566903096407"
        >
          <FacebookIcon
            size={100}
            className={css.icon}
          />
        </a>
        <a
          className={`${css.socialsLink} red-hover`}
          target="_blank"
          href="mailto:info@summereternal.com"
        >
          <MailPlusIcon
            size={100}
            className={css.icon}
          />
        </a>
        <a
          className={`${css.socialsLink} red-hover`}
          target="_blank"
          href="https://www.instagram.com/summereternalstudio/"
        >
          <InstagramIcon
            size={100}
            className={css.icon}
          />
        </a>
        <a
          className={`${css.socialsLink} red-hover`}
          target="_blank"
          href="https://x.com/summer_eternal_"
        >
          <TwitterIcon
            size={100}
            className={css.icon}
          />
        </a>
      </div>
      <div
        ref={ref}
        className={`${css.waitlistContainer} waitlist-hover`}
      >
        <a
          className={css.waitlistLink}
          style={{ transform: `translateX(${translateX}px)` }}
          href="https://summereternal.eo.page/subscribe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={css.waitlistTitle}>join the waitlist!</h2>
        </a>
      </div>
      <Footer />
    </section>
  );
};
