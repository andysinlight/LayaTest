var Text = Laya.Text;
var Event = Laya.Event;
var HttpRequest = Laya.HttpRequest;
var HttpIo = (function (_super) {
    function HttpIo(baseUrl) {
        this.baseUrl = baseUrl;
    }
    var _proto = HttpIo.prototype;

    _proto.httpGet = function (url, suLayaess, error, object) {
        var xhr = new HttpRequest();

        xhr.once(Event.PROGRESS, this, function (e) {
            console.log(e)
        });
        xhr.once(Event.COMPLETE, this, function(){
            suLayaess(xhr.data, object)
        });
        xhr.once(Event.ERROR, this, error);

        let token = "";
        if (Laya.beimi != null && Laya.beimi.authorization != null) {
            token = Laya.beimi.authorization;
        }
        var tmp;

        url.indexOf("?") > 0 ? tmp = '&authorization=' : tmp = "?authorization="

        xhr.send(baseURL + url, tmp + token, 'get', 'text');
    }


    function encodeFormData(data) {
        var pairs = [];
        var regexp = /%20/g;
        for (var name in data) {
            var value = data[name].toString();
            var pair = encodeURIComponent(name).replace(regexp, "+") + "=" +
                encodeURIComponent(value).replace(regexp, "+");
            pairs.push(pair);
        }
        return pairs.join("&");
    }


    Laya.class(HttpIo, "HttpIo", _super);
    return HttpIo;

})()