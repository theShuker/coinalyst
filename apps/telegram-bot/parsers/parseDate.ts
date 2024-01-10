export const dateRegex = /\b(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])(?:\.(\d{2}))?\b/;
export const yesterdaysRegex = /(?<=[\s,.:;"']|^)(вчера|позавчера)(?=[\s,.:;"']|$)/i;

export default function parseDate(str: string): Date | undefined {
  const now = new Date();

  let matched = str.match(dateRegex);
  if (matched) {
    const [, day, month, year] = matched;
    console.log(`date found`, day, month, year);

    return new Date(typeof year === 'string' ? +`20${year}` : now.getFullYear(), +month - 1, +day);
  }

  matched = str.match(yesterdaysRegex);
  if (matched)
    return matched[0].toLowerCase() === 'вчера'
      ? new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() - 1)
      : new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() - 2);

  return undefined;
}

// console.log(parseDate('пил пиво 12.11'));
// console.log(parseDate('пил пиво 12.11.22'));
// console.log(parseDate('пил пиво 12.11.2024'));
// console.log(parseDate('пил пиво вчера'));
// console.log(parseDate('пил пиво позавчера'));
