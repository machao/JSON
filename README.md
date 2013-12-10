JSON
============

为低版本浏览器增加JSON接口，支持JSON.stringify和JSON.parse简单调用

**支持浏览器**

	IE6 / IE7 / IE8 / IE9 / IE10 / IE11 / FireFox / Chrome / Opera / Safri

**使用方法**

在head标签内引入json.js即可。

	<script src='json.js'></script>
**接口示例**

	var str  = window.JSON.stringify({name:"zjcn5205"});     //序列化
	var data = window.JSON.parse("{\"name\":\"zjcn5205\"}"); //格式化

 **补充说明**

增加的 window.JSON 的两个接口仅仅支持一个参数，虽不是完整的接口实现，但已经可以满足日常开发需要。如果想使用更完备的模拟组件，请移步：[https://github.com/douglascrockford/JSON-js](https://github.com/douglascrockford/JSON-js)

