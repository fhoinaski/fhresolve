import React, { StrictMode } from 'react'; // Importação ajustada para incluir React
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Renderiza o aplicativo com StrictMode apenas em desenvolvimento
const isDev = import.meta.env.DEV;
const RootComponent = isDev ? StrictMode : React.Fragment;

createRoot(document.getElementById('root')!).render(
  <RootComponent>
    <App />
  </RootComponent>
);