"use strict";

/* =========================================================
   SALES AND INVENTORY SYSTEM
   MARCELINO'S FRIED ITIK

   Features:
   - Customer registration
   - 18+ age restriction
   - Data validation
   - LocalStorage
   - Customer ordering
   - Inventory management
   - Sales management
   - Edit
   - Delete
   - CRUD
========================================================= */


/* =========================================================
   LOCAL STORAGE KEYS
========================================================= */

const STORAGE = {
    products: "marcelinos_products",
    customers: "marcelinos_customers",
    sales: "marcelinos_sales",
    accounts: "marcelinos_accounts",
    cart: "marcelinos_cart",
    currentCustomer: "marcelinos_current_customer"
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
        name: "Juan",
        middleName: "Santos",
        surname: "Dela Cruz",
        birthdate: "1995-06-15",
        age: 31,
        gender: "Male",
        contact: "639171234567",
        email: "juan@gmail.com",
        city: "Oroquieta",
        address: "Oroquieta City, Misamis Occidental"
    },
    {
        id: "C002",
        name: "Maria",
        middleName: "L.",
        surname: "Santos",
        birthdate: "1992-03-20",
        age: 34,
        gender: "Female",
        contact: "639281234567",
        email: "maria@gmail.com",
        city: "Ozamis",
        address: "Ozamiz City, Misamis Occidental"
    },
    {
        id: "C003",
        name: "Mark",
        middleName: "R.",
        surname: "Reyes",
        birthdate: "1998-08-11",
        age: 28,
        gender: "Male",
        contact: "639391234567",
        email: "mark@gmail.com",
        city: "Tangub",
        address: "Tangub City, Misamis Occidental"
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
        date: "2026-09-15"
    },
    {
        id: "S003",
        customerId: "C003",
        customerName: "Mark Reyes",
        productId: "P003",
        productName: "Fried Itik Family Pack",
        quantity: 1,
        total: 650,
        date: "2026-09-16"
    },
    {
        id: "S004",
        customerId: "C001",
        customerName: "Juan Dela Cruz",
        productId: "P004",
        productName: "Itik Special Sauce",
        quantity: 3,
        total: 360,
        date: "2026-09-17"
    },
    {
        id: "S005",
        customerId: "C002",
        customerName: "Maria Santos",
        productId: "P005",
        productName: "Itik Meal Combo",
        quantity: 2,
        total: 900,
        date: "2026-09-18"
    }
];


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let products = [];
let customers = [];
let sales = [];
let accounts = [];
let cart = [];
let currentCustomer = null;

let editingProductId = null;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeStorage();

    loadData();

    setupEventListeners();

    setupBirthdateLimits();

    renderAll();

    showAuthPage();

});


/* =========================================================
   STORAGE
========================================================= */

function initializeStorage() {

    if (localStorage.getItem(STORAGE.products) === null) {
        saveStorage(STORAGE.products, DEFAULT_PRODUCTS);
    }

    if (localStorage.getItem(STORAGE.customers) === null) {
        saveStorage(STORAGE.customers, DEFAULT_CUSTOMERS);
    }

    if (localStorage.getItem(STORAGE.sales) === null) {
        saveStorage(STORAGE.sales, DEFAULT_SALES);
    }

    if (localStorage.getItem(STORAGE.accounts) === null) {
        saveStorage(STORAGE.accounts, []);
    }

    if (localStorage.getItem(STORAGE.cart) === null) {
        saveStorage(STORAGE.cart, []);
    }

}


function loadData() {

    products = getStorage(
        STORAGE.products,
        DEFAULT_PRODUCTS
    );

    customers = getStorage(
        STORAGE.customers,
        DEFAULT_CUSTOMERS
    );

    sales = getStorage(
        STORAGE.sales,
        DEFAULT_SALES
    );

    accounts = getStorage(
        STORAGE.accounts,
        []
    );

    cart = getStorage(
        STORAGE.cart,
        []
    );

    const savedCustomer = getStorage(
        STORAGE.currentCustomer,
        null
    );

    if (savedCustomer) {
        currentCustomer = savedCustomer;
    }

}


function getStorage(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error(error);

        return fallback;
    }
}


