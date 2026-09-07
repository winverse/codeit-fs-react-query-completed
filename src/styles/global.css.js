import { globalFontFace, globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css.js';

globalFontFace('Gmarket Sans', {
  src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff')",
  fontWeight: '500',
  fontStyle: 'normal',
});

globalFontFace('Gmarket Sans', {
  src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff')",
  fontWeight: '300',
  fontStyle: 'normal',
});

globalFontFace('Gmarket Sans', {
  src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff')",
  fontWeight: '700',
  fontStyle: 'normal',
});

globalStyle('*', {
  boxSizing: 'border-box',
  wordBreak: 'keep-all',
});

globalStyle(':root', {
  vars: {
    [vars.boxShadow]: '5px 5px 10px 0 rgb(0 0 0 / 5%)',
    [vars.gmarketSans]: "'Gmarket Sans'",
  },
});

globalStyle('html', {
  overflowY: 'scroll',
  fontSize: '14px',
  fontWeight: '400',
  fontFamily: 'var(--noto-sans)',
});

globalStyle('body', {
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f9f9f9',
});

globalStyle('a, a:hover, a:active, a:visited', {
  color: '#494949',
  textDecoration: 'none',
});

globalStyle('a, h1, h2, h3, h4, button', {
  fontFamily: vars.gmarketSans,
  fontWeight: 500,
});
