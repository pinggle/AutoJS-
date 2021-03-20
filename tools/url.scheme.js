//跳转微信扫一扫
app.startActivity({
    “action”: “VIEW”,
    “packageName”: “com.tencent.mm”,
    “className”: “com.tencent.mm.ui.LauncherUI”,
    “extras”: {
        “LauncherUI.From.Scaner.Shortcut”: true
    }
});
//跳转支付宝蚂蚁森林
app.startActivity({
    action: “VIEW”,
    data: “alipayqr://platformapi/startapp?saId=60000002”,
})
//跳转支付宝蚂蚁庄园
app.startActivity({
    action: “VIEW”,
    data: “alipays://platformapi/startapp?appId=66666674”,
})
//跳转支付宝付款码
app.startActivity({
    action: “VIEW”,
    data: “alipayqr://platformapi/startapp?saId=20000056”,
})
//跳转支付宝收款
app.startActivity({
    action: “VIEW”,
    data: “alipays://platformapi/startapp?appId=20000123”,
})
//跳转支付宝扫码
app.startActivity({
    action: “VIEW”,
    data: “alipays://platformapi/startapp?saId=10000007”,
})
//跳转支付宝红包
app.startActivity({
    action: “VIEW”,
    data: “alipays://platformapi/startapp?appId=88886666”,
})
//跳转支付宝充值中心
app.startActivity({
    action: “VIEW”,
    data: “alipays://platformapi/startapp?appId=10000003”,
})
//跳转支付宝转账
app.startActivity({
    action: “VIEW”,
    data: “alipayqr://platformapi/startapp?appId=20000116”,
});
//跳转QQ会话
app.startActivity({
    action: “android.intent.action.VIEW”,
    data: “mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=” + QQ号,
    packageName: “com.tencent.mobileqpq”,
});
//跳转QQ加群
app.startActivity({
    action: “android.intent.action.VIEW”,
    data: “mqqapi://card/show_pslcard?src_type=internal&version=1&card_type=group&uin=” + QQ群号,
    packageName: “com.tencent.mobileqpq”,
});
