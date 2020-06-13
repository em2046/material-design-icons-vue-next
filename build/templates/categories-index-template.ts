export default function categoriesIndexTemplate(category: string) {
  return `export * from './${category}';`;
}
