import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MDIcon',
  setup(prop, { slots }) {
    return () => {
      return <span class="md-icon">{slots.default?.()}</span>;
    };
  },
});
