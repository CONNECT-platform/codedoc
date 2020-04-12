import { CodedocTheme } from '../theme';


export function useTheme(theme: CodedocTheme) {
  (window as any).theme = theme;
}
