import { default as AU } from 'ansi_up';
import chalk from 'chalk';


export function terminalOutput(...lines: string[]) {
  const F = Function(['chalk'] as any, "return chalk`" + lines.join('\n').trim() + "`;");
  return new AU().ansi_to_html(F(chalk));
}