(function () {

  mui.init();
  
  //子页面列表
  var subpages = ['doorpost-car-entrance.html', 'doorpost-driver.html'];

  // 子页面切换样式
  var subpages_style = {
    top: '88px',
    bottom: '0px'
  }
  //页面切换动画
  var aniShow = {};

  //页面传值
  var extras = {}

  // 创建子页面，显示首个选项卡其他都影藏
  mui.plusReady(function () {
    //更改状态栏颜色
    plus.navigator.setStatusBarStyle("light");

    var self = plus.webview.currentWebview();

    extras.H = self.H;

    for (var i = 0; i < subpages.length; i++) {
      var temp = {};
      var sub = plus.webview.create(subpages[i], subpages[i], subpages_style, extras);

      if (i > 0) {
        sub.hide();
      } else {
        temp[subpages[i]] = "true";
        mui.extend(aniShow, temp);
      }
      self.append(sub);
    }

  });
  //当前激活选项
  var activeTab = subpages[0];
  //选项卡点击事件
  mui('.mui-scroll').on('tap', 'a', function (e) {
    var targetTab = this.getAttribute('href');

    if (targetTab == activeTab) {
      return;
    }
    //显示目标选项卡
    //若为iOS平台或非首次显示，则直接显示
    if (mui.os.ios || aniShow[targetTab]) {
      plus.webview.show(targetTab);
      plus.webview.getWebviewById(targetTab).reload()
    } else {
      //否则，使用fade-in动画，且保存变量
      var temp = {};

      temp[targetTab] = "true";
      mui.extend(aniShow, temp);
      plus.webview.show(targetTab, "slide-in-right", 300);
      plus.webview.getWebviewById(targetTab).reload()
    }
    //隐藏当前;
    plus.webview.hide(activeTab);
    //更改当前活跃的选项卡
    activeTab = targetTab;
  });
})()