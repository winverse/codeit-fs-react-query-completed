import { style } from '@vanilla-extract/css';

export const button = style({
  flex: 'none',
  padding: '8px 10px',
  color: '#fff',
  cursor: 'pointer',
  backgroundColor: '#4cafc8',
  border: 'none',
  borderRadius: '30px',
  outline: 'none',
  height: '40px',
  margin: 'auto',
  fontSize: '12px',
  selectors: {
    '&:disabled': {
      backgroundColor: 'rgb(193, 193, 193)',
      color: 'grey',
    },
  },
});
