"use strict";

/* =========================================================
   MARCELINO'S FRIED ITIK
   SALES AND INVENTORY POS SYSTEM

   Features:
   - Customer registration
   - 18+ age validation
   - Philippine 63+ contact number
   - Client-side validation
   - LocalStorage
   - POS
   - Inventory CRUD
   - Customer CRUD
   - Sales CRUD
   - Dynamic DOM updates
========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

const STORAGE = {
    products: "marcelinos_products",
    customers: "marcelinos_customers",
    accounts: "marcelinos_accounts",
    sales: "marcelinos_sales",
    cart: "marcelinos_cart"
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
        middleName: "Dela",
        surname: "Cruz",
        birthdate: "1995-05-15",
        age: 31,
        gender: "Male",
        contact: "639171234567",
        email: "juan@gmail.com",
        city: "Oroquieta",
        address: "Oroquieta City"
    },

    {
        id: "C002",
        name: "Maria",
        middleName: "Santos",
        surname: "Reyes",
        birthdate: "1994-07-20",
        age: 32,
        gender: "Female",
        contact: "639281234567",
        email: "maria@gmail.com",
        city: "Ozamis",
        address: "Ozamis City"
    }

];


/* =========================================================
   DEFAULT SALES
========================================================= */

const DEFAULT_SALES = [

    {
        id: "S001",
        date: "2026-09-14",
        customerName: "Juan Dela Cruz",
        productId: "P001",
        productName: "Fried Itik Original",
        quantity: 2,
        total: 700
    },

    {
        id: "S002",
        date: "2026-09-14",
        customerName: "Maria Santos Reyes",
        productId: "P002",
        productName: "Fried Itik Spicy",
        quantity: 1,
        total: 375
    }

];


/* =========================================================
   APPLICATION STATE
========================================================= */

let products = [];
let customers = [];
let accounts = [];
let sales = [];
let cart = [];

let currentCustomer = null;


/* =========================================================
   DOM HELPER
========================================================= */

function $(id) {
    return document.getElementById(id);
}


/* =========================================================
   STORAGE FUNCTIONS
========================================================= */

function loadStorage(key, defaultValue) {

    const saved = localStorage.getItem(key);

    if (saved === null) {

        localStorage.setItem(
            key,
            JSON.stringify(defaultValue)
        );

        return structuredClone(defaultValue);
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        localStorage.setItem(
            key,
            JSON.stringify(defaultValue)
        );

        return structuredClone(defaultValue);
    }
}


function saveStorage(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    products = loadStorage(
        STORAGE.products,
        DEFAULT_PRODUCTS
    );

    customers = loadStorage(
        STORAGE.customers,
        DEFAULT_CUSTOMERS
    );

    accounts = loadStorage(
        STORAGE.accounts,
        []
    );

    sales = loadStorage(
        STORAGE.sales,
        DEFAULT_SALES
    );

    cart = loadStorage(
        STORAGE.cart,
        []
    );

    initializeApplication();

});


function initializeApplication() {

    setupAuthenticationEvents();

    setupNavigation();

    setupModalEvents();

    setupSignupEvents();

    setupProductEvents();

    setupCustomerEvents();

    setupSaleEvents();

    setupPOS();

    renderEverything();

    setBirthdateLimits();

}


/* =========================================================
   AUTHENTICATION EVENTS
========================================================= */

function setupAuthenticationEvents() {

    $("adminLoginBtn").addEventListener(
        "click",
        () => openModal("adminLoginModal")
    );

    $("customerLoginBtn").addEventListener(
        "click",
        () => openModal("customerLoginModal")
    );

    $("customerSignupBtn").addEventListener(
        "click",
        () => openModal("customerSignupModal")
    );


    $("openSignupFromLogin").addEventListener(
        "click",
        () => {

            closeModal("customerLoginModal");

            openModal("customerSignupModal");

        }
    );


    $("adminLoginForm").addEventListener(
        "submit",
        handleAdminLogin
    );


    $("customerLoginForm").addEventListener(
        "submit",
        handleCustomerLogin
    );


    $("adminLogoutBtn").addEventListener(
        "click",
        adminLogout
    );


    $("customerLogoutBtn").addEventListener(
        "click",
        customerLogout
    );

}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function handleAdminLogin(event) {

    event.preventDefault();

    clearFormErrors(event.target);

    const username = $("adminUsername").value.trim();

    const password = $("adminPassword").value;

    let valid = true;


    if (!username) {

        setFieldError(
            $("adminUsername"),
            "Username is required."
        );

        valid = false;
    }


    if (!password) {

        setFieldError(
            $("adminPassword"),
            "Password is required."
        );

        valid = false;
    }


    if (!valid) return;


    if (
        username !== "admin" ||
        password !== "admin123"
    ) {

        setFieldError(
            $("adminPassword"),
            "Invalid administrator username or password."
        );

        return;
    }


    closeModal("adminLoginModal");

    $("adminLoginForm").reset();

    showAdminApp();

    showToast(
        "Administrator login successful.",
        "success"
    );

}


/* =========================================================
   CUSTOMER LOGIN
========================================================= */

