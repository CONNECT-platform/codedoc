import { default as AU } from 'ansi_up';
import chalk from 'chalk';


export function terminalOutput(...lines: string[]) {
  const ctx = new chalk.Instance({ level: 3 });
  const F = Function('chalk', "return chalk`" + lines.join('\n').replace(/\`/g, '\\`') + "`;");
  return new AU().ansi_to_html(F(ctx));
}