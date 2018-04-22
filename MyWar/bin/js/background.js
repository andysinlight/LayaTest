
var background =(function(_super){
    function background(){
        background.super(this);
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage("war/background.png");//480*852
        this.addChild(this.bg1);

        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage("war/background.png");
        this.bg2.pos(0,-852);
        this.addChild(this.bg2);

        Laya.timer.frameLoop(1,this,this.onLoop);

        
  // 创建循环跟新背景
        // Laya.timer.frameLoop(1,this,this.onLoop);
    }
    Laya.class(background,"background",_super);


    var _proto = background.prototype;
    _proto.onLoop = function(){

        this.y +=1;
        // console.log("this y: "+this.y);
        // console.log("bg1.y: "+this.bg1.y);
        if(this.bg1.y+this.y>=852){
            this.bg1.y -=2*852;
        }
        if(this.bg2.y+this.y>=852){
            this.bg2.y -= 2*852;
        }
    }
    return background;
})(Laya.Sprite)