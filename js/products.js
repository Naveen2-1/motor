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
  const categoryTabs = document.querySelectorAll('.category-tab');
  const countBadge = document.getElementById('productsCountBadge');

  let activeCategory = 'all';
  let searchQuery = '';

  // Check URL query parameters for category or search (e.g. ?cat=motors or ?search=flameproof)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  const searchParam = urlParams.get('search');

  if (catParam) {
    activeCategory = catParam.toLowerCase();
    categoryTabs.forEach(tab => {
      if (tab.getAttribute('data-category') === activeCategory) {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
    });
  }

  if (searchParam && searchInput) {
    searchQuery = searchParam.toLowerCase();
    searchInput.value = searchParam;
  }

  function filterAndRender() {
    if (typeof PRODUCTS_DATA === 'undefined') return;

    const filtered = PRODUCTS_DATA.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = !searchQuery || 
        p.name.toLowerCase().includes(searchQuery) ||
        p.desc.toLowerCase().includes(searchQuery) ||
        p.powerRange.toLowerCase().includes(searchQuery) ||
        p.chips.some(c => c.toLowerCase().includes(searchQuery)) ||
        p.efficiency.toLowerCase().includes(searchQuery);

      return matchCat && matchSearch;
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
            <div class="spec-compact-item">
              <span class="spec-compact-label">Rating</span>
              <span class="spec-compact-value">${product.powerRange}</span>
            </div>
            <div class="spec-compact-item">
              <span class="spec-compact-label">Efficiency</span>
              <span class="spec-compact-value">${product.efficiency.split('/')[0]}</span>
            </div>
            <div class="spec-compact-item">
              <span class="spec-compact-label">Protection</span>
              <span class="spec-compact-value">${product.protection.split(' ')[0]}</span>
            </div>
            <div class="spec-compact-item">
              <span class="spec-compact-label">Poles</span>
              <span class="spec-compact-value">${product.poles.split(',')[0]}</span>
            </div>
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
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterAndRender();
      }, 180);
    });
  }

  // Category tab switching
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      filterAndRender();
    });
  });

  // Initial render
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
          Technical Specifications
        </h4>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: rgba(10,15,29,0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
          <div class="spec-compact-item">
            <span class="spec-compact-label">Power Rating</span>
            <span class="spec-compact-value" style="font-size: 14px; color: var(--accent-blue-light);">${product.powerRange}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Pole Configurations</span>
            <span class="spec-compact-value" style="font-size: 14px;">${product.poles}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Synchronous Speed (RPM)</span>
            <span class="spec-compact-value" style="font-size: 14px;">${product.rpm}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Mounting Standards</span>
            <span class="spec-compact-value" style="font-size: 14px;">${product.mounting}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Enclosure / Cooling</span>
            <span class="spec-compact-value" style="font-size: 14px;">${product.enclosure}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Ingress Protection</span>
            <span class="spec-compact-value" style="font-size: 14px;">${product.protection}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Thermal Insulation</span>
            <span class="spec-compact-value" style="font-size: 14px;">${product.insulation}</span>
          </div>
          <div class="spec-compact-item">
            <span class="spec-compact-label">Efficiency Standard</span>
            <span class="spec-compact-value" style="font-size: 14px; color: #4ade80;">${product.efficiency}</span>
          </div>
        </div>

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
