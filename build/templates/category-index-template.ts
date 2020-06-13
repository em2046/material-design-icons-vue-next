export default function categoryIndexTemplate(componentName: string) {
  return `export { default as ${componentName} } from './${componentName}';`;
}
