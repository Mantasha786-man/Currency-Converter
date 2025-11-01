## 🖥️ Overview

**Currency Converter Project Description**

**Language Used:**
The currency converter application is built using three main web technologies:
- HTML (HyperText Markup Language): Used for structuring the webpage, including the form elements, dropdowns, and layout.
- CSS (Cascading Style Sheets): Used for styling the application, including the gradient background, responsive design, dark mode toggle, and visual effects like animations and hover states.
- JavaScript: Used for the interactive functionality, including fetching data from an external API, handling user inputs, updating the UI dynamically, and managing features like dark mode and flag display.

**How It Works:**
This is a web-based currency converter that allows users to convert amounts between different currencies in real-time. The application fetches live exchange rates from the external API "https://api.exchangerate-api.com/v4/latest/".

**Key Features and Workflow:**
1. User Interface: The page displays a form with an input field for the amount, two dropdown menus for selecting "From" and "To" currencies, and a convert button. Flags of the selected countries are displayed next to the dropdowns for visual reference.

2. Initialization: When the page loads, JavaScript initializes the app by setting up event listeners and loading currency options from a predefined list (stored in codes.js, which maps currency codes to country codes for flags).

3. Currency Selection: Users can select currencies from dropdowns populated with options like USD, EUR, GBP, INR, etc. Changing the selection updates the corresponding flag image dynamically.

4. Conversion Process: Upon entering an amount and selecting currencies, or clicking the convert button, JavaScript sends an asynchronous request to the API using the "fetch" method. It retrieves the latest exchange rates for the selected "From" currency.

5. Calculation and Display: The script calculates the converted amount by multiplying the input amount with the fetched exchange rate. The result is displayed in a message area below the form, showing the conversion (e.g., "100 USD = 8300 INR"). If there's an error (e.g., invalid amount or API failure), an error message is shown.

6. Dark Mode: A toggle button in the top-right corner allows switching between light and dark themes by adding/removing a CSS class to the body element, which changes the background gradient and other styles.

7. Responsiveness: The design is responsive, adapting to different screen sizes using CSS media queries, ensuring usability on mobile devices.

8. Additional Details: The app includes loading messages during API calls, input validation (e.g., ensuring positive numbers), and smooth transitions for a better user experience. The codes.js file contains a constant object mapping currency codes to country codes, used for fetching flag images from "https://flagsapi.com/".

Overall, the application demonstrates modern web development practices, including DOM manipulation, event handling, asynchronous programming with promises, and integration with external APIs for real-time data.

<img width="1913" height="904" alt="Image" src="https://github.com/user-attachments/assets/47b2e5db-87c7-4f36-8171-0814a97b98d6" />
<img width="1890" height="906" alt="Image" src="https://github.com/user-attachments/assets/f4e57002-682c-421c-a8eb-00fabda81b8d" />


