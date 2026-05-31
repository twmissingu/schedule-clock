/**
 * clock.js — 时钟显示、指针动画
 */
(function () {
  var DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  var els = {};

  function update() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds();

    els.timeDisplay.textContent = hours + ':' + minutes;
    els.dateDisplay.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
    els.dayDisplay.textContent = DAYS[now.getDay()];

    var secondDeg = seconds * 6;
    var minuteDeg = (now.getMinutes() + seconds / 60) * 6;
    var hourDeg = (now.getHours() % 12 + now.getMinutes() / 60) * 30;

    els.secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';
    els.minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
    els.hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
  }

  function start() {
    els.timeDisplay = document.getElementById('timeDisplay');
    els.dateDisplay = document.getElementById('dateDisplay');
    els.dayDisplay = document.getElementById('dayDisplay');
    els.hourHand = document.getElementById('hourHand');
    els.minuteHand = document.getElementById('minuteHand');
    els.secondHand = document.getElementById('secondHand');

    update();
    setInterval(update, 1000);
  }

  window.App = window.App || {};
  window.App.clock = { start: start };
})();
