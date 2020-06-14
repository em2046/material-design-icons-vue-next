export function categoriesIndexTemplate(category: string) {
  return `export * from './${category}';`;
}

export function categoryIndexTemplate(componentName: string) {
  return `export { default as ${componentName} } from './${componentName}';`;
}
