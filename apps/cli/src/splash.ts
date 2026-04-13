/**
 * Splash screen display — pure terminal output, no npm dependencies.
 * Uses only basic ASCII characters for maximum terminal compatibility.
 */

export function displaySplash(version?: string): void {
  const GOLD = '\x1b[33;1m';
  const CYAN = '\x1b[36;1m';
  const WHITE = '\x1b[1;37m';
  const GRAY = '\x1b[0;37m';
  const YELLOW = '\x1b[1;33m';
  const RESET = '\x1b[0m';

  const W = 63;
  const HR = '-'.repeat(W);

  const lines = [
    '',
    `  ${CYAN}+${HR}+${RESET}`,
    `  ${CYAN}|${RESET}${' '.repeat(W)}${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}     ${GOLD}__     __  _____  ____   _   _     _     ${RESET}      ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}     ${GOLD}\\ \\   / / | ____||  _ \\ | | | |   / \\    ${RESET}      ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}      ${GOLD}\\ \\ / /  |  _|  | | | || |_| |  / _ \\   ${RESET}      ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}       ${GOLD}\\ V /   | |___ | |_| ||  _  | / ___ \\  ${RESET}      ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}        ${GOLD}\\_/    |_____||____/ |_| |_|/_/   \\_\\ ${RESET}      ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}${' '.repeat(W)}${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}        ${WHITE}Autonomous AI Pentester by Archeon${RESET}          ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}${' '.repeat(W)}${CYAN}|${RESET}`,
  ];

  if (version) {
    const verStr = `v${version}`;
    const padLeft = Math.floor((W - verStr.length) / 2);
    const padRight = W - verStr.length - padLeft;
    lines.push(`  ${CYAN}|${RESET}${' '.repeat(padLeft)}${GRAY}${verStr}${RESET}${' '.repeat(padRight)}${CYAN}|${RESET}`);
    lines.push(`  ${CYAN}|${RESET}${' '.repeat(W)}${CYAN}|${RESET}`);
  }

  lines.push(
    `  ${CYAN}|${RESET}           ${YELLOW}[ DEFENSIVE SECURITY ONLY ]${RESET}              ${CYAN}|${RESET}`,
    `  ${CYAN}|${RESET}${' '.repeat(W)}${CYAN}|${RESET}`,
    `  ${CYAN}+${HR}+${RESET}`,
    '',
  );

  console.log(lines.join('\n'));
}
