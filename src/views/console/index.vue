<template>
  <div>
    <h1>控制台</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow: false,
    }
  },
  methods:{
    tab(){
      this.isShow = !this.isShow
    },
    
  }

};
</script>

<style lang="scss" scoped>
h1 {
  z-index: 10;
}
</style>
