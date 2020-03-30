export enum Mode {
  Dark, Light
}


export function switchMode(mode: Mode) {
  if (mode === Mode.Light) return Mode.Dark;
  else return Mode.Light;
}
