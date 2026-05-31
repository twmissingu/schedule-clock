/**
 * storage.js — LocalStorage 数据持久化 + 公共工具
 */
(function () {
  var STORAGE_KEY = 'schedule_clock_data';
  var DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  window.App = window.App || {};
  window.App.DAYS = DAYS;
  window.App.escapeHtml = escapeHtml;
  window.App.storage = {
    save: function (schedules) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ schedules: schedules }));
    },

    load: function () {
      try {
        var data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          var parsed = JSON.parse(data);
          return parsed.schedules || [];
        }
      } catch (e) {
        // ignore
      }
      return [];
    }
  };
})();
