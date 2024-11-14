import { MarkedText, OptimizedImage, SectionHeader } from '@/components/shared';
import { ManifestoParaph } from '@/components/entities';
import { manifestoContent } from '@/utils/const';

import css from './manifestoSection.module.scss';
import { Download } from 'lucide-react';

export const ManifestoSection = () => {
  return (
    <section className={css.manifestoSection}>
      <div className={css.manifestoHeader}>
        <div className={css.manifestoBlock}>
          <SectionHeader
            tag={['01', 'praxis']}
            title="Manifesto"
            className={css.manifestoTitle}
          />
          {/* <div>
          <div className={css.manifestoTag}>
            <p className={css.tag}>01</p>
            <p className={css.tag}>praxis</p>
          </div>
          <h2 className={css.manifestoTitle}>Manifesto</h2>
          </div> */}
        </div>
        <div className={css.manifestoLogo}>
          <OptimizedImage
            className={css.manifestoImg}
            alt="logo"
            imgSrc="/images/logo/logo"
            webpSrc
            avifSrc
          />
        </div>
      </div>
      <div className={css.manifestoContent}>
        {manifestoContent.map((item, index) => (
          <ManifestoParaph key={index}>
            {item.textParts.map((part, i) => {
              if (typeof part === 'string') {
                return part === '<br />' ? <br key={i} /> : part;
              } else {
                return (
                  <MarkedText
                    key={i}
                    textMark={part.textMark}
                  />
                );
              }
            })}
          </ManifestoParaph>
        ))}
      </div>
      <a
        className={css.manifestoLink}
        href="https://e.summereternal.com/SE-Pamphlet.pdf"
        target="_blank"
      >
        <Download
          size={16}
          stroke="var(--text-secondary)"
        />
        download printable manifesto pamphlet
      </a>
    </section>
  );
};
