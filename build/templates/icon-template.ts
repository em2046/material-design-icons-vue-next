import { getClassName, getComponentName } from '../helpers';

export function iconTemplate(svg: string, name: string) {
  const componentName = getComponentName(name);
  const className = getClassName(name);

  return `import { VNodeProps } from 'vue';
import { vueJsxCompat } from '../../vue-jsx-compat';
import { MDIcon } from '../../components/MDIcon';

let ${componentName}Impl = {
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
};

export const ${componentName} = (${componentName}Impl as any) as {
  new (): {
    $props: VNodeProps;
  }
}
`;
}
