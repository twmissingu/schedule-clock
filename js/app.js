/**
 * app.js — 主入口，创建全局 App 对象，初始化各模块
 */
(function () {
  window.App = window.App || {};

  // 初始化各模块
  App.schedules = App.storage.load();
  App.clock.start();
  App.schedule.init();
  App.schedule.render(App.schedules);

  // 闹钟检测定时器
  setInterval(function () {
    App.alarm.check(App.schedules);
  }, 1000);

  // 闹钟停止按钮
  document.getElementById('stopAlarmBtn').addEventListener('click', function () {
    App.alarm.stop();
  });
})();
