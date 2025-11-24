(function () {
  console.log("可云 Popup loaded");

  const FIRST_DELAY = 3000;      // 第一次弹窗延迟
  const CLICK_WINDOW = 60000;    // 第二次弹窗点击窗口 60s

  let firstDone = false;
  let secondDone = false;
  let popupVisible = false;

  function showPopup() {
    if (popupVisible) return;
    popupVisible = true;

    const mask = document.createElement("div");
    mask.style.cssText = `
      position:fixed; inset:0;
      background:rgba(0,0,0,.55);
      display:flex; justify-content:center; align-items:center;
      z-index:999999;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      width: 330px; background:#fff; border-radius:16px;
      padding:22px; text-align:center; font-size:15px;
      box-shadow:0 4px 20px rgba(0,0,0,.18);
      position:relative;
    `;

    box.innerHTML = `
      <div style="
        position:absolute;right:14px;top:10px;
        font-size:22px;color:#999;cursor:pointer;">×</div>

      <h2 style="font-size:20px;margin:10px 0 14px;color:#ff68a0;">
        📢 新人必看公告
      </h2>

      <p style="line-height:1.6;">欢迎来到可云，请务必阅读顶部公告栏信息。</p>
      <p style="line-height:1.6;">请收藏最新地址：<b>shy521.com</b></p>
      <p style="line-height:1.6;margin-bottom:18px;">
        加入 TG 群组：<a href="https://t.me/ss_keyun" target="_blank">t.me/ss_keyun</a>
      </p>

      <button style="
        background:#ff68a0;color:#fff;border:none;
        padding:10px 24px;border-radius:10px;
        font-size:15px;cursor:pointer;">
        我已知晓
      </button>
    `;

    mask.appendChild(box);
    document.body.appendChild(mask);

    const closeFn = () => {
      popupVisible = false;
      mask.remove();
      onClose();
    };

    box.querySelector("div").onclick = closeFn;
    box.querySelector("button").onclick = closeFn;
  }

  function onClose() {
    if (!firstDone) {
      firstDone = true;
      startClickMonitor();
    } else if (!secondDone) {
      secondDone = true;
    }
  }

  function startClickMonitor() {
    const handler = () => {
      if (!secondDone && !popupVisible) {
        showPopup();
      }
      document.removeEve