function saveStorage(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {

    document
        .getElementById("adminLoginForm")
        .addEventListener("submit", handleAdminLogin);

    document
        .getElementById("customerLoginForm")
        .addEventListener("submit", handleCustomerLogin);

    document
        .getElementById("signupForm")
        .addEventListener("submit", handleSignup);

    document
        .getElementById("productForm")
        .addEventListener("submit", saveProduct);

    document
        .getElementById("customerEditForm")
        .addEventListener("submit", saveCustomerEdit);

    document
        .getElementById("saleEditForm")
        .addEventListener("submit", saveSaleEdit);

    document
        .getElementById("checkoutForm")
        .addEventListener("submit", processOrder);


    document
        .getElementById("signupBirthdate")
        .addEventListener("change", () => {

            updateAge(
                "signupBirthdate",
                "signupAge"
            );

        });


    document
        .getElementById("editCustomerBirthdate")
        .addEventListener("change", () => {

            updateAge(
                "editCustomerBirthdate",
                "editCustomerAge"
            );

        });


    document
        .getElementById("editSaleQuantity")
        .addEventListener("input", updateSalePreview);

}


/* =========================================================
   AGE LIMIT
========================================================= */

function setupBirthdateLimits() {

    const today = new Date();

    const maxBirthdate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const maxDate = formatDateInput(maxBirthdate);

    document
        .getElementById("signupBirthdate")
        .max = maxDate;

    document
        .getElementById("editCustomerBirthdate")
        .max = maxDate;

}


function formatDateInput(date) {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function calculateAge(birthdate) {

    if (!birthdate) {
        return null;
    }

    const birth = new Date(
        birthdate + "T00:00:00"
    );

    if (Number.isNaN(birth.getTime())) {
        return null;
    }

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


function updateAge(
    birthdateId,
    ageId
) {

    const birthdate =
        document.getElementById(
            birthdateId
        ).value;

    const age =
        calculateAge(birthdate);

    document.getElementById(
        ageId
    ).value =
        age !== null ? age : "";

}


/* =========================================================
   AUTH PAGE
========================================================= */

function showAuthPage() {

    document
        .getElementById("authPage")
        .classList.remove("hidden");

    document
        .getElementById("adminPage")
        .classList.add("hidden");

    document
        .getElementById("customerPage")
        .classList.add("hidden");

}


function openAdminLogin() {

    clearErrors();

    document
        .getElementById("adminLoginForm")
        .reset();

    openModal("adminLoginModal");

}


function openCustomerLogin() {

    clearErrors();

    document
        .getElementById("customerLoginForm")
        .reset();

    openModal("customerLoginModal");

}


function openSignup() {

    clearErrors();

    document
        .getElementById("signupForm")
        .reset();

    document
        .getElementById("signupAge")
        .value = "";

    openModal("signupModal");

}


function switchToSignup() {

    closeModal("customerLoginModal");

    setTimeout(() => {
        openSignup();
    }, 150);

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function handleAdminLogin(event) {

    event.preventDefault();

    clearErrors();

    const username =
        document.getElementById(
            "adminUsername"
        ).value.trim();

    const password =
        document.getElementById(
            "adminPassword"
        ).value;

    let valid = true;


    if (!username) {

        showError(
            "adminUsername",
            "adminUsernameError",
            "Username is required."
        );

        valid = false;
    }


    if (!password) {

        showError(
            "adminPassword",
            "adminPasswordError",
            "Password is required."
        );

        valid = false;
    }


    if (!valid) {
        return;
    }


    if (
        username !== "admin" ||
        password !== "admin123"
    ) {

        showError(
            "adminPassword",
            "adminPasswordError",
            "Invalid admin username or password."
        );

        return;
    }


    closeModal("adminLoginModal");

    document
        .getElementById("authPage")
        .classList.add("hidden");

    document
        .getElementById("adminPage")
        .classList.remove("hidden");

    renderAll();

    showToast(
        "Admin login successful."
    );

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

function adminLogout() {

    const confirmed = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmed) {
        return;
    }

    showAuthPage();

    showToast(
        "Admin logged out successfully."
    );

}


/* =========================================================
   CUSTOMER SIGNUP
========================================================= */

function handleSignup(event) {

    event.preventDefault();

    clearErrors();

    const data = {

        name:
            document.getElementById(
                "signupName"
            ).value.trim(),

        middleName:
            document.getElementById(
                "signupMiddleName"
            ).value.trim(),

        surname:
            document.getElementById(
                "signupSurname"
            ).value.trim(),

        birthdate:
            document.getElementById(
                "signupBirthdate"
            ).value,

        gender:
            document.getElementById(
                "signupGender"
            ).value,

        contact:
            document.getElementById(
                "signupContact"
            ).value.trim(),

        email:
            document.getElementById(
                "signupEmail"
            ).value.trim().toLowerCase(),

        password:
            document.getElementById(
                "signupPassword"
            ).value,

        confirmPassword:
            document.getElementById(
                "signupConfirmPassword"
            ).value,

        city:
            document.getElementById(
                "signupCity"
            ).value.trim(),

        address:
            document.getElementById(
                "signupAddress"
            ).value.trim()

    };


    let valid = true;


    /* NAME */

    if (
        data.name.length < 2 ||
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(data.name)
    ) {

        showError(
            "signupName",
            "signupNameError",
            "Enter a valid name."
        );

        valid = false;
    }


    /* MIDDLE NAME */

    if (
        data.middleName.length < 2 ||
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(data.middleName)
    ) {

        showError(
            "signupMiddleName",
            "signupMiddleNameError",
            "Enter a valid middle name."
        );

        valid = false;
    }


    /* SURNAME */

    if (
        data.surname.length < 2 ||
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(data.surname)
    ) {

        showError(
            "signupSurname",
            "signupSurnameError",
            "Enter a valid surname."
        );

        valid = false;
    }


    /* BIRTHDATE */

    const age =
        calculateAge(data.birthdate);

    if (!data.birthdate) {

        showError(
            "signupBirthdate",
            "signupBirthdateError",
            "Birthdate is required."
        );

        valid = false;

    } else if (age === null) {

        showError(
            "signupBirthdate",
            "signupBirthdateError",
            "Enter a valid birthdate."
        );

        valid = false;

    } else if (age < 18) {

        showError(
            "signupBirthdate",
            "signupBirthdateError",
            "Registration is only available to customers 18 years old or above."
        );

        valid = false;
    }


    /* GENDER */

    if (!data.gender) {

        showError(
            "signupGender",
            "signupGenderError",
            "Please select a gender."
        );

        valid = false;
    }


    /* CONTACT */

    if (
        !/^639\d{9}$/.test(data.contact)
    ) {

        showError(
            "signupContact",
            "signupContactError",
            "Contact must start with 63 and contain 12 digits. Example: 639171234567"
        );

        valid = false;
    }


    /* EMAIL */

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            data.email
        )
    ) {

        showError(
            "signupEmail",
            "signupEmailError",
            "Enter a valid email address."
        );

        valid = false;
    }


    /* DUPLICATE EMAIL */

    if (
        accounts.some(
            account =>
                account.email.toLowerCase() ===
                data.email
        )
    ) {

        showError(
            "signupEmail",
            "signupEmailError",
            "An account with this email already exists."
        );

        valid = false;
    }


    /* PASSWORD */

    if (data.password.length < 8) {

        showError(
            "signupPassword",
            "signupPasswordError",
            "Password must contain at least 8 characters."
        );

        valid = false;
    }


    /* CONFIRM PASSWORD */

    if (
        data.password !==
        data.confirmPassword
    ) {

        showError(
            "signupConfirmPassword",
            "signupConfirmPasswordError",
            "Passwords do not match."
        );

        valid = false;
    }


    /* CITY */

    if (data.city.length < 2) {

        showError(
            "signupCity",
            "signupCityError",
            "City is required."
        );

        valid = false;
    }


    /* ADDRESS */

    if (data.address.length < 5) {

        showError(
            "signupAddress",
            "signupAddressError",
            "Please enter your complete address."
        );

        valid = false;
    }


    if (!valid) {

        showToast(
            "Please correct the highlighted fields."
        );

        return;
    }


    /* CREATE CUSTOMER ID */

    const customerId =
        generateId(
            "C",
            customers
        );


    const customer = {

        id: customerId,

        name: data.name,

        middleName:
            data.middleName,

        surname:
            data.surname,

        birthdate:
            data.birthdate,

        age: age,

        gender:
            data.gender,

        contact:
            data.contact,

        email:
            data.email,

        city:
            data.city,

        address:
            data.address

    };


    /* CREATE ACCOUNT */

    const account = {

        customerId:
            customerId,

        email:
            data.email,

        password:
            data.password

    };


    customers.push(customer);

    accounts.push(account);


    saveStorage(
        STORAGE.customers,
        customers
    );

    saveStorage(
        STORAGE.accounts,
        accounts
    );


    document
        .getElementById("signupForm")
        .reset();


    document
        .getElementById("signupAge")
        .value = "";


    closeModal("signupModal");


    showToast(
        "Customer account created successfully. You can now sign in."
    );


    renderAll();

}


/* =========================================================
   CUSTOMER LOGIN
========================================================= */

function handleCustomerLogin(event) {

    event.preventDefault();

    clearErrors();

    const email =
        document.getElementById(
            "customerLoginEmail"
        ).value.trim().toLowerCase();

    const password =
        document.getElementById(
            "customerLoginPassword"
        ).value;

    let valid = true;


    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        )
    ) {

        showError(
            "customerLoginEmail",
            "customerLoginEmailError",
            "Enter a valid email address."
        );

        valid = false;
    }


    if (!password) {

        showError(
            "customerLoginPassword",
            "customerLoginPasswordError",
            "Password is required."
        );

        valid = false;
    }


    if (!valid) {
        return;
    }


    const account =
        accounts.find(
            item =>
                item.email.toLowerCase() === email &&
                item.password === password
        );


    if (!account) {

        showError(
            "customerLoginPassword",
            "customerLoginPasswordError",
            "Invalid email or password."
        );

        return;
    }


    const customer =
        customers.find(
            item =>
                item.id ===
                account.customerId
        );


    if (!customer) {

        showError(
            "customerLoginEmail",
            "customerLoginEmailError",
            "Customer record was not found."
        );

        return;
    }


    currentCustomer = customer;


    saveStorage(
        STORAGE.currentCustomer,
        currentCustomer
    );


    cart = getStorage(
        STORAGE.cart,
        []
    );


    closeModal("customerLoginModal");


    showCustomerPage();

}


