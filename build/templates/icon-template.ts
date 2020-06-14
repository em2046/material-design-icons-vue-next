import { getComponentName, getClassName } from '../helpers';

export function iconTemplate(svg: string, name: string) {
  let componentName = getComponentName(name);
  let className = getClassName(name);

  return `import { defineComponent } from 'vue';
import MDIcon from '../../components/MDIcon';

export default defineComponent({
  name: '${componentName}',
  setup() {
    return () => {
      return (
        <MDIcon class="${className}">
          {() => (${svg})}
        </MDIcon>
      );
    };
  },
});
`;
}
