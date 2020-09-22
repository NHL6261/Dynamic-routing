<template>
  <!-- 弹出框 -->
  <el-dialog title="新增" :visible.sync="dialogVisible_flag" width="30%" @close="closeDialogHandle">
    <!-- form 表单区域 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="类别:">
        <el-select v-model="category" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题:">
        <el-input v-model="title" autocomplete="off" style="width: 310px"></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <el-input type="textarea" v-model="content" style="width: 310px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialogHandle">确 定</el-button>
      <el-button @click="closeDialogHandle">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible_flag: false,
      title:'',
      content:'',
      category:'',
      options1: [
        {
          value: 1,
          label: "国际信息",
        },
        {
          value: 2,
          label: "国内信息",
        },
        {
          value: 3,
          label: "行内信息",
        },
      ],
    };
  },
  //   单向数据流不可以改变父组件的值
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialogHandle() {
      this.dialogVisible_flag = false;
      // 关闭时需要回调处理时 可以用这个
      this.$emit("close", false);
      // 修饰器的方法也可
      // this.$emit('update: flag', false)
    },
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.dialogVisible_flag = newValue;
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>
