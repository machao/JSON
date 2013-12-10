/*!
 * JSON 组件
 *
 * 版权所有(C) 2013 马超 (zjcn5205@yeah.net)
 *
 * 这一程序是自由软件，你可以遵照自由软件基金会出版的GNU通用公共许可证条款来修改和重新发布
 * 这一程序。或者用许可证的第二版，或者（根据你的选择）用任何更新的版本。
 * 发布这一程序的目的是希望它有用，但没有任何担保。甚至没有适合特定目的的隐含的担保。更详细
 * 的情况请参阅GNU通用公共许可证。
 * 你应该已经和程序一起收到一份GNU通用公共许可证的副本。如果还没有，写信给：
 * The Free Software Foundation, Inc., 675 Mass Ave, Cambridge, MA02139, USA
 */
/*******************************************************************************
 * 2012-05-10 马超 创建
 * 检查window.JSON是否存在，不存在则创建对象
 */
(function(window){
/*
 * 如果有系统默认的JSON对象，则不替换
 */
//2013-12-10 马超 增加对IE低版本原生JSON存在的日期格式化bug进行调整和修复
//在IE678下通过JSON.stringify序列化出来的日期格式字符串，不能通过new Date()恢复
if( isNaN(new Date("2013-12-09T08:39:15")) ){
	Date.prototype.toJSON = function(){
		var pad = function(a){ return ("0"+a).slice(-2) };
		return this.getFullYear() + '/'+ pad(this.getMonth()+ 1) +"/"+ pad(this.getDate()) +" "+ pad(this.getHours()) +":"+ pad(this.getMinutes()) +":"+ pad(this.getSeconds());
	};
}
if( window.JSON )
	return;
/*
 * 工具函数
 * 移植于Baidu前端开源 Tangram 库
 */
var escapeMap = {
	"\b": '\\b',
	"\t": '\\t',
	"\n": '\\n',
	"\f": '\\f',
	"\r": '\\r',
	'"' : '\\"',
	"\\": '\\\\'
},		
/* 字符串序列化 */
encodeString = function(source) {
	if (/["\\\x00-\x1f]/.test(source)) {
		source = source.replace(
			/["\\\x00-\x1f]/g, 
			function (match) {
				var c = escapeMap[match];
				if (c) {
					return c;
				}
				c = match.charCodeAt();
				return "\\u00" 
						+ Math.floor(c / 16).toString(16) 
						+ (c % 16).toString(16);
			});
	}
	return '"' + source + '"';
},
/* 数组序列化 */
encodeArray = function(source) {
	var result = ["["], 
		l = source.length,
		preComma, i, item;
		
	for (i = 0; i < l; i++) {
		item = source[i];
		
		switch (typeof item) {
		case "undefined":
		case "function":
		case "unknown":
			break;
		default:
			if(preComma) {
				result.push(',');
			}
			result.push(encode(item));
			preComma = 1;
		}
	}
	result.push("]");
	return result.join("");
},
/* 处理日期序列化时的补零 */
pad = function(source) {
	return source < 10 ? '0' + source : source;
},
/* 日期序列化 */
encodeDate = function(source){
	if( source.toJSON ) return '"'+source.toJSON()+'"';
	return '"' + source.getUTCFullYear() + "-" 
			+ pad(source.getUTCMonth() + 1) + "-" 
			+ pad(source.getUTCDate()) + "T" 
			+ pad(source.getUTCHours()) + ":" 
			+ pad(source.getUTCMinutes()) + ":" 
			+ pad(source.getUTCSeconds()) + '"';
},
/* 对象序列化 */
hasOwn = Object.prototype.hasOwnProperty,
encodeObj = function( value ){
	var result = ['{'], preComma, item;
	for (var key in value) {
		if (hasOwn.call(value, key)) {
			item = value[key];
			switch (typeof item) {
			case 'undefined':
			case 'unknown':
			case 'function':
				break;
			default:
				preComma && result.push(',');
				preComma = 1;
				result.push(encode(key) + ':' + encode(item));
			}
		}
	}
	result.push('}');
	return result.join('');
},
/* 序列化接口函数 */
encode = function (value) {
	switch (typeof value) {
		case 'unknown':
		case 'function':
		case 'undefined':
			return;
		case 'number':
			return isFinite(value) ? String(value) : "null";
		case 'string':
			return encodeString(value);
		case 'boolean':
			return String(value);
		default:
			return value === null ? 'null'
				: value instanceof Array ? encodeArray(value)
				: value instanceof Date ? encodeDate(value)
				: encodeObj(value);
	}
};
/*
 * 创建JSON对象
 */
window.JSON = {
	parse : function(data){//宽容格式解决方案
		data = data.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g, "new Date($2)");
		return (new Function("return " + data))();
	},
	stringify : function(v){ return encode(v); }
};
})(window);