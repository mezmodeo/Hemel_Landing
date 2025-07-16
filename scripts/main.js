document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // --- Product Data --
    // =========================================================================
    const productData = {
        'default': {
            palette: [
                { description: "1000H Бесцветная база", previewImg: null, swatchImg: null },
                { description: "1011H Белый", previewImg: "images_1aws/1aws1.png", swatchImg: "images_aws/aws1.png" },
                { description: "1012H Махагон", previewImg: "images_1aws/1aws2.png", swatchImg: "images_aws/aws2.png" },
                { description: "1013H Американский орех", previewImg: "images_1aws/1aws3.png", swatchImg: "images_aws/aws3.png" },
                { description: "1014H Груша", previewImg: "images_1aws/1aws4.png", swatchImg: "images_aws/aws4.png" },
                { description: "1015H Бук", previewImg: "images_1aws/1aws5.png", swatchImg: "images_aws/aws5.png" },
                { description: "1016H Дуб", previewImg: "images_1aws/1aws6.png", swatchImg: "images_aws/aws6.png" },
                { description: "1017H Венге", previewImg: "images_1aws/1aws7.png", swatchImg: "images_aws/aws7.png" },
                { description: "1018H Серая платина", previewImg: "images_1aws/1aws8.png", swatchImg: "images_aws/aws8.png" }
            ],
            packaging: [
                { size: '0,1л', price: 410 },
                { size: '0,75л', price: 2370 },
                { size: '2,5л', price: 7200 }
            ]
        },
        'breather-paint': {
            palette: [
                { description: "311H Лимонный", previewImg: "images_1aws/images_hdo1/1hdo1.png", swatchImg: "images_1aws/images_hdo/hdo1.png" },
                { description: "3112H Ироко", previewImg: "images_1aws/images_hdo1/1hdo2.png", swatchImg: "images_1aws/images_hdo/hdo2.png" },
                { description: "3113H Бангкирай", previewImg: "images_1aws/images_hdo1/1hdo3.png", swatchImg: "images_1aws/images_hdo/hdo3.png" },
                { description: "3114H Серый базальт", previewImg: "images_1aws/images_hdo1/1hdo4.png", swatchImg: "images_1aws/images_hdo/hdo4.png" },
                { description: "3115H Сапелле", previewImg: "images_1aws/images_hdo1/1hdo5.png", swatchImg: "images_1aws/images_hdo/hdo5.png" },
                { description: "3116H Красный сандал", previewImg: "images_1aws/images_hdo1/1hdo6.png", swatchImg: "images_1aws/images_hdo/hdo6.png" },
                { description: "3117H Борнео", previewImg: "images_1aws/images_hdo1/1hdo7.png", swatchImg: "images_1aws/images_hdo/hdo7.png" },
                { description: "3118H Галька", previewImg: "images_1aws/images_hdo1/1hdo8.png", swatchImg: "images_1aws/images_hdo/hdo8.png" },
                { description: "3119H Орех", previewImg: "images_1aws/images_hdo1/1hdo9.png", swatchImg: "images_1aws/images_hdo/hdo9.png" }
            ],
            packaging: [
                { size: '0.18л', price: 840 },
                { size: '0,75л', price: 2620 },
                { size: '2.5л', price: 8260 }
            ]
        }
        // 'aqua-wood-stain' will use the 'default' data for now.
    };


    // =========================================================================
    // --- Mobile Menu Logic ---
    // =========================================================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (menuBtn && mobileMenu && closeMenuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    }

    // =========================================================================
    // --- Review Ticker Logic ---
    // =========================================================================
    const tickerContent = document.getElementById('review-ticker-content');
    if (tickerContent) {
        const allReviews = [
            "Ирина, Московская область: «Deck Oil \"Орех\" — всё лето дожди, а покрытие как новое! Вода скатывается, ни одного чёрного пятнышка.»",
            "Алексей, подрядчик из Тулы: «Перешли на Aqua Breather Paint — через год фасад в идеальном состоянии, заказчик доволен!»",
            "Елена и Андрей, СПб: «Aqua Wood Satin для детской — без запаха, безопасно. Пятна от фломастеров не видно»",
        ];
        const reviewString = allReviews.sort(() => 0.5 - Math.random()).join(' \xa0\xa0\xa0\xa0\xa0 ');
        const span1 = document.createElement('span');
        span1.className = 'px-4 whitespace-nowrap';
        span1.textContent = reviewString;
        const span2 = document.createElement('span');
        span2.className = 'px-4 whitespace-nowrap';
        span2.textContent = reviewString;
        tickerContent.innerHTML = '';
        tickerContent.appendChild(span1);
        tickerContent.appendChild(span2);
        let position = 0;
        const speed = 60;
        let lastTime;
        function animateTicker(timestamp) {
            if (!lastTime) lastTime = timestamp;
            const deltaTime = (timestamp - lastTime) / 1000;
            lastTime = timestamp;
            position -= speed * deltaTime;
            if (position <= -span1.offsetWidth) position += span1.offsetWidth;
            tickerContent.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateTicker);
        }
        requestAnimationFrame(animateTicker);
    }

    // =========================================================================
    // --- Adaptive Product Slider Logic ---
    // =========================================================================
    let productSlider = null;
    const sliderWrapper = document.querySelector('.swiper-wrapper');
    const sliderOptions = {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 } }
    };
    function initOrDestroySlider() {
        if (window.innerWidth < 1064) {
            if (productSlider === null) {
                sliderWrapper.classList.remove('grid', 'grid-cols-3', 'gap-8');
                productSlider = new Swiper('.product-slider', sliderOptions);
            }
        } else {
            if (productSlider !== null) {
                productSlider.destroy(true, true);
                productSlider = null;
            }
            sliderWrapper.classList.add('grid', 'grid-cols-3', 'gap-8');
        }
    }
    initOrDestroySlider();
    window.addEventListener('resize', initOrDestroySlider);

    // =========================================================================
    // --- Modal Elements ---
    // =========================================================================
    const modal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalTitle = document.getElementById('modal-title');
    const specButtons = document.querySelectorAll('.view-specs-btn');
    const modalColorPalette = document.getElementById('modal-color-palette');
    const packagingOptionsContainer = document.getElementById('packaging-options-container');
    const packagingOptions = document.getElementById('packaging-options');
    const colorSelectPrompt = document.getElementById('color-select-prompt');
    const hoverPreviewContainer = document.getElementById('hover-preview-container');
    const hoverPreviewImage = document.getElementById('hover-preview-image');
    const hoverPreviewName = document.getElementById('hover-preview-name');
    const packagingAccordionHeader = document.getElementById('packaging-accordion-header');
    const packagingSelectionText = document.getElementById('packaging-selection-text');
    const quantityMinusBtn = document.getElementById('quantity-minus');
    const quantityPlusBtn = document.getElementById('quantity-plus');
    const quantityValueEl = document.getElementById('quantity-value');
    const totalPriceEl = document.getElementById('total-price');
    
    let selectedColorData = null;
    let quantity = 1;

    // =========================================================================
    // --- Core Modal Logic ---
    // =========================================================================
    function updatePrice() {
        const selectedBtn = packagingOptions.querySelector('.packaging-btn.bg-green-600');
        if (!selectedBtn || !totalPriceEl) {
            if(totalPriceEl) totalPriceEl.textContent = '';
            return;
        }
        const pricePerUnit = parseFloat(selectedBtn.dataset.price);
        const total = pricePerUnit * quantity;
        totalPriceEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
    }

    function updatePreview(data) {
        if (data && data.previewImg) {
            hoverPreviewImage.src = data.previewImg;
            hoverPreviewName.textContent = data.description;
            hoverPreviewContainer.classList.remove('invisible');
        } else {
            hoverPreviewContainer.classList.add('invisible');
        }
    }

    function addSwatchEventListeners(swatch) {
        const swatchData = { 
            description: swatch.dataset.description, 
            previewImg: swatch.dataset.previewImg 
        };
        swatch.addEventListener('mouseover', () => updatePreview(swatchData));
        swatch.addEventListener('mouseout', () => updatePreview(selectedColorData));
        swatch.addEventListener('click', () => {
            selectedColorData = swatchData;
            modalColorPalette.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('border-green-500'));
            swatch.classList.add('border-green-500');
            colorSelectPrompt.textContent = swatchData.description || 'Выберите цвет:';
            updatePreview(selectedColorData);
        });
    }

    function addPackagingEventListeners(button) {
        button.addEventListener('click', () => {
            packagingOptions.querySelectorAll('.packaging-btn').forEach(btn => {
                btn.classList.remove('bg-green-600', 'text-white', 'border-green-600');
                btn.classList.add('border-gray-300', 'text-gray-700');
            });
            button.classList.add('bg-green-600', 'text-white', 'border-green-600');
            button.classList.remove('border-gray-300', 'text-gray-700');
            if (window.innerWidth < 815) {
                packagingSelectionText.textContent = button.textContent;
                packagingOptionsContainer.classList.add('hidden');
            }
            updatePrice();
        });
    }

    function generatePalette(productId) {
        modalColorPalette.innerHTML = '';
        const palette = (productData[productId] || productData['default']).palette;
        palette.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch w-12 h-12 bg-gray-200 rounded-md cursor-pointer hover:opacity-75 border-2 border-transparent';
            swatch.dataset.description = color.description;
            if (color.previewImg) swatch.dataset.previewImg = color.previewImg;
            if (color.swatchImg) {
                swatch.classList.add('flex', 'items-center', 'justify-center');
                const img = document.createElement('img');
                img.src = color.swatchImg;
                img.alt = color.description;
                img.className = 'w-full h-full object-contain rounded-md pointer-events-none';
                swatch.appendChild(img);
            }
            modalColorPalette.appendChild(swatch);
            addSwatchEventListeners(swatch);
        });
    }

    function generatePackaging(productId) {
        packagingOptions.innerHTML = '';
        const packaging = (productData[productId] || productData['default']).packaging;
        packaging.forEach(pack => {
            const button = document.createElement('button');
            button.className = 'packaging-btn border border-gray-300 hover:border-green-500 hover:bg-green-50 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-200 active:scale-95';
            button.dataset.price = pack.price;
            button.textContent = pack.size;
            packagingOptions.appendChild(button);
            addPackagingEventListeners(button);
        });
    }

    function resetModalState() {
        selectedColorData = null;
        updatePreview(null);
        colorSelectPrompt.textContent = 'Выберите цвет:';
        packagingSelectionText.textContent = '';
        quantity = 1;
        quantityValueEl.textContent = quantity;
        if(totalPriceEl) totalPriceEl.textContent = '';
    }

    specButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const card = button.closest('.product-card');
            const productId = card.dataset.productId;
            
            resetModalState();
            
            modalTitle.textContent = card.dataset.title;
            modalMainImage.src = card.dataset.image;
            
            generatePalette(productId);
            generatePackaging(productId);

            const nestedSlider = document.querySelector('.nested-slider');
            if(nestedSlider) nestedSlider.style.display = 'none';

            modal.classList.remove('hidden');
            
            const firstPackagingBtn = packagingOptions.querySelector('.packaging-btn');
            if (firstPackagingBtn) {
                firstPackagingBtn.click();
            } else {
                updatePrice();
            }
        });
    });

    if (quantityMinusBtn && quantityPlusBtn) {
        quantityPlusBtn.addEventListener('click', () => {
            quantity++;
            quantityValueEl.textContent = quantity;
            updatePrice();
        });
        quantityMinusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityValueEl.textContent = quantity;
                updatePrice();
            }
        });
    }

    function handlePackagingAccordionClick() {
        packagingOptionsContainer.classList.toggle('hidden');
    }
    function togglePackagingAccordion() {
        const isMobile = window.innerWidth < 815;
        packagingAccordionHeader.removeEventListener('click', handlePackagingAccordionClick);
        if (isMobile) {
            packagingOptionsContainer.classList.add('hidden');
            packagingAccordionHeader.addEventListener('click', handlePackagingAccordionClick);
        } else {
            packagingOptionsContainer.classList.remove('hidden');
            packagingSelectionText.textContent = '';
        }
    }
    window.addEventListener('resize', togglePackagingAccordion);
    togglePackagingAccordion();

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
});