function handleCustomerLogin(event) {

    event.preventDefault();

    clearFormErrors(event.target);

    const email = $("loginEmail").value.trim().toLowerCase();

    const password = $("loginPassword").value;

    let valid = true;


    if (!validateEmail(email)) {

        setFieldError(
            $("loginEmail"),
            "Enter a valid email address."
        );

        valid = false;
    }


    if (!password) {

        setFieldError(
            $("loginPassword"),
            "Password is required."
        );

        valid = false;
    }


    if (!valid) return;


    const account = accounts.find(
        item =>
            item.email.toLowerCase() === email &&
            item.password === password
    );


    if (!account) {

        setFieldError(
            $("loginPassword"),
            "Incorrect email or password."
        );

        return;
    }


    currentCustomer = customers.find(
        customer =>
            customer.email.toLowerCase() === email
    );


    if (!currentCustomer) {

        showToast(
            "Customer record was not found.",
            "error"
        );

        return;
    }


    closeModal("customerLoginModal");

    $("customerLoginForm").reset();

    showCustomerApp();

    showToast(
        "Welcome back, " + getFullName(currentCustomer),
        "success"
    );

}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

function adminLogout() {

    if (
        !confirm(
            "Are you sure you want to logout from the administrator account?"
        )
    ) {
        return;
    }

    $("adminApp").classList.add("hidden");

    $("authPage").classList.remove("hidden");

    showToast(
        "Administrator logged out.",
        "success"
    );

}


/* =========================================================
   CUSTOMER LOGOUT
========================================================= */

function customerLogout() {

    if (
        !confirm(
            "Are you sure you want to logout?"
        )
    ) {
        return;
    }

    currentCustomer = null;

    $("customerApp").classList.add("hidden");

    $("authPage").classList.remove("hidden");

    showToast(
        "Customer logged out.",
        "success"
    );

}


/* =========================================================
   SHOW APPLICATIONS
========================================================= */

function showAdminApp() {

    $("authPage").classList.add("hidden");

    $("customerApp").classList.add("hidden");

    $("adminApp").classList.remove("hidden");

    renderEverything();

}


function showCustomerApp() {

    $("authPage").classList.add("hidden");

    $("adminApp").classList.add("hidden");

    $("customerApp").classList.remove("hidden");

    renderCustomerMenu();

    renderCustomerCart();

    $("customerWelcome").textContent =
        "Hello, " + getFullName(currentCustomer);

}


/* =========================================================
   CUSTOMER SIGNUP
========================================================= */

function setupSignupEvents() {

    $("signupBirthdate").addEventListener(
        "change",
        calculateSignupAge
    );


    $("signupContact").addEventListener(
        "input",
        sanitizeContact
    );


    $("customerSignupForm").addEventListener(
        "submit",
        handleCustomerSignup
    );


    $("signupPassword").addEventListener(
        "input",
        () => {

            if (
                $("signupPassword").value.length > 0
            ) {

                validateSignupPassword();

            }

        }
    );

}


