/* =========================================================
   MARCELINO'S FRIED ITIK
   SALES AND INVENTORY SYSTEM
   FINAL BROWSER-BASED SCHOOL/DEMO SYSTEM
========================================================= */


/* =========================================================
   LOCAL STORAGE KEYS
========================================================= */

const STORAGE = {

    PRODUCTS: "marcelinos_products",

    CUSTOMERS: "marcelinos_customers",

    SALES: "marcelinos_sales",

    ACCOUNTS: "marcelinos_accounts",

    CURRENT_CUSTOMER: "marcelinos_current_customer"

};


/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const DEFAULT_PRODUCTS = [

    {
        id: "P001",
        name: "Fried Itik Original",
        category: "Fried Itik",
        price: 350,
        stock: 25,
        icon: "🍗"
    },

    {
        id: "P002",
        name: "Fried Itik Spicy",
        category: "Fried Itik",
        price: 375,
        stock: 20,
        icon: "🌶️"
    },

    {
        id: "P003",
        name: "Fried Itik Family Pack",
        category: "Family Pack",
        price: 650,
        stock: 15,
        icon: "🍱"
    },

    {
        id: "P004",
        name: "Itik Special Sauce",
        category: "Sauce",
        price: 120,
        stock: 30,
        icon: "🥣"
    },

    {
        id: "P005",
        name: "Itik Meal Combo",
        category: "Meal Combo",
        price: 450,
        stock: 18,
        icon: "🍛"
    }

];


/* =========================================================
   DEFAULT CUSTOMERS
========================================================= */

const DEFAULT_CUSTOMERS = [

    {
        id: "C001",
        firstName: "Juan",
        middleName: "",
        surname: "Dela Cruz",
        birthdate: "1998-05-12",
        age: 28,
        contact: "9171234567",
        gender: "Male",
        email: "juan@gmail.com"
    },

    {
        id: "C002",
        firstName: "Maria",
        middleName: "",
        surname: "Santos",
        birthdate: "1997-08-21",
        age: 29,
        contact: "9281234567",
        gender: "Female",
        email: "maria@gmail.com"
    },

    {
        id: "C003",
        firstName: "Mark",
        middleName: "",
        surname: "Reyes",
        birthdate: "2000-02-10",
        age: 26,
        contact: "9391234567",
        gender: "Male",
        email: "mark@gmail.com"
    },

    {
        id: "C004",
        firstName: "Anna",
        middleName: "",
        surname: "Garcia",
        birthdate: "1999-11-03",
        age: 26,
        contact: "9451234567",
        gender: "Female",
        email: "anna@gmail.com"
    },

    {
        id: "C005",
        firstName: "Pedro",
        middleName: "",
        surname: "Ramos",
        birthdate: "1996-06-17",
        age: 30,
        contact: "9561234567",
        gender: "Male",
        email: "pedro@gmail.com"
    }

];


/* =========================================================
   DEFAULT SALES
========================================================= */

const DEFAULT_SALES = [

    {
        id: "S001",
        customerId: "C001",
        customerName: "Juan Dela Cruz",
        productId: "P001",
        productName: "Fried Itik Original",
        quantity: 2,
        total: 700,
        date: "2026-09-14"
    },

    {
        id: "S002",
        customerId: "C002",
        customerName: "Maria Santos",
        productId: "P002",
        productName: "Fried Itik Spicy",
        quantity: 1,
        total: 375,
        date: "2026-09-14"
    },

    {
        id: "S003",
        customerId: "C003",
        customerName: "Mark Reyes",
        productId: "P003",
        productName: "Fried Itik Family Pack",
        quantity: 1,
        total: 650,
        date: "2026-09-14"
    },

    {
        id: "S004",
        customerId: "C004",
        customerName: "Anna Garcia",
        productId: "P004",
        productName: "Itik Special Sauce",
        quantity: 3,
        total: 360,
        date: "2026-09-14"
    },

    {
        id: "S005",
        customerId: "C005",
        customerName: "Pedro Ramos",
        productId: "P005",
        productName: "Itik Meal Combo",
        quantity: 2,
        total: 900,
        date: "2026-09-14"
    }

];


/* =========================================================
   CURRENT DATA
========================================================= */

let products = [];

let customers = [];

let sales = [];

let accounts = [];

let cart = [];

let currentCustomer = null;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeStorage();

    loadData();

    setBirthdateLimits();

    setupEventListeners();

    renderAll();

});


/* =========================================================
   INITIALIZE LOCAL STORAGE
========================================================= */

function initializeStorage() {

    if (localStorage.getItem(STORAGE.PRODUCTS) === null) {

        localStorage.setItem(
            STORAGE.PRODUCTS,
            JSON.stringify(DEFAULT_PRODUCTS)
        );

    }

    if (localStorage.getItem(STORAGE.CUSTOMERS) === null) {

        localStorage.setItem(
            STORAGE.CUSTOMERS,
            JSON.stringify(DEFAULT_CUSTOMERS)
        );

    }

    if (localStorage.getItem(STORAGE.SALES) === null) {

        localStorage.setItem(
            STORAGE.SALES,
            JSON.stringify(DEFAULT_SALES)
        );

    }

    if (localStorage.getItem(STORAGE.ACCOUNTS) === null) {

        localStorage.setItem(
            STORAGE.ACCOUNTS,
            JSON.stringify([])
        );

    }

}


