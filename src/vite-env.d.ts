/// <reference types="vite/client" />
declare module '*.svg' {
    import { ReactComponent } from 'react';
    const content: ReactComponent;
    export default content;
  }