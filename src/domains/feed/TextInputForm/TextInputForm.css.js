import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  height: '50px',
  width: '100%',
});

export const avatar = style({
  margin: 'auto',
});

export const textarea = style({
  flex: '1 1',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: 500,
  borderRadius: '5px',
  outline: 'none',
  margin: '0 10px',
  border: '1px solid #ebebeb',
  selectors: {
    '&::placeholder': {
      color: '#878787',
    },
  },
});