/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {

    products = JSON.parse(
        localStorage.getItem(STORAGE.PRODUCTS)
    ) || [];

    customers = JSON.parse(
        localStorage.getItem(STORAGE.CUSTOMERS)
    ) || [];

    sales = JSON.parse(
        localStorage.getItem(STORAGE.SALES)
    ) || [];

    accounts = JSON.parse(
        localStorage.getItem(STORAGE.ACCOUNTS)
    ) || [];

}


/* =========================================================
   SAVE FUNCTIONS
========================================================= */

function saveProducts() {

    localStorage.setItem(
        STORAGE.PRODUCTS,
        JSON.stringify(products)
    );

}


function saveCustomers() {

    localStorage.setItem(
        STORAGE.CUSTOMERS,
        JSON.stringify(customers)
    );

}


function saveSales() {

    localStorage.setItem(
        STORAGE.SALES,
        JSON.stringify(sales)
    );

}


function saveAccounts() {

    localStorage.setItem(
        STORAGE.ACCOUNTS,
        JSON.stringify(accounts)
    );

}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {


    /* ADMIN LOGIN */

    document
        .getElementById("adminLoginForm")
        .addEventListener("submit", handleAdminLogin);


    /* CUSTOMER LOGIN */

    document
        .getElementById("customerLoginForm")
        .addEventListener("submit", handleCustomerLogin);


    /* CUSTOMER SIGNUP */

    document
        .getElementById("customerSignupForm")
        .addEventListener("submit", handleCustomerSignup);


    /* PRODUCT */

    document
        .getElementById("productForm")
        .addEventListener("submit", saveProduct);


    /* CUSTOMER EDIT */

    document
        .getElementById("customerEditForm")
        .addEventListener("submit", saveCustomerEdit);


    /* SALES EDIT */

    document
        .getElementById("saleEditForm")
        .addEventListener("submit", saveSaleEdit);


    /* CHECKOUT */

    document
        .getElementById("checkoutForm")
        .addEventListener("submit", processOrder);


    /* BIRTHDATE */

    document
        .getElementById("signupBirthdate")
        .addEventListener("change", function () {

            document.getElementById("signupAge").value =
                calculateAge(this.value);

        });


    document
        .getElementById("editBirthdate")
        .addEventListener("change", function () {

            document.getElementById("editAge").value =
                calculateAge(this.value);

        });


    /* CONTACT NUMBER */

    document
        .getElementById("signupContact")
        .addEventListener("input", restrictPhoneInput);


    document
        .getElementById("editContact")
        .addEventListener("input", restrictPhoneInput);


    document
        .getElementById("checkoutContact")
        .addEventListener("input", restrictPhoneInput);

}


/* =========================================================
   BIRTHDATE LIMITS
========================================================= */

function setBirthdateLimits() {

    const today = new Date();

    const todayString =
        today.toISOString().split("T")[0];

    document.getElementById("signupBirthdate").max =
        todayString;

    document.getElementById("editBirthdate").max =
        todayString;

}


/* =========================================================
   PHONE INPUT
========================================================= */

function restrictPhoneInput(event) {

    event.target.value =
        event.target.value
            .replace(/\D/g, "")
            .substring(0, 10);

}


/* =========================================================
   AGE CALCULATION
========================================================= */

function calculateAge(birthdate) {

    if (!birthdate) {
        return "";
    }

    const birth = new Date(birthdate);

    const today = new Date();

    let age =
        today.getFullYear() -
        birth.getFullYear();

    const monthDifference =
        today.getMonth() -
        birth.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birth.getDate()
        )
    ) {

        age--;

    }

    return age;

}


/* =========================================================
   NAME HELPER
========================================================= */

function getFullName(customer) {

    return [

        customer.firstName,

        customer.middleName,

        customer.surname

    ]
        .filter(Boolean)
        .join(" ");

}


/* =========================================================
   ID GENERATOR
========================================================= */

function generateId(prefix, list) {

    let number = 1;

    while (
        list.some(
            item =>
                item.id ===
                prefix +
                String(number).padStart(3, "0")
        )
    ) {

        number++;

    }

    return (
        prefix +
        String(number).padStart(3, "0")
    );

}


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(value) {

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP"
        }
    ).format(value);

}


/* =========================================================
   DATE
========================================================= */

