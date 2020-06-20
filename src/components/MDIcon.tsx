import { defineComponent } from 'vue';
import { vueJsxCompat } from '../vue-jsx-compat';

export default defineComponent({
  name: 'MDIcon',
  setup(prop, { slots }) {
    return () => {
      return <span class="md-icon">{slots.default?.()}</span>;
    };
  },
});
