document.addEventListener("DOMContentLoaded", function () {
  // 檢查所有帶有 abbr 標籤的元素
  const abbrElements = document.querySelectorAll('abbr[title]');

  abbrElements.forEach(function (abbr) {
    // 1. 建立 tooltip 元素
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = abbr.getAttribute('title');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.visibility = 'hidden';  // 初始狀態為隱藏
    tooltip.style.zIndex = '9999';
    document.body.appendChild(tooltip);

    // 2. 點擊 abbr 顯示 tooltip
    abbr.addEventListener('click', function (event) {
      const rect = abbr.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.top + window.scrollY + rect.height}px`; // 顯示在文字下方
      tooltip.style.visibility = 'visible';

      // 點擊其他地方隱藏 tooltip
      function hideTooltip() {
        tooltip.style.visibility = 'hidden';
        document.removeEventListener('click', hideTooltip);
      }

      document.addEventListener('click', hideTooltip);
      event.stopPropagation();  // 防止事件冒泡，避免觸發 document 的點擊事件
    });
  });
});

//在abbr自動增加tabindex="0"
document.addEventListener("DOMContentLoaded", function () {
  const abbrElements = document.querySelectorAll('abbr[title]');
  abbrElements.forEach(function (abbr) {
    abbr.setAttribute('tabindex', '0');
  });
});