function handleCustomerSignup(event) {

    event.preventDefault();

    clearFormErrors(event.target);


    const name =
        $("signupName").value.trim();

    const middleName =
        $("signupMiddleName").value.trim();

    const surname =
        $("signupSurname").value.trim();

    const birthdate =
        $("signupBirthdate").value;

    const age =
        calculateAge(birthdate);

    const contact =
        "63" + $("signupContact").value.trim();

    const gender =
        $("signupGender").value;

    const email =
        $("signupEmail").value.trim().toLowerCase();

    const password =
        $("signupPassword").value;

    const confirmPassword =
        $("signupConfirmPassword").value;


    let valid = true;


    /* NAME */

    if (!validatePersonName(name)) {

        setFieldError(
            $("signupName"),
            "Enter a valid name."
        );

        valid = false;
    }


    /* MIDDLE NAME */

    if (!validatePersonName(middleName)) {

        setFieldError(
            $("signupMiddleName"),
            "Enter a valid middle name."
        );

        valid = false;
    }


    /* SURNAME */

    if (!validatePersonName(surname)) {

        setFieldError(
            $("signupSurname"),
            "Enter a valid surname."
        );

        valid = false;
    }


    /* BIRTHDATE */

    if (!birthdate) {

        setFieldError(
            $("signupBirthdate"),
            "Birthdate is required."
        );

        valid = false;

    } else if (age < 18) {

        setFieldError(
            $("signupBirthdate"),
            "Customer must be 18 years old or above."
        );

        valid = false;

    } else if (age > 120) {

        setFieldError(
            $("signupBirthdate"),
            "Enter a valid birthdate."
        );

        valid = false;
    }


    /* CONTACT */

    const contactDigits =
        $("signupContact").value.trim();

    if (!/^\d{10}$/.test(contactDigits)) {

        setFieldError(
            $("signupContact"),
            "Enter exactly 10 digits after 63+."
        );

        valid = false;
    }


    /* GENDER */

    if (!gender) {

        setFieldError(
            $("signupGender"),
            "Please select a gender."
        );

        valid = false;
    }


    /* EMAIL */

    if (!validateEmail(email)) {

        setFieldError(
            $("signupEmail"),
            "Enter a valid email address."
        );

        valid = false;
    }


    /* DUPLICATE EMAIL */

    if (
        accounts.some(
            account =>
                account.email.toLowerCase() === email
        )
    ) {

        setFieldError(
            $("signupEmail"),
            "This email is already registered."
        );

        valid = false;
    }


    /* PASSWORD */

    if (password.length < 8) {

        setFieldError(
            $("signupPassword"),
            "Password must contain at least 8 characters."
        );

        valid = false;
    }


    /* CONFIRM PASSWORD */

    if (password !== confirmPassword) {

        setFieldError(
            $("signupConfirmPassword"),
            "Passwords do not match."
        );

        valid = false;
    }


    if (!valid) {

        showToast(
            "Please correct the highlighted fields.",
            "error"
        );

        return;
    }


    /* CREATE CUSTOMER */

    const customerId =
        generateId("C", customers);


    const customer = {

        id: customerId,

        name,

        middleName,

        surname,

        birthdate,

        age,

        gender,

        contact,

        email,

        city: "Not specified",

        address: "Not specified"

    };


    const account = {

        id: "A" + Date.now(),

        customerId,

        email,

        password

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


    event.target.reset();

    $("signupAge").value = "";

    closeModal("customerSignupModal");


    renderEverything();


    showToast(
        "Customer account created successfully!",
        "success"
    );


    /* Automatically open customer login */

    setTimeout(
        () => openModal("customerLoginModal"),
        300
    );

}


/* =========================================================
   AGE CALCULATION
========================================================= */

function calculateAge(birthdate) {

    if (!birthdate) {
        return 0;
    }


    const birth =
        new Date(birthdate + "T00:00:00");

    const today =
        new Date();


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


function calculateSignupAge() {

    const birthdate =
        $("signupBirthdate").value;

    const age =
        calculateAge(birthdate);


    $("signupAge").value =
        age > 0 ? age : "";


    const group =
        $("signupBirthdate").closest(".form-group");


    if (!birthdate) {

        clearFieldError(
            $("signupBirthdate")
        );

        return;
    }


    if (age < 18) {

        setFieldError(
            $("signupBirthdate"),
            "Customer must be 18 years old or above."
        );

    } else {

        clearFieldError(
            $("signupBirthdate")
        );

    }

}


/* =========================================================
   BIRTHDATE LIMITS
========================================================= */

function setBirthdateLimits() {

    const today =
        new Date();

    const maximumBirthdate =
        new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );


    const minimumBirthdate =
        new Date(
            today.getFullYear() - 120,
            today.getMonth(),
            today.getDate()
        );


    const max =
        formatDateForInput(maximumBirthdate);

    const min =
        formatDateForInput(minimumBirthdate);


    $("signupBirthdate").max = max;

    $("signupBirthdate").min = min;

    $("editBirthdate").max = max;

    $("editBirthdate").min = min;

}


function formatDateForInput(date) {

    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0")
    );

}


/* =========================================================
   CONTACT SANITIZATION
========================================================= */

function sanitizeContact(event) {

    event.target.value =
        event.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

}


/* =========================================================
   VALIDATION HELPERS
========================================================= */

function validatePersonName(value) {

    return (
        value.length >= 2 &&
        value.length <= 50 &&
        /^[A-Za-zÀ-ÿ.' -]+$/.test(value)
    );

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


function validateSignupPassword() {

    const password =
        $("signupPassword").value;

    if (password.length < 8) {

        setFieldError(
            $("signupPassword"),
            "Minimum of 8 characters."
        );

        return false;

    }

    clearFieldError(
        $("signupPassword")
    );

    return true;

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".nav-btn")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );


                    button.classList.add("active");


                    document
                        .querySelectorAll(".system-section")
                        .forEach(section =>
                            section.classList.remove(
                                "active-section"
                            )
                        );


                    const section =
                        $(button.dataset.section);


                    if (section) {

                        section.classList.add(
                            "active-section"
                        );

                    }

                }
            );

        });

}


/* =========================================================
   MODALS
========================================================= */

function setupModalEvents() {

    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        closeModal(
                            modal.id
                        );

                    }

                }
            );

        });

}


function openModal(id) {

    $(id).classList.add("show");

}


function closeModal(id) {

    $(id).classList.remove("show");

}


/* =========================================================
   PRODUCT CRUD
========================================================= */

function setupProductEvents() {

    $("addProductBtn").addEventListener(
        "click",
        () => openProductModal()
    );


    $("productForm").addEventListener(
        "submit",
        saveProduct
    );

}


function openProductModal(productId = null) {

    $("productForm").reset();

    clearFormErrors(
        $("productForm")
    );


    $("productEditId").value =
        productId || "";


    if (productId) {

        const product =
            products.find(
                item => item.id === productId
            );


        if (!product) return;


        $("productModalTitle").textContent =
            "Edit Product";


        $("productName").value =
            product.name;

        $("productCategory").value =
            product.category;

        $("productPrice").value =
            product.price;

        $("productStock").value =
            product.stock;

        $("productIcon").value =
            product.icon || "🍗";

    } else {

        $("productModalTitle").textContent =
            "Add Product";

        $("productIcon").value =
            "🍗";

    }


    openModal("productModal");

}


