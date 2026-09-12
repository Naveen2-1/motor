/**
 * Inertia Electric Motors Solutions - Products Catalogue Controller
 * Real-time search, category filtering, spec chips, and interactive detail modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('productsCatalogueContainer')) return;
  initProductsCatalogue();
});

function initProductsCatalogue() {
  const container = document.getElementById('productsCatalogueContainer');
  const searchInput = document.getElementById('productSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const countBadge = document.getElementById('productsCountBadge');

  let searchQuery = '';

  // Check URL query parameters for search or legacy category (e.g. ?search=flameproof or ?cat=gearing)
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  const catParam = urlParams.get('cat');

  if (searchParam && searchInput) {
    searchQuery = searchParam.trim().toLowerCase();
    searchInput.value = searchParam;
  } else if (catParam && searchInput) {
    const catSearchMap = {
      // Legacy mappings
      motors: 'motor',
      gearing: 'geared',
      pumps: 'pump',
      power: 'transformer',
      // New category slugs
      'geared-motors': 'geared motor',
      'ac-motors': 'AC motors',
      'brake-motors': 'brake motor',
      'dc-motors': 'DC motor',
      'ahu-motors': 'AHU',
      'crane-motors': 'crane duty'
    };
    const mapped = catSearchMap[catParam.toLowerCase()] || catParam.replace(/-/g, ' ');
    searchQuery = mapped.trim().toLowerCase();
    searchInput.value = mapped;
  }

  function updateClearBtn() {
    if (!clearBtn) return;
    clearBtn.style.display = searchInput && searchInput.value.trim().length > 0 ? 'flex' : 'none';
  }

  function filterAndRender() {
    if (typeof PRODUCTS_DATA === 'undefined') return;

    const filtered = PRODUCTS_DATA.filter(p => {
      if (!searchQuery) return true;
      const q = searchQuery.trim().toLowerCase();

      // Check numerical kW range matching (e.g. "7.5 kW", "15 kW")
      let matchKwRange = false;
      const kwMatch = q.match(/^([\d.]+)\s*(kw)?$/);
      if (kwMatch && p.powerRange) {
        const val = parseFloat(kwMatch[1]);
        const rangeMatch = p.powerRange.match(/([\d.]+)\s*kW\s+to\s+([\d.]+)\s*kW/i);
        if (rangeMatch && !isNaN(val)) {
          const min = parseFloat(rangeMatch[1]);
          const max = parseFloat(rangeMatch[2]);
          if (val >= min && val <= max) {
            matchKwRange = true;
          }
        }
      }

      return (
        matchKwRange ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.powerRange && p.powerRange.toLowerCase().includes(q)) ||
        (p.efficiency && p.efficiency.toLowerCase().includes(q)) ||
        (p.poles && p.poles.toLowerCase().includes(q)) ||
        (p.rpm && p.rpm.toLowerCase().includes(q)) ||
        (p.mounting && p.mounting.toLowerCase().includes(q)) ||
        (p.enclosure && p.enclosure.toLowerCase().includes(q)) ||
        (p.protection && p.protection.toLowerCase().includes(q)) ||
        (p.voltage && p.voltage.toLowerCase().includes(q)) ||
        (p.insulation && p.insulation.toLowerCase().includes(q)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
        (p.popularSpec && p.popularSpec.toLowerCase().includes(q)) ||
        (p.application && p.application.toLowerCase().includes(q)) ||
        (Array.isArray(p.chips) && p.chips.some(c => c.toLowerCase().includes(q)))
      );
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} products`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--bg-surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5" style="margin: 0 auto 16px;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px;">No matching products found</h3>
          <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 20px;">
            We supply custom builds and non-standard frame sizes. Send your requirement or a nameplate photo to our technical team.
          </p>
          <button class="btn btn-whatsapp" onclick="openWhatsAppQuote('Custom Specification')">
            Inquire via WhatsApp
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(product => `
      <article class="product-card" id="card-${product.id}">
        <div class="product-card-media">
          <img src="${product.bg}" alt="${product.name}" class="product-card-img" loading="lazy">
          <div class="product-card-overlay"></div>
          <span class="product-card-badge">${product.categoryLabel}</span>
          <div class="product-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <rect x="9" y="9" width="6" height="6"></rect>
              <line x1="9" y1="1" x2="9" y2="4"></line>
              <line x1="15" y1="1" x2="15" y2="4"></line>
              <line x1="9" y1="20" x2="9" y2="23"></line>
              <line x1="15" y1="20" x2="15" y2="23"></line>
            </svg>
          </div>
        </div>

        <div class="product-card-body">
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-desc">${product.desc}</p>

          <div class="product-chips">
            ${product.chips.map(chip => `<span class="chip">${chip}</span>`).join('')}
          </div>

          <div class="product-specs-compact">
            ${product.powerRange ? `<div class="spec-compact-item"><span class="spec-compact-label">Rating</span><span class="spec-compact-value">${product.powerRange}</span></div>` : ''}
            ${product.efficiency ? `<div class="spec-compact-item"><span class="spec-compact-label">Efficiency</span><span class="spec-compact-value">${product.efficiency.split('/')[0]}</span></div>` : ''}
            ${product.protection ? `<div class="spec-compact-item"><span class="spec-compact-label">Protection</span><span class="spec-compact-value">${product.protection.split(' ')[0]}</span></div>` : ''}
            ${product.mounting ? `<div class="spec-compact-item"><span class="spec-compact-label">Mounting</span><span class="spec-compact-value">${product.mounting.split(',')[0].split('(')[0].trim()}</span></div>` : ''}
          </div>

          <div class="product-card-actions">
            <div class="product-card-actions-row">
              <button class="btn btn-secondary btn-sm" onclick="showProductDetails('${product.id}')">
                View Specs
              </button>
              <button class="btn btn-primary btn-sm open-quote-modal" data-product-name="${product.name}">
                Request Quote
              </button>
            </div>
            <button class="btn btn-whatsapp-outline btn-sm" onclick="openWhatsAppQuote('${product.name}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              Ask Price on WhatsApp
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Rebind quote modal triggers
    if (typeof initQuoteModal === 'function') {
      initQuoteModal();
    }
  }

  // Search event with debounce
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      updateClearBtn();
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterAndRender();
      }, 100);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        updateClearBtn();
        filterAndRender();
      }
    });
  }

  // Clear button click
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        updateClearBtn();
        searchInput.focus();
        filterAndRender();
      }
    });
  }

  // Initial render & sync clear button state
  updateClearBtn();
  filterAndRender();
}

/**
 * Open Product Detail Modal with Full Technical Specifications
 */