function getToday() {

    return new Date()
        .toISOString()
        .split("T")[0];

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   MODAL FUNCTIONS
========================================================= */

function openModal(id) {

    document
        .getElementById(id)
        .classList.remove("hidden");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.add("hidden");

}


/* =========================================================
   AUTH MODALS
========================================================= */

function openAdminLogin() {

    closeAllModals();

    document.getElementById("adminLoginForm").reset();

    hideError("adminLoginError");

    openModal("adminLoginModal");

}


function openCustomerLogin() {

    closeAllModals();

    document
        .getElementById("customerLoginForm")
        .reset();

    hideError("customerLoginError");

    openModal("customerLoginModal");

}


function openCustomerSignup() {

    closeAllModals();

    document
        .getElementById("customerSignupForm")
        .reset();

    document.getElementById("signupAge").value = "";

    hideError("signupError");

    hideError("signupSuccess");

    openModal("customerSignupModal");

}


function switchToSignup() {

    closeModal("customerLoginModal");

    openCustomerSignup();

}


function switchToCustomerLogin() {

    closeModal("customerSignupModal");

    openCustomerLogin();

}


function closeAllModals() {

    document
        .querySelectorAll(".modal")
        .forEach(modal => {
            modal.classList.add("hidden");
        });

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function handleAdminLogin(event) {

    event.preventDefault();

    const username =
        document
            .getElementById("adminUsername")
            .value
            .trim();

    const password =
        document
            .getElementById("adminPassword")
            .value;

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        closeModal("adminLoginModal");

        showAdminPage();

        showToast("Admin login successful.");

    } else {

        showError(
            "adminLoginError",
            "Invalid username or password."
        );

    }

}


/* =========================================================
   SHOW ADMIN
========================================================= */

function showAdminPage() {

    document
        .getElementById("authPage")
        .classList.add("hidden");

    document
        .getElementById("customerPage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.remove("hidden");

    renderAll();

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

function adminLogout() {

    if (
        confirm(
            "Are you sure you want to logout from the administrator account?"
        )
    ) {

        document
            .getElementById("adminPage")
            .classList.add("hidden");

        document
            .getElementById("authPage")
            .classList.remove("hidden");

        showToast("Admin logged out.");

    }

}


/* =========================================================
   CUSTOMER SIGNUP
========================================================= */

function handleCustomerSignup(event) {

    event.preventDefault();

    hideError("signupError");

    hideError("signupSuccess");


    const firstName =
        document
            .getElementById("signupFirstName")
            .value
            .trim();

    const middleName =
        document
            .getElementById("signupMiddleName")
            .value
            .trim();

    const surname =
        document
            .getElementById("signupSurname")
            .value
            .trim();

    const birthdate =
        document
            .getElementById("signupBirthdate")
            .value;

    const age =
        calculateAge(birthdate);

    const contact =
        document
            .getElementById("signupContact")
            .value
            .trim();

    const gender =
        document
            .getElementById("signupGender")
            .value;

    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("signupPassword")
            .value;

    const confirmPassword =
        document
            .getElementById("signupConfirmPassword")
            .value;


    /* VALIDATION */

    if (firstName.length < 2) {

        return showError(
            "signupError",
            "First name must contain at least 2 characters."
        );

    }


    if (surname.length < 2) {

        return showError(
            "signupError",
            "Surname must contain at least 2 characters."
        );

    }


    if (!birthdate) {

        return showError(
            "signupError",
            "Please select your birthdate."
        );

    }


    if (age < 13) {

        return showError(
            "signupError",
            "Customer must be at least 13 years old."
        );

    }


    if (age > 120) {

        return showError(
            "signupError",
            "Please enter a valid birthdate."
        );

    }


    if (!/^\d{10}$/.test(contact)) {

        return showError(
            "signupError",
            "Contact number must contain exactly 10 digits after +63."
        );

    }


    if (!contact.startsWith("9")) {

        return showError(
            "signupError",
            "Philippine mobile number must start with 9 after +63."
        );

    }


    if (!gender) {

        return showError(
            "signupError",
            "Please select your gender."
        );

    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        return showError(
            "signupError",
            "Please enter a valid email address."
        );

    }


    if (password.length < 8) {

        return showError(
            "signupError",
            "Password must contain at least 8 characters."
        );

    }


    if (password !== confirmPassword) {

        return showError(
            "signupError",
            "Password and Confirm Password do not match."
        );

    }


    /* DUPLICATE EMAIL */

    const existingAccount =
        accounts.find(
            account =>
                account.email === email
        );

    if (existingAccount) {

        return showError(
            "signupError",
            "An account with this email address already exists."
        );

    }


    const existingCustomer =
        customers.find(
            customer =>
                customer.email.toLowerCase() === email
        );

    if (existingCustomer) {

        return showError(
            "signupError",
            "This email address is already registered."
        );

    }


    /* CREATE CUSTOMER */

    const customerId =
        generateId("C", customers);


    const newCustomer = {

        id: customerId,

        firstName,

        middleName,

        surname,

        birthdate,

        age,

        contact,

        gender,

        email

    };


    customers.push(newCustomer);


    /* CREATE ACCOUNT */

    const newAccount = {

        customerId,

        email,

        password

    };


    accounts.push(newAccount);


    saveCustomers();

    saveAccounts();


    document
        .getElementById("signupSuccess")
        .textContent =
        "Customer account created successfully! You can now sign in.";

    document
        .getElementById("signupSuccess")
        .classList.remove("hidden");


    document
        .getElementById("customerSignupForm")
        .reset();

    document.getElementById("signupAge").value = "";


    renderAll();


    showToast("Customer account successfully created.");


    setTimeout(
        () => {

            closeModal("customerSignupModal");

            openCustomerLogin();

        },
        1200
    );

}


/* =========================================================
   CUSTOMER LOGIN
========================================================= */

function handleCustomerLogin(event) {

    event.preventDefault();

    hideError("customerLoginError");


    const email =
        document
            .getElementById("customerLoginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document
            .getElementById("customerLoginPassword")
            .value;


    const account =
        accounts.find(
            item =>
                item.email === email &&
                item.password === password
        );


    if (!account) {

        return showError(
            "customerLoginError",
            "Invalid email address or password."
        );

    }


    const customer =
        customers.find(
            item =>
                item.id === account.customerId
        );


    if (!customer) {

        return showError(
            "customerLoginError",
            "Customer record could not be found."
        );

    }


    currentCustomer = customer;


    localStorage.setItem(
        STORAGE.CURRENT_CUSTOMER,
        JSON.stringify(customer)
    );


    closeModal("customerLoginModal");

    showCustomerPage();

    showToast(
        "Welcome, " +
        getFullName(customer) +
        "!"
    );

}


/* =========================================================
   SHOW CUSTOMER PAGE
========================================================= */

function showCustomerPage() {

    document
        .getElementById("authPage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.add("hidden");

    document
        .getElementById("customerPage")
        .classList.remove("hidden");


    document
        .getElementById("customerHeaderName")
        .textContent =
        getFullName(currentCustomer);


    document
        .getElementById("customerWelcomeName")
        .textContent =
        currentCustomer.firstName;


    renderCustomerMenu();

    renderCart();

}


/* =========================================================
   CUSTOMER LOGOUT
========================================================= */

function customerLogout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        currentCustomer = null;

        cart = [];

        localStorage.removeItem(
            STORAGE.CURRENT_CUSTOMER
        );

        document
            .getElementById("customerPage")
            .classList.add("hidden");

        document
            .getElementById("authPage")
            .classList.remove("hidden");

        showToast("Customer logged out.");

    }

}


/* =========================================================
   ADMIN NAVIGATION
========================================================= */

function showAdminSection(section, button) {

    document
        .querySelectorAll(".admin-section")
        .forEach(item => {
            item.classList.add("hidden");
        });


    document
        .getElementById(section + "Section")
        .classList.remove("hidden");


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });


    if (button) {

        button.classList.add("active");

    }


    if (section === "dashboard") {

        renderDashboard();

    }

    if (section === "inventory") {

        renderInventory();

    }

    if (section === "customers") {

        renderCustomers();

    }

    if (section === "sales") {

        renderSales();

    }

}


function showAdminSectionByName(section) {

    const buttons =
        document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        if (
            button.textContent
                .toLowerCase()
                .includes(section)
        ) {

            showAdminSection(
                section,
                button
            );

        }

    });

}


