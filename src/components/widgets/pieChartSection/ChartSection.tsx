import { PieChart } from '@/components/entities';
import css from './chartSection.module.scss';
import React, { useEffect, useState } from 'react';
import { SectionHeader } from '@/components/shared';

interface TextSegment {
  //type: 'text' | 'element';
  content: string | JSX.Element;
}

interface ParagraphProps {
  segments: TextSegment[];
  title: string;
}

const chartText: ParagraphProps[] = [
  {
    title: 'EVERY PLAYER — MEMBER OF THE BOARD',
    segments: [
      {
        // type: 'text',
        content: 'For the final ',
      },
      {
        //   type: 'element',
        content: (
          <span>
            <strong>5% of shares</strong>,
          </span>
        ),
      },
      {
        //  type: 'text',
        content:
          ' a non-profit organisation will be set-up, with membership being accepted for owners of our games. Although 5% is a shy amount, it’s still powerful enough for the playerpool to summon a general Assembly to discuss a topic. This non-profit will be the "voice of the gamers" in an experimental attempt to ',
      },
      {
        //  type: 'element',
        content: (
          <span>
            formalise the community decision-making in game development.
          </span>
        ),
      },
      {
        //   type: 'text',
        content:
          ' The non-profit can use the game revenue to organise events, support union-work, or whatever their assembly (comprised of all members) decides on.',
      },
    ],
  },
  {
    title: 'MONEYLENDERS OF THE WORLD, UNITE',
    segments: [
      {
        // type: 'text',
        content: 'A Limited Liability Company will be set up to hold ',
      },
      {
        //   type: 'element',
        content: <span>20% of shares</span>,
      },
      {
        //  type: 'text',
        content:
          ', and this company will be where we will attract investors. As investors add capital to it, this capital will be contractually used to ',
      },
      {
        //  type: 'element',
        content: <span>fund the development of our creative projects</span>,
      },
      {
        //   type: 'text',
        content:
          ', similar to standard investment deals developers and publishers sign to fund game development, and, similarly to publishers, when the game is released, this entity will have a revenue-share model as well.',
      },
    ],
  },
  {
    title: 'WORKERS` SELF-MANAGEMENT',
    segments: [
      {
        // type: 'text',
        content:
          'For all those workers who are not part of the creative co-op of full-time workers, a second co-op is being designed, with ',
      },
      {
        //   type: 'element',
        content: <span>25% of the shares</span>,
      },
      {
        //  type: 'text',
        content: ', and a complex structure that accepts ',
      },
      {
        //  type: 'element',
        content: <span>collaborators in all roles</span>,
      },
      {
        //   type: 'text',
        content:
          ' (creative or support) taking into account their tenure (short-term or long-term) and scope (part-time, freelancers, outsourcers). It will be implemented in a way similar to existing employee-stock-ownership programs, but not directly individualised. More on that in the detailed studio architecture.',
      },
    ],
  },
  {
    title: 'CREATIVES HOLD UP HALF THE SKY - CREATIVES HOLD HALF THE POWER',
    segments: [
      {
        // type: 'text',
        content:
          'The creative team working on the game full-time should always',
      },
      {
        //   type: 'element',
        content: <span>retain control over their means of creation.</span>,
      },
      {
        //  type: 'text',
        content:
          'Instead of individualising their stakes as shareholders (which can be sold, inherited, ill-gotten), a co-operative will democratically decide on our course and speed. This co-op will constitute ',
      },
      {
        //  type: 'element',
        content: <strong>50%+1 of shares, </strong>,
      },
      {
        //   type: 'text',
        content:
          'to be managed equally among all cooperative members. As time goes by, leaving collaborators are opted out, and new ones are co-opted in, thus the current creative team is always in charge.',
      },
    ],
  },
];
const chartNullText: ParagraphProps = {
  title: '',
  segments: [
    {
      //   type: 'text',
      content: 'Hover over each area for more information.',
    },
  ],
};
export const ChartSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    setAnimate(true);
  };
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex, animate]);

  return (
    <section className={css.chartSection}>
      <div className={css.header}>
        <SectionHeader
          className={css.ownTitle}
          tag={['about', 'us']}
          title="Studio Architecture"
        />
      </div>
      <div className={css.sectionContent}>
        <p className={css.sectionDescription}>
          For our studio, we are experimenting with a structure that will take
          into account both the necessities of market-based game development,
          and the ideals of collective art-making.
        </p>
        <div className={css.chartContainer}>
          <div className={css.diagramContainer}>
            <PieChart
              size={416} //416
              data={[5, 15, 25, 55]} // Данные
              colors={['#E9E9E9', '#ABABAB', '#5E5E5E', '#171717']} // Цвета сегментов
              images={[
                {
                  src: '/images/charts/member.webp',
                  translate: [8, 0],
                },
                {
                  src: '/images/charts/moneylenders.webp',
                  translate: [59, -5], //165, -5
                  scale: 0.7,
                },
                {
                  src: '/images/charts/selfManagment.webp',
                  translate: [27, 32.5],
                },
                {
                  src: '/images/charts/creatives.webp',
                  translate: [-26, 0],
                  scale: 1.4,
                },
              ]}
              handleHover={handleHover}
            />
          </div>
          <div className={css.textContainer}>
            <div className={`${css.title} ${animate ? 'slideInCenter' : ''}`}>
              {hoveredIndex !== null
                ? chartText[hoveredIndex].title
                : chartNullText.title}
            </div>
            <div
              className={`${css.description} ${animate ? 'slideInCenter' : ''}`}
            >
              <p className={css.descriptionText}>
                {hoveredIndex !== null
                  ? chartText[hoveredIndex].segments.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.content}
                      </React.Fragment>
                    ))
                  : chartNullText.segments[0].content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
