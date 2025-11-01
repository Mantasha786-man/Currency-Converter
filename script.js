/**
 * Currency Converter Application
 * Features: Dark mode toggle, real-time currency conversion, dynamic flag updates
 */

// Wait for DOM to load before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeApp();
});

/**
 * Main initialization function
 */
function initializeApp() {
    setupDarkModeToggle();
    setupCurrencyConverter();
}

/**
 * Setup dark mode toggle functionality
 */
function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        updateDarkModeIcon(darkModeToggle);
    });
}

/**
 * Update the dark mode toggle icon
 * @param {HTMLElement} toggleButton - The toggle button element
 */
function updateDarkModeIcon(toggleButton) {
    const icon = toggleButton.querySelector('i');
    const isDarkMode = document.body.classList.contains('dark-mode');

    if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/**
 * Setup currency converter functionality
 */
function setupCurrencyConverter() {
    const amountInput = document.querySelector('.amount input');
    const fromSelect = document.querySelector('select[name="form"]');
    const toSelect = document.querySelector('select[name="to"]');
    const convertButton = document.querySelector('button');

    // Load currency options and flags
    loadCurrencyOptions(fromSelect);
    loadCurrencyOptions(toSelect);

    // Set default values
    fromSelect.value = 'USD';
    toSelect.value = 'INR';

    // Update flags for default selections
    updateFlag(fromSelect);
    updateFlag(toSelect);

    // Event listeners
    convertButton.addEventListener('click', function(e) {
        e.preventDefault();
        getExchangeRate();
    });

    amountInput.addEventListener('input', getExchangeRate);
    fromSelect.addEventListener('change', function() {
        updateFlag(fromSelect);
        getExchangeRate();
    });
    toSelect.addEventListener('change', function() {
        updateFlag(toSelect);
        getExchangeRate();
    });

    // Initial conversion
    getExchangeRate();
}

/**
 * Load currency options into select element
 * @param {HTMLElement} selectElement - The select element to populate
 */
function loadCurrencyOptions(selectElement) {
    // Clear existing options
    selectElement.innerHTML = '';

    // Add options from countryList
    for (let currencyCode in countryList) {
        const option = document.createElement('option');
        option.value = currencyCode;
        option.textContent = currencyCode;
        selectElement.appendChild(option);
    }
}

/**
 * Update flag image based on selected currency
 * @param {HTMLElement} selectElement - The select element that triggered the change
 */
function updateFlag(selectElement) {
    const currencyCode = selectElement.value;
    const countryCode = countryList[currencyCode];
    const flagImage = selectElement.parentElement.querySelector('img');

    if (flagImage && countryCode) {
        flagImage.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        flagImage.alt = `${currencyCode} flag`;
    }
}

/**
 * Get exchange rate and update display
 */
async function getExchangeRate() {
    const amountInput = document.querySelector('.amount input');
    const fromSelect = document.querySelector('select[name="form"]');
    const toSelect = document.querySelector('select[name="to"]');
    const messageDiv = document.querySelector('.msg');

    let amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        amount = 1;
        amountInput.value = '1';
    }

    // Show loading message
    messageDiv.textContent = 'Getting exchange rate...';
    messageDiv.style.color = '#fff';

    try {
        // Fetch exchange rate data
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const rate = data.rates[toCurrency];

        if (!rate) {
            throw new Error('Exchange rate not found');
        }

        // Calculate converted amount
        const convertedAmount = (amount * rate).toFixed(2);

        // Update display
        messageDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;

    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        messageDiv.textContent = 'Error: Unable to get exchange rate. Please try again.';
        messageDiv.style.color = '#ff6b6b';
    }
}
