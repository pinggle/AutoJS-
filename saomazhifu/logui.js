importClass(android.view.View);
importClass(android.widget.RelativeLayout);
const drawableUtils = require("./DrawableUtils.js");
const animationUtils = require("./AnimationUtils.js");

function BaseUI() {
    var window = floaty.window(

        <frame 
            id = "floatW">
        
        <RelativeLayout id="rl">
            
            <text id="title" 
                w="match_parent"
                text="title"
                layout_alignParentTop="true"
                textSize="17sp"
                textColor="#4CAF50"
                padding="7dp"
                gravity="center"
                />
            
            <text id="hint" 
                layout_below="title"
                textSize="16sp" 
                text="hint"
                textColor="#03A9F4"
                padding="4dp"/>
            
            <ScrollView id="sv" layout_below="hint">
                
                <text id="log"
                    textSize="16sp"
                    textColor="white"
                    padding="4dp"/>
            
            </ScrollView>
            
  
            <text 
                id="stop"
                width="30dp" 
                height="30dp"
                margin="2dp"
                layout_alignParentBottom="true"
                layout_alignParentEnd="true"                
                text="✕"
                textSize="16sp"
                textColor="#161616"
                textStyle="bold"
                gravity="center"/>
           
        </RelativeLayout> 
        </frame>
    );

    var logPanel = window.log;
    var title = window.title;
    var hint = window.hint;
    var stop = window.stop;
    
   
    //设置窗口大小
    window.setSize(device.width / 1.6, device.height / 3.1);

   
    //定时刷新
    setInterval(() => {}, 20);

    //设置窗口背景
    var wColors = ["#50000000", "#60000000", "#50000000"];
    var wBackground = drawableUtils.createShape(wColors, 10, 10, 10, 10);
    
        window.floatW.setBackgroundDrawable(wBackground);
    
    //title背景
    var tColors = ["#97000000", "#97000000", "#97000000"];
    var tBackground = drawableUtils.createShape(tColors, 10, 10, 0, 0);
    ui.run(() => {
        title.setBackgroundDrawable(tBackground);
    });
    //    
    var bColors = ["#00000000", "#00000000", "#00000000"]
    var bBackground = drawableUtils.createShape(bColors, 15, 15, 15, 15, 2, "#80000000");
    ui.run(() => {
        stop.setBackgroundDrawable(bBackground);
    })

 //退出动画
    var exitAnimation = animationUtils.createDeflateAnimation(160);    

    //设置按钮监听
    stop.click(() => {                      
        window.rl.setVisibility(View.GONE);
        window.floatW.startAnimation(exitAnimation);
        setTimeout(() => {
            exit();
        }, 140);
    });


    /*设置窗口拖动*/
    //setRemoveable(window.floatW);
    //记录按键被按下时的触摸坐标
    var x = 0,
        y = 0;

    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;

    //记录按键被按下的时间以便判断长按等动作
    var downTime;

    window.floatW.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));

                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                //if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){

                return true;
        }
        return true;
    });


    //打印内容
    BaseUI.logAndPrint = function(text) {
        log(text)
        ui.run(function() {
            //输出
            logPanel.setText(logPanel.getText() + text + "\n");
            //滑动
            window.sv.scrollBy(0, 1000);
        });
    }

    //设置标题文本
    BaseUI.setTitle = function(text) {
        ui.run(function() {
            title.setText(text);
        });

    }

    //设置提示文本
    BaseUI.setHint = function(text) {
        ui.run(function() {
            hint.setText(text);
        });

    }
    
    //预留
    BaseUI.close = function() {        
        window.close();

    }

}


//测试
//BaseUI();

module.exports = BaseUI;