/**
 * 生成uuid字符串
 * @returns uuid字符串
 */
export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
//定时 缓存
export const cache = {
    /*设置缓存*/
    set: function (key: string, val: string, time: number = 20 * 60) {
        try {
            if (!localStorage) {
                return false;
            }
            var cacheExpireDate = new Date(new Date().setSeconds(time));
            var cacheVal = { val: val, exp: cacheExpireDate };
            localStorage.setItem(key, JSON.stringify(cacheVal)); //存入缓存值
        } catch (e) {
            console.log(e);
        }
    },
    /**获取缓存*/
    get: function (key: string) {
        try {
            if (!localStorage) return false;
            var cacheVal = localStorage.getItem(key) || "";
            var result = JSON.parse(cacheVal);
            var now = new Date();
            if (!result) {
                return null;
            } //缓存不存在
            if (now > result.exp) {
                //缓存过期
                this.remove(key);
                return null;
            }
            return result.val;
        } catch (e) {
            this.remove(key);
            return null;
        }
    } /**移除缓存，一般情况不手动调用，缓存过期自动调用*/,
    remove: function (key: string) {
        if (!localStorage) return false;
        localStorage.removeItem(key);
    } /**清空所有缓存*/,
    clear: function () {
        if (!localStorage) return false;
        localStorage.clear();
    }
};
/**
 * 复制文字到粘贴板
 * @param {String} text 需要复制到粘贴板的文字
 * @returns
 */
export const copyToClipboard = (text: string) => {
    return new Promise((resolve, reject) => {
        navigator.clipboard.writeText(text).then(resolve).catch(reject);
    });
};
