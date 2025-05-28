// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
// 아래 줄을 확인하세요:
import App from './App';  // ← 이게 'App.js'를 불러오고 있을 가능성 있음
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