function saveProduct(event) {

    event.preventDefault();

    clearFormErrors(event.target);


    const id =
        $("productEditId").value;

    const name =
        $("productName").value.trim();

    const category =
        $("productCategory").value.trim();

    const price =
        Number($("productPrice").value);

    const stock =
        Number($("productStock").value);

    const icon =
        $("productIcon").value.trim() || "🍗";


    let valid = true;


    if (name.length < 2) {

        setFieldError(
            $("productName"),
            "Product name is required."
        );

        valid = false;
    }


    if (category.length < 2) {

        setFieldError(
            $("productCategory"),
            "Category is required."
        );

        valid = false;
    }


    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        setFieldError(
            $("productPrice"),
            "Price must be greater than zero."
        );

        valid = false;
    }


    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        setFieldError(
            $("productStock"),
            "Stock must be zero or greater."
        );

        valid = false;
    }


    if (!valid) return;


    if (id) {

        const index =
            products.findIndex(
                product => product.id === id
            );


        if (index === -1) return;


        products[index] = {

            ...products[index],

            name,

            category,

            price,

            stock,

            icon

        };


        showToast(
            "Product updated successfully.",
            "success"
        );

    } else {

        products.push({

            id: generateId("P", products),

            name,

            category,

            price,

            stock,

            icon

        });


        showToast(
            "Product added successfully.",
            "success"
        );

    }


    saveStorage(
        STORAGE.products,
        products
    );


    closeModal("productModal");


    renderEverything();

}


function deleteProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    const confirmed =
        confirm(
            `Delete "${product.name}" from inventory?`
        );


    if (!confirmed) return;


    const hasSales =
        sales.some(
            sale => sale.productId === id
        );


    if (hasSales) {

        const continueDelete =
            confirm(
                "This product has existing sales records. " +
                "Deleting it may affect historical inventory information.\n\n" +
                "Continue?"
            );


        if (!continueDelete) return;

    }


    products =
        products.filter(
            item => item.id !== id
        );


    cart =
        cart.filter(
            item => item.productId !== id
        );


    saveStorage(
        STORAGE.products,
        products
    );

    saveStorage(
        STORAGE.cart,
        cart
    );


    renderEverything();


    showToast(
        "Product deleted successfully.",
        "success"
    );

}


/* =========================================================
   CUSTOMER CRUD
========================================================= */

function setupCustomerEvents() {

    $("customerEditForm").addEventListener(
        "submit",
        saveCustomer
    );


    $("editBirthdate").addEventListener(
        "change",
        calculateEditAge
    );


    $("editContact").addEventListener(
        "input",
        sanitizeContact
    );

}


function openCustomerEdit(id) {

    const customer =
        customers.find(
            item => item.id === id
        );


    if (!customer) return;


    $("customerEditForm").reset();

    clearFormErrors(
        $("customerEditForm")
    );


    $("customerEditId").value =
        customer.id;

    $("editName").value =
        customer.name;

    $("editMiddleName").value =
        customer.middleName;

    $("editSurname").value =
        customer.surname;

    $("editBirthdate").value =
        customer.birthdate;

    $("editAge").value =
        calculateAge(customer.birthdate);

    $("editGender").value =
        customer.gender;

    let contact =
        customer.contact || "";


    if (contact.startsWith("63")) {

        contact =
            contact.substring(2);

    }


    $("editContact").value =
        contact;

    $("editEmail").value =
        customer.email;


    openModal(
        "customerEditModal"
    );

}


function calculateEditAge() {

    const birthdate =
        $("editBirthdate").value;

    $("editAge").value =
        birthdate
            ? calculateAge(birthdate)
            : "";

}


function saveCustomer(event) {

    event.preventDefault();

    clearFormErrors(event.target);


    const id =
        $("customerEditId").value;

    const name =
        $("editName").value.trim();

    const middleName =
        $("editMiddleName").value.trim();

    const surname =
        $("editSurname").value.trim();

    const birthdate =
        $("editBirthdate").value;

    const age =
        calculateAge(birthdate);

    const gender =
        $("editGender").value;

    const contact =
        "63" +
        $("editContact").value.trim();

    const email =
        $("editEmail").value.trim().toLowerCase();


    let valid = true;


    if (!validatePersonName(name)) {

        setFieldError(
            $("editName"),
            "Enter a valid name."
        );

        valid = false;
    }


    if (!validatePersonName(middleName)) {

        setFieldError(
            $("editMiddleName"),
            "Enter a valid middle name."
        );

        valid = false;
    }


    if (!validatePersonName(surname)) {

        setFieldError(
            $("editSurname"),
            "Enter a valid surname."
        );

        valid = false;
    }


    if (!birthdate) {

        setFieldError(
            $("editBirthdate"),
            "Birthdate is required."
        );

        valid = false;

    } else if (age < 18) {

        setFieldError(
            $("editBirthdate"),
            "Customer must remain 18 years old or above."
        );

        valid = false;

    }


    if (!/^\d{10}$/.test(
        $("editContact").value.trim()
    )) {

        setFieldError(
            $("editContact"),
            "Enter exactly 10 digits after 63+."
        );

        valid = false;
    }


    if (!gender) {

        setFieldError(
            $("editGender"),
            "Please select gender."
        );

        valid = false;
    }


    if (!validateEmail(email)) {

        setFieldError(
            $("editEmail"),
            "Enter a valid email address."
        );

        valid = false;
    }


    const duplicateEmail =
        customers.some(
            customer =>
                customer.id !== id &&
                customer.email.toLowerCase() === email
        );


    if (duplicateEmail) {

        setFieldError(
            $("editEmail"),
            "Another customer already uses this email."
        );

        valid = false;
    }


    if (!valid) return;


    const index =
        customers.findIndex(
            customer => customer.id === id
        );


    if (index === -1) return;


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

        email

    };


    /* Update linked login account */

    const accountIndex =
        accounts.findIndex(
            account =>
                account.customerId === id
        );


    if (accountIndex !== -1) {

        accounts[accountIndex].email =
            email;

    }


    saveStorage(
        STORAGE.customers,
        customers
    );

    saveStorage(
        STORAGE.accounts,
        accounts
    );


    closeModal(
        "customerEditModal"
    );


    renderEverything();


    showToast(
        "Customer record updated successfully.",
        "success"
    );

}


