import "./style.css";

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const user = tg?.initDataUnsafe?.user;

document.querySelector("#app").innerHTML = `
<div class="container">
    <h1>🚀 Telegram Mini App</h1>

    <div class="card">
        <h2>Статус</h2>
        <p>${tg ? "🟢 Открыто в Telegram" : "🟡 Открыто в браузере"}</p>
    </div>

    <div class="card">
        <h2>Пользователь</h2>
        <p><b>Имя:</b> ${user?.first_name || "Гость"}</p>
        <p><b>ID:</b> ${user?.id || "-"}</p>
        <p><b>Username:</b> ${user?.username || "нет"}</p>
    </div>

    <button id="btn">Показать сообщение</button>
</div>
`;

document.getElementById("btn").onclick = () => {
    if (tg) {
        tg.showAlert("Добро пожаловать!");
    } else {
        alert("Сейчас приложение открыто в браузере.");
    }
};