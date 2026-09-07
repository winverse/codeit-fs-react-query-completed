import { style } from '@vanilla-extract/css';

export const commentList = style({
  margin: '20px 0 0',
  padding: '0 10px',
  borderTop: '1px solid #ebebeb',
});

export const pagination = style({
  width: '240px',
  margin: 'auto',
  marginTop: '20px',
  display: 'flex',
});

export const paginationButton = style({
  padding: '8px',
  width: '30px',
  height: '30px',
  border: 'none',
  selectors: {
    '&:disabled': {
      backgroundColor: 'rgb(193, 193, 193)',
      color: 'grey',
    },
  },
});