/* =========================================================
   RENDER ALL
========================================================= */

function renderAll() {

    loadData();

    renderDashboard();

    renderInventory();

    renderCustomers();

    renderSales();

    renderCustomerMenu();

    renderCart();

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const totalSales =
        sales.reduce(
            (sum, sale) =>
                sum + Number(sale.total),
            0
        );


    document
        .getElementById("dashboardProducts")
        .textContent =
        products.length;


    document
        .getElementById("dashboardCustomers")
        .textContent =
        customers.length;


    document
        .getElementById("dashboardOrders")
        .textContent =
        sales.length;


    document
        .getElementById("dashboardSales")
        .textContent =
        formatMoney(totalSales);


    const recent =
        [...sales]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 5);


    const tbody =
        document.getElementById(
            "recentSalesTable"
        );


    if (!recent.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;">
                    No sales records found.
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        recent
            .map(
                sale => `
                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(sale.id)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(sale.customerName)}
                    </td>

                    <td>
                        ${escapeHtml(sale.productName)}
                    </td>

                    <td>
                        ${sale.quantity}
                    </td>

                    <td>
                        <strong>
                            ${formatMoney(sale.total)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(sale.date)}
                    </td>

                </tr>
            `
            )
            .join("");

}


/* =========================================================
   INVENTORY RENDER
========================================================= */

function renderInventory() {

    const tbody =
        document.getElementById(
            "inventoryTable"
        );


    if (!products.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;">
                    No products available.
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        products
            .map(product => {

                let statusClass =
                    "status-in";

                let statusText =
                    "In Stock";


                if (product.stock === 0) {

                    statusClass =
                        "status-out";

                    statusText =
                        "Out of Stock";

                } else if (
                    product.stock <= 5
                ) {

                    statusClass =
                        "status-low";

                    statusText =
                        "Low Stock";

                }


                return `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(product.id)}
                        </strong>
                    </td>

                    <td>
                        <strong>
                            ${escapeHtml(product.name)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(product.category)}
                    </td>

                    <td>
                        ${formatMoney(product.price)}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>
                        <span class="status ${statusClass}">
                            ${statusText}
                        </span>
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="btn-edit"
                                onclick="openProductEdit('${product.id}')">
                                ✏ Edit
                            </button>

                            <button
                                class="btn-delete"
                                onclick="deleteProduct('${product.id}')">
                                🗑 Delete
                            </button>

                        </div>

                    </td>

                </tr>

                `;

            })
            .join("");

}


/* =========================================================
   PRODUCT MODAL
========================================================= */

function openProductModal() {

    document
        .getElementById("productForm")
        .reset();

    document
        .getElementById("productEditId")
        .value = "";

    document
        .getElementById("productModalTitle")
        .textContent =
        "Add Product";

    hideError("productError");

    openModal("productModal");

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

function openProductEdit(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;

    }


    document
        .getElementById("productEditId")
        .value =
        product.id;


    document
        .getElementById("productName")
        .value =
        product.name;


    document
        .getElementById("productCategory")
        .value =
        product.category;


    document
        .getElementById("productPrice")
        .value =
        product.price;


    document
        .getElementById("productStock")
        .value =
        product.stock;


    document
        .getElementById("productModalTitle")
        .textContent =
        "Edit Product";


    hideError("productError");

    openModal("productModal");

}


/* =========================================================
   SAVE PRODUCT
========================================================= */

function saveProduct(event) {

    event.preventDefault();

    hideError("productError");


    const id =
        document
            .getElementById("productEditId")
            .value;


    const name =
        document
            .getElementById("productName")
            .value
            .trim();


    const category =
        document
            .getElementById("productCategory")
            .value
            .trim();


    const price =
        Number(
            document
                .getElementById("productPrice")
                .value
        );


    const stock =
        Number(
            document
                .getElementById("productStock")
                .value
        );


    if (name.length < 2) {

        return showError(
            "productError",
            "Product name must contain at least 2 characters."
        );

    }


    if (category.length < 2) {

        return showError(
            "productError",
            "Category is required."
        );

    }


    if (!Number.isFinite(price) || price <= 0) {

        return showError(
            "productError",
            "Price must be greater than zero."
        );

    }


    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        return showError(
            "productError",
            "Stock must be a whole number and cannot be negative."
        );

    }


    if (id) {

        const product =
            products.find(
                item =>
                    item.id === id
            );


        if (!product) {

            return;

        }


        product.name = name;

        product.category = category;

        product.price = price;

        product.stock = stock;


        /* UPDATE PRODUCT NAME IN SALES */

        sales.forEach(sale => {

            if (sale.productId === id) {

                sale.productName =
                    name;

            }

        });


        saveProducts();

        saveSales();

        showToast(
            "Product updated successfully."
        );

    } else {

        const newProduct = {

            id: generateId(
                "P",
                products
            ),

            name,

            category,

            price,

            stock,

            icon: "🍽️"

        };


        products.push(newProduct);

        saveProducts();

        showToast(
            "Product added successfully."
        );

    }


    closeModal("productModal");

    renderAll();

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {

        return;

    }


    const usedInSales =
        sales.some(
            sale =>
                sale.productId === id
        );


    let message =
        `Are you sure you want to delete "${product.name}"?`;


    if (usedInSales) {

        message +=
            "\n\nThis product has existing sales records.";

    }


    if (!confirm(message)) {

        return;

    }


    products =
        products.filter(
            item =>
                item.id !== id
        );


    /* REMOVE FROM CART */

    cart =
        cart.filter(
            item =>
                item.productId !== id
        );


    saveProducts();

    renderAll();

    showToast(
        "Product deleted successfully."
    );

}


