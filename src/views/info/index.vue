<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="4">
          <el-form-item label="类型:">
            <el-select v-model="type" placeholder="请选择" style="width: 120px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="类型:">
            <el-date-picker
              v-model="TimeContainer"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="关键字:">
            <el-select v-model="search_key" style="width: 78px">
              <el-option
                v-for="item in keywordoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input v-model="query_data" placeholder="请输入查询内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="queryDataList">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="dialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin-top: 20px"></div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50" label="序号"></el-table-column>
          <el-table-column prop="title" label="标题" width="530px"></el-table-column>
          <el-table-column prop="category" label="类型" width="130px"></el-table-column>
          <el-table-column prop="date" label="日期" width="237px"></el-table-column>
          <el-table-column prop="user" label="管理员" width="215px"></el-table-column>
          <el-table-column label="操作" width="220px" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteHandle(scope.row)">删除</el-button>
              <el-button type="warning" size="mini" @click="dialogVisible = true">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="12">
        <el-button type="warning" size="medium">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 50, 100, 150]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 弹框 -->
    <DialogInfo :flag="dialogVisible" @close="closeDialogHandle" />
  </div>
</template>

<script>
import DialogInfo from "./dialog/info";
import {
  ref,
  isRef,
  watch,
  toRefs,
  onMounted,
  reactive,
  onUnmounted,
  computed,
} from "@vue/composition-api";
export default {
  name: "infomation",
  components: {
    DialogInfo,
  },
  setup(props, { root }) {
    const options = reactive([
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
    ]);
    const options1 = reactive([
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
    ]);
    const tableData = reactive([
      {
        title: "今日新闻",
        date: "2016-05-02",
        category: "王小虎",
        user: "上海市普陀区金沙江路 1518 弄",
      },
      {
        title: "今日新闻",
        date: "2016-05-02",
        category: "王小虎",
        user: "上海市普陀区金沙江路 1518 弄",
      },
      {
        title: "今日新闻",
        date: "2016-05-02",
        category: "王小虎",
        user: "上海市普陀区金沙江路 1518 弄",
      },
    ]);
    const queryInfo = reactive([
      {
        pagenum: 1,
        pagesize: 20,
      },
    ]);
    const keywordoptions = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);
    /*
     * 自定义变量(和vue2.0return相同)
     */
    const type = ref("");
    const show1 = ref(false);
    const total = ref(50);
    const search_key = ref("id");
    const query_data = ref("");
    const dialogVisible = ref(false);
    const TimeContainer = ref("");
    /*
     * 方法
     */
    const getUserList = () => {

    }
    const queryDataList = () => {
      console.log(1111111);
    };
    const handleSelectionChange = (row) => {};
    const deleteHandle = (row) => {
      root
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          // 发请求删除
          // 判断状态
          // 删除成功,更新列表
          root.$message({
            type: "success",
            message: "删除成功!",

          });
        })
        .catch(() => {
          root.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(row);
    };
    const editHandle = (row) => {
      console.log(row);
    };
    // 条数发生改变
    const handleSizeChange = (newSize) => {
      console.log(root.queryInfo);
    };
    const handleCurrentChange = (newPage) => {};
    // 父组件 将dialog的框设置为false
    const closeDialogHandle = () => {
      dialogVisible.value = false;
    };
    return {
      type,
      show1,
      total,
      options,
      options1,
      queryInfo,
      tableData,
      search_key,
      query_data,
      queryDataList,
      TimeContainer,
      keywordoptions,
      deleteHandle,
      editHandle,
      getUserList,
      dialogVisible,
      handleSizeChange,
      closeDialogHandle,
      handleCurrentChange,
      handleSelectionChange,
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: space-between;
}
</style>
