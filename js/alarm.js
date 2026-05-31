/**
 * alarm.js — 闹钟检测、Web Audio 播放
 */
(function () {
  var audioContext = null;
  var oscillator = null;
  var isAlarmPlaying = false;
  var alarmInterval = null;
  var lastAlarmKey = null;
  var triggeredStartIds = {};
  var triggeredEndIds = {};

  function playTone(ctx, freq) {
    oscillator = ctx.createOscillator();
    var gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  function playBeep() {
    if (!isAlarmPlaying || !audioContext) return;

    playTone(audioContext, 880);

    setTimeout(function () {
      if (!isAlarmPlaying) return;
      playTone(audioContext, 1046.5);
    }, 350);
  }

  function trigger(schedule, type) {
    var alarmScheduleName = document.getElementById('alarmScheduleName');
    var alarmTime = document.getElementById('alarmTime');
    var alarmModal = document.getElementById('alarmModal');
    var time = type === 'end' ? schedule.endTime : schedule.startTime;

    alarmScheduleName.textContent = schedule.title + (type === 'end' ? '（结束）' : '');
    alarmTime.textContent =
      time.hour.toString().padStart(2, '0') + ':' +
      time.minute.toString().padStart(2, '0');
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
    triggeredStartIds = {};
    triggeredEndIds = {};
  }

  function checkTime(scheduleTime) {
    if (!scheduleTime) return null;
    var now = new Date();
    var currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    var scheduleTimeStr = scheduleTime.hour.toString().padStart(2, '0') + ':' + scheduleTime.minute.toString().padStart(2, '0');
    return currentTime === scheduleTimeStr;
  }

  function check(schedules) {
    if (!audioContext) return;

    var now = new Date();
    var currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    var currentDay = now.getDay();
    var currentSecond = now.getSeconds();
    var alarmKey = currentTime + '-' + currentDay;

    if (currentSecond !== 0) return;
    if (alarmKey === lastAlarmKey) return;

    lastAlarmKey = alarmKey;
    triggeredStartIds = {};
    triggeredEndIds = {};

    schedules.forEach(function (schedule) {
      if (!schedule.enabled) return;
      if (schedule.days.indexOf(currentDay) === -1) return;

      // Check start time
      if (checkTime(schedule.startTime)) {
        if (!triggeredStartIds[schedule.id]) {
          triggeredStartIds[schedule.id] = true;
          trigger(schedule, 'start');
        }
      }

      // Check end time
      if (checkTime(schedule.endTime)) {
        if (!triggeredEndIds[schedule.id]) {
          triggeredEndIds[schedule.id] = true;
          trigger(schedule, 'end');
        }
      }
    });
  }

  // Create AudioContext on first user interaction (browser autoplay policy)
  function resumeOnInteraction() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
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
