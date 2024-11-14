import { InView } from 'react-intersection-observer';
import css from './manifestoParaph.module.scss';

interface IProps {
  // textPartOne: string;
  // textMark: string;
  // breakLine?: boolean;
  // textAfterMark?: string;
  // textPartTwo: string;
  children: React.ReactNode;
}

export const ManifestoParaph = ({ children }: IProps) => {
  return (
    <InView
      triggerOnce
      as="p"
      onChange={(inView, entry) => {
        if (inView) {
          (entry.target as HTMLParagraphElement).style.setProperty(
            '--highlighted',
            '1'
          );
        }
      }}
      className={css.manifestoText}
    >
      {children}
    </InView>
  );
};
