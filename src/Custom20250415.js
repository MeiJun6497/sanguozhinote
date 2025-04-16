function enhanceAbbr(abbr) {
  if (abbr.dataset.tooltipProcessed) return; // 避免重複處理

  const tooltipText = abbr.getAttribute('title');
  if (!tooltipText) return;

  abbr.removeAttribute('title');
  abbr.setAttribute('title', '');
  abbr.setAttribute('data-tooltip', tooltipText);
  abbr.setAttribute('tabindex', '0');
  abbr.dataset.tooltipProcessed = 'true';

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
  tooltip.style.visibility = 'hidden';
  tooltip.style.zIndex = '9999';
  tooltip.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
  document.body.appendChild(tooltip);

  abbr.addEventListener('click', function (event) {
    document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
      tip.style.visibility = 'hidden';
      tip.classList.remove('visible');
    });

    const rect = abbr.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 4}px`;
    tooltip.style.visibility = 'visible';
    tooltip.classList.add('visible');
    event.stopPropagation();
  });
}

// 初始處理
function processAllAbbrs() {
  document.querySelectorAll('abbr[title]').forEach(enhanceAbbr);
}

// 動態監聽新節點出現
const observer = new MutationObserver(() => {
  processAllAbbrs();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

document.addEventListener('DOMContentLoaded', () => {
  processAllAbbrs();

  // 點其他地方或滾動時關閉 tooltip
  document.addEventListener('click', function () {
    document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
      tip.style.visibility = 'hidden';
      tip.classList.remove('visible');
    });
  });

  window.addEventListener('scroll', function () {
    document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
      tip.style.visibility = 'hidden';
      tip.classList.remove('visible');
    });
  });
});
