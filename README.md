# SE302 - SauceDemo Automation Project

This repository contains a comprehensive automated test suite for the [SauceDemo](https://www.saucedemo.com/) web application. The project was developed as part of the **SE302 - Software Testing and Maintenance** course. It demonstrates a robust testing architecture using the **Playwright** framework and the **Page Object Model (POM)** design pattern.

## 👥 Contributors
* **Can Aysen**
* **Atacan Acar**
* **Yunus Yedek**
* **Meral Buse Yalciner**

---

## 🏗 Project Architecture: Page Object Model (POM)

To ensure the code is maintainable, scalable, and readable, we implemented the **Page Object Model (POM)**. This pattern separates the technical details of the web pages (locators and methods) from the actual test logic.

### Folder Structure
* **`page-objects/`**: Contains classes for each page (Login, Inventory, Cart, and Checkout). Each class handles the elements and actions specific to that page.
* **`tests/`**: Contains the test scripts. Scenarios are categorized into **Smoke Tests** (critical paths) and **Normal/Functional Tests** (detailed edge cases and negative scenarios).
* **`playwright.config.js`**: Central configuration for timeouts, retries, and browser settings.

---

## 🌐 Cross-Browser Support

The project is specifically configured to run and pass on the following browsers:
* **Google Chrome** (Chromium engine)
* **Brave Browser** (Chromium engine with specific channel configuration)
* **Safari** (WebKit engine)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **Git** installed and configured

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/Canaisen/SE302---SauceDemo-Automation-Project.git
    ```
2.  Navigate to the directory and install the required dependencies:
    ```bash
    npm install
    ```
3.  Install the Playwright browser binaries:
    ```bash
    npx playwright install
    ```

### Running the Tests
* **Run all tests in headless mode:**
    ```bash
    npm test
    ```
* **Run tests in headed mode (to see the browser):**
    ```bash
    npx playwright test --headed
    ```
* **View the test execution report:**
    ```bash
    npx playwright show-report
    ```

---

## 🧠 Challenges and Solutions

During the development process, we addressed key automation challenges as outlined in the SE302 course curriculum:

1.  **Handling Flaky Tests:** We utilized Playwright's auto-waiting features and configured global retries to manage network latency and ensure test stability.
2.  **Repetitive Code:** We centralized common user flows (like Login and Product Selection) into reusable methods within the Page Objects.
3.  **Dynamic Elements:** Utilized stable `data-test` attributes as locators to prevent test failures caused by changing IDs or CSS classes.
4.  **Data Management:** Used unique and isolated data sets for different test runs (e.g., using specific names like *Can Aysen* for negative tests and *Atacan Acar* for positive flows) to maintain an isolated environment.
5.  **Browser Specifics:** We configured browser channels to ensure that the automation works consistently on Brave and Safari (WebKit).

---
*Developed for the Faculty of Engineering and Natural Sciences at the International University of Sarajevo (IUS) - 2026.*
