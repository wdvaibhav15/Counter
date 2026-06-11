
  let count = 0;
  let step = 1;
  let totalInc = 0;
  let totalDec = 0;

  const countEl = document.getElementById('count');
  const btnDec  = document.getElementById('btnDec');
  const btnInc  = document.getElementById('btnInc');
  const btnReset = document.getElementById('btnReset');
  const totalIncEl = document.getElementById('totalInc');
  const totalDecEl = document.getElementById('totalDec');
  const historyList = document.getElementById('historyList');

  function bump() {
    countEl.classList.remove('bump');
    void countEl.offsetWidth; // reflow
    countEl.classList.add('bump');
    setTimeout(() => countEl.classList.remove('bump'), 200);
  }

  function updateDisplay() {
    countEl.textContent = count;
    countEl.classList.remove('positive','zero');
    countEl.classList.add(count > 0 ? 'positive' : 'zero');
    btnDec.disabled = count <= 0;
    totalIncEl.textContent = totalInc;
    totalDecEl.textContent = totalDec;
  }

  function addHistory(action, value) {
    const item = document.createElement('div');
    item.className = `history-item ${action}`;
    const labels = { inc: `+${step}`, dec: `−${step}`, rst: 'Reset' };
    item.innerHTML = `<span>${labels[action]}</span><span>${value}</span>`;
    historyList.insertBefore(item, historyList.firstChild);
    // Keep last 20
    while (historyList.children.length > 20) historyList.removeChild(historyList.lastChild);
  }

  btnInc.addEventListener('click', () => {
    count += step;
    totalInc += step;
    bump();
    updateDisplay();
    addHistory('inc', count);
  });

  btnDec.addEventListener('click', () => {
    if (count <= 0) return;
    count = Math.max(0, count - step);
    totalDec += step;
    bump();
    updateDisplay();
    addHistory('dec', count);
  });

  btnReset.addEventListener('click', () => {
    count = 0; totalInc = 0; totalDec = 0;
    bump();
    updateDisplay();
    historyList.innerHTML = '';
    addHistory('rst', 0);
  });

  // Step selector
  document.getElementById('stepBtns').addEventListener('click', e => {
    const btn = e.target.closest('.step-btn');
    if (!btn) return;
    step = parseInt(btn.dataset.step);
    document.querySelectorAll('.step-btn').forEach(b => b.classList.toggle('active', b === btn));
  });

  // Keyboard support
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === '+') btnInc.click();
    else if (e.key === 'ArrowDown' || e.key === '-') btnDec.click();
    else if (e.key === 'r' || e.key === 'R') btnReset.click();
  });

  updateDisplay();
