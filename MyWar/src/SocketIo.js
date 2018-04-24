var Event = Laya.Event;
var Socket = Laya.Socket;
var Byte = Laya.Byte;

var SocketIo = (function (_super) {

    function SocketIo(url) {
        this.url = url;
    }

    var _proto = SocketIo.prototype;

    _proto.connect = function (url, options) {

        this.ws = new Socket();
        //socket.connect("echo.websocket.org", 80);
        this.ws.connectByUrl(this.url + "?userid=" + Laya.beimi.user.id);

        this.ws.on(Event.OPEN, this, onSocketOpen);
        this.ws.on(Event.CLOSE, this, onSocketClose);
        this.ws.on(Event.MESSAGE, this, onMessageReveived);
        this.ws.on(Event.ERROR, this, onConnectError);
        return this;
    }

    _proto.exec = function (command, data) {
        if (this.ws.connected === true) {
            data.command = command;
            data.userid = Laya.beimi.user.id;
            data.orgi = Laya.beimi.user.orgi;
            data.token = Laya.beimi.authorization;
            this.ws.send(JSON.stringify(data));
        }
    }
    function emit(command, data) {
        let param = {
            data: data
        };
        this.exec(command, param);
    }

    function parse(result) {
        return JSON.parse(result);
    }


    function onSocketOpen() {
        console.log("Connected");
    }

    function onSocketClose() {
        console.log("Socket closed");
    }

    function onMessageReveived(message) {
        console.log("Message from server:");
        if (typeof message == "string") {
            console.log(message);
            var data = this.parse(event.data);
            if (data != null && data.event != null) {
                Laya.beimi.event[data.event](event.data);
            }
            console.log("response text msg: " + event.data);
        }
        else if (message instanceof ArrayBuffer) {
            console.log(new Byte(message).readUTFBytes());
        }
        socket.input.clear();
    }

    function onConnectError(e) {
        console.log("error");
    }


    Laya.class(SocketIo, "SocketIo", _super);
    return SocketIo;
})()