function deleteCustomer(id) {

    const customer =
        customers.find(
            item => item.id === id
        );


    if (!customer) return;


    const confirmed =
        confirm(
            `Delete customer "${getFullName(customer)}"?\n\n` +
            "The customer's login account will also be removed."
        );


    if (!confirmed) return;


    customers =
        customers.filter(
            item => item.id !== id
        );


    accounts =
        accounts.filter(
            account =>
                account.customerId !== id
        );


    saveStorage(
        STORAGE.customers,
        customers
    );

    saveStorage(
        STORAGE.accounts,
        accounts
    );


    renderEverything();


    showToast(
        "Customer record deleted successfully.",
        "success"
    );

}


/* =========================================================
   SALES CRUD
========================================================= */

function setupSaleEvents() {

    $("saleEditForm").addEventListener(
        "submit",
        saveSale
    );

}


function openSaleEdit(id) {

    const sale =
        sales.find(
            item => item.id === id
        );


    if (!sale) return;


    $("saleEditForm").reset();

    clearFormErrors(
        $("saleEditForm")
    );


    $("saleEditId").value =
        sale.id;

    $("saleProductName").value =
        sale.productName;

    $("saleCustomerName").value =
        sale.customerName;

    $("saleQuantity").value =
        sale.quantity;

    $("saleDate").value =
        sale.date;


    openModal(
        "saleEditModal"
    );

}


function saveSale(event) {

    event.preventDefault();

    clearFormErrors(event.target);


    const id =
        $("saleEditId").value;

    const customerName =
        $("saleCustomerName").value.trim();

    const newQuantity =
        Number($("saleQuantity").value);

    const date =
        $("saleDate").value;


    let valid = true;


    if (customerName.length < 2) {

        setFieldError(
            $("saleCustomerName"),
            "Customer name is required."
        );

        valid = false;
    }


    if (
        !Number.isInteger(newQuantity) ||
        newQuantity < 1
    ) {

        setFieldError(
            $("saleQuantity"),
            "Quantity must be at least 1."
        );

        valid = false;
    }


    if (!date) {

        setFieldError(
            $("saleDate"),
            "Sale date is required."
        );

        valid = false;
    }


    if (!valid) return;


    const saleIndex =
        sales.findIndex(
            sale => sale.id === id
        );


    if (saleIndex === -1) return;


    const sale =
        sales[saleIndex];


    const product =
        products.find(
            product =>
                product.id === sale.productId
        );


    if (!product) {

        showToast(
            "The product linked to this sale no longer exists.",
            "error"
        );

        return;
    }


    /*
        Restore old quantity first.
        Then subtract the new quantity.
    */

    const availableStock =
        product.stock + sale.quantity;


    if (
        newQuantity > availableStock
    ) {

        setFieldError(
            $("saleQuantity"),
            `Only ${availableStock} item(s) are available.`
        );

        return;
    }


    product.stock =
        availableStock - newQuantity;


    sale.customerName =
        customerName;

    sale.quantity =
        newQuantity;

    sale.date =
        date;

    sale.total =
        product.price * newQuantity;

    sale.productName =
        product.name;


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


    renderEverything();


    showToast(
        "Sale record updated successfully.",
        "success"
    );

}


function deleteSale(id) {

    const sale =
        sales.find(
            item => item.id === id
        );


    if (!sale) return;


    const confirmed =
        confirm(
            `Delete sale ${sale.id}?\n\n` +
            "The sold quantity will be returned to inventory."
        );


    if (!confirmed) return;


    const product =
        products.find(
            item =>
                item.id === sale.productId
        );


    if (product) {

        product.stock +=
            sale.quantity;

    }


    sales =
        sales.filter(
            item => item.id !== id
        );


    saveStorage(
        STORAGE.products,
        products
    );

    saveStorage(
        STORAGE.sales,
        sales
    );


    renderEverything();


    showToast(
        "Sale deleted and inventory restored.",
        "success"
    );

}


/* =========================================================
   POS
========================================================= */

