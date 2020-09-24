<template>
  <div id="info-class">
    <el-row>
      <el-col :span="24">
        <el-button
          type="danger"
          plain
          @click="addFirst({ type: 'category_first_add' })"
          >添加一级分类</el-button
        >
      </el-col>
    </el-row>
    <hr />
    <el-row :gutter="30">
      <el-col :span="12" style="margin-top: 30px">
        <!-- 一级分类 -->
        <div class="category" v-for="item in category.item" :key="item.id">
          <h4>
            <svg-icon icon-class="plus" class="svg"></svg-icon>
            {{ item.category_name }}
            <div class="btn-group">
              <el-button
                size="mini"
                type="danger"
                @click="
                  editCategoryList({ data: item, type: 'category_first_edit' })
                "
                round
                >编辑</el-button
              >
              <el-button size="mini" type="success" round>添加子级</el-button>
              <el-button size="mini" round @click="deleteCategoryList(item.id)"
                >删除</el-button
              >
            </div>
          </h4>
          <!-- 二级分类 -->
          <ul v-if="item.children">
            <li v-for="childrnItem in item.children" :key="childrnItem.id">
              {{ childrnItem.category_name }}
              <div class="btn-group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12" style="margin-top: 30px">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form :model="ClassEditForm" style="margin-top: 20px" ref="formRefs">
          <el-form-item label="一级分类名称" v-if="category_first_input">
            <el-input
              v-model="ClassEditForm.leaveClass"
              :disabled="category_first_disabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称" v-if="category_children_input">
            <el-input
              v-model="ClassEditForm.twoClass"
              :disabled="category_children_disabled"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-col :span="12">
          <el-button
            v-if="category_first_input"
            style="margin: 20px 0px 0px 80px"
            type="danger"
            @click="addLevelClassHandle"
            :loading="submit_button_loading"
            :disabled="submit_button_disabled"
            >确定</el-button
          >
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, onUnmounted, ref, onMounted } from "@vue/composition-api";
import { Message } from "element-ui";
export default {
  name: "category",
  setup(props, { root, refs }) {
    const ClassEditForm = reactive({
      leaveClass: "",
      twoClass: "",
    });
    /*
     * 基础类型
     */
    const category_first_input = ref(false);
    const category_children_input = ref(false);
    const submit_button_loading = ref(false);
    const category_first_disabled = ref(true);
    const category_children_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const save = ref("");
    const subit_button_type = ref("");

    const category = reactive({
      item: [],
      current: [],
    });
    /*
     * methods
     */
    // 添加分类
    const addLevelClassHandle = () => {
      if (subit_button_type.value == "category_first_add") {
        ConfirmLeavlClassHandle();
      } else if (subit_button_type.value == "category_first_edit") {
        editFirstCategory();
      }
    };
    // 因为 都是一个确定按钮,所以要根据字段判断是哪添加一级分类还是数据编辑
    const ConfirmLeavlClassHandle = () => {
      if (!ClassEditForm.leaveClass) {
        root.$message.error("一级分类不可为空");
        return;
      }
      submit_button_loading.value = true;
      root.$http.news
        .getLevelList({ categoryName: ClassEditForm.leaveClass })
        .then((res) => {
          if (res.data.resCode === 0) {
            root.$message({
              message: res.data.message,
              type: "success",
            });
            category.item.push(res.data.data);
          }
          submit_button_loading.value = false;
          ClassEditForm.leaveClass = "";
        })
        .catch((error) => {
          console.log(error);
          submit_button_loading.value = false;
          ClassEditForm.leaveClass = "";
        });
    };
    // 添加一级分类
    const addFirst = (params) => {
      subit_button_type.value = params.type;
      category_first_input.value = true;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
    };
    // 删除分类
    const deleteCategoryList = (id) => {
      save.value = id;
      root.confirm({
        content: "此操作将永久删除当前信息,是否继续?",
        title: "警告",
        fn: deleteSingle,
        cancelFn: () => {
          save.value = "";
        },
      });
    };

    const deleteSingle = () => {
      root.$http.news
        .deleteClassList({ categoryId: save.value })
        .then((res) => {
          if (res.data.resCode === 0) {
            root.$message.success(res.data.message);
            // 可以操作数组 此方法返回数组的下标
            /*
            * filter 也可以判断不想同的数据 
             走完 filter以后所有的 不想同的数据 会返回新的数组
             let newDtataArray = category.item.filter(
              (item) => item.id != save.value
            );
            */
            let newDtataArray = category.item.findIndex(
              (item) => item.id == save.value
            );
            category.item.splice(newDtataArray, 1);
            // category.item = newDtataArray
            // getCategroy();
          }
        })
        .catch((error) => {});
    };

    // 获取分类列表
    const getCategroy = () => {
      root.$http.news
        .getClassList()
        .then((res) => {
          if (res.data.resCode === 0) {
            category.item = res.data.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    // 编辑按钮(此回调只是为了添加字段和显示input框和当前的数据的回显,并没有触发编辑回调)
    const editCategoryList = (params) => {
      subit_button_type.value = params.type;
      category_first_input.value = true;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      ClassEditForm.leaveClass = params.data.category_name;
      // 当前的数据存到公共区域
      category.current = params;
    };
    const editFirstCategory = () => {
      if (!ClassEditForm.leaveClass) {
        root.$message.error("修改值不可为空!");
        return;
      }
      let data = {
        id: category.current.data.id,
        categoryName: ClassEditForm.leaveClass,
      };
      root.$http.news
        .editCategoryList(data)
        .then((res) => {
          let responseData = res.data.data;
          if (res.data.resCode === 0) {
            root.$message.success(res.data.message);
            getCategroy();
            ClassEditForm.leaveClass = "";
            category.current = []
          }
        })
        .catch((error) => {});
    };
    /*
     * 钩子
     */
    onMounted(() => {
      getCategroy();
    });
    return {
      save,
      addFirst,
      category,
      getCategroy,
      category_first_input,
      category_children_input,
      ClassEditForm,
      editCategoryList,
      submit_button_disabled,
      category_children_disabled,
      ConfirmLeavlClassHandle,
      category_first_disabled,
      submit_button_loading,
      deleteCategoryList,
      addLevelClassHandle,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.menu-title {
  line-height: 39px;
  background-color: #f3f3f3;
  padding-left: 22px;
  font-weight: bold;
}
#info-class {
  position: relative;
  cursor: pointer;
  line-height: 39px;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 100px;
    bottom: 16px;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 40px;
    position: relative;
    .svg {
      width: 1em;
      height: 1em;
      position: absolute;
      left: 15px;
      top: 14px;
    }
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .btn-group {
        display: block;
      }
    }
  }
  .btn-group {
    display: none;
    position: absolute;
    right: 11px;
    top: -1px;
    z-index: 10;
  }
  .el-form-item {
    display: flex;
  }
  .el-input {
    width: 310px;
  }
}
</style>
