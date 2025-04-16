document.addEventListener("DOMContentLoaded", function () {
  const abbrElements = document.querySelectorAll('abbr[title]');

  abbrElements.forEach(function (abbr) {
    // 取得原始 title 內容並移除，避免出現原生 tooltip
    const tooltipText = abbr.getAttribute('title');
    abbr.removeAttribute('title');
    abbr.setAttribute('tabindex', '0'); // 保留可聚焦特性

    // 建立 tooltip 元素
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = tooltipText;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 8px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.maxWidth = '240px';
    tooltip.style.lineHeight = '1.4';
    tooltip.style.visibility = 'hidden'; // 初始隱藏
    tooltip.style.zIndex = '9999';
    tooltip.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(tooltip);

    // 點擊 abbr 顯示 tooltip
    abbr.addEventListener('click', function (event) {
      // 關閉其他 tooltip
      document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
        tip.style.visibility = 'hidden';
        tip.classList.remove('visible');
      });

      const rect = abbr.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 4}px`; // 顯示在文字下方 4px
      tooltip.style.visibility = 'visible';
      tooltip.classList.add('visible');

      event.stopPropagation(); // 防止觸發 document click 隱藏
    });
  });

  // 點擊頁面其他地方時隱藏 tooltip
  document.addEventListener('click', function () {
    document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
      tip.style.visibility = 'hidden';
      tip.classList.remove('visible');
    });
  });

  // 滾動頁面時也隱藏 tooltip（避免位置錯亂）
  window.addEventListener('scroll', function () {
    document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
      tip.style.visibility = 'hidden';
      tip.classList.remove('visible');
    });
  });
});