function setupPOS() {

    $("adminCheckoutBtn").addEventListener(
        "click",
        () => openCheckoutForAdmin()
    );


    $("customerCheckoutBtn").addEventListener(
        "click",
        () => openCheckoutForCustomer()
    );


    $("confirmCheckoutBtn").addEventListener(
        "click",
        completeCustomerOrder
    );


    $("customerCartScrollBtn").addEventListener(
        "click",
        () => {

            $("customerCartSection")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    if (product.stock <= 0) {

        showToast(
            "This product is out of stock.",
            "error"
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
                "You cannot add more than the available stock.",
                "error"
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


    saveStorage(
        STORAGE.cart,
        cart
    );


    renderCustomerCart();

    renderAdminCart();


    showToast(
        product.name + " added to cart.",
        "success"
    );

}


function changeCartQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            cartItem =>
                cartItem.productId === productId
        );


    const product =
        products.find(
            product =>
                product.id === productId
        );


    if (!item || !product) return;


    const newQuantity =
        item.quantity + change;


    if (newQuantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.productId !== productId
            );

    } else if (
        newQuantity > product.stock
    ) {

        showToast(
            "Maximum available stock reached.",
            "error"
        );

        return;

    } else {

        item.quantity =
            newQuantity;

    }


    saveStorage(
        STORAGE.cart,
        cart
    );


    renderCustomerCart();

    renderAdminCart();

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


    renderCustomerCart();

    renderAdminCart();

}


/* =========================================================
   CUSTOMER MENU
========================================================= */

function renderCustomerMenu() {

    const container =
        $("customerMenuGrid");


    if (!container) return;


    if (products.length === 0) {

        container.innerHTML = `
            <div class="cart-empty">
                No products are currently available.
            </div>
        `;

        return;
    }


    container.innerHTML =
        products.map(
            product => {

                const disabled =
                    product.stock <= 0
                        ? "disabled"
                        : "";


                return `

                    <div class="menu-card">

                        <div class="menu-icon">
                            ${escapeHtml(product.icon || "🍗")}
                        </div>

                        <div class="menu-info">

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
                                ${
                                    product.stock > 0
                                    ? `Available Stock: ${product.stock}`
                                    : "OUT OF STOCK"
                                }
                            </div>

                            <button
                                type="button"
                                class="btn btn-primary"
                                ${disabled}
                                onclick="addToCart('${product.id}')"
                            >
                                ${
                                    product.stock > 0
                                    ? "Add to Cart"
                                    : "Out of Stock"
                                }
                            </button>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   ADMIN MENU
========================================================= */

function renderAdminMenu() {

    const container =
        $("adminMenuGrid");


    if (!container) return;


    container.innerHTML =
        products.map(
            product => {

                const disabled =
                    product.stock <= 0
                        ? "disabled"
                        : "";


                return `

                    <div class="menu-card">

                        <div class="menu-icon">
                            ${escapeHtml(product.icon || "🍗")}
                        </div>

                        <div class="menu-info">

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
                                Stock: ${product.stock}
                            </div>

                            <button
                                type="button"
                                class="btn btn-primary"
                                ${disabled}
                                onclick="addToCart('${product.id}')"
                            >
                                Add to Order
                            </button>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   CUSTOMER CART
========================================================= */

function renderCustomerCart() {

    const container =
        $("customerCartItems");


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="cart-empty">
                Your cart is empty.
            </div>
        `;

    } else {

        container.innerHTML =
            buildCartHTML();

    }


    $("customerCartTotal").textContent =
        formatMoney(
            calculateCartTotal()
        );


    $("customerCartCount").textContent =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

}


/* =========================================================
   ADMIN CART
========================================================= */

function renderAdminCart() {

    const container =
        $("adminCartItems");


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="cart-empty">
                No items in the current order.
            </div>
        `;

    } else {

        container.innerHTML =
            buildCartHTML();

    }


    $("adminCartTotal").textContent =
        formatMoney(
            calculateCartTotal()
        );

}


/* =========================================================
   CART HTML
========================================================= */

function buildCartHTML() {

    return cart.map(
        item => {

            const product =
                products.find(
                    product =>
                        product.id === item.productId
                );


            if (!product) {
                return "";
            }


            return `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <strong>
                            ${escapeHtml(product.name)}
                        </strong>

                        <span>
                            ${formatMoney(product.price)}
                        </span>

                    </div>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            class="quantity-btn"
                            onclick="changeCartQuantity(
                                '${product.id}',
                                -1
                            )"
                        >
                            −
                        </button>

                        <span class="quantity-value">
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            class="quantity-btn"
                            onclick="changeCartQuantity(
                                '${product.id}',
                                1
                            )"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-cart"
                        onclick="removeFromCart(
                            '${product.id}'
                        )"
                    >
                        Remove
                    </button>

                </div>

            `;

        }
    ).join("");

}


/* =========================================================
   CART TOTAL
========================================================= */

function calculateCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                products.find(
                    product =>
                        product.id === item.productId
                );


            if (!product) {
                return total;
            }


            return (
                total +
                product.price * item.quantity
            );

        },
        0
    );

}


/* =========================================================
   CUSTOMER CHECKOUT
========================================================= */

function openCheckoutForCustomer() {

    if (!currentCustomer) {

        showToast(
            "Please sign in as a customer first.",
            "error"
        );

        return;
    }


    if (cart.length === 0) {

        showToast(
            "Your cart is empty.",
            "error"
        );

        return;
    }


    showCheckoutModal();

}


