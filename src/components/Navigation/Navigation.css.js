import { style } from '@vanilla-extract/css';

export const nav = style({
  position: 'relative',
  zIndex: 1,
  padding: '15px 0',
  backgroundColor: '#fff',
  boxShadow: 'var(--box-shadow)',
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const menu = style({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

export const menuItem = style({
  selectors: {
    '&:not(:last-child)': {
      marginRight: '30px',
    },
  },
});

export const menuLink = style({
  selectors: {
    '&:hover, &:active': {
      textDecoration: 'underline',
    },
  },
});

export const activeLink = style({
  textDecoration: 'underline',
  color: '#4cafc8',
});
