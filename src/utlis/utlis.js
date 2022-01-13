

export const downloadFile = function (name, href) {
  var a = document.createElement("a"), //创建a标签
    e = document.createEvent("MouseEvents"); //创建鼠标事件对象
  e.initEvent("click", false, false); //初始化事件对象
  a.href = href; //设置下载地址
  a.download = name; //设置下载文件名
  a.dispatchEvent(e); //给指定的元素，执行事件click事件
}