function openCheckoutForAdmin() {

    if (cart.length === 0) {

        showToast(
            "The current order is empty.",
            "error"
        );

        return;
    }


    showCheckoutModal();

}


function showCheckoutModal() {

    const total =
        calculateCartTotal();


    const itemsHTML =
        cart.map(
            item => {

                const product =
                    products.find(
                        product =>
                            product.id === item.productId
                    );


                if (!product) return "";


                return `
                    <div class="cart-item">

                        <div class="cart-item-info">

                            <strong>
                                ${escapeHtml(product.name)}
                            </strong>

                            <span>
                                Qty: ${item.quantity}
                            </span>

                        </div>

                        <strong>
                            ${formatMoney(
                                product.price *
                                item.quantity
                            )}
                        </strong>

                    </div>
                `;

            }
        ).join("");


    $("checkoutSummary").innerHTML = `

        ${
            currentCustomer
                ? `
                    <p>
                        <strong>Customer:</strong>
                        ${escapeHtml(
                            getFullName(currentCustomer)
                        )}
                    </p>

                    <p style="margin-bottom:15px;">
                        <strong>Email:</strong>
                        ${escapeHtml(
                            currentCustomer.email
                        )}
                    </p>
                `
                : `
                    <p style="margin-bottom:15px;">
                        <strong>Customer:</strong>
                        Walk-in Customer
                    </p>
                `
        }


        <div>
            ${itemsHTML}
        </div>


        <div class="cart-total">

            <span>Total Amount</span>

            <strong>
                ${formatMoney(total)}
            </strong>

        </div>

    `;


    openModal("checkoutModal");

}


/* =========================================================
   COMPLETE ORDER
========================================================= */

function completeCustomerOrder() {

    if (cart.length === 0) {

        showToast(
            "Cart is empty.",
            "error"
        );

        return;
    }


    /* Validate stock before transaction */

    for (const item of cart) {

        const product =
            products.find(
                product =>
                    product.id === item.productId
            );


        if (!product) {

            showToast(
                "A product in the cart no longer exists.",
                "error"
            );

            return;
        }


        if (
            item.quantity > product.stock
        ) {

            showToast(
                `${product.name} does not have enough stock.`,
                "error"
            );

            return;
        }

    }


    const orderId =
        generateId("S", sales);


    const customerName =
        currentCustomer
            ? getFullName(currentCustomer)
            : "Walk-in Customer";


    const orderDate =
        formatDateForInput(
            new Date()
        );


    /* Create a sale record for every product */

    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.productId
            );


        const total =
            product.price *
            item.quantity;


        sales.push({

            id: generateId("S", sales),

            date: orderDate,

            customerName,

            productId: product.id,

            productName: product.name,

            quantity: item.quantity,

            total

        });


        /* Deduct inventory */

        product.stock -=
            item.quantity;

    });


    /* Update customer record if customer exists */

    if (currentCustomer) {

        const customer =
            customers.find(
                customer =>
                    customer.id === currentCustomer.id
            );


        if (customer) {

            currentCustomer =
                customer;

        }

    }


    saveStorage(
        STORAGE.products,
        products
    );

    saveStorage(
        STORAGE.sales,
        sales
    );


    cart = [];

    saveStorage(
        STORAGE.cart,
        cart
    );


    closeModal("checkoutModal");


    renderEverything();


    if (currentCustomer) {

        renderCustomerMenu();

        renderCustomerCart();

    }


    const total =
        sales
            .filter(
                sale =>
                    sale.date === orderDate
            )
            .slice(-cart.length);


    const orderTotalText =
        formatMoney(
            sales
                .slice(-1)[0]
                ?.total || 0
        );


    $("successMessage").textContent =
        `Your order has been successfully recorded. ` +
        `Order ID: ${orderId}.`;


    openModal("successModal");


    showToast(
        "Order completed successfully.",
        "success"
    );

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderEverything() {

    renderDashboard();

    renderInventory();

    renderCustomers();

    renderSales();

    renderAdminMenu();

    renderAdminCart();

    renderCustomerMenu();

    renderCustomerCart();

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    $("dashboardProducts").textContent =
        products.length;


    $("dashboardCustomers").textContent =
        customers.length;


    $("dashboardOrders").textContent =
        sales.length;


    const totalSales =
        sales.reduce(
            (sum, sale) =>
                sum + Number(sale.total),
            0
        );


    $("dashboardSales").textContent =
        formatMoney(totalSales);


    renderLowStock();

    renderRecentSales();

}


function renderLowStock() {

    const container =
        $("lowStockTable");


    const lowStock =
        products.filter(
            product =>
                product.stock <= 5
        );


    if (lowStock.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="3">
                    All products have sufficient stock.
                </td>
            </tr>
        `;

        return;
    }


    container.innerHTML =
        lowStock.map(
            product => `

                <tr>

                    <td>
                        ${escapeHtml(product.name)}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>
                        <span class="status-badge status-low">
                            Low Stock
                        </span>
                    </td>

                </tr>

            `
        ).join("");

}


function renderRecentSales() {

    const container =
        $("recentSalesTable");


    const recent =
        [...sales]
            .reverse()
            .slice(0, 5);


    if (recent.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="3">
                    No sales records.
                </td>
            </tr>
        `;

        return;
    }


    container.innerHTML =
        recent.map(
            sale => `

                <tr>

                    <td>
                        ${escapeHtml(sale.id)}
                    </td>

                    <td>
                        ${escapeHtml(sale.customerName)}
                    </td>

                    <td>
                        ${formatMoney(sale.total)}
                    </td>

                </tr>

            `
        ).join("");

}


