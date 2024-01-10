import { hashtagRegex } from '@coinalyst/telegram-bot/parsers/parseCategories';

export function makeTitled(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function removeExcessSpaces(str: string) {
  return str.replaceAll(/\s+/g, ' ');
}

export function removeHashtags(str: string) {
  return str.replaceAll(hashtagRegex, '');
}
