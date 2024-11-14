import css from './markedText.module.scss';

interface IProps {
  textMark: string;
}

export const MarkedText = ({ textMark }: IProps) => {
  return <mark className={css.manifestoMark}>{textMark}</mark>;
};
