export interface CodeTheme {
  background: string;
  text: string;

  lineHover: string;
  lineHightlight: string;
  lineHighlightText: string;
  lineCounter: string;
  lineCounterBorder: string;
  lineCounterBorderHover: string;
  lineCounterHighlight: string;

  keyword: string;
  boolean: string;
  number: string;
  string: string;
  function: string;
  parameter: string;
  tag: string;
  comment: string;
  operator: string;
  punctuation: string;
  builtin: string;
  className: string;
  attrName: string;
  attrValue: string;
  plainText: string;
  script: string;
}

export interface QuoteTheme {
  background: string;
  text: string;
  border: string;
}

export interface ContentTheme {
  background: string;
  text: string;
}

export interface CodedocTheme {
  primary: string;
  primaryContrast: string;
  light: ContentTheme;
  dark: ContentTheme;
  code: {
    light: CodeTheme;
    dark: CodeTheme;
  },
  quote: {
    light: QuoteTheme,
    dark: QuoteTheme,
  },
}


export const DefaultCodeTheme: CodeTheme = {
  background: '#212121',
  text: '#e0e0e0',

  keyword: '#7187ff',
  string: '#69f0ae',
  boolean: '#ffc400',
  number: '#ffc400',
  operator: '#18ffff',
  function: '#e0e0e0',
  parameter: '#e0e0e0',
  comment: '#757575',
  builtin: '#e0e0e0',
  punctuation: '#fcf7bb',
  tag: '#ffa372',
  className: '#e0e0e0',
  attrName: '#f6d186',
  attrValue: '#69f0ae',
  plainText: '#bdbdbd',
  script: '#e0e0e0',

  lineHover: '#3b3b3b',
  lineHightlight: 'rgb(40, 46, 73)',
  lineHighlightText: '#ffffff',
  lineCounter: '#616161',
  lineCounterBorder: 'rgba(255, 255, 255, .015)',
  lineCounterBorderHover: 'rgba(255, 255, 255, .1)',
  lineCounterHighlight: '#7187ff',
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
  },

  code: {
    light: DefaultCodeTheme,
    dark: { 
      ... DefaultCodeTheme, 
      background: '#000000',
      lineHover: '#1a1a1a',
      lineHightlight: 'rgb(28, 29, 48)'
    }
  },

  quote: {
    light: {
      background: '#eeeeee',
      border: '#e0e0e0',
      text: '#9e9e9e',
    },

    dark: {
      background: '#313131',
      border: '#424242',
      text: '#bdbdbd',
    }
  }
}

export interface ThemeExtension {
  primary?: string;
  primaryContrast?: string;
  light?: Partial<ContentTheme>;
  dark?: Partial<ContentTheme>;
  code?: {
    light?: Partial<CodeTheme>;
    dark?: Partial<CodeTheme>;
  },
  quote?: {
    light?: Partial<QuoteTheme>,
    dark?: Partial<QuoteTheme>,
  }
}


export function createTheme(extension: ThemeExtension): CodedocTheme {
  const res = { ... DefaultTheme };

  if (extension.primary) res.primary = extension.primary;
  if (extension.primaryContrast) res.primaryContrast = extension.primaryContrast;
  if (extension.light) Object.assign(res.light, extension.light);
  if (extension.dark) Object.assign(res.dark, extension.dark);
  if (extension.code) {
    if (extension.code.light) Object.assign(res.code.light, extension.code.light);
    if (extension.code.dark) Object.assign(res.code.dark, extension.code.dark);
  }
  if (extension.quote) {
    if (extension.quote.light) Object.assign(res.quote.light, extension.quote.light);
    if (extension.quote.dark) Object.assign(res.quote.dark, extension.quote.dark);
  }

  return res;
}
