/**
 * alarm.js — 闹钟检测、Web Audio 播放
 */
(function () {
  var audioContext = null;
  var oscillator = null;
  var isAlarmPlaying = false;
  var alarmInterval = null;
  var lastAlarmKey = null;
  var triggeredIds = {};

  function getAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
  }

  function playBeep() {
    if (!isAlarmPlaying) return;
    var ctx = getAudioContext();

    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    oscillator = ctx.createOscillator();
    var gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = 880;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    oscillator.stop(ctx.currentTime + 0.3);

    setTimeout(function () {
      if (!isAlarmPlaying) return;
      oscillator = ctx.createOscillator();
      var gainNode2 = ctx.createGain();
      oscillator.connect(gainNode2);
      gainNode2.connect(ctx.destination);
      oscillator.frequency.value = 1046.5;
      oscillator.type = 'sine';
      gainNode2.gain.value = 0.3;
      oscillator.start();
      gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      oscillator.stop(ctx.currentTime + 0.3);
    }, 350);
  }

  function trigger(schedule) {
    var alarmScheduleName = document.getElementById('alarmScheduleName');
    var alarmTime = document.getElementById('alarmTime');
    var alarmModal = document.getElementById('alarmModal');

    alarmScheduleName.textContent = schedule.title;
    alarmTime.textContent =
      schedule.time.hour.toString().padStart(2, '0') + ':' +
      schedule.time.minute.toString().padStart(2, '0');
    alarmModal.classList.add('active');

    if (isAlarmPlaying) return;
    isAlarmPlaying = true;
    playBeep();
    alarmInterval = setInterval(playBeep, 1000);
  }

  function stop() {
    isAlarmPlaying = false;
    if (oscillator) {
      // InvalidStateError if already stopped — safe to ignore
      try { oscillator.stop(); } catch (e) { /* already stopped */ }
    }
    if (alarmInterval) {
      clearInterval(alarmInterval);
      alarmInterval = null;
    }
    document.getElementById('alarmModal').classList.remove('active');
    triggeredIds = {};
  }

  function check(schedules) {
    var now = new Date();
    var currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    var currentDay = now.getDay();
    var currentSecond = now.getSeconds();
    var alarmKey = currentTime + '-' + currentDay;

    if (currentSecond !== 0) return;
    if (alarmKey === lastAlarmKey) return;

    lastAlarmKey = alarmKey;
    triggeredIds = {};

    schedules.forEach(function (schedule) {
      if (!schedule.enabled) return;
      if (schedule.days.indexOf(currentDay) === -1) return;

      var scheduleTime = schedule.time.hour.toString().padStart(2, '0') + ':' + schedule.time.minute.toString().padStart(2, '0');

      if (scheduleTime === currentTime) {
        if (!triggeredIds[schedule.id]) {
          triggeredIds[schedule.id] = true;
          trigger(schedule);
        }
      }
    });
  }

  // Resume AudioContext on first user interaction (browser autoplay policy)
  function resumeOnInteraction() {
    var ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    document.removeEventListener('click', resumeOnInteraction);
    document.removeEventListener('touchstart', resumeOnInteraction);
  }
  document.addEventListener('click', resumeOnInteraction);
  document.addEventListener('touchstart', resumeOnInteraction);

  window.App = window.App || {};
  window.App.alarm = {
    check: check,
    stop: stop
  };
})();
