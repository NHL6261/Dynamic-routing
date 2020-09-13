import Vue from 'vue'
Vue.filter('dateFormat', (originVal) => {
    const dt = new Date(originVal);
    //  年
    const y = dt.getFullYear();
    // 填充 月份
    const m = (`${dt.getMonth() + 1}`).padStart(2, '0');
    // 填充日
    const d = (`${dt.getDate()}`).padStart(2, '0');
    // 填充小时
    const hh = (`${dt.getHours()}`).padStart(2, '0');
    // 填充分钟
    const mm = (`${dt.getMinutes()}`).padStart(2, '0');
    // 填充秒
    const ss = (`${dt.getSeconds()}`).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});