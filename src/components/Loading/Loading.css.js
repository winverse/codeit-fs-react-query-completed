import { style } from '@vanilla-extract/css';

export const loading = style({
  textAlign: 'center',
});

export const icon = style({
  display: 'block',
  margin: '0 auto',
});

export const title = style({
  margin: '20px auto 3px',
  fontSize: '20px',
  fontWeight: 500,
});

export const description = style({
  margin: 0,
  fontWeight: 500,
  lineHeight: 2.07,
  color: '#878787',
});

export const big = style({});

export const titleBig = style({
  fontSize: '24px',
});

export const descriptionBig = style({
  fontSize: '18px',
  lineHeight: 1.61,
});
