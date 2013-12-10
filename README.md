JSON
============

为低版本浏览器增加JSON接口，支持JSON.stringify和JSON.parse简单调用。

**支持浏览器**

	IE6 / IE7 / IE8 / IE9 / IE10 / IE11 / FireFox / Chrome / Opera / Safri

**使用方法**

在head标签内引入json.js即可。

	<script src='json.js'></script>
**接口示例**

	var str  = window.JSON.stringify({name:"zjcn5205"});     //序列化
	var data = window.JSON.parse("{\"name\":\"zjcn5205\"}"); //格式化

 **补充说明**

由于部分IE浏览器内置的JSON在无法格式化自己序列化的日期类型数据，故该组件进行了修复处理，重写了 Date.prototype.toJSON 方法，返回一个yyyy/mm/dd hh:mm:ss格式字符串代替，这样序列化出来的字符（需要parse处理后）可以重新被new Date()格式化为日期对象。

增加的 window.JSON 的两个接口仅仅支持一个参数，虽不是完整的接口实现，但已经可以满足日常开发需要。如果想使用更完备的模拟组件，请移步：[https://github.com/douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js)

