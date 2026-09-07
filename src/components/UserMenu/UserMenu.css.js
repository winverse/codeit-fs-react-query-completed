import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css.js';

export const userMenu = style({
  position: 'relative',
  margin: 'auto',
  width: '50px',
});

export const iconButton = style({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  width: '50px',
});

export const userName = style({
  fontSize: '12px',
});

export const popup = style({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  backgroundColor: '#fff',
  position: 'absolute',
  top: 'calc(100% + 25px)',
  right: '-10px',
  border: '1px solid #ebebeb',
  boxShadow: vars.boxShadow,
  borderRadius: '5px 0 5px 5px',
  overflow: 'hidden',
});

export const popupItem = style({
  padding: '15px 19px',
  fontFamily: 'var(--noto-sans)',
  textAlign: 'center',
  selectors: {
    '&:hover': {
      backgroundColor: '#f4f4f4',
      cursor: 'pointer',
    },
    '&.disabled': {
      backgroundColor: '#fff',
      color: '#c4c4c4',
      userSelect: 'none',
      cursor: 'default',
    },
  },
});