/* =========================================================
   CUSTOMER PAGE
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


    const fullName =
        getFullName(currentCustomer);


    document
        .getElementById("customerHeaderName")
        .textContent = fullName;

    document
        .getElementById("customerWelcomeName")
        .textContent = currentCustomer.name;


    renderCustomerMenu();

    renderCart();

}


function customerLogout() {

    const confirmed = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmed) {
        return;
    }

    currentCustomer = null;

    localStorage.removeItem(
        STORAGE.currentCustomer
    );

    cart = [];

    saveStorage(
        STORAGE.cart,
        []
    );

    showAuthPage();

    showToast(
        "Customer logged out successfully."
    );

}


/* =========================================================
   CUSTOMER MENU
========================================================= */

function renderCustomerMenu() {

    const container =
        document.getElementById(
            "customerMenu"
        );


    if (!products.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📦</div>
                <p>No products are currently available.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        products.map(product => {

            const stockStatus =
                product.stock === 0
                    ? "Out of stock"
                    : `${product.stock} available`;


            return `
                <div class="menu-card">

                    <div class="menu-image">
                        ${escapeHtml(product.icon || "🍗")}
                    </div>

                    <div class="menu-content">

                        <h3>
                            ${escapeHtml(product.name)}
                        </h3>

                        <div class="menu-category">
                            ${escapeHtml(product.category)}
                        </div>

                        <div class="menu-price">
                            ${formatMoney(product.price)}
                        </div>

                        <div class="menu-stock">
                            ${stockStatus}
                        </div>

                        <button
                            class="btn btn-primary btn-full"
                            onclick="addToCart('${product.id}')"
                            ${product.stock <= 0 ? "disabled" : ""}
                        >
                            ${
                                product.stock <= 0
                                    ? "Out of Stock"
                                    : "Add to Cart"
                            }
                        </button>

                    </div>

                </div>
            `;

        }).join("");

}


/* =========================================================
   CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
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
            productId: product.id,
            quantity: 1
        });

    }


    saveStorage(
        STORAGE.cart,
        cart
    );


    renderCart();

    showToast(
        `${product.name} added to cart.`
    );

}


function changeCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            cartItem =>
                cartItem.productId ===
                productId
        );


    const product =
        products.find(
            productItem =>
                productItem.id ===
                productId
        );


    if (!item || !product) {
        return;
    }


    const newQuantity =
        item.quantity + change;


    if (newQuantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.productId !==
                    productId
            );

    } else if (
        newQuantity <= product.stock
    ) {

        item.quantity =
            newQuantity;

    } else {

        showToast(
            "Quantity cannot exceed available stock."
        );

        return;
    }


    saveStorage(
        STORAGE.cart,
        cart
    );


    renderCart();

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.productId !== productId
        );


    saveStorage(
        STORAGE.cart,
        cart
    );


    renderCart();

}


function renderCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    const countElement =
        document.getElementById(
            "cartCount"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );

    const checkoutButton =
        document.getElementById(
            "checkoutButton"
        );


    if (!cart.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛒</div>
                <p>Your cart is empty.</p>
            </div>
        `;

        countElement.textContent = "0";

        totalElement.textContent =
            formatMoney(0);

        checkoutButton.disabled = true;

        return;
    }


    let total = 0;

    let itemCount = 0;


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    productItem =>
                        productItem.id ===
                        item.productId
                );


            if (!product) {
                return "";
            }


            const subtotal =
                product.price *
                item.quantity;


            total += subtotal;

            itemCount += item.quantity;


            return `
                <div class="cart-item">

                    <div class="cart-item-top">

                        <h4>
                            ${escapeHtml(product.name)}
                        </h4>

                        <span class="cart-item-price">
                            ${formatMoney(subtotal)}
                        </span>

                    </div>

                    <div class="quantity-controls">

                        <button
                            onclick="changeCartQuantity(
                                '${product.id}',
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeCartQuantity(
                                '${product.id}',
                                1
                            )"
                        >
                            +
                        </button>

                        <button
                            onclick="removeFromCart(
                                '${product.id}'
                            )"
                            title="Remove"
                        >
                            🗑
                        </button>

                    </div>

                </div>
            `;

        }).join("");


    countElement.textContent =
        itemCount;

    totalElement.textContent =
        formatMoney(total);

    checkoutButton.disabled = false;

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (!currentCustomer) {

        showToast(
            "Please sign in as a customer first."
        );

        return;
    }


    if (!cart.length) {

        showToast(
            "Your cart is empty."
        );

        return;
    }


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
        currentCustomer.address;


    renderCheckoutSummary();

    openModal("checkoutModal");

}


function renderCheckoutSummary() {

    const container =
        document.getElementById(
            "checkoutSummary"
        );

    let total = 0;


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    productItem =>
                        productItem.id ===
                        item.productId
                );


            if (!product) {
                return "";
            }


            const subtotal =
                product.price *
                item.quantity;


            total += subtotal;


            return `
                <div class="checkout-row">

                    <span>
                        ${escapeHtml(product.name)}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${formatMoney(subtotal)}
                    </strong>

                </div>
            `;

        }).join("");


    document
        .getElementById("checkoutTotal")
        .textContent =
        formatMoney(total);

}


function processOrder(event) {

    event.preventDefault();

    clearErrors();


    const address =
        document
            .getElementById(
                "checkoutAddress"
            )
            .value.trim();


    if (address.length < 5) {

        showError(
            "checkoutAddress",
            "checkoutAddressError",
            "Please enter a valid delivery address."
        );

        return;
    }


    if (!cart.length) {

        showToast(
            "Your cart is empty."
        );

        closeModal("checkoutModal");

        return;
    }


    /* CHECK STOCK */

    for (const item of cart) {

        const product =
            products.find(
                productItem =>
                    productItem.id ===
                    item.productId
            );


        if (
            !product ||
            item.quantity > product.stock
        ) {

            showToast(
                `Insufficient stock for ${
                    product
                        ? product.name
                        : "a product"
                }.`
            );

            renderCustomerMenu();

            return;
        }

    }


    /* UPDATE CUSTOMER ADDRESS */

    const customerIndex =
        customers.findIndex(
            customer =>
                customer.id ===
                currentCustomer.id
        );


    if (customerIndex !== -1) {

        customers[customerIndex].address =
            address;

        currentCustomer =
            customers[customerIndex];


        saveStorage(
            STORAGE.customers,
            customers
        );

        saveStorage(
            STORAGE.currentCustomer,
            currentCustomer
        );

    }


    const orderId =
        generateId(
            "S",
            sales
        );


    const orderDate =
        getToday();


    let orderTotal = 0;


    /* CREATE SALES RECORDS */

    cart.forEach(item => {

        const product =
            products.find(
                productItem =>
                    productItem.id ===
                    item.productId
            );


        if (!product) {
            return;
        }


        const subtotal =
            product.price *
            item.quantity;


        orderTotal += subtotal;


        sales.push({

            id: generateId(
                "S",
                sales
            ),

            customerId:
                currentCustomer.id,

            customerName:
                getFullName(currentCustomer),

            productId:
                product.id,

            productName:
                product.name,

            quantity:
                item.quantity,

            total:
                subtotal,

            date:
                orderDate

        });


        /* REDUCE INVENTORY */

        product.stock -=
            item.quantity;

    });


    saveStorage(
        STORAGE.products,
        products
    );

    saveStorage(
        STORAGE.sales,
        sales
    );


    /* CLEAR CART */

    cart = [];

    saveStorage(
        STORAGE.cart,
        cart
    );


    closeModal("checkoutModal");


    document
        .getElementById(
            "successOrderDetails"
        ).innerHTML = `
            <div class="success-details">

                <div>
                    <strong>Order Date:</strong>
                    ${formatDisplayDate(orderDate)}
                </div>

                <div>
                    <strong>Customer:</strong>
                    ${escapeHtml(
                        getFullName(currentCustomer)
                    )}
                </div>

                <div>
                    <strong>Total:</strong>
                    ${formatMoney(orderTotal)}
                </div>

            </div>
        `;


    openModal("successModal");


    renderAll();

    renderCustomerMenu();

    renderCart();

}


