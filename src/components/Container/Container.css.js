import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  '@media': {
    '(max-width: 500px)': {
      padding: '0 calc(14px * 5)',
    },
  },
});
