import { FlipText } from '@/components/shared';
import css from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footerPart}>
        <FlipText text="contact" />
        <FlipText
          link="mailto:info@summereternal.com"
          text="info@summereternal.com"
        />
        <FlipText
          link="mailto:press@summereternal.com"
          text="press@summereternal.com"
        />
      </div>
      <div className={css.footerPart}></div>
      <div className={css.footerPart}>
        <p className={css.footerText}>© summer eternal d.d.</p>
        <p className={css.footerText}>
          (to be established on 1 april 2025, zagreb, croatia)
        </p>
      </div>
      <div className={css.footerPart}>
        <div className={css.footerLine}>
          <p className={css.footerText}>© </p>
          <div className={css.copyrightContainer}>
            <FlipText text="design template by" />
            <FlipText text="swiss themes" />
            <p className={css.footerText}>2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
