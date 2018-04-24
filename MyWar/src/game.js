var Handler = laya.utils.Handler;

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
// 480*852
Laya.init(480, 852);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

var baseURL = "http://localhost";
var wsURL = "ws://192.168.1.155:9081";

var httpIo = new HttpIo(baseURL);
var xhr = httpIo.httpGet("/api/guest", function (data, object) {
	console.log("game connect success!!");
	console.log(data);
}, function () {
	console.log("game connect fail !!");
});



new SocketIo(wsURL);

function beginLoad() {
	Laya.loader.load("res/atlas/war.atlas", Handler.create(null, onLoaded));

}

function onLoaded() {
	var bg = new background();
	Laya.stage.addChild(bg);

	this.hero = new Role();
	this.hero.init("hero", 0, 100, 0, 4, 0);
	this.hero.pos(200, 500);
	Laya.stage.addChild(this.hero);

	Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);

}

var onMouseMove = function () {
	this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
}



