import { style } from '@vanilla-extract/css';

export const post = style({});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '134px',
  padding: '20px 20px 30px',
  backgroundColor: '#ffffff',
  borderTop: 'solid 1px #ebebeb',
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

export const engagement = style({
  marginTop: '20px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
});

export const engagementButton = style({
  width: '120px',
  color: '#4cafc8',
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#4cafc8',
  borderRadius: '30px',
  height: '40px',
  fontSize: '10px',
});

export const likeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
});

export const like = style({
  width: '12px',
  height: '12px',
  marginTop: '-2px',
});