/* =========================================================
   ADMIN NAVIGATION
========================================================= */

function showAdminSection(
    section,
    button
) {

    document
        .querySelectorAll(".admin-section")
        .forEach(element => {

            element.classList.add(
                "hidden"
            );

        });


    const target =
        document.getElementById(
            `${section}Section`
        );


    if (target) {
        target.classList.remove(
            "hidden"
        );
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(navButton => {

            navButton.classList.remove(
                "active"
            );

        });


    if (button) {
        button.classList.add(
            "active"
        );
    }


    renderAll();

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    document
        .getElementById(
            "dashboardProducts"
        )
        .textContent =
        products.length;


    document
        .getElementById(
            "dashboardCustomers"
        )
        .textContent =
        customers.length;


    document
        .getElementById(
            "dashboardOrders"
        )
        .textContent =
        sales.length;


    const totalSales =
        sales.reduce(
            (sum, sale) =>
                sum + Number(sale.total || 0),
            0
        );


    document
        .getElementById(
            "dashboardSales"
        )
        .textContent =
        formatMoney(totalSales);


    renderLowStock();

    renderRecentSales();

}


function renderLowStock() {

    const container =
        document.getElementById(
            "lowStockContainer"
        );


    const lowStock =
        products.filter(
            product =>
                product.stock <= 5
        );


    if (!lowStock.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✅</div>
                <p>No products are currently low in stock.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        lowStock.map(product => {

            return `
                <div class="checkout-row">

                    <span>
                        ${escapeHtml(product.name)}
                    </span>

                    <strong>
                        ${product.stock} left
                    </strong>

                </div>
            `;

        }).join("");

}


function renderRecentSales() {

    const container =
        document.getElementById(
            "recentSalesContainer"
        );


    const recent =
        [...sales]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 5);


    if (!recent.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🧾</div>
                <p>No sales records found.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        recent.map(sale => {

            return `
                <div class="checkout-row">

                    <span>
                        ${escapeHtml(
                            sale.productName
                        )}
                    </span>

                    <strong>
                        ${formatMoney(sale.total)}
                    </strong>

                </div>
            `;

        }).join("");

}


/* =========================================================
   INVENTORY TABLE
========================================================= */

function renderInventory() {

    const body =
        document.getElementById(
            "inventoryTableBody"
        );


    if (!products.length) {

        body.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        No products found.
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    body.innerHTML =
        products.map(product => {

            let statusClass =
                "status-good";

            let statusText =
                "Available";


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
                        ${escapeHtml(product.name)}
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
                                class="btn btn-warning"
                                onclick="openProductModal(
                                    '${product.id}'
                                )"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="deleteProduct(
                                    '${product.id}'
                                )"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");

}


/* =========================================================
   PRODUCT CREATE / EDIT
========================================================= */

function openProductModal(
    productId = null
) {

    clearErrors();

    const form =
        document.getElementById(
            "productForm"
        );

    form.reset();


    editingProductId =
        productId;


    if (productId) {

        const product =
            products.find(
                item =>
                    item.id ===
                    productId
            );


        if (!product) {
            return;
        }


        document
            .getElementById(
                "productModalTitle"
            )
            .textContent =
            "Edit Product";


        document
            .getElementById(
                "productOriginalId"
            )
            .value =
            product.id;


        document
            .getElementById(
                "productId"
            )
            .value =
            product.id;


        document
            .getElementById(
                "productId"
            )
            .readOnly = true;


        document
            .getElementById(
                "productName"
            )
            .value =
            product.name;


        document
            .getElementById(
                "productCategory"
            )
            .value =
            product.category;


        document
            .getElementById(
                "productPrice"
            )
            .value =
            product.price;


        document
            .getElementById(
                "productStock"
            )
            .value =
            product.stock;


        document
            .getElementById(
                "productIcon"
            )
            .value =
            product.icon || "🍗";

    } else {

        document
            .getElementById(
                "productModalTitle"
            )
            .textContent =
            "Add Product";


        document
            .getElementById(
                "productId"
            )
            .readOnly = false;


        document
            .getElementById(
                "productIcon"
            )
            .value = "🍗";

    }


    openModal("productModal");

}


function saveProduct(event) {

    event.preventDefault();

    clearErrors();


    const id =
        document
            .getElementById(
                "productId"
            )
            .value.trim()
            .toUpperCase();

    const name =
        document
            .getElementById(
                "productName"
            )
            .value.trim();

    const category =
        document
            .getElementById(
                "productCategory"
            )
            .value.trim();

    const price =
        Number(
            document
                .getElementById(
                    "productPrice"
                )
                .value
        );

    const stock =
        Number(
            document
                .getElementById(
                    "productStock"
                )
                .value
        );

    const icon =
        document
            .getElementById(
                "productIcon"
            )
            .value.trim() ||
        "🍗";


    let valid = true;


    if (
        !/^P\d{3,}$/.test(id)
    ) {

        showError(
            "productId",
            "productIdError",
            "Product ID must use format P001."
        );

        valid = false;
    }


    if (
        !editingProductId &&
        products.some(
            product =>
                product.id === id
        )
    ) {

        showError(
            "productId",
            "productIdError",
            "Product ID already exists."
        );

        valid = false;
    }


    if (name.length < 2) {

        showError(
            "productName",
            "productNameError",
            "Product name is required."
        );

        valid = false;
    }


    if (category.length < 2) {

        showError(
            "productCategory",
            "productCategoryError",
            "Category is required."
        );

        valid = false;
    }


    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        showError(
            "productPrice",
            "productPriceError",
            "Price must be greater than zero."
        );

        valid = false;
    }


    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        showError(
            "productStock",
            "productStockError",
            "Stock must be a whole number of 0 or greater."
        );

        valid = false;
    }


    if (!valid) {

        showToast(
            "Please correct the product information."
        );

        return;
    }


    if (editingProductId) {

        const index =
            products.findIndex(
                product =>
                    product.id ===
                    editingProductId
            );


        if (index === -1) {
            return;
        }


        products[index] = {

            ...products[index],

            name,
            category,
            price,
            stock,
            icon

        };


        showToast(
            "Product record updated successfully."
        );

    } else {

        products.push({

            id,
            name,
            category,
            price,
            stock,
            icon

        });


        showToast(
            "Product added successfully."
        );

    }


    saveStorage(
        STORAGE.products,
        products
    );


    closeModal("productModal");

    renderAll();

    renderCustomerMenu();

    renderCart();

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    const referenced =
        sales.some(
            sale =>
                sale.productId ===
                productId
        );


    let message =
        `Delete "${product.name}"?`;


    if (referenced) {

        message +=
            "\n\nThis product has existing sales records. Historical sales will remain.";

    }


    const confirmed =
        confirm(message);


    if (!confirmed) {
        return;
    }


    products =
        products.filter(
            item =>
                item.id !== productId
        );


    /* Remove deleted product from cart */

    cart =
        cart.filter(
            item =>
                item.productId !==
                productId
        );


    saveStorage(
        STORAGE.products,
        products
    );

    saveStorage(
        STORAGE.cart,
        cart
    );


    renderAll();

    renderCustomerMenu();

    renderCart();


    showToast(
        "Product deleted successfully."
    );

}


/* =========================================================
   CUSTOMERS TABLE
========================================================= */

function renderCustomers() {

    const body =
        document.getElementById(
            "customersTableBody"
        );


    if (!customers.length) {

        body.innerHTML = `
            <tr>
                <td colspan="9">
                    <div class="empty-state">
                        No customer records found.
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    body.innerHTML =
        customers.map(customer => {

            return `
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
                        ${formatDisplayDate(
                            customer.birthdate
                        )}
                    </td>

                    <td>
                        ${customer.age}
                    </td>

                    <td>
                        ${escapeHtml(
                            customer.gender
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            customer.contact
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            customer.email
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            customer.city
                        )}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="btn btn-warning"
                                onclick="openCustomerEdit(
                                    '${customer.id}'
                                )"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="deleteCustomer(
                                    '${customer.id}'
                                )"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");

}


