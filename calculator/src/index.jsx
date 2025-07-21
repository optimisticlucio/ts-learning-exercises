import React from 'https://esm.sh/react';
import ReactDOM from 'https://esm.sh/react-dom/client';
import { css } from 'https://esm.sh/@emotion/react';

const style = css`
  color: hotpink;
`;

function App() {
    return <h1 css={style}>Hello Emotion + React!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
