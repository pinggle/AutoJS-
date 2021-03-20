
var AlipayUtils = {};

/*支付宝退回首页的方法*/
AlipayUtils.back2 = function () {
    //可能不在主页
    var back = descMatches(/(返回|关闭页面|退出)/);

    while (back.exists()) {

        logAndPrint("返回上一页");
        //找到imageview 
        back.findOnce().click();
        //间歇
        sleep(500);
    }

}


AlipayUtils.payAlipay = function() {
    waitForActivity("com.eg.android.AlipayGphone.AlipayLogin");
    logAndPrint("进入支付宝主页");

    logAndPrint("点击首页");

    while (!click("首页"));

    logAndPrint("进入支付包首页");

    sleep(200);

    logAndPrint("点击扫一扫");

    while (!click("扫一扫"));

    waitForActivity("com.alipay.mobile.scan.as.main.MainCaptureActivity");

    logAndPrint("开始扫码")

    //扫码

    //进入支付页
    waitForActivity("com.alipay.mobile.nebulacore.ui.H5Activity");

    //等待页面加载
    sleep(1000);

    //判断是否有安全提示
    if (text("知道了").exists()) {
        text("知道了").click();
    } else {
        logAndPrint("无安全提示");
    }

    //输入金额

    //判断是否确认付款
    waitForActivity("com.alipay.android.app.flybird.ui.window.FlyBirdWindowActivity");

    //确认支付
    logAndPrint("准备输入密码");

    //等待进入密码框
    text("忘记密码?").waitFor();

    //输入密码
    logAndPrint("输入密码");

    //密码
    let nums  = [0, 0, 0, 0, 0, 0];

    nums.forEach((num, index) => {
        while (!click("" + num));
    });
}

module.exports = AlipayUtils;
