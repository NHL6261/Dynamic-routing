<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { reactive, ref, watch, computed } from "@vue/composition-api";
export default {
  name: "Svgicon",
  props: {
    iconClass: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props, { root }) {
    const msg = ref("小倪爱前端");
    // const count = ref(10) 测试无return
    /*
     * 计算属性 测试 vue 3.0写法
     */
    // const plusOne = computed(() => {
    //   return count.value + 1
    // })

    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        `svg-icon `;
      }
    });

    return {
      msg,
      iconName,
      svgClass,
    };
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  font-size: 18px;
  margin-right: 8px;
}
</style>