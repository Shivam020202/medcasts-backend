import slugify from "slugify";

export const generateSlug = (text: string): string => {
  return slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

export const generateUniqueSlug = async (
  text: string,
  Model: any,
  field: string = "slug"
): Promise<string> => {
  let slug = generateSlug(text);
  let counter = 1;
  let uniqueSlug = slug;

  while (true) {
    const existing = await Model.findOne({ where: { [field]: uniqueSlug } });
    if (!existing) {
      break;
    }
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
