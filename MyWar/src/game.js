var Handler = laya.utils.Handler;

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
// 480*852
Laya.init(480, 852);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);


Laya.beimi = {
    user: {},
    authorization:""
};

var httpIo = new HttpIo(baseURL);


var loginUI = new loginUI();
loginUI.btn_login.on(Laya.Event.CLICK, loginUI.btn_login, function () {
    var name = loginUI.user_name.text;
    var pwd = loginUI.pwd.text;
    console.log(name + ">>" + pwd);
    var params = { username: "", password: "", mobile: "" };
    params.username = name;
    params.mobile = name;
    params.password = pwd;

    httpIo.httpPost("/tokens", params, function (data, object) {
        console.log("post connected !!");
        Laya.beimi.authorization = data;
        loginauthor();
    }, function () {
        console.log("post connect fail !!");
    });
});

var baseURL = "http://localhost";
var wsURL = "ws://localhost:9081";
// var sw = new SocketIo(wsURL);




 function loginauthor () {
    var xhr = httpIo.httpGet("/api/guest", function (data, object) {
        console.log("game connect suLayaess!!");
        // console.log(data);
        Laya.beimi.user.id = JSON.parse(data).token.userid;
        connectService();
    }, function () {
        console.log("game connect fail !!");
    });

}
loginUI.register.on(Laya.Event.CLICK, loginUI.register, loginauthor());







function beginLoad() {
    Laya.loader.load("res/atlas/war.atlas", Handler.create(null, onLoaded));

}

function onLoaded() {
    var bg = new background();
    Laya.stage.addChild(loginUI)

    this.hero = new Role();
    this.hero.init("hero", 0, 100, 0, 4, 0);
    this.hero.pos(200, 500);
    // Laya.stage.addChild(this.hero);

    Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);

}

var onMouseMove = function () {
    this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
}



function connectService() {

    var _socket = new SocketIo(wsURL).connect(wsURL + '/bm/game', { "reconnection": true });



    var param = {
        token: Laya.beimi.authorization,
        orgi: Laya.beimi.user.orgi,
        userid: Laya.beimi.user.id
    };
    _socket.exec("gamestatus", param);
    // _socket.on("gamestatus" , function(result){
    //     if(result!=null) {
    //         var data = self.parse(result) ;
    //         if(Laya.beimi.extparams !=null){
    //             if(data.gamestatus == "playing" && data.gametype != null){
    //                 /**
    //                  * 修正重新进入房间后 玩法被覆盖的问题，从服务端发送过来的 玩法数据是 当前玩家所在房间的玩法，是准确的
    //                  */
    //                 if(Laya.beimi.extparams!=null){
    //                     Laya.beimi.extparams.playway = data.playway ;
    //                     Laya.beimi.extparams.gametype = data.gametype ;
    //                     if(data.cardroom!=null && data.cardroom == true){
    //                         Laya.beimi.extparams.gamemodel = "room";
    //                     }
    //                 }
    //                 self.scene(data.gametype , self) ;
    //             }else if(data.gamestatus == "timeout"){ //会话过期，退出登录 ， 会话时间由后台容器提供控制
    //                 Laya.beimi.sessiontimeout = true ;
    //                 self.alert("登录已过期，请重新登录") ;
    //             }else{
    //                 self.scene(Laya.beimi.extparams.gametype , self) ;
    //             }
    //         }
    //         Laya.beimi.gamestatus = data.gamestatus;
    //     }
    // });


}


