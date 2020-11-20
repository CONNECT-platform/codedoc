import Color from 'color';


export interface CodeTheme {
  background: string;
  text: string;
  shadow: string;

  lineHover: string;
  lineHighlight: string;
  lineHighlightText: string;
  lineHighlightAdded: string;
  lineHighlightAddedIndicator: string;
  lineHighlightRemoved: string;
  lineHighlightRemovedIndicator: string;
  lineCounter: string;
  lineCounterBorder: string;
  lineCounterBorderHover: string;
  lineCounterHighlight: string;
  errorUnderline: string;
  warningUnderline: string;

  terminalPrefix: string;
  terminalOutput: string;
  terminalOutputBackground: string;

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
  placeholder: string;
  selector: string;
  property: string;
  important: string;
  cssfunc: string;
  key: string;
}

export interface QuoteTheme {
  background: string;
  text: string;
  border: string;
}

export interface FormulaTheme {
  background: string;
  text: string;
  highlight: string;
}

export interface ToCTheme {
  background: string;
  border: string;
}

export interface ContentTheme {
  background: string;
  text: string;
  code: string;
  primary: string;
  primaryContrast: string;
  border: string;
}

export interface CodedocTheme {
  light: ContentTheme;
  dark: ContentTheme;
  code: {
    wmbar: boolean;
    light: CodeTheme;
    dark: CodeTheme;
  },
  quote: {
    light: QuoteTheme,
    dark: QuoteTheme,
  },
  toc: {
    light: ToCTheme,
    dark: ToCTheme,
  },
  formula: {
    light: FormulaTheme,
    dark: FormulaTheme,
  }
}


export const DefaultCodeTheme: CodeTheme = /*#__PURE__*/{
  background: '#212121',
  text: '#e0e0e0',
  shadow: '0 6px 12px rgba(0, 0, 0, .25)',

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
  placeholder: '#18ffff',
  selector: '#ffa372',
  property: '#f6d186',
  important: '#be79df',
  cssfunc: '#9aceff',
  key: '#f6d186',

  lineHover: '#3b3b3b',
  lineHighlight: 'rgb(40, 46, 73)',
  lineHighlightAdded: '#002d2d',
  lineHighlightAddedIndicator: '#44e08a',
  lineHighlightRemoved: '#3e0c1b',
  lineHighlightRemovedIndicator: '#ff0000',
  lineHighlightText: '#ffffff',
  lineCounter: '#616161',
  lineCounterBorder: 'rgba(255, 255, 255, .015)',
  lineCounterBorderHover: 'rgba(255, 255, 255, .1)',
  lineCounterHighlight: '#7187ff',
  errorUnderline: '#e8505b',
  warningUnderline: '#ffa931ee',

  terminalPrefix: '#616161',
  terminalOutput: '#757575',
  terminalOutputBackground: 'rgba(255, 255, 255, .06)',
}


export const DefaultCodeThemeLight: CodeTheme = /*#__PURE__*/{
  background: '#eeeeee',
  text: '#616161',
  shadow: '0 6px 12px #e0e0e0',

  keyword: '#7187ff',
  string: '#639a67',
  boolean: '#d45079',
  number: '#d45079',
  operator: '#3282b8',
  function: '#616161',
  parameter: '#616161',
  comment: '#bdbdbd',
  builtin: '#616161',
  punctuation: '#3282b8',
  tag: '#be79df',
  className: '#616161',
  attrName: '#ef962d',
  attrValue: '#639a67',
  plainText: '#bdbdbd',
  script: '#616161',
  placeholder: '#3282b8',
  selector: '#be79df',
  property: '#ef962d',
  important: '#be79df',
  cssfunc: '#3282b8',
  key: '#ef962d',

  lineHover: '#e7e7e7',
  lineHighlight: '#d7e4ff',
  lineHighlightAdded: '#d1f5d3',
  lineHighlightAddedIndicator: '#1cc36b',
  lineHighlightRemoved: '#fdced9',
  lineHighlightRemovedIndicator: '#ff0000',
  lineHighlightText: '#212121',
  lineCounter: '#bdbdbd',
  lineCounterBorder: 'rgba(255, 255, 255, .015)',
  lineCounterBorderHover: 'rgba(255, 255, 255, .1)',
  lineCounterHighlight: '#7187ff',
  errorUnderline: '#fa1616',
  warningUnderline: '#f37121',

  terminalPrefix: '#bdbdbd',
  terminalOutput: '#9e9e9e',
  terminalOutputBackground: 'rgba(0, 0, 0, .03)',
}


