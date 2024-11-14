import { Carousel } from '@/components/features';
import css from './collectiveSection.module.scss';

import type { EmblaOptionsType } from 'embla-carousel';
import { collectiveSlider } from '@/utils/const';
import { SectionHeader } from '@/components/shared';

export const CollectiveSection = () => {
  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

  return (
    <section className={css.collectiveSection}>
      <div className={css.header}>
        <SectionHeader
          className={css.ownTitle}
          tag={['02', 'people']}
          title="The Collective"
        />
      </div>

      <Carousel
        slides={collectiveSlider}
        options={OPTIONS}
      />
    </section>
  );
};
