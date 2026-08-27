// react-toggle-dark-mode ships no type declarations of its own.
// Typed here to match the documented props at
// https://github.com/JoseRFelix/react-toggle-dark-mode#readme
declare module 'react-toggle-dark-mode' {
  import type { ButtonHTMLAttributes, CSSProperties } from 'react';

  export interface DarkModeSwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'children'> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: number | string;
    style?: CSSProperties;
    sunColor?: string;
    moonColor?: string;
    animationProperties?: Record<string, unknown>;
  }

  export function DarkModeSwitch(props: DarkModeSwitchProps): JSX.Element;
}
