/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // Adicione outras variáveis de ambiente, se necessário
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  // Suporte para arquivos de mídia
  declare module '*.mp4' {
    const src: string;
    export default src;
  }