<template>
  <router-view />
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tit: document.title,
      close: 0,
    };
  },
  created() {
    // this.TitleScrolling();
  },
  methods: {
    TitleScrolling() {
      let timer = setInterval(() => {
        var head = this.tit.substring(0, 1);
        // 截取除首字符串外所有字符串(除第一个所有)
        var foot = this.tit.substring(1);
        // 头尾拼接后赋给data => tit属性
        this.tit = foot + head;
        // 最后赋给最终显示的标题(标题)
        document.title = this.tit;
        this.close ++;
      }, 1000);
    },
  },
};
</script>

<style lang ="less" scoped>
</style>