/* =========================================================
   CUSTOMER EDIT
========================================================= */

function openCustomerEdit(customerId) {

    const customer =
        customers.find(
            item =>
                item.id ===
                customerId
        );


    if (!customer) {
        return;
    }


    clearErrors();


    document
        .getElementById(
            "editCustomerId"
        )
        .value =
        customer.id;


    document
        .getElementById(
            "editCustomerName"
        )
        .value =
        customer.name;


    document
        .getElementById(
            "editCustomerMiddleName"
        )
        .value =
        customer.middleName;


    document
        .getElementById(
            "editCustomerSurname"
        )
        .value =
        customer.surname;


    document
        .getElementById(
            "editCustomerBirthdate"
        )
        .value =
        customer.birthdate;


    document
        .getElementById(
            "editCustomerAge"
        )
        .value =
        calculateAge(customer.birthdate);


    document
        .getElementById(
            "editCustomerGender"
        )
        .value =
        customer.gender;


    document
        .getElementById(
            "editCustomerContact"
        )
        .value =
        customer.contact;


    document
        .getElementById(
            "editCustomerEmail"
        )
        .value =
        customer.email;


    document
        .getElementById(
            "editCustomerCity"
        )
        .value =
        customer.city;


    document
        .getElementById(
            "editCustomerAddress"
        )
        .value =
        customer.address;


    openModal(
        "customerEditModal"
    );

}


