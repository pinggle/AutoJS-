

try {
    //可能发生异常的代码 
    const UI = require("./LogUI.js");
    const weixinUtil = require("./WeixinUtils.js");
    const alipayUtil = require("./AlipayUtils.js");
} catch (error) {
    //发生错误执行的代码 
    toastLog("可能缺少其它模块或路径错误");
    exit();
}

function logAndPrint(text) {    
    UI.logAndPrint(text);   
}

function launch(name) {
    logAndPrint("正在打开" + name + "…");
    launchApp(name);
    sleep(500);
}


function quit() {
    logAndPrint("支付完成，自动退出");
    //sleep(2000);
    exit();
}

function initUI() {
    UI();
    UI.setTitle("关闭窗口即终止任务");
    UI.setHint("执行自动任务：支付")
}

function alipay() {
    initUI();
    launch(ali);
    alipayUtil.back2();
    alipayUtil.payAlipay();
    //quit();
}

function weixin() {
    initUI();
    launch(wei);
    weixinUtil.back1();
    weixinUtil.payWexin();
    //quit();
}

/***** 入口 ******/
auto.waitFor();

var wei = "微信"
var ali = "支付宝";

var i = dialogs.select("请选择应用", [wei + " (仅Android7.0+)", ali]);


if (i == 0) {
    var v = parseInt(device.release.substr(0, 1));
    if (v < 7) {
        toastLog("微信支付模拟点击需要Android7.0及以上版本!");
    } else {
        weixin();
    }
} else if (i == 1) {
    alipay();
}