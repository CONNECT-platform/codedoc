export interface ContentTheme {
  background: string;
  text: string;
}

export interface CodedocTheme {
  primary: string;
  primaryContrast: string;
  light: ContentTheme;
  dark: ContentTheme;
}

export const DefaultTheme: CodedocTheme = {
  primary: '#4A90E2',
  primaryContrast: '#ffffff',
  light: {
    background: '#f5f5f5',
    text: '#424242',
  },

  dark: {
    background: '#212121',
    text: '#eeeeee',
  }
}

export interface ThemeExtension {
  primary?: string;
  primaryContrast?: string;
  light?: Partial<ContentTheme>;
  dark?: Partial<ContentTheme>;
}


export function createTheme(extension: ThemeExtension): CodedocTheme {
  const res = { ... DefaultTheme };

  if (extension.primary) res.primary = extension.primary;
  if (extension.primaryContrast) res.primaryContrast = extension.primaryContrast;
  if (extension.light) Object.assign(res.light, extension.light);
  if (extension.dark) Object.assign(res.dark, extension.dark);

  return res;
}