/* =========================================================
   SAVE CUSTOMER EDIT
========================================================= */

function saveCustomerEdit(event) {

    event.preventDefault();

    clearErrors();


    const customerId =
        document
            .getElementById(
                "editCustomerId"
            )
            .value;


    const name =
        document
            .getElementById(
                "editCustomerName"
            )
            .value.trim();

    const middleName =
        document
            .getElementById(
                "editCustomerMiddleName"
            )
            .value.trim();

    const surname =
        document
            .getElementById(
                "editCustomerSurname"
            )
            .value.trim();

    const birthdate =
        document
            .getElementById(
                "editCustomerBirthdate"
            )
            .value;

    const gender =
        document
            .getElementById(
                "editCustomerGender"
            )
            .value;

    const contact =
        document
            .getElementById(
                "editCustomerContact"
            )
            .value.trim();

    const email =
        document
            .getElementById(
                "editCustomerEmail"
            )
            .value.trim()
            .toLowerCase();

    const city =
        document
            .getElementById(
                "editCustomerCity"
            )
            .value.trim();

    const address =
        document
            .getElementById(
                "editCustomerAddress"
            )
            .value.trim();


    const age =
        calculateAge(birthdate);


    let valid = true;


    if (
        name.length < 2 ||
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(name)
    ) {

        showError(
            "editCustomerName",
            "editCustomerNameError",
            "Enter a valid name."
        );

        valid = false;
    }


    if (
        middleName.length < 2 ||
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(middleName)
    ) {

        showError(
            "editCustomerMiddleName",
            "editCustomerMiddleNameError",
            "Enter a valid middle name."
        );

        valid = false;
    }


    if (
        surname.length < 2 ||
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(surname)
    ) {

        showError(
            "editCustomerSurname",
            "editCustomerSurnameError",
            "Enter a valid surname."
        );

        valid = false;
    }


    if (!birthdate || age === null) {

        showError(
            "editCustomerBirthdate",
            "editCustomerBirthdateError",
            "Enter a valid birthdate."
        );

        valid = false;

    } else if (age < 18) {

        showError(
            "editCustomerBirthdate",
            "editCustomerBirthdateError",
            "Customer must be 18 years old or above."
        );

        valid = false;
    }


    if (!gender) {

        showError(
            "editCustomerGender",
            "editCustomerGenderError",
            "Gender is required."
        );

        valid = false;
    }


    if (
        !/^639\d{9}$/.test(contact)
    ) {

        showError(
            "editCustomerContact",
            "editCustomerContactError",
            "Use Philippine format 639XXXXXXXXX."
        );

        valid = false;
    }


    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        )
    ) {

        showError(
            "editCustomerEmail",
            "editCustomerEmailError",
            "Enter a valid email address."
        );

        valid = false;
    }


    const duplicateEmail =
        customers.some(
            customer =>
                customer.id !== customerId &&
                customer.email.toLowerCase() ===
                email
        );


    if (duplicateEmail) {

        showError(
            "editCustomerEmail",
            "editCustomerEmailError",
            "Another customer already uses this email."
        );

        valid = false;
    }


    if (city.length < 2) {

        showError(
            "editCustomerCity",
            "editCustomerCityError",
            "City is required."
        );

        valid = false;
    }


    if (address.length < 5) {

        showError(
            "editCustomerAddress",
            "editCustomerAddressError",
            "Complete address is required."
        );

        valid = false;
    }


    if (!valid) {

        showToast(
            "Please correct the customer information."
        );

        return;
    }


    const index =
        customers.findIndex(
            customer =>
                customer.id ===
                customerId
        );


    if (index === -1) {
        return;
    }


    const oldEmail =
        customers[index].email;


    customers[index] = {

        ...customers[index],

        name,
        middleName,
        surname,
        birthdate,
        age,
        gender,
        contact,
        email,
        city,
        address

    };


    /* UPDATE CUSTOMER ACCOUNT */

    const accountIndex =
        accounts.findIndex(
            account =>
                account.customerId ===
                customerId
        );


    if (accountIndex !== -1) {

        accounts[accountIndex].email =
            email;

    }


    /* UPDATE CURRENT CUSTOMER */

    if (
        currentCustomer &&
        currentCustomer.id ===
        customerId
    ) {

        currentCustomer =
            customers[index];

        saveStorage(
            STORAGE.currentCustomer,
            currentCustomer
        );

    }


    /* UPDATE SALES CUSTOMER NAME */

    const newFullName =
        getFullName(
            customers[index]
        );


    sales =
        sales.map(sale => {

            if (
                sale.customerId ===
                customerId
            ) {

                return {
                    ...sale,
                    customerName:
                        newFullName
                };

            }

            return sale;

        });


    saveStorage(
        STORAGE.customers,
        customers
    );

    saveStorage(
        STORAGE.accounts,
        accounts
    );

    saveStorage(
        STORAGE.sales,
        sales
    );


    closeModal(
        "customerEditModal"
    );


    renderAll();

    if (currentCustomer) {
        showCustomerPage();
    }


    showToast(
        "Customer record updated successfully."
    );

}


