var WeixinUtils = {};


/*微信退回首页的方法*/
WeixinUtils.back1 = function() {
    //可能不在主页
    var back = descMatches(/(返回|关闭页面|退出)/);

    while (back.exists()) {
        logAndPrint("返回上一页");
        //找到imageview 点击父布局控件
        back.findOnce().parent().click();
        //间歇
        sleep(500);
    }
}

WeixinUtils.payWexin = function() {
    waitForActivity("com.tencent.mm.ui.LauncherUI");
    logAndPrint("进入微信主页");


    desc("更多功能按钮").findOne().click();


    logAndPrint("点击扫一扫");

    while (!click("扫一扫"));


    waitForActivity("com.tencent.mm.plugin.scanner.ui.BaseScanUI");

    logAndPrint("开始扫码")

    //扫码


    //进入支付页
    //waitForActivity("com.tencent.mm.plugin.remittance.ui.RemittanceAdapterUI");

    //等待页面加载
    sleep(500);

    //判断是否有安全提示
    /*if (desc("确定").exists()) {
        desc("确定").click();
    } else {
        logAndPrint("无安全提示");
    }*/

    //输入金额

    //判断是否确认付款
    waitForActivity("com.tencent.mm.plugin.wallet.pay.ui.WalletPayUI");

    //确认支付
    logAndPrint("准备输入密码");

    //等待进入密码框
    text("请输入支付密码").waitFor();

    //密码框从下方弹出需要时间
    sleep(500);

    //输入密码
    logAndPrint("正在输入密码");
    
    //密码
    let nums  = [0, 0, 0, 0, 0, 0];
    
    inputPaw(nums)

    if (text("支付密码错误，请重试").exists()) {
        logAndPrint("支付失败");
    }

}

function inputPaw(nums) {

    var scrollView = className("android.widget.ScrollView").findOne();
    var relativeLayout = className("android.widget.RelativeLayout").findOne();

    if (scrollView != null) {
        var rect = scrollView.bounds();
        var p = relativeLayout.bounds().height();
    } else {
        logAndPrint("出错");
        return;
    }

    var startY = rect.top + rect.height() + p;
    var startX = rect.left + p;
    var keyWidth = device.width / 3;
    var keyHeight = (device.height - startY) / 4;

    nums.forEach((num, index) => {
        clickKey(num, startX, startY, keyWidth, keyHeight);
    });
}

/*用来点击微信支付密码按钮的方法*/
function clickKey(num, startX, startY, keyWidth, keyHeight) {

    var X;
    var Y;

    // 取模 1模3余1加0个宽度 2加一个 3加两个

    switch (num % 3) {
        case 0:
            X = num != 0 ? (startX + keyWidth * 2) : (startX + keyWidth);
            break;
        case 1:
            X = startX;
            break;
        case 2:
            X = startX + keyWidth;
            break;
        default:

    }

    // 向上取整 123加0个高度 
    if (num != 0) {
        Y = startY + (Math.ceil(num / 3) - 1) * keyHeight;
    } else {
        Y = startY + keyHeight * 3;
    }
    //logAndPrint(num + " X:" + X + " Y:" + Y)

    //点击
    click(X, Y);
    //避免点击过快反应不过来
    sleep(2);

}

module.exports = WeixinUtils;