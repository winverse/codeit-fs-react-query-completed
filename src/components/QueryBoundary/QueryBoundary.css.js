import { style } from '@vanilla-extract/css';

export const errorFallback = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
});

export const retryButton = style({
  width: '120px',
});