function showProductDetails(productId) {
  if (typeof PRODUCTS_DATA === 'undefined') return;
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById('productDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productDetailModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-container" style="max-width: 740px;">
      <div class="modal-header">
        <div>
          <span class="product-card-badge" style="position: static; margin-bottom: 6px;">${product.categoryLabel}</span>
          <h2 class="modal-title">${product.name}</h2>
        </div>
        <button class="modal-close" onclick="closeProductDetailModal()" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div style="height: 200px; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 22px; position: relative;">
          <img src="${product.bg}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(16,25,43,0.85), transparent);"></div>
        </div>

        <p style="color: var(--text-secondary); line-height: 1.65; margin-bottom: 20px;">${product.desc}</p>

        <h4 style="font-size: 14px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
          Key Specifications
        </h4>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: rgba(10,15,29,0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: ${product.application ? '16px' : '24px'};">
          ${product.powerRange ? `<div class="spec-compact-item"><span class="spec-compact-label">Power Rating</span><span class="spec-compact-value" style="font-size:14px;color:var(--accent-blue-light);">${product.powerRange}</span></div>` : ''}
          ${product.poles ? `<div class="spec-compact-item"><span class="spec-compact-label">Pole Configurations</span><span class="spec-compact-value" style="font-size:14px;">${product.poles}</span></div>` : ''}
          ${product.rpm ? `<div class="spec-compact-item"><span class="spec-compact-label">Speed / RPM</span><span class="spec-compact-value" style="font-size:14px;">${product.rpm}</span></div>` : ''}
          ${product.mounting ? `<div class="spec-compact-item"><span class="spec-compact-label">Mounting</span><span class="spec-compact-value" style="font-size:14px;">${product.mounting}</span></div>` : ''}
          ${product.enclosure ? `<div class="spec-compact-item"><span class="spec-compact-label">Enclosure / Cooling</span><span class="spec-compact-value" style="font-size:14px;">${product.enclosure}</span></div>` : ''}
          ${product.protection ? `<div class="spec-compact-item"><span class="spec-compact-label">Ingress Protection</span><span class="spec-compact-value" style="font-size:14px;">${product.protection}</span></div>` : ''}
          ${product.insulation ? `<div class="spec-compact-item"><span class="spec-compact-label">Thermal Insulation</span><span class="spec-compact-value" style="font-size:14px;">${product.insulation}</span></div>` : ''}
          ${product.efficiency ? `<div class="spec-compact-item"><span class="spec-compact-label">Efficiency Standard</span><span class="spec-compact-value" style="font-size:14px;color:#4ade80;">${product.efficiency}</span></div>` : ''}
          ${product.voltage ? `<div class="spec-compact-item"><span class="spec-compact-label">Supply Voltage</span><span class="spec-compact-value" style="font-size:14px;">${product.voltage}</span></div>` : ''}
        </div>

        ${product.application ? `
        <h4 style="font-size: 14px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
          Applications
        </h4>
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px; font-size: 14px;">${product.application}</p>
        ` : ''}

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-whatsapp" style="flex: 1; min-width: 220px;" onclick="openWhatsAppQuote('${product.name}')">
            Ask Price on WhatsApp
          </button>
          <button class="btn btn-primary open-quote-modal" style="flex: 1; min-width: 200px;" data-product-name="${product.name}" onclick="closeProductDetailModal()">
            Request Official RFQ
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProductDetailModal();
  });
}

function closeProductDetailModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}
