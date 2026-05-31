/**
 * schedule.js — 日程 CRUD、列表渲染、弹窗交互
 */
(function () {
  var ICON_COLORS = {
    piano: '#333',
    dance: '#FF69B4',
    english: '#4169E1',
    art: '#FF69B4',
    reading: '#DEB887',
    sports: '#90EE90',
    music: '#9370DB',
    drawing: '#FF6B6B'
  };

  var els = {};
  var editingId = null;
  var selectedIcon = 'piano';
  var selectedDays = [];

  function render(schedules) {
    var today = new Date().getDay();

    var allSchedules = schedules.slice().sort(function (a, b) {
      var aTime = a.time.hour * 60 + a.time.minute;
      var bTime = b.time.hour * 60 + b.time.minute;
      if (aTime !== bTime) return aTime - bTime;
      // Monday-first order: Mon=0, Tue=1, ... Sun=6
      var aDay = a.days[0] === 0 ? 6 : a.days[0] - 1;
      var bDay = b.days[0] === 0 ? 6 : b.days[0] - 1;
      return aDay - bDay;
    });

    if (schedules.length === 0) {
      els.scheduleList.innerHTML =
        '<div class="empty-state">' +
        '<svg><use href="#icon-bell"/></svg>' +
        '<p>还没有日程哦~<br>点击下方 + 按钮添加吧!</p>' +
        '</div>';
      return;
    }

    els.scheduleList.innerHTML = allSchedules.map(function (schedule) {
      var timeStr = schedule.time.hour.toString().padStart(2, '0') + ':' + schedule.time.minute.toString().padStart(2, '0');
      var daysStr = schedule.days.map(function (d) {
        return '<span class="day-badge ' + (d === today ? 'active' : '') + '">' + App.DAYS[App.dayIndex(d)].charAt(1) + '</span>';
      }).join('');
      var iconColor = ICON_COLORS[schedule.icon] || '#FFB6C1';

      return (
        '<div class="schedule-card" style="--icon-color: ' + iconColor + '; ' + (!schedule.enabled ? 'opacity: 0.5;' : '') + '">' +
        '<div class="schedule-icon" style="background: ' + iconColor + '20;">' +
        '<svg style="color: ' + iconColor + ';"><use href="#icon-' + App.escapeHtml(schedule.icon) + '"/></svg>' +
        '</div>' +
        '<div class="schedule-info">' +
        '<div class="schedule-title">' + App.escapeHtml(schedule.title) + '</div>' +
        '<div class="schedule-time">' + timeStr + '</div>' +
        '<div class="schedule-days">' + daysStr + '</div>' +
        '</div>' +
        '<div class="schedule-actions">' +
        '<button class="action-btn edit-btn" onclick="App.schedule.openModal(App.schedules.find(function(s){return s.id===\'' + schedule.id + '\'}))">' +
        '<svg><use href="#icon-edit"/></svg>' +
        '</button>' +
        '<button class="action-btn delete-btn" onclick="App.schedule.deleteSchedule(\'' + schedule.id + '\')">' +
        '<svg><use href="#icon-delete"/></svg>' +
        '</button>' +
        '</div>' +
        '</div>'
      );
    }).join('');
  }

  function openModal(schedule) {
    schedule = schedule || null;
    editingId = schedule ? schedule.id : null;
    els.modalTitle.textContent = schedule ? '编辑日程' : '添加日程';

    if (schedule) {
      selectedIcon = schedule.icon;
      els.titleInput.value = schedule.title;
      els.hourInput.value = schedule.time.hour;
      els.minuteInput.value = schedule.time.minute;
      selectedDays = schedule.days.slice();

      els.iconGrid.querySelectorAll('.icon-option').forEach(function (btn) {
        btn.classList.toggle('selected', btn.dataset.icon === schedule.icon);
      });

      els.daySelector.querySelectorAll('.day-btn').forEach(function (btn) {
        btn.classList.toggle('selected', selectedDays.indexOf(parseInt(btn.dataset.day)) !== -1);
      });
    } else {
      selectedIcon = 'piano';
      els.titleInput.value = '钢琴';
      els.hourInput.value = 9;
      els.minuteInput.value = 0;
      selectedDays = [new Date().getDay()];

      els.iconGrid.querySelectorAll('.icon-option').forEach(function (btn, i) {
        btn.classList.toggle('selected', i === 0);
      });

      els.daySelector.querySelectorAll('.day-btn').forEach(function (btn) {
        btn.classList.toggle('selected', parseInt(btn.dataset.day) === new Date().getDay());
      });
    }

    els.scheduleModal.classList.add('active');
  }

  function closeModal() {
    els.scheduleModal.classList.remove('active');
    editingId = null;
  }

  function saveSchedule() {
    var title = els.titleInput.value.trim() || '日程';
    var hour = Math.min(23, Math.max(0, parseInt(els.hourInput.value) || 0));
    var minute = Math.min(59, Math.max(0, parseInt(els.minuteInput.value) || 0));

    if (selectedDays.length === 0) {
      alert('请至少选择一个重复周期');
      return;
    }

    if (editingId) {
      var index = App.schedules.findIndex(function (s) { return s.id === editingId; });
      if (index !== -1) {
        App.schedules[index] = Object.assign({}, App.schedules[index], {
          title: title,
          icon: selectedIcon,
          time: { hour: hour, minute: minute },
          days: selectedDays.slice().sort(function (a, b) { return a - b; })
        });
      }
    } else {
      App.schedules.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: title,
        icon: selectedIcon,
        time: { hour: hour, minute: minute },
        days: selectedDays.slice().sort(function (a, b) { return a - b; }),
        enabled: true
      });
    }

    App.storage.save(App.schedules);
    render(App.schedules);
    closeModal();
  }

  function deleteSchedule(id) {
    if (confirm('确定要删除这个日程吗?')) {
      App.schedules = App.schedules.filter(function (s) { return s.id !== id; });
      App.storage.save(App.schedules);
      render(App.schedules);
    }
  }

  function init() {
    els.scheduleList = document.getElementById('scheduleList');
    els.scheduleModal = document.getElementById('scheduleModal');
    els.iconGrid = document.getElementById('iconGrid');
    els.daySelector = document.getElementById('daySelector');
    els.titleInput = document.getElementById('titleInput');
    els.hourInput = document.getElementById('hourInput');
    els.minuteInput = document.getElementById('minuteInput');
    els.modalTitle = document.getElementById('modalTitle');

    document.getElementById('addBtn').addEventListener('click', function () { openModal(); });
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('saveBtn').addEventListener('click', saveSchedule);

    els.scheduleModal.addEventListener('click', function (e) {
      if (e.target === els.scheduleModal) closeModal();
    });

    els.iconGrid.querySelectorAll('.icon-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        els.iconGrid.querySelectorAll('.icon-option').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        selectedIcon = btn.dataset.icon;
        els.titleInput.value = btn.dataset.title;
      });
    });

    els.daySelector.querySelectorAll('.day-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var day = parseInt(btn.dataset.day);
        btn.classList.toggle('selected');
        if (selectedDays.indexOf(day) !== -1) {
          selectedDays = selectedDays.filter(function (d) { return d !== day; });
        } else {
          selectedDays = selectedDays.concat([day]);
        }
      });
    });
  }

  window.App = window.App || {};
  window.App.schedule = {
    init: init,
    render: render,
    openModal: openModal,
    deleteSchedule: deleteSchedule
  };
})();
