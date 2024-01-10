import { getUserTransactionCategories } from '@coinalyst/services/TransactionService';
import { TransactionCategory } from '@prisma/client';

export const hashtagRegex = /(?<=[\s,.:;"']|^)#([а-яa-z_]+)(?=[\s,.:;"']|$)/gi;

export default async function parseCategories(
  str: string
): Promise<[TransactionCategory[], string[]]> {
  

  const parsedHashtags = [...str.matchAll(hashtagRegex)].map((arr) => arr[1]);

  const categories = await getUserTransactionCategories({});
  const categoryTitles = categories.flatMap((cat) => cat.title.replaceAll(' ', '_').toLowerCase());
 
  const foundCategories = categories.filter((category) =>
    parsedHashtags.includes(category.title.replaceAll(' ', '_').toLowerCase())
  );

  const categoriesToCreate = parsedHashtags.filter((hashtag) => !categoryTitles.includes(hashtag));

  // console.log(foundCategories);
  // console.log(categoriesToCreate);
  //@TODO: rework to many categories
  return [foundCategories, categoriesToCreate];
}
// await parseCategories('пил пиво 12.11 #пиво #бухло #hoesmad');
