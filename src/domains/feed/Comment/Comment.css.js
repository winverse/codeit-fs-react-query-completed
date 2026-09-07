import { style } from '@vanilla-extract/css';

export const comment = style({
  marginTop: '10px',
  borderBottom: 'solid 1px #ebebeb',
});

export const description = style({
  display: '-webkit-box',
  margin: '0 0 10px',
  overflow: 'hidden',
  fontSize: '14px',
  fontWeight: 300,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});
