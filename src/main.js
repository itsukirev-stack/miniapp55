import './style.css';

function getUserData() {
  try {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) {
        return {
          username: user.username ? `@${user.username}` : user.first_name || 'Гость',
          id: user.id || '---',
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          avatar: user.photo_url || ''
        };
      }
      return { username: 'Гость', id: '---', firstName: '', lastName: '', avatar: '' };
    }
    return { username: 'Гость', id: '---', firstName: '', lastName: '', avatar: '' };
  } catch {
    return { username: 'Гость', id: '---', firstName: '', lastName: '', avatar: '' };
  }
}

function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = {
    menu: document.getElementById('panel-menu'),
    numbers: document.getElementById('panel-numbers'),
    balance: document.getElementById('panel-balance')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(panels).forEach(p => p.classList.remove('active'));
      const tabName = tab.dataset.tab;
      if (panels[tabName]) {
        panels[tabName].classList.add('active');
      }
    });
  });
}

function showModal(number) {
  const overlay = document.getElementById('modalOverlay');
  const numberSpan = document.getElementById('modalNumber');
  numberSpan.textContent = number;
  overlay.classList.add('active');
}

function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  const btn = document.getElementById('modalBtn');
  btn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

function setupDepositModal() {
  const overlay = document.getElementById('depositModalOverlay');
  const btn = document.getElementById('depositModalBtn');
  btn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

function setupRentButtons() {
  const buttons = document.querySelectorAll('.rent-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.number-card');
      const number = card.dataset.number;
      btn.classList.add('loading');
      btn.textContent = '...';
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.textContent = 'Проверка';
        showModal(number);
      }, 500);
    });
  });
}

function setupBalanceButton() {
  const btn = document.getElementById('balanceBtn');
  btn.addEventListener('click', () => {
    document.getElementById('depositModalOverlay').classList.add('active');
  });
}

function showMenuAfterLoading() {
  const loadingScreen = document.getElementById('loadingScreen');
  const mainMenu = document.getElementById('mainMenu');
  setTimeout(() => {
    loadingScreen.classList.remove('visible');
    loadingScreen.style.display = 'none';
    mainMenu.style.display = 'block';
    setTimeout(() => {
      mainMenu.classList.add('visible');
    }, 50);
  }, 2500);
}

const user = getUserData();

const userNameElement = document.getElementById('userName');
if (userNameElement) userNameElement.textContent = user.username;

const balanceUsername = document.getElementById('balanceUsername');
const balanceUserId = document.getElementById('balanceUserId');
if (balanceUsername) balanceUsername.textContent = user.username;
if (balanceUserId) balanceUserId.textContent = `ID: ${user.id}`;

const userAvatar = document.getElementById('userAvatar');
if (userAvatar && user.avatar) {
  userAvatar.src = user.avatar;
}

setupTabs();
setupModal();
setupDepositModal();
setupRentButtons();
setupBalanceButton();

const loadingScreen = document.getElementById('loadingScreen');
setTimeout(() => loadingScreen.classList.add('visible'), 150);

showMenuAfterLoading();