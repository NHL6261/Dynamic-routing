import ajax from '@/utils/require'
/*
 * 一级分类添加
 */
export default {
    // 获取 一级分类
    getLevelList(data) {
        return ajax.request({
            method: "post",
            url: "/news/addFirstCategory/",
            data
        })
    },
    // 获取分类列表

    getClassList(data) {
        return ajax.request({
            method: "post",
            url: "/news/getCategory/",
            data
        })
    },

    // 删除分类
    deleteClassList(data) {
        return ajax.request({
            method: "post",
            url: "/news/deleteCategory/",
            data
        })
    },

    // 修改分类 
    editCategoryList(data) {
        return ajax.request({
            method: "post",
            url: '/news/editCategory/',
            data
        })

    }
}