/* =========================================================
   CUSTOMER TABLE
========================================================= */

function renderCustomers() {

    const tbody =
        document.getElementById(
            "customersTable"
        );


    if (!customers.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="8"
                    style="text-align:center;">
                    No customers registered.
                </td>
            </tr>
        `;

        return;

    }


    tbody.innerHTML =
        customers
            .map(customer => `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(customer.id)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(
                            getFullName(customer)
                        )}
                    </td>

                    <td>
                        ${escapeHtml(customer.birthdate)}
                    </td>

                    <td>
                        ${customer.age}
                    </td>

                    <td>
                        +63 ${escapeHtml(customer.contact)}
                    </td>

                    <td>
                        ${escapeHtml(customer.gender)}
                    </td>

                    <td>
                        ${escapeHtml(customer.email)}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="btn-edit"
                                onclick="openCustomerEdit('${customer.id}')">
                                ✏ Edit
                            </button>

                            <button
                                class="btn-delete"
                                onclick="deleteCustomer('${customer.id}')">
                                🗑 Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `)
            .join("");

}


/* =========================================================
   EDIT CUSTOMER
========================================================= */

function openCustomerEdit(id) {

    const customer =
        customers.find(
            item =>
                item.id === id
        );


    if (!customer) {

        return;

    }


    document
        .getElementById("customerEditId")
        .value =
        customer.id;


    document
        .getElementById("editFirstName")
        .value =
        customer.firstName;


    document
        .getElementById("editMiddleName")
        .value =
        customer.middleName;


    document
        .getElementById("editSurname")
        .value =
        customer.surname;


    document
        .getElementById("editBirthdate")
        .value =
        customer.birthdate;


    document
        .getElementById("editAge")
        .value =
        calculateAge(customer.birthdate);


    document
        .getElementById("editGender")
        .value =
        customer.gender;


    document
        .getElementById("editContact")
        .value =
        customer.contact;


    document
        .getElementById("editEmail")
        .value =
        customer.email;


    hideError("customerEditError");

    openModal("customerEditModal");

}


/* =========================================================
   SAVE CUSTOMER EDIT
========================================================= */

function saveCustomerEdit(event) {

    event.preventDefault();

    hideError("customerEditError");


    const id =
        document
            .getElementById("customerEditId")
            .value;


    const customer =
        customers.find(
            item =>
                item.id === id
        );


    if (!customer) {

        return;

    }


    const firstName =
        document
            .getElementById("editFirstName")
            .value
            .trim();


    const middleName =
        document
            .getElementById("editMiddleName")
            .value
            .trim();


    const surname =
        document
            .getElementById("editSurname")
            .value
            .trim();


    const birthdate =
        document
            .getElementById("editBirthdate")
            .value;


    const age =
        calculateAge(birthdate);


    const gender =
        document
            .getElementById("editGender")
            .value;


    const contact =
        document
            .getElementById("editContact")
            .value
            .trim();


    const email =
        document
            .getElementById("editEmail")
            .value
            .trim()
            .toLowerCase();


    /* VALIDATION */

    if (firstName.length < 2) {

        return showError(
            "customerEditError",
            "First name must contain at least 2 characters."
        );

    }


    if (surname.length < 2) {

        return showError(
            "customerEditError",
            "Surname must contain at least 2 characters."
        );

    }


    if (!birthdate) {

        return showError(
            "customerEditError",
            "Birthdate is required."
        );

    }


    if (age < 13 || age > 120) {

        return showError(
            "customerEditError",
            "Please enter a valid birthdate."
        );

    }


    if (
        !/^\d{10}$/.test(contact) ||
        !contact.startsWith("9")
    ) {

        return showError(
            "customerEditError",
            "Contact number must be a valid Philippine mobile number after +63."
        );

    }


    if (!gender) {

        return showError(
            "customerEditError",
            "Please select gender."
        );

    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        return showError(
            "customerEditError",
            "Please enter a valid email address."
        );

    }


    /* DUPLICATE EMAIL */

    const duplicate =
        customers.find(
            item =>
                item.id !== id &&
                item.email.toLowerCase() === email
        );


    if (duplicate) {

        return showError(
            "customerEditError",
            "Another customer is already using this email."
        );

    }


    /* UPDATE */

    customer.firstName =
        firstName;

    customer.middleName =
        middleName;

    customer.surname =
        surname;

    customer.birthdate =
        birthdate;

    customer.age =
        age;

    customer.contact =
        contact;

    customer.gender =
        gender;

    customer.email =
        email;


    /* UPDATE ACCOUNT */

    const account =
        accounts.find(
            item =>
                item.customerId === id
        );


    if (account) {

        account.email =
            email;

    }


    /* UPDATE SALES CUSTOMER NAME */

    sales.forEach(sale => {

        if (sale.customerId === id) {

            sale.customerName =
                getFullName(customer);

        }

    });


    saveCustomers();

    saveAccounts();

    saveSales();


    /* UPDATE CURRENT CUSTOMER */

    if (
        currentCustomer &&
        currentCustomer.id === id
    ) {

        currentCustomer =
            customer;

        localStorage.setItem(
            STORAGE.CURRENT_CUSTOMER,
            JSON.stringify(customer)
        );

    }


    closeModal("customerEditModal");

    renderAll();

    showToast(
        "Customer updated successfully."
    );

}


/* =========================================================
   DELETE CUSTOMER
========================================================= */

function deleteCustomer(id) {

    const customer =
        customers.find(
            item =>
                item.id === id
        );


    if (!customer) {

        return;

    }


    const name =
        getFullName(customer);


    const confirmed =
        confirm(
            `Are you sure you want to delete customer "${name}"?\n\nThe customer's account will also be removed.`
        );


    if (!confirmed) {

        return;

    }


    customers =
        customers.filter(
            item =>
                item.id !== id
        );


    accounts =
        accounts.filter(
            item =>
                item.customerId !== id
        );


    saveCustomers();

    saveAccounts();


    if (
        currentCustomer &&
        currentCustomer.id === id
    ) {

        currentCustomer = null;

        cart = [];

        localStorage.removeItem(
            STORAGE.CURRENT_CUSTOMER
        );

        document
            .getElementById("customerPage")
            .classList.add("hidden");

        document
            .getElementById("authPage")
            .classList.remove("hidden");

    }


    renderAll();

    showToast(
        "Customer deleted successfully."
    );

}


