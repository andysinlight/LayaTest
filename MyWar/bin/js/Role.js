var Role = (function(_super){
    function Role(){
        Role.super(this);
    }

    Laya.class(Role,"Role",_super);

    var _proto = Role.prototype;
    Role.cached=false;
    _proto.init = function(type,camp,hp,speed,radius,heroType){
        if(!heroType)this.heroType=0;
        this.type = type;
        this.camp = camp;
        this.hp = hp;
        this.speed = speed;
        this.radius = radius;
        this.heroType = heroType;

        if(!Role.cached){

          //缓存飞机的动作
            Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
            //缓存集中爆炸动作
            Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png"
            ,"war/hero_down3.png","war/hero_down4.png"],"hero_down");

            //缓存敌机1飞行动作
            Laya.Animation.createFrames(["war/enemy1_fly1.png"],"enemy1_fly");
            //缓存敌机1爆炸动作
            Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png"
            ,"war/enemy1_down4.png"],"enemy1_down");

            //缓存敌机2飞行动作
            Laya.Animation.createFrames(["war/enemy2_fly1.png"],"enemy2_fly");
            //缓存敌机2爆炸动作
            Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png"
            ,"war/enemy2_down4.png"],"enemy2_down");
            //缓存敌机2碰撞动作
            Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");

            //缓存敌机3飞行动作
            Laya.Animation.createFrames(["war/enemy3_fly1.png","war/enemy3_fly2.png"],"enemy3_fly");
            //缓存敌机3爆炸动作
            Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png"
            ,"war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");
            //缓存敌机3碰撞动作
            Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");

            //缓存子弹动画
            Laya.Animation.createFrames(["war/bullet1.png"],"bullet1_fly");

            //缓存强化包
            Laya.Animation.createFrames(["war/ufo1.png"],"ufo1_fly");
            //缓存医疗包
            Laya.Animation.createFrames(["war/ufo2.png"],"ufo2_fly");

            Role.cached = true;
        }


        if(!this.body){
            this.body = new Laya.Animation();
            this.addChild(this.body);
            // this.body
        }

        this.playAction("fly");
    }


    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0,true,this.type+"_"+action);
        // this.bounds = this.body.getBounds();
        // this.body.pos(-this.bounds.width/2,-this.height/2)
    }



    return Role;
}(Laya.Sprite))