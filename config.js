/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://server.momjia.com/xhm/';
var hosttest = 'http://192.168.1.200:8081/xhm/';



var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 上传图片 上传视频
        upFiles: `${host}/articleCon/picture`,
        upUserLogo: `${host}/userCon/userLogo`,
    }
};

/*
module.exports = config;
*/

module.exports = {
    version: "6.11.0",
    note: '增加小程序广告位支持',
    subDomain: "xhm", // https://admin.it120.cc 登录后台首页的专属域名
    appid: "wxa46b09d413fbcaff", // 您的小程序的appid，购物单功能需要使用
    requireBindMobile: true, // 是否强制绑定手机号码才能使用,
    service: {
        host,

        // 上传图片 上传视频
        upFiles: `${host}/articleCon/picture`,
        upUserLogo: `${host}/userCon/userLogo`,
    }
}

