import { OptimizedImage } from '@/components/shared';
import css from './readMoreSection.module.scss';

export const ReadMoreSection = () => {
  return (
    <section className={css.readMoreSection}>
      <a
        href="#"
        className={css.link}
      >
        <div className={css.tag}>read more:</div>
        <div className={css.linkContainer}>
          <div className={css.linkImgContainer}>
            <OptimizedImage
              className={css.linkImg}
              alt="sun"
              imgSrc="/images/blog/sun"
              webpSrc
              avifSrc
            />
          </div>
          <div className={css.linkDescription}>
            <p className={css.linkText}>October 11, 2024</p>
            <p className={css.linkTitle}>Welcome to the Eternal Season</p>
            <p className={css.linkText}>Dora Klindžić,writher</p>
            <p className={css.linkTextDescription}>
              "We are preparing a conflagration, an end to mourning, an end to
              the poison fog of demoralization and the apathy tears of the
              mentally imprisoned. "
            </p>
          </div>
        </div>
      </a>
    </section>
  );
};
