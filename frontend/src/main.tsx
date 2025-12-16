import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import App from './App.tsx';
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //bootstrap functionality
import { Provider } from 'react-redux';
import { storeItems } from './store/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  
  <Provider store={storeItems}>
    <App />
    </Provider>
  </StrictMode>,
)
