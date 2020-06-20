import { getComponentName, getClassName } from '../helpers';

export function iconTemplate(svg: string, name: string) {
  const componentName = getComponentName(name);
  const className = getClassName(name);

  return `import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../vue-jsx-compat';
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
