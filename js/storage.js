/**
 * storage.js — LocalStorage 数据持久化 + 公共工具
 */
(function () {
  var STORAGE_KEY = 'schedule_clock_data';
  var DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // getDay() returns 0=Sun,1=Mon...6=Sat → map to 0=Mon...6=Sun
  function dayIndex(jsDay) {
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  window.App = window.App || {};
  window.App.DAYS = DAYS;
  window.App.dayIndex = dayIndex;
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
