// ── Chart Defaults ──
Chart.defaults.color = '#4a5068';
Chart.defaults.borderColor = '#1a1f2e';

// ── Portfolio Performance Chart ──
function initPerfChart() {
  const ctx = document.getElementById('perfChart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 110);
  gradient.addColorStop(0, 'rgba(79,124,255,.22)');
  gradient.addColorStop(1, 'rgba(79,124,255,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Feb 1', '5', '9', '13', '17', '21', '25', 'Mar 2'],
      datasets: [{
        data: [17440, 17280, 17610, 17390, 17820, 17950, 18010, 18241],
        borderColor: '#4f7cff',
        borderWidth: 2,
        fill: true,
        backgroundColor: gradient,
        tension: .45,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#4f7cff',
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111520',
          borderColor: '#1a1f2e',
          borderWidth: 1,
          titleColor: '#4a5068',
          bodyColor: '#e8eaf0',
          callbacks: { label: ctx => ' $' + ctx.raw.toLocaleString() + 'K' }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#2e3550' } },
        y: { display: false }
      }
    }
  });
}

// ── Allocation Donut Chart ──
function initAllocChart() {
  const ctx = document.getElementById('allocChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [42, 18, 16, 8, 8, 8],
        backgroundColor: ['#4f7cff', '#22d3a0', '#f0b429', '#a78bfa', '#f05252', '#38bdf8'],
        borderWidth: 0,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#111520',
          borderColor: '#1a1f2e',
          borderWidth: 1,
          bodyColor: '#e8eaf0',
        }
      }
    }
  });
}

// ── Tab Switching ──
function initTabs() {
  document.querySelectorAll('.perf-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      this.closest('.perf-tabs').querySelectorAll('.perf-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelectorAll('.tb-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.tb-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ── AI Chat ──
let chatOpen = false;
const conversationHistory = [];

const PORTFOLIO_CONTEXT = `You are Finthos AI, a private wealth advisor for the Al-Karimi family office. Here is their current portfolio snapshot:

- Total Net Worth: $24,871,430
- Investable Assets: $18.2M (▲ +4.1%)
- Real Estate: $4.6M including Dubai Marina Unit (▲ +1.2%)
- Private Equity: $1.9M (▼ -0.3%)
- Cash & Equivalents: $180K

Portfolio Allocation: Equities 42% ($10.4M), Real Estate 18% ($4.6M), Fixed Income 16% ($3.9M), Private Equity 8% ($1.9M), Crypto 8% ($2.0M), Cash 8% ($1.8M)

Top Holdings: AAPL $2.14M (+2.4%), BTC $1.58M (+6.1%), Dubai Marina RE $1.35M (+1.1%), NVDA $1.18M (-1.8%), AMZN $980K (+0.9%)

Recent activity: Bought AAPL ×120 ($228K), received VTI dividend $14.2K, sold 0.5 BTC (+$48.5K), wired $450K for Dubai property, rebalanced $120K into bonds.

Be concise, data-driven, and professional. Reference specific numbers from their portfolio when relevant. Keep responses under 4 sentences unless the question requires more detail.`;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chatPanel').classList.toggle('open', chatOpen);
  if (chatOpen) document.getElementById('chatInput').focus();
}

function quickAsk(question) {
  document.getElementById('chatInput').value = question;
  sendMessage();
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 80) + 'px';
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(text, role) {
  const container = document.getElementById('chatMessages');
  const wrapper = document.createElement('div');
  wrapper.className = `msg ${role}`;
  wrapper.innerHTML = `<div class="msg-bubble">${text}</div><div class="msg-time">${getCurrentTime()}</div>`;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
  return wrapper;
}

function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  const indicator = document.createElement('div');
  indicator.className = 'msg ai';
  indicator.id = 'typing-indicator';
  indicator.innerHTML = `
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const userMessage = input.value.trim();

  if (!userMessage) return;

  appendMessage(userMessage, 'user');
  conversationHistory.push({ role: 'user', content: userMessage });

  input.value = '';
  input.style.height = 'auto';
  sendBtn.disabled = true;
  showTypingIndicator();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: PORTFOLIO_CONTEXT,
        messages: conversationHistory
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Sorry, I had trouble responding. Please try again.';

    removeTypingIndicator();
    appendMessage(reply, 'ai');
    conversationHistory.push({ role: 'assistant', content: reply });

  } catch (err) {
    removeTypingIndicator();
    appendMessage('Connection error. Please check your network and try again.', 'ai');
  }

  sendBtn.disabled = false;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initPerfChart();
  initAllocChart();
  initTabs();
});