/* =========================================================
   DELETE CUSTOMER
========================================================= */

function deleteCustomer(customerId) {

    const customer =
        customers.find(
            item =>
                item.id ===
                customerId
        );


    if (!customer) {
        return;
    }


    const fullName =
        getFullName(customer);


    const confirmed =
        confirm(
            `Delete customer "${fullName}"?\n\nThe customer account will also be removed. Existing sales records will remain.`
        );


    if (!confirmed) {
        return;
    }


    customers =
        customers.filter(
            item =>
                item.id !== customerId
        );


    accounts =
        accounts.filter(
            account =>
                account.customerId !==
                customerId
        );


    saveStorage(
        STORAGE.customers,
        customers
    );

    saveStorage(
        STORAGE.accounts,
        accounts
    );


    if (
        currentCustomer &&
        currentCustomer.id ===
        customerId
    ) {

        currentCustomer = null;

        localStorage.removeItem(
            STORAGE.currentCustomer
        );

        cart = [];

        saveStorage(
            STORAGE.cart,
            cart
        );

    }


    renderAll();


    showToast(
        "Customer record deleted successfully."
    );

}


/* =========================================================
   SALES TABLE
========================================================= */

function renderSales() {

    const body =
        document.getElementById(
            "salesTableBody"
        );


    if (!sales.length) {

        body.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        No sales records found.
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    const sortedSales =
        [...sales].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );


    body.innerHTML =
        sortedSales.map(sale => {

            return `
                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(sale.id)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(
                            sale.customerName
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            sale.productName
                        )}
                    </td>

                    <td>
                        ${sale.quantity}
                    </td>

                    <td>
                        ${formatMoney(sale.total)}
                    </td>

                    <td>
                        ${formatDisplayDate(
                            sale.date
                        )}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="btn btn-warning"
                                onclick="openSaleEdit(
                                    '${sale.id}'
                                )"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger"
                                onclick="deleteSale(
                                    '${sale.id}'
                                )"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");

}


/* =========================================================
   SALE EDIT
========================================================= */

function openSaleEdit(saleId) {

    const sale =
        sales.find(
            item =>
                item.id === saleId
        );


    if (!sale) {
        return;
    }


    clearErrors();


    document
        .getElementById(
            "editSaleId"
        )
        .value =
        sale.id;


    document
        .getElementById(
            "editSaleProduct"
        )
        .value =
        sale.productName;


    document
        .getElementById(
            "editSaleCustomer"
        )
        .value =
        sale.customerName;


    document
        .getElementById(
            "editSaleQuantity"
        )
        .value =
        sale.quantity;


    document
        .getElementById(
            "editSaleDate"
        )
        .value =
        sale.date;


    updateSalePreview();


    openModal(
        "saleEditModal"
    );

}


/* =========================================================
   SALE PREVIEW
========================================================= */

function updateSalePreview() {

    const saleId =
        document
            .getElementById(
                "editSaleId"
            )
            .value;


    const quantity =
        Number(
            document
                .getElementById(
                    "editSaleQuantity"
                )
                .value
        );


    const sale =
        sales.find(
            item =>
                item.id === saleId
        );


    if (!sale) {
        return;
    }


    const product =
        products.find(
            item =>
                item.id ===
                sale.productId
        );


    if (!product) {

        document
            .getElementById(
                "editSaleTotal"
            )
            .textContent =
            formatMoney(0);

        return;
    }


    document
        .getElementById(
            "editSaleTotal"
        )
        .textContent =
        formatMoney(
            product.price *
            (quantity || 0)
        );

}


/* =========================================================
   SAVE SALE EDIT
========================================================= */

function saveSaleEdit(event) {

    event.preventDefault();

    clearErrors();


    const saleId =
        document
            .getElementById(
                "editSaleId"
            )
            .value;


    const customerName =
        document
            .getElementById(
                "editSaleCustomer"
            )
            .value.trim();


    const newQuantity =
        Number(
            document
                .getElementById(
                    "editSaleQuantity"
                )
                .value
        );


    const date =
        document
            .getElementById(
                "editSaleDate"
            )
            .value;


    const sale =
        sales.find(
            item =>
                item.id === saleId
        );


    if (!sale) {
        return;
    }


    const product =
        products.find(
            item =>
                item.id ===
                sale.productId
        );


    let valid = true;


    if (customerName.length < 2) {

        showError(
            "editSaleCustomer",
            "editSaleCustomerError",
            "Customer name is required."
        );

        valid = false;
    }


    if (
        !Number.isInteger(
            newQuantity
        ) ||
        newQuantity < 1
    ) {

        showError(
            "editSaleQuantity",
            "editSaleQuantityError",
            "Quantity must be at least 1."
        );

        valid = false;
    }


    if (!date) {

        showError(
            "editSaleDate",
            "editSaleDateError",
            "Date is required."
        );

        valid = false;
    }


    if (!valid) {
        return;
    }


    if (product) {

        /*
           Restore the old quantity first.
           Then subtract the new quantity.
        */

        const availableStock =
            product.stock +
            sale.quantity;


        if (
            newQuantity >
            availableStock
        ) {

            showError(
                "editSaleQuantity",
                "editSaleQuantityError",
                `Only ${availableStock} units are available for this update.`
            );

            return;
        }


        product.stock =
            availableStock -
            newQuantity;


        sale.total =
            product.price *
            newQuantity;


        sale.productName =
            product.name;

    }


    sale.customerName =
        customerName;

    sale.quantity =
        newQuantity;

    sale.date =
        date;


    saveStorage(
        STORAGE.products,
        products
    );

    saveStorage(
        STORAGE.sales,
        sales
    );


    closeModal(
        "saleEditModal"
    );


    renderAll();

    renderCustomerMenu();

    renderCart();


    showToast(
        "Sales record updated successfully."
    );

}


/* =========================================================
   DELETE SALE
========================================================= */

function deleteSale(saleId) {

    const sale =
        sales.find(
            item =>
                item.id === saleId
        );


    if (!sale) {
        return;
    }


    const confirmed =
        confirm(
            `Delete sales record ${sale.id}?\n\nThe sold quantity will be returned to inventory if the product still exists.`
        );


    if (!confirmed) {
        return;
    }


    const product =
        products.find(
            item =>
                item.id ===
                sale.productId
        );


    if (product) {

        product.stock +=
            sale.quantity;

    }


    sales =
        sales.filter(
            item =>
                item.id !== saleId
        );


    saveStorage(
        STORAGE.sales,
        sales
    );

    saveStorage(
        STORAGE.products,
        products
    );


    renderAll();

    renderCustomerMenu();

    renderCart();


    showToast(
        "Sales record deleted successfully."
    );

}


/* =========================================================
   ACCOUNT VIEW
========================================================= */

function showCustomerAccount() {

    if (!currentCustomer) {
        return;
    }


    const container =
        document.getElementById(
            "accountDetails"
        );


    container.innerHTML = `

        <div class="account-info">

            <div class="account-row">
                <span>Customer ID</span>
                <strong>
                    ${escapeHtml(
                        currentCustomer.id
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Name</span>
                <strong>
                    ${escapeHtml(
                        getFullName(
                            currentCustomer
                        )
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Birthdate</span>
                <strong>
                    ${formatDisplayDate(
                        currentCustomer.birthdate
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Age</span>
                <strong>
                    ${calculateAge(
                        currentCustomer.birthdate
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Gender</span>
                <strong>
                    ${escapeHtml(
                        currentCustomer.gender
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Contact</span>
                <strong>
                    ${escapeHtml(
                        currentCustomer.contact
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Email</span>
                <strong>
                    ${escapeHtml(
                        currentCustomer.email
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>City</span>
                <strong>
                    ${escapeHtml(
                        currentCustomer.city
                    )}
                </strong>
            </div>

            <div class="account-row">
                <span>Address</span>
                <strong>
                    ${escapeHtml(
                        currentCustomer.address
                    )}
                </strong>
            </div>

        </div>

    `;


    openModal(
        "accountModal"
    );

}


/* =========================================================
   RENDER ALL
========================================================= */

function renderAll() {

    renderDashboard();

    renderInventory();

    renderCustomers();

    renderSales();

}


/* =========================================================
   MODAL FUNCTIONS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove(
            "hidden"
        );
    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.add(
            "hidden"
        );
    }

}


/* =========================================================
   ERROR HANDLING
========================================================= */

function showError(
    inputId,
    errorId,
    message
) {

    const input =
        document.getElementById(
            inputId
        );

    const error =
        document.getElementById(
            errorId
        );


    if (input) {
        input.classList.add(
            "input-error"
        );
    }


    if (error) {
        error.textContent =
            message;
    }

}


function clearErrors() {

    document
        .querySelectorAll(
            ".error-message"
        )
        .forEach(error => {

            error.textContent = "";

        });


    document
        .querySelectorAll(
            ".input-error"
        )
        .forEach(input => {

            input.classList.remove(
                "input-error"
            );

        });

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


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


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3500);

}


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function generateId(
    prefix,
    array
) {

    let highest = 0;


    array.forEach(item => {

        const match =
            String(item.id || "")
                .match(
                    new RegExp(
                        `^${prefix}(\\d+)$`
                    )
                );


        if (match) {

            highest =
                Math.max(
                    highest,
                    Number(match[1])
                );

        }

    });


    return (
        prefix +
        String(highest + 1)
            .padStart(3, "0")
    );

}


function getFullName(customer) {

    if (!customer) {
        return "";
    }


    return [
        customer.name,
        customer.middleName,
        customer.surname
    ]
        .filter(Boolean)
        .join(" ");

}


function formatMoney(value) {

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP"
        }
    ).format(
        Number(value) || 0
    );

}


function getToday() {

    return formatDateInput(
        new Date()
    );

}


function formatDisplayDate(
    dateString
) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    if (Number.isNaN(
        date.getTime()
    )) {
        return dateString;
    }


    return date.toLocaleDateString(
        "en-PH",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

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
   ESCAPE KEY CLOSES MODALS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(
                    ".modal"
                )
                .forEach(modal => {

                    modal.classList.add(
                        "hidden"
                    );

                });

        }

    }
);
