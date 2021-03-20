importClass(android.view.animation.ScaleAnimation);
//importClass(android.view.animation.Animation.AnimationListener);

var AnimationUtils = {};

AnimationUtils.createInflateAnimation = function(duration) {
    //相对父容器的中心点进行缩放
    // fromX：开始缩放的X轴倍数。如1.0f：本身大小；如2.0f：从自己两倍开始
    // toX：结束缩放的X轴倍数。同上...
    // fromY：始缩放的Y轴倍数。
    // toY：结束缩放的Y轴倍数。
    /** pivotXType：X轴缩放中心点类型；可选值有：
     Animation.RELATIVE_TO_SELF相对自己--常用
     Animation.RELATIVE_TO_PARENT相对父窗体
     Animation.ABSOLUTE 绝对的---不常用
     */

    // pivotXValue：在pivotXType的基础上，X轴缩放中心的位置。如：0.5f：缩放中心就在控件的一半的位置。如果是0.0f，则会在控件本身的左边位置
    // pivotYType：X轴缩放中心点类型；同上 ...
    // pivotYValue：在pivotYType的基础上，Y轴缩放中心的位置。

    /** 设置缩放动画 */
    let animation = new ScaleAnimation(0.0, 1.4, 0.0, 1.4, ScaleAnimation.RELATIVE_TO_SELF, 0.5, ScaleAnimation.RELATIVE_TO_SELF, 0.5);

    animation.setDuration(duration); //设置动画持续时间 

    /** 常用方法 */
    //animation.setRepeatCount(int repeatCount);//设置重复次数 
    //animation.setFillAfter(boolean);//动画执行完后是否停留在执行完的状态 
    //animation.setStartOffset(long startOffset);//执行前的等待时间 


    /** 开始动画 */
    //animation.startNow(); 

    return animation;
}

AnimationUtils.createDeflateAnimation = function(duration) {

    /** 设置缩放动画 */
    let animation = new ScaleAnimation(1.0, 0.01, 1.0, 0.01, ScaleAnimation.RELATIVE_TO_SELF, 0.01, ScaleAnimation.RELATIVE_TO_SELF, 0.01);

    animation.setDuration(duration); //设置动画持续时间 

    //animation.setAnimationListener(  );

    /** 常用方法 
    //animation.setRepeatCount(int repeatCount);//设置重复次数 
    //animation.setFillAfter(boolean);//动画执行完后是否停留在执行完的状态 
    //animation.setStartOffset(long startOffset);//执行前的等待时间 


    /** 开始动画 */
    //animation.startNow(); 

    return animation;
}



module.exports = AnimationUtils;