/* =========================================================
   INVENTORY TABLE
========================================================= */

function renderInventory() {

    const container =
        $("inventoryTable");


    if (products.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="7">
                    No inventory records.
                </td>
            </tr>
        `;

        return;
    }


    container.innerHTML =
        products.map(
            product => {

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
                            ${escapeHtml(product.id)}
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
                            <span
                                class="status-badge ${statusClass}"
                            >
                                ${statusText}
                            </span>
                        </td>

                        <td>

                            <div class="action-buttons">

                                <button
                                    type="button"
                                    class="action-btn edit-btn"
                                    onclick="openProductModal(
                                        '${product.id}'
                                    )"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="action-btn delete-btn"
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

            }
        ).join("");

}


/* =========================================================
   CUSTOMER TABLE
========================================================= */

function renderCustomers() {

    const container =
        $("customersTable");


    if (customers.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="8">
                    No customer records.
                </td>
            </tr>
        `;

        return;
    }


    container.innerHTML =
        customers.map(
            customer => `

                <tr>

                    <td>
                        ${escapeHtml(customer.id)}
                    </td>

                    <td>
                        ${escapeHtml(
                            getFullName(customer)
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
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
                        +${escapeHtml(
                            customer.contact
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            customer.email
                        )}
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                type="button"
                                class="action-btn edit-btn"
                                onclick="openCustomerEdit(
                                    '${customer.id}'
                                )"
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="action-btn delete-btn"
                                onclick="deleteCustomer(
                                    '${customer.id}'
                                )"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `
        ).join("");

}


/* =========================================================
   SALES TABLE
========================================================= */

function renderSales() {

    const container =
        $("salesTable");


    if (sales.length === 0) {

        container.innerHTML = `
            <tr>
                <td colspan="7">
                    No sales records.
                </td>
            </tr>
        `;

        return;
    }


    container.innerHTML =
        [...sales]
            .reverse()
            .map(
                sale => `

                    <tr>

                        <td>
                            ${escapeHtml(sale.id)}
                        </td>

                        <td>
                            ${escapeHtml(sale.date)}
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
                            ${formatMoney(sale.total)}
                        </td>

                        <td>

                            <div class="action-buttons">

                                <button
                                    type="button"
                                    class="action-btn edit-btn"
                                    onclick="openSaleEdit(
                                        '${sale.id}'
                                    )"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="action-btn delete-btn"
                                    onclick="deleteSale(
                                        '${sale.id}'
                                    )"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                `
            ).join("");

}


/* =========================================================
   FORM ERROR HANDLING
========================================================= */

function setFieldError(
    field,
    message
) {

    const group =
        field.closest(".form-group");


    if (!group) return;


    group.classList.add("invalid");

    group.classList.remove("valid");


    const error =
        group.querySelector(
            ".error-message"
        );


    if (error) {

        error.textContent =
            message;

    }

}


function clearFieldError(field) {

    const group =
        field.closest(".form-group");


    if (!group) return;


    group.classList.remove("invalid");


    const error =
        group.querySelector(
            ".error-message"
        );


    if (error) {

        error.textContent = "";

    }

}


function clearFormErrors(form) {

    form.querySelectorAll(
        ".form-group"
    ).forEach(group => {

        group.classList.remove(
            "invalid",
            "valid"
        );

        const error =
            group.querySelector(
                ".error-message"
            );


        if (error) {

            error.textContent = "";

        }

    });

}


/* =========================================================
   UTILITIES
========================================================= */

function generateId(prefix, list) {

    let highest = 0;


    list.forEach(item => {

        const number =
            parseInt(
                String(item.id)
                    .replace(/\D/g, ""),
                10
            );


        if (
            Number.isFinite(number) &&
            number > highest
        ) {

            highest = number;

        }

    });


    return (
        prefix +
        String(highest + 1)
            .padStart(3, "0")
    );

}


function getFullName(customer) {

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


function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function showToast(
    message,
    type = ""
) {

    const toast =
        $("toast");


    toast.textContent =
        message;


    toast.className =
        "toast show " + type;


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(
            () => {

                toast.className =
                    "toast";

            },
            3000
        );

}


/* =========================================================
   EXPOSE FUNCTIONS FOR HTML ONCLICK
========================================================= */

window.addToCart =
    addToCart;

window.changeCartQuantity =
    changeCartQuantity;

window.removeFromCart =
    removeFromCart;

window.openProductModal =
    openProductModal;

window.deleteProduct =
    deleteProduct;

window.openCustomerEdit =
    openCustomerEdit;

window.deleteCustomer =
    deleteCustomer;

window.openSaleEdit =
    openSaleEdit;

window.deleteSale =
    deleteSale;