/* =========================================================
   SALES TABLE
========================================================= */

function renderSales() {

    const tbody =
        document.getElementById(
            "salesTable"
        );


    if (!sales.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;">
                    No sales records found.
                </td>
            </tr>
        `;

        return;

    }


    const sorted =
        [...sales].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


    tbody.innerHTML =
        sorted
            .map(
                sale => `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(sale.id)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(sale.customerName)}
                    </td>

                    <td>
                        ${escapeHtml(sale.productName)}
                    </td>

                    <td>
                        ${sale.quantity}
                    </td>

                    <td>
                        <strong>
                            ${formatMoney(sale.total)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(sale.date)}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="btn-edit"
                                onclick="openSaleEdit('${sale.id}')">
                                ✏ Edit
                            </button>

                            <button
                                class="btn-delete"
                                onclick="deleteSale('${sale.id}')">
                                🗑 Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `
            )
            .join("");

}


/* =========================================================
   EDIT SALE
========================================================= */

function openSaleEdit(id) {

    const sale =
        sales.find(
            item =>
                item.id === id
        );


    if (!sale) {

        return;

    }


    document
        .getElementById("saleEditId")
        .value =
        sale.id;


    document
        .getElementById("editSaleCustomer")
        .value =
        sale.customerName;


    document
        .getElementById("editSaleProduct")
        .value =
        sale.productName;


    document
        .getElementById("editSaleQuantity")
        .value =
        sale.quantity;


    document
        .getElementById("editSaleDate")
        .value =
        sale.date;


    hideError("saleEditError");

    openModal("saleEditModal");

}


/* =========================================================
   SAVE SALE EDIT
========================================================= */

function saveSaleEdit(event) {

    event.preventDefault();

    hideError("saleEditError");


    const id =
        document
            .getElementById("saleEditId")
            .value;


    const sale =
        sales.find(
            item =>
                item.id === id
        );


    if (!sale) {

        return;

    }


    const customerName =
        document
            .getElementById("editSaleCustomer")
            .value
            .trim();


    const newQuantity =
        Number(
            document
                .getElementById("editSaleQuantity")
                .value
        );


    const newDate =
        document
            .getElementById("editSaleDate")
            .value;


    if (customerName.length < 2) {

        return showError(
            "saleEditError",
            "Customer name is required."
        );

    }


    if (
        !Number.isInteger(newQuantity) ||
        newQuantity < 1
    ) {

        return showError(
            "saleEditError",
            "Quantity must be at least 1."
        );

    }


    if (!newDate) {

        return showError(
            "saleEditError",
            "Date is required."
        );

    }


    const product =
        products.find(
            item =>
                item.id === sale.productId
        );


    if (!product) {

        return showError(
            "saleEditError",
            "The product associated with this sale no longer exists."
        );

    }


    /*
       Restore the previous quantity first.
       Then subtract the new quantity.
    */

    const availableStock =
        product.stock +
        sale.quantity;


    if (newQuantity > availableStock) {

        return showError(
            "saleEditError",
            `Only ${availableStock} item(s) are available for this transaction.`
        );

    }


    product.stock =
        availableStock -
        newQuantity;


    sale.customerName =
        customerName;

    sale.quantity =
        newQuantity;

    sale.total =
        product.price *
        newQuantity;

    sale.date =
        newDate;

    sale.productName =
        product.name;


    saveProducts();

    saveSales();

    closeModal("saleEditModal");

    renderAll();

    showToast(
        "Sale updated successfully."
    );

}


/* =========================================================
   DELETE SALE
========================================================= */

function deleteSale(id) {

    const sale =
        sales.find(
            item =>
                item.id === id
        );


    if (!sale) {

        return;

    }


    if (
        !confirm(
            `Are you sure you want to delete sale ${sale.id}?\n\nThe transaction will be removed.`
        )
    ) {

        return;

    }


    /* RESTORE STOCK */

    const product =
        products.find(
            item =>
                item.id === sale.productId
        );


    if (product) {

        product.stock +=
            Number(sale.quantity);

        saveProducts();

    }


    sales =
        sales.filter(
            item =>
                item.id !== id
        );


    saveSales();

    renderAll();

    showToast(
        "Sale deleted successfully."
    );

}


/* =========================================================
   CUSTOMER MENU
========================================================= */

function renderCustomerMenu() {

    const menu =
        document.getElementById(
            "customerMenu"
        );


    if (!menu) {

        return;

    }


    menu.innerHTML =
        products
            .map(
                product => `

                <div class="menu-card">

                    <div class="menu-image">
                        ${product.icon || "🍽️"}
                    </div>

                    <div class="menu-info">

                        <span class="menu-category">
                            ${escapeHtml(product.category)}
                        </span>

                        <h3>
                            ${escapeHtml(product.name)}
                        </h3>

                        <div class="menu-price">
                            ${formatMoney(product.price)}
                        </div>

                        <div class="stock-text">
                            Available Stock:
                            ${product.stock}
                        </div>

                        <button
                            class="btn btn-primary btn-large"
                            onclick="addToCart('${product.id}')"
                            ${product.stock <= 0 ? "disabled" : ""}>

                            ${
                                product.stock <= 0
                                ? "Out of Stock"
                                : "Add to Cart"
                            }

                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    if (!currentCustomer) {

        openCustomerLogin();

        return;

    }


    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {

        return;

    }


    if (product.stock <= 0) {

        showToast(
            "This product is out of stock."
        );

        return;

    }


    const existing =
        cart.find(
            item =>
                item.productId === productId
        );


    if (existing) {

        if (
            existing.quantity >=
            product.stock
        ) {

            showToast(
                "You cannot add more than the available stock."
            );

            return;

        }

        existing.quantity++;

    } else {

        cart.push({

            productId,

            quantity: 1

        });

    }


    renderCart();

    showToast(
        product.name +
        " added to cart."
    );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (!container) {

        return;

    }


    let subtotal = 0;

    let totalQuantity = 0;


    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-cart">

                🛒

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products from the menu.
                </p>

            </div>

        `;

    } else {

        container.innerHTML =
            cart
                .map(item => {

                    const product =
                        products.find(
                            product =>
                                product.id ===
                                item.productId
                        );


                    if (!product) {

                        return "";

                    }


                    const itemTotal =
                        product.price *
                        item.quantity;


                    subtotal +=
                        itemTotal;


                    totalQuantity +=
                        item.quantity;


                    return `

                    <div class="cart-item">

                        <div class="cart-item-info">

                            <h3>
                                ${escapeHtml(product.name)}
                            </h3>

                            <p>
                                ${formatMoney(product.price)}
                                each
                            </p>

                        </div>


                        <div class="quantity-control">

                            <button
                                onclick="changeCartQuantity('${product.id}', -1)">
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeCartQuantity('${product.id}', 1)">
                                +
                            </button>

                        </div>


                        <div class="cart-item-total">

                            ${formatMoney(itemTotal)}

                        </div>


                        <button
                            class="btn btn-delete btn-small"
                            onclick="removeFromCart('${product.id}')">

                            🗑

                        </button>

                    </div>

                    `;

                })
                .join("");

    }


    const deliveryFee =
        cart.length
            ? 50
            : 0;


    const total =
        subtotal +
        deliveryFee;


    document
        .getElementById("cartSubtotal")
        .textContent =
        formatMoney(subtotal);


    document
        .getElementById("cartTotal")
        .textContent =
        formatMoney(total);


    document
        .getElementById("cartCount")
        .textContent =
        totalQuantity;


    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    checkoutButton.disabled =
        cart.length === 0;

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            item =>
                item.productId === productId
        );


    const product =
        products.find(
            product =>
                product.id === productId
        );


    if (!item || !product) {

        return;

    }


    const newQuantity =
        item.quantity +
        amount;


    if (newQuantity <= 0) {

        removeFromCart(productId);

        return;

    }


    if (
        newQuantity >
        product.stock
    ) {

        showToast(
            "Quantity exceeds available stock."
        );

        return;

    }


    item.quantity =
        newQuantity;


    renderCart();

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.productId !==
                productId
        );


    renderCart();

    showToast(
        "Item removed from cart."
    );

}


/* =========================================================
   SCROLL TO CART
========================================================= */

function scrollToCart() {

    document
        .getElementById("cartSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   CHECKOUT MODAL
========================================================= */

function openCheckoutModal() {

    if (!currentCustomer) {

        openCustomerLogin();

        return;

    }


    if (!cart.length) {

        showToast(
            "Your cart is empty."
        );

        return;

    }


    const subtotal =
        calculateCartSubtotal();


    const total =
        subtotal + 50;


    document
        .getElementById("checkoutName")
        .value =
        getFullName(currentCustomer);


    document
        .getElementById("checkoutContact")
        .value =
        currentCustomer.contact;


    document
        .getElementById("checkoutEmail")
        .value =
        currentCustomer.email;


    document
        .getElementById("checkoutAddress")
        .value =
        currentCustomer.address || "";


    document
        .getElementById("checkoutTotal")
        .textContent =
        formatMoney(total);


    hideError("checkoutError");


    openModal("checkoutModal");

}


/* =========================================================
   CALCULATE SUBTOTAL
========================================================= */

function calculateCartSubtotal() {

    return cart.reduce(
        (sum, item) => {

            const product =
                products.find(
                    product =>
                        product.id ===
                        item.productId
                );


            if (!product) {

                return sum;

            }


            return (
                sum +
                product.price *
                item.quantity
            );

        },
        0
    );

}


/* =========================================================
   PROCESS ORDER
========================================================= */

function processOrder(event) {

    event.preventDefault();

    hideError("checkoutError");


    if (!currentCustomer) {

        return showError(
            "checkoutError",
            "Please sign in first."
        );

    }


    if (!cart.length) {

        return showError(
            "checkoutError",
            "Your cart is empty."
        );

    }


    const contact =
        document
            .getElementById("checkoutContact")
            .value
            .trim();


    const address =
        document
            .getElementById("checkoutAddress")
            .value
            .trim();


    /* VALIDATE CONTACT */

    if (
        !/^\d{10}$/.test(contact) ||
        !contact.startsWith("9")
    ) {

        return showError(
            "checkoutError",
            "Please enter a valid Philippine contact number."
        );

    }


    /* VALIDATE ADDRESS */

    if (address.length < 10) {

        return showError(
            "checkoutError",
            "Please enter a complete delivery address."
        );

    }


    /*
       CHECK ALL STOCK
    */

    for (const item of cart) {

        const product =
            products.find(
                product =>
                    product.id ===
                    item.productId
            );


        if (!product) {

            return showError(
                "checkoutError",
                "A product in your cart is no longer available."
            );

        }


        if (
            item.quantity >
            product.stock
        ) {

            return showError(
                "checkoutError",
                `${product.name} does not have enough stock.`
            );

        }

    }


    /*
       UPDATE CUSTOMER
    */

    currentCustomer.contact =
        contact;

    currentCustomer.address =
        address;


    const storedCustomer =
        customers.find(
            customer =>
                customer.id ===
                currentCustomer.id
        );


    if (storedCustomer) {

        storedCustomer.contact =
            contact;

        storedCustomer.address =
            address;

    }


    /*
       CREATE SALES RECORDS
    */

    const orderNumber =
        generateId(
            "S",
            sales
        );


    const orderDate =
        getToday();


    const customerName =
        getFullName(currentCustomer);


    let orderTotal = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id ===
                    item.productId
            );


        if (!product) {

            return;

        }


        const itemTotal =
            product.price *
            item.quantity;


        orderTotal +=
            itemTotal;


        /*
           REDUCE STOCK
        */

        product.stock -=
            item.quantity;


        /*
           CREATE SALE
        */

        sales.push({

            id:
                sales.length === 0
                    ? orderNumber
                    : generateId("S", sales),

            customerId:
                currentCustomer.id,

            customerName,

            productId:
                product.id,

            productName:
                product.name,

            quantity:
                item.quantity,

            total:
                itemTotal,

            date:
                orderDate

        });

    });


    /*
       DELIVERY FEE
    */

    orderTotal += 50;


    saveProducts();

    saveCustomers();

    saveSales();


    /*
       CLEAR CART
    */

    cart = [];


    /*
       SHOW SUCCESS
    */

    document
        .getElementById("successOrderId")
        .textContent =
        orderNumber;


    document
        .getElementById("successOrderTotal")
        .textContent =
        formatMoney(orderTotal);


    closeModal("checkoutModal");

    renderAll();

    openModal("orderSuccessModal");

}


/* =========================================================
   ERROR HELPERS
========================================================= */

function showError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );


    element.textContent =
        message;


    element.classList.remove(
        "hidden"
    );

}


function hideError(elementId) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent = "";

        element.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING BACKDROP
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================================
   ESCAPE KEY CLOSES MODAL
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAllModals();

        }

    }
);


/* =========================================================
   PREVENT NEGATIVE QUANTITIES
========================================================= */

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.type ===
            "number" &&
            event.target.value < 0
        ) {

            event.target.value = 0;

        }

    }
);
