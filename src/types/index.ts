import { PropsWithChildren } from 'react';

export type PropsWithClassName = {
  className?: string;
};

export type PropsWithClassNameAndChildren = PropsWithChildren & PropsWithClassName;

// export interface Window {
//   Telegram: {
//     getWidgetInfo: (el_or_id: HTMLElement | string, callback: Function) => void;
//     setWidgetOptions: (options: TelegramOptions, el_or_id: HTMLElement | string) => void;
//     Login: {
//       // 👇 init checks for base64 'tgAuthResult' in URL, though redirect after login has 'hash' instead, so ????
//       init: (options: TelegramOptions, auth_callback: (auth_result: TelegramResponseType) => void) => void;
//       open: (callback: (authData: TelegramResponseType) => void) => void;
//       auth: (options: TelegramOptions, callback: (authData: TelegramResponseType) => void) => void;
//       widgetsOrigin: 'https://oauth.telegram.org' | 'https://oauth.tg.dev';
//     };
//   };
// }
