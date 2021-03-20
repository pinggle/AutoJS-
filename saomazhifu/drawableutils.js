importClass(android.graphics.drawable.GradientDrawable);
importClass(android.graphics.drawable.StateListDrawable);
importClass(android.graphics.Color);


var DrawableUtils = {};


DrawableUtils.createShape = function(color, tl, tr, br, bl, strokeW, strokeC) { //color #ffffff
    var colors = [];
    color.forEach(function(item, index) {
        colors[index] = Color.parseColor(item);
    });
    var topLeft = dpToPx(tl);
    var topRight = dpToPx(tr);
    var bottomRight = dpToPx(br);
    var bottomLeft = dpToPx(bl);    
    var drawable = new GradientDrawable(GradientDrawable.Orientation.LEFT_RIGHT, colors);
    //1、2两个参数表示左上角，3、4表示右上角，5、6表示右下角，7、8表示左下角. stroke 宽度 颜色
    drawable.setCornerRadii([topLeft, topLeft, topRight, topRight, bottomRight, bottomRight, bottomLeft, bottomLeft]); //设置4个角的弧度 
    
    if (strokeC != null && strokeW != null) {
        drawable.setStroke(dpToPx(strokeW), Color.parseColor(strokeC));
    }

    return drawable;

}


DrawableUtils.createSelectorDrawable = function(pressedDrawable, normalDrawable) {

    var stateListDrawable = new StateListDrawable();
    stateListDrawable.addState([android.R.attr.state_pressed], pressedDrawable); // 按下显示的图片
    stateListDrawable.addState([], normalDrawable); // 抬起显示的图片
    return stateListDrawable;

}

function dpToPx(dps) {
    return Math.round(context.getResources().getDisplayMetrics().density * dps);
}

module.exports = DrawableUtils;