export const DefaultTheme: CodedocTheme = /*#__PURE__*/{
  light: {
    primary: '#4A90E2',
    primaryContrast: 'deduce',
    background: '#f5f5f5',
    text: '#424242',
    border: '#e0e0e0',
    code: '#616161',
  },

  dark: {
    primary: '#4A90E2',
    primaryContrast: 'deduce',
    background: '#212121',
    text: '#eeeeee',
    border: '#313131',
    code: '#e0e0e0',
  },

  code: {
    wmbar: true,
    light: DefaultCodeTheme,
    dark: { 
      ... DefaultCodeTheme, 
      background: '#000000',
      shadow: '0 6px 12px #121212',
      lineHover: '#1a1a1a',
      lineHighlight: 'rgb(28, 29, 48)'
    }
  },

  quote: {
    light: {
      background: '#eeeeee',
      border: '#e0e0e0',
      text: '#757575',
    },

    dark: {
      background: '#282828',
      border: '#363636',
      text: '#cacaca',
    }
  },

  toc: {
    light: {
      background: '#f1f1f1',
      border: '#e7e7e7',
    },
    dark: {
      background: '#1f1f1f',
      border: '#282828',
    },
  },

  formula: {
    light: {
      background: '#eeeeee',
      text: '#757575',
      highlight: '#e8e8e8',
    },
    dark: {
      background: '#282828',
      text: '#cacaca',
      highlight: '#323232'
    },
  },
}

export interface ThemeExtension {
  light?: Partial<ContentTheme>;
  dark?: Partial<ContentTheme>;
  code?: {
    wmbar?: boolean;
    light?: Partial<CodeTheme>;
    dark?: Partial<CodeTheme>;
  },
  quote?: {
    light?: Partial<QuoteTheme>,
    dark?: Partial<QuoteTheme>,
  },
  toc?: {
    light?: Partial<ToCTheme>,
    dark?: Partial<ToCTheme>,
  },
  formula?: {
    light?: Partial<FormulaTheme>,
    dark?: Partial<FormulaTheme>,
  }
}


export function createTheme(extension: ThemeExtension): CodedocTheme {
  const res = { ... DefaultTheme };

  if (extension.light) Object.assign(res.light, extension.light);
  if (res.light.primaryContrast === 'deduce')
    res.light.primaryContrast = Color(res.light.primary).darken(.05).isLight() ? 'black' : 'white';

  if (extension.dark) Object.assign(res.dark, extension.dark);
  if (res.dark.primaryContrast === 'deduce')
    res.dark.primaryContrast = Color(res.dark.primary).darken(.05).isDark() ? 'white': 'black';

  if (extension.code) {
    if (extension.code.wmbar !== undefined) res.code.wmbar = extension.code.wmbar;
    if (extension.code.light) Object.assign(res.code.light, extension.code.light);
    if (extension.code.dark) Object.assign(res.code.dark, extension.code.dark);
  }
  if (extension.quote) {
    if (extension.quote.light) Object.assign(res.quote.light, extension.quote.light);
    if (extension.quote.dark) Object.assign(res.quote.dark, extension.quote.dark);
  }
  if (extension.toc) {
    if (extension.toc.light) Object.assign(res.toc.light, extension.toc.light);
    if (extension.toc.dark) Object.assign(res.toc.dark, extension.toc.dark);
  }
  if (extension.formula) {
    if (extension.formula.light) Object.assign(res.formula.light, extension.formula.light);
    if (extension.formula.dark) Object.assign(res.formula.dark, extension.formula.dark);
  }

  return res;
}
