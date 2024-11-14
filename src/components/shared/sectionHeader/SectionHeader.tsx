import css from './sectionHeader.module.scss';

interface IProps {
  tag: string[];
  title: string;
  className?: string;
}

export const SectionHeader = ({ tag, title, className }: IProps) => {
  return (
    <div className={css.header}>
      <div className={css.tagContainer}>
        {tag.map((item, index) => (
          <p
            key={index}
            className={css.tag}
          >
            {item}
          </p>
        ))}
      </div>
      <h2 className={`${css.title} ${className ? className : ''}`}>{title}</h2>
    </div>
  );
};
