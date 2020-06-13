export default function iconTemplate(svg: string, name: string) {
  return `import { defineComponent } from 'vue';
import MDIcon from '../../components/MDIcon';

export default defineComponent({
  name: '${name}',
  setup() {
    return () => {
      return (
        <MDIcon>
          {() => (${svg})}
        </MDIcon>
      );
    };
  },
});
`;
}
