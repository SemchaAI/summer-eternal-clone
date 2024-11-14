import css from './flipText.module.scss';

interface IProps {
  text: string;
  link?: string;
  target?: string;
}

export const FlipText = ({ text, link = '', target = '_blank' }: IProps) => {
  return (
    <div className={css.swapContainer}>
      <div className={css.swapLine}>
        {link ? (
          <a
            href={link}
            target={target}
            className={css.swapLineText}
          >
            {text}
          </a>
        ) : (
          <p className={css.swapLineText}>{text}</p>
        )}
      </div>
      <div className={css.swapLine}>
        {link ? (
          <a
            href={link}
            target={target}
            className={css.swapLineText}
          >
            {text}
          </a>
        ) : (
          <p className={css.swapLineText}>{text}</p>
        )}
      </div>
    </div>
  );
};
