/**
 * storage.js — LocalStorage 数据持久化
 */
(function () {
  var STORAGE_KEY = 'schedule_clock_data';

  window.App = window.App || {};
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
