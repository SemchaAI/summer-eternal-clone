import { useState } from 'react';
import css from './mainHeader.module.scss';
import { nav } from '@/utils/const';
import { useCursor, useScrollControl } from '@/utils/hooks';

export const MainHeader = () => {
  const [open, setOpen] = useState(false);
  const { setCursorStyle } = useCursor();
  useScrollControl(open);

  const handleClick = () => {
    if (!open) {
      setCursorStyle({ colorClass: 'redCursor' });
    } else {
      setCursorStyle({ colorClass: '' });
    }
    setOpen(!open);
  };

  return (
    <div className={css.headerContainer}>
      <header className={css.header}>
        <div className={css.logo}>
          <div className={css.logoVertical}>
            <a
              href="#"
              className={`${css.logoText} ${css.link}`}
            >
              <span className={css.logoLetter}>S</span>
              <span className={css.logoLetter}>U</span>
              <span className={css.logoLetter}>M</span>
              <span className={css.logoLetter}>M</span>
              <span className={css.logoLetter}>E</span>
              <span className={css.logoLetter}>R</span>
            </a>
          </div>
          <div className={css.logoHorizontal}>
            <a
              href="#"
              className={css.link}
            >
              ETERNAL
            </a>
          </div>
        </div>
        <div className={css.container}>
          {/* //redCursor for customCursor */}
          <button
            className={`${css.btn} ${open ? css.openBtn : 'red'}`}
            onClick={handleClick}
          >
            <div className={css.hamburger}>
              <span
                className={`${css.line} ${open ? css.activeLine : ''}`}
              ></span>
              <span
                className={`${css.line} ${open ? css.activeLine : ''}`}
              ></span>
              <span
                className={`${css.line} ${open ? css.activeLine : ''}`}
              ></span>
            </div>
            <p className={css.btnText}>{open ? 'Close' : 'Menu'}</p>
          </button>
        </div>
      </header>
      <nav className={`${css.nav} ${open ? css.openNav : ''}`}>
        {nav.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={css.navLink}
          >
            {item.name}
          </a>
        ))}
      </nav>
      <div
        id="headerLine"
        className={css.headerLine}
      ></div>
    </div>
  );
};
