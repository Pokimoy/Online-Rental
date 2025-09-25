document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const recentSearches = document.getElementById('recent-searches');
    const suggestions = document.getElementById('suggestions');
    const searchResults = document.getElementById('search-results');

    // 示例数据
    const carData = [
        {
            name: 'BWM Sedan',
            image: 'assets/images/car/BWM Sedan.png',
            category: 'BWM Sedan',
            price: '100.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'BWM Wagon',
            image: 'assets/images/car/BWM Wagon.png',
            category: 'BWM Wagon',
            price: '150.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'BWM SUV',
            image: 'assets/images/car/BWM SUV.png',
            category: 'BWM SUV',
            price: '200.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'Ford Sedan',
            image: 'assets/images/car/Ford Sedan.jpeg',
            category: 'Ford Sedan',
            price: '100.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'Ford Wagon',
            image: 'assets/images/car/Ford Wagon.jpeg',
            category: 'Ford Wagon',
            price: '150.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'Ford SUV',
            image: 'assets/images/car/Ford SUV.jpeg',
            category: 'Ford SUV',
            price: '200.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'Mazda Sedan',
            image: 'assets/images/car/Mazda Sedan.jpeg',
            category: 'Mazda Sedan',
            price: '100.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'Mazda Wagon',
            image: 'assets/images/car/Mazda Wagon.jpeg',
            category: 'Mazda Wagon',
            price: '150.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
        {
            name: 'Mazda SUV',
            image: 'assets/images/car/Mazda SUV.jpeg',
            category: 'Mazda SUV',
            price: '200.00/Day',
            transmission: 'Automatic Transmission',
            collection: 'Collect cars',
            features: 'Cruise Control, MP3 player, Automatic air conditioning, Wifi, GPS Navigation',
            available: true
        },
    ];

    // 获取最近搜索关键词
    function getRecentKeywords() {
        let keywords = localStorage.getItem('recentKeywords');
        if (keywords) {
            return JSON.parse(keywords);
        }
        return [];
    }

    // 保存最近搜索关键词
    function saveRecentKeyword(keyword) {
        let keywords = getRecentKeywords();
        keywords = keywords.filter(item => item !== keyword);
        keywords.unshift(keyword);
        if (keywords.length > 5) {
            keywords.pop();
        }
        localStorage.setItem('recentKeywords', JSON.stringify(keywords));
    }

    // 显示最近搜索关键词
    function displayRecentKeywords() {
        let keywords = getRecentKeywords();
        if (keywords.length > 0) {
            recentSearches.innerHTML = keywords.map(keyword => `<div>${keyword}</div>`).join('');
            recentSearches.style.display = 'block';
        } else {
            recentSearches.style.display = 'none';
        }
    }

    // 聚焦时显示最近搜索
    searchInput.addEventListener('focus', () => {
        if (!searchInput.value) {
            displayRecentKeywords();
        }
    });
    

    // 失去焦点时隐藏最近搜索和实时建议
    searchInput.addEventListener('blur', () => {
        setTimeout(() => { // 延迟隐藏，允许点击最近搜索关键字
            recentSearches.style.display = 'none';
            suggestions.style.display = 'none';
        }, 200);
    });

    // 输入时显示实时建议
    searchInput.addEventListener('input', () => {
        recentSearches.style.display = 'none'; // 输入时隐藏最近搜索
        const query = searchInput.value.toLowerCase();
        if (query) {
            const filteredSuggestions = carData.filter(car => car.name.toLowerCase().includes(query));
            suggestions.innerHTML = filteredSuggestions.map(car => `<div>${car.name}</div>`).join('');
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    });

    // 提交搜索表单
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        saveRecentKeyword(query); // 保存搜索关键词
        const filteredResults = carData.filter(car => car.name.toLowerCase().includes(query));
        displayResults(filteredResults);
        searchInput.blur();
    });

    // 显示搜索结果
    function displayResults(results) {
        if (results.length === 0) {
            results = carData; // 没有完全匹配时显示所有汽车
        }
        searchResults.innerHTML = results.map(car => `
        <li class="product-item col-lg-4 col-md-4 col-sm-4 col-xs-6 availability-vl1">
            <div class="contain-product layout-default">
                <div class="product-thumb">
                    <a href="car_details.html?id=${car.id}" class="link-to-product">
                        <img src="${car.image}" alt="${car.name}" width="270" height="270" class="product-thumnail">
                    </a>
                </div>
                <div class="info">
                    <b class="categories">${car.category}</b>
                    <h4 class="product-title"><a href="car_details.html?id=${car.id}" class="pr-name">${car.name}</a></h4>
                    <div class="price">
                        <ins><span class="price-amount"><span class="currencySymbol">$</span>${car.price}</span></ins>
                    </div>
                    <div class="shipping-info">
                        <p class="shipping-day">${car.transmission}</p>
                        <p class="for-today">${car.collection}</p>
                    </div>
                    <div class="slide-down-box">
                        <p class="message">${car.features}</p>
                        <div class="buttons">
                            <a href="#" class="btn add-to-cart-btn"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>${car.available ? 'RENT' : 'Unavailable'}</a>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `).join('');
    searchResults.style.display = 'block';
    }

    // 处理点击建议
    suggestions.addEventListener('click', function(event) {
        if (event.target.tagName === 'DIV') {
            searchInput.value = event.target.textContent;
            suggestions.style.display = 'none';
            const query = searchInput.value.toLowerCase();
            const filteredResults = carData.filter(car => car.name.toLowerCase().includes(query));
            displayResults(filteredResults);
        }
    });

    // 处理点击最近搜索
    recentSearches.addEventListener('click', function(event) {
        if (event.target.tagName === 'DIV') {
            searchInput.value = event.target.textContent;
            recentSearches.style.display = 'none';
            const query = searchInput.value.toLowerCase();
            const filteredResults = carData.filter(car => car.name.toLowerCase().includes(query));
            displayResults(filteredResults);
        }
    });
});
