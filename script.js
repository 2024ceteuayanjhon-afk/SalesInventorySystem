/* =========================================================
   SALES AND INVENTORY SYSTEM
   Marcelino's Fried Itik
   Developed by Jhon Mark C. Uayan
========================================================= */

"use strict";


/* =========================================================
   INITIAL DATA
========================================================= */

const defaultProducts = [
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


const defaultCustomers = [
    {
        id: "C001",
        name: "Juan Dela Cruz",
        phone: "09171234567",
        email: "juan@gmail.com",
        city: "Oroquieta",
        address: "Poblacion, Oroquieta City"
    },

    {
        id: "C002",
        name: "Maria Santos",
        phone: "09281234567",
        email: "maria@gmail.com",
        city: "Ozamis",
        address: "Aguada, Ozamis City"
    },

    {
        id: "C003",
        name: "Mark Reyes",
        phone: "09391234567",
        email: "mark@gmail.com",
        city: "Tangub",
        address: "Manga, Tangub City"
    },

    {
        id: "C004",
        name: "Anna Garcia",
        phone: "09451234567",
        email: "anna@gmail.com",
        city: "Pagadian",
        address: "San Francisco, Pagadian City"
    },

    {
        id: "C005",
        name: "Pedro Ramos",
        phone: "09561234567",
        email: "pedro@gmail.com",
        city: "Iligan",
        address: "Pala-o, Iligan City"
    }
];


const defaultSales = [
    {
        id: "S001",
        customer: "Juan Dela Cruz",
        product: "Fried Itik Original",
        quantity: 2,
        total: 700,
        payment: "Cash on Delivery",
        date: "2026-09-14"
    },

    {
        id: "S002",
        customer: "Maria Santos",
        product: "Fried Itik Spicy",
        quantity: 1,
        total: 375,
        payment: "GCash",
        date: "2026-09-14"
    },

    {
        id: "S003",
        customer: "Mark Reyes",
        product: "Fried Itik Family Pack",
        quantity: 1,
        total: 650,
        payment: "Cash on Delivery",
        date: "2026-09-14"
    },

    {
        id: "S004",
        customer: "Anna Garcia",
        product: "Itik Special Sauce",
        quantity: 3,
        total: 360,
        payment: "GCash",
        date: "2026-09-14"
    },

    {
        id: "S005",
        customer: "Pedro Ramos",
        product: "Itik Meal Combo",
        quantity: 2,
        total: 900,
        payment: "Cash on Delivery",
        date: "2026-09-14"
    }
];


/* =========================================================
   LOAD DATA FROM LOCAL STORAGE
========================================================= */

let products =
    JSON.parse(localStorage.getItem("products")) ||
    structuredClone(defaultProducts);

let customers =
    JSON.parse(localStorage.getItem("customers")) ||
    structuredClone(defaultCustomers);

let sales =
    JSON.parse(localStorage.getItem("sales")) ||
    structuredClone(defaultSales);

let customerAccounts =
    JSON.parse(localStorage.getItem("customerAccounts")) || [];

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || null;


/* =========================================================
   SAVE DATA
========================================================= */

function saveAllData() {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

    localStorage.setItem(
        "customerAccounts",
        JSON.stringify(customerAccounts)
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeAuthentication();

    renderMenu();

    renderCustomers();

    renderInventory();

    renderSales();

    renderDashboard();

    renderCart();

    setupForms();

    updateUserInterface();

});


/* =========================================================
   AUTHENTICATION
========================================================= */

function initializeAuthentication() {

    const adminForm =
        document.getElementById("adminLoginForm");

    const customerForm =
        document.getElementById("customerLoginForm");

    const signupForm =
        document.getElementById("customerSignupForm");


    adminForm.addEventListener(
        "submit",
        handleAdminLogin
    );

    customerForm.addEventListener(
        "submit",
        handleCustomerLogin
    );

    signupForm.addEventListener(
        "submit",
        handleCustomerSignup
    );
}


/* =========================================================
   AUTH FORM SWITCHING
========================================================= */

function showAuthForm(type) {

    const adminForm =
        document.getElementById("adminLoginForm");

    const customerForm =
        document.getElementById("customerLoginForm");

    const signupForm =
        document.getElementById("customerSignupForm");

    const adminTab =
        document.getElementById("adminTab");

    const customerTab =
        document.getElementById("customerTab");


    adminForm.classList.add("hidden");

    customerForm.classList.add("hidden");

    signupForm.classList.add("hidden");

    adminTab.classList.remove("active");

    customerTab.classList.remove("active");


    if (type === "admin") {

        adminForm.classList.remove("hidden");

        adminTab.classList.add("active");

    }

    else if (type === "customer") {

        customerForm.classList.remove("hidden");

        customerTab.classList.add("active");

    }

    else if (type === "signup") {

        signupForm.classList.remove("hidden");

        customerTab.classList.add("active");

    }
}


/* =========================================================
   ADMIN LOGIN
========================================================= */

function handleAdminLogin(event) {

    event.preventDefault();

    const username =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    const message =
        document.getElementById("adminLoginMessage");


    if (!username) {

        showAuthMessage(
            message,
            "Please enter your username.",
            "error"
        );

        return;
    }


    if (!password) {

        showAuthMessage(
            message,
            "Please enter your password.",
            "error"
        );

        return;
    }


    /*
       DEMO ADMIN ACCOUNT
       Username: admin
       Password: admin123
    */

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        currentUser = {
            role: "admin",
            name: "Administrator",
            email: "admin@marcelinosfrieditik.com"
        };

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        enterSystem();

    }

    else {

        showAuthMessage(
            message,
            "Invalid admin username or password.",
            "error"
        );

    }
}


/* =========================================================
   CUSTOMER LOGIN
========================================================= */

function handleCustomerLogin(event) {

    event.preventDefault();

    const email =
        document.getElementById("customerLoginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("customerLoginPassword")
            .value;

    const message =
        document.getElementById("customerLoginMessage");


    if (!email || !password) {

        showAuthMessage(
            message,
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    const account =
        customerAccounts.find(
            acc =>
                acc.email.toLowerCase() === email &&
                acc.password === password
        );


    if (!account) {

        showAuthMessage(
            message,
            "Account not found or password is incorrect.",
            "error"
        );

        return;
    }


    currentUser = {
        role: "customer",
        name: account.name,
        email: account.email,
        customerId: account.customerId
    };


    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );


    enterSystem();
}


/* =========================================================
   CUSTOMER SIGN UP
========================================================= */

function handleCustomerSignup(event) {

    event.preventDefault();


    const name =
        document.getElementById("signupName")
            .value
            .trim();

    const email =
        document.getElementById("signupEmail")
            .value
            .trim()
            .toLowerCase();

    const phone =
        document.getElementById("signupPhone")
            .value
            .trim();

    const city =
        document.getElementById("signupCity")
            .value;

    const address =
        document.getElementById("signupAddress")
            .value
            .trim();

    const password =
        document.getElementById("signupPassword")
            .value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword")
            .value;

    const message =
        document.getElementById("signupMessage");


    clearFormValidation(
        document.getElementById("customerSignupForm")
    );


    let valid = true;


    if (name.length < 3) {

        showFieldError(
            "signupName",
            "Please enter at least 3 characters."
        );

        valid = false;

    }


    if (!validateEmail(email)) {

        showFieldError(
            "signupEmail",
            "Please enter a valid email address."
        );

        valid = false;

    }


    if (!/^09\d{9}$/.test(phone)) {

        showFieldError(
            "signupPhone",
            "Use a valid 11-digit mobile number starting with 09."
        );

        valid = false;

    }


    if (!city) {

        showFieldError(
            "signupCity",
            "Please select your city."
        );

        valid = false;

    }


    if (address.length < 10) {

        showFieldError(
            "signupAddress",
            "Address must contain at least 10 characters."
        );

        valid = false;

    }


    if (password.length < 8) {

        showFieldError(
            "signupPassword",
            "Password must be at least 8 characters."
        );

        valid = false;

    }


    if (password !== confirmPassword) {

        showFieldError(
            "signupConfirmPassword",
            "Passwords do not match."
        );

        valid = false;

    }


    const existingAccount =
        customerAccounts.find(
            acc =>
                acc.email.toLowerCase() === email
        );


    if (existingAccount) {

        showFieldError(
            "signupEmail",
            "An account with this email already exists."
        );

        valid = false;

    }


    if (!valid) {

        showAuthMessage(
            message,
            "Please correct the highlighted fields.",
            "error"
        );

        return;
    }


    const customerId =
        generateCustomerId();


    const newAccount = {

        id:
            "A" +
            Date.now(),

        customerId:
            customerId,

        name:
            name,

        email:
            email,

        phone:
            phone,

        password:
            password

    };


    const newCustomer = {

        id:
            customerId,

        name:
            name,

        phone:
            phone,

        email:
            email,

        city:
            city,

        address:
            address

    };


    customerAccounts.push(newAccount);

    customers.push(newCustomer);


    saveAllData();

    renderCustomers();

    renderDashboard();


    showAuthMessage(
        message,
        "Account created successfully! You can now sign in.",
        "success"
    );


    document.getElementById(
        "customerSignupForm"
    ).reset();


    setTimeout(function () {

        showAuthForm("customer");

        document.getElementById(
            "customerLoginEmail"
        ).value = email;

    }, 1200);
}


/* =========================================================
   ENTER SYSTEM
========================================================= */

function enterSystem() {

    document
        .getElementById("authPage")
        .classList.add("hidden");

    document
        .getElementById("mainSystem")
        .classList.remove("hidden");


    updateUserInterface();

    renderDashboard();

    renderMenu();

    renderCart();
}


/* =========================================================
   UPDATE USER INTERFACE
========================================================= */

function updateUserInterface() {

    const display =
        document.getElementById(
            "currentUserDisplay"
        );


    if (!currentUser) {

        display.textContent =
            "Administrator";

        return;
    }


    display.textContent =
        currentUser.role === "admin"
            ? "Admin: " + currentUser.name
            : "Customer: " + currentUser.name;


    const adminOnly =
        document.querySelectorAll(".admin-only");


    adminOnly.forEach(element => {

        if (currentUser.role === "admin") {

            element.style.display = "";

        }

        else {

            element.style.display = "none";

        }

    });


    /*
       Customers can still order.
       Customers cannot manage system records.
    */

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    if (
        !confirm(
            "Are you sure you want to logout?"
        )
    ) {

        return;

    }


    currentUser = null;

    localStorage.removeItem(
        "currentUser"
    );


    document
        .getElementById("mainSystem")
        .classList.add("hidden");

    document
        .getElementById("authPage")
        .classList.remove("hidden");


    document
        .getElementById("adminLoginForm")
        .reset();

    document
        .getElementById("customerLoginForm")
        .reset();


    showAuthForm("admin");
}


/* =========================================================
   PASSWORD
========================================================= */

function togglePassword(id) {

    const input =
        document.getElementById(id);

    input.type =
        input.type === "password"
            ? "text"
            : "password";
}


/* =========================================================
   NAVIGATION
========================================================= */

function showSection(sectionId, button) {

    document
        .querySelectorAll(".content-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const target =
        document.getElementById(sectionId);


    if (!target) {

        return;

    }


    target.classList.add(
        "active-section"
    );


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showSectionById(sectionId) {

    const button =
        document.querySelector(
            `.nav-btn[onclick*="'${sectionId}'"]`
        );

    showSection(
        sectionId,
        button
    );
}


function openMenuFromDashboard() {

    showSectionById("menu");

}


/* =========================================================
   MENU
========================================================= */

function renderMenu() {

    const container =
        document.getElementById(
            "menuContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "menu-card";


        const outOfStock =
            product.stock <= 0;


        card.innerHTML = `

            <div class="menu-image">
                ${escapeHtml(product.icon || "🍗")}
            </div>

            <div class="menu-body">

                <span class="menu-category">
                    ${escapeHtml(product.category)}
                </span>

                <h3>
                    ${escapeHtml(product.name)}
                </h3>

                <div class="menu-price">
                    ${formatMoney(product.price)}
                </div>

                <div class="
                    menu-stock
                    ${outOfStock ? "out-stock" : ""}
                ">

                    ${
                        outOfStock
                            ? "Out of Stock"
                            : "Available Stock: " +
                              product.stock
                    }

                </div>

                <button
                    class="primary-btn full-btn"
                    ${
                        outOfStock
                            ? "disabled"
                            : ""
                    }
                    onclick="addToCart('${product.id}')">

                    ${
                        outOfStock
                            ? "Out of Stock"
                            : "Add to Cart"
                    }

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) {
        return;
    }


    if (product.stock <= 0) {

        alert(
            "This product is currently out of stock."
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

            alert(
                "You cannot add more than the available stock."
            );

            return;
        }


        existing.quantity++;

    }

    else {

        cart.push({

            productId:
                productId,

            quantity:
                1

        });

    }


    saveAllData();

    renderCart();

    updateCartBadge();

}


function increaseQuantity(productId) {

    const item =
        cart.find(
            item =>
                item.productId === productId
        );

    const product =
        products.find(
            p =>
                p.id === productId
        );


    if (!item || !product) {
        return;
    }


    if (
        item.quantity >=
        product.stock
    ) {

        alert(
            "Maximum available stock reached."
        );

        return;
    }


    item.quantity++;

    saveAllData();

    renderCart();

}


function decreaseQuantity(productId) {

    const item =
        cart.find(
            item =>
                item.productId === productId
        );


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.productId !==
                    productId
            );

    }


    saveAllData();

    renderCart();

}


function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.productId !==
                productId
        );


    saveAllData();

    renderCart();

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    const summary =
        document.getElementById(
            "cartSummary"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products from the menu
                    to start your order.
                </p>

                <br>

                <button
                    class="primary-btn"
                    onclick="showSectionById('menu')">
                    Browse Menu
                </button>

            </div>

        `;


        summary.classList.add("hidden");

        updateCartBadge();

        return;
    }


    summary.classList.remove(
        "hidden"
    );


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p.id === item.productId
            );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price *
            item.quantity;


        const div =
            document.createElement("div");

        div.className =
            "cart-item";


        div.innerHTML = `

            <div class="cart-icon">
                ${escapeHtml(product.icon)}
            </div>

            <div>
                <h3>
                    ${escapeHtml(product.name)}
                </h3>

                <p>
                    ${formatMoney(product.price)}
                    each
                </p>
            </div>

            <div class="quantity-controls">

                <button
                    class="quantity-btn"
                    onclick="
                        decreaseQuantity(
                            '${product.id}'
                        )
                    ">
                    −
                </button>

                <span class="quantity-number">
                    ${item.quantity}
                </span>

                <button
                    class="quantity-btn"
                    onclick="
                        increaseQuantity(
                            '${product.id}'
                        )
                    ">
                    +
                </button>

            </div>

            <div class="cart-item-price">
                ${formatMoney(itemTotal)}
            </div>

            <button
                class="danger-btn"
                onclick="
                    removeFromCart(
                        '${product.id}'
                    )
                ">
                Remove
            </button>

        `;


        container.appendChild(div);

    });


    updateCartTotals();

    updateCartBadge();

}


function calculateCartTotal() {

    return cart.reduce(
        (total, item) => {

            const product =
                products.find(
                    p =>
                        p.id ===
                        item.productId
                );


            if (!product) {
                return total;
            }


            return total +
                product.price *
                item.quantity;

        },

        0
    );
}


function calculateCartItems() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,

        0
    );
}


function updateCartTotals() {

    const count =
        calculateCartItems();

    const total =
        calculateCartTotal();


    document.getElementById(
        "cartItemCount"
    ).textContent = count;


    document.getElementById(
        "cartSubtotal"
    ).textContent =
        formatMoney(total);


    document.getElementById(
        "cartTotal"
    ).textContent =
        formatMoney(total);

}


function updateCartBadge() {

    const badge =
        document.getElementById(
            "cartBadge"
        );


    if (!badge) {
        return;
    }


    badge.textContent =
        calculateCartItems();

}


/* =========================================================
   CHECKOUT
========================================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const customer =
        currentUser &&
        currentUser.role === "customer"
            ? customers.find(
                c =>
                    c.id ===
                    currentUser.customerId
            )
            : null;


    if (customer) {

        document.getElementById(
            "customerName"
        ).value =
            customer.name;

        document.getElementById(
            "customerPhone"
        ).value =
            customer.phone;

        document.getElementById(
            "customerEmail"
        ).value =
            customer.email;

        document.getElementById(
            "customerCity"
        ).value =
            customer.city;

        document.getElementById(
            "customerAddress"
        ).value =
            customer.address;

    }


    renderCheckoutSummary();


    showSectionById(
        "checkout"
    );

}


function renderCheckoutSummary() {

    const container =
        document.getElementById(
            "checkoutSummary"
        );


    container.innerHTML = "";


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p.id ===
                    item.productId
            );


        if (!product) {
            return;
        }


        const total =
            product.price *
            item.quantity;


        const row =
            document.createElement("div");

        row.className =
            "order-preview-item";


        row.innerHTML = `

            <span>
                ${escapeHtml(product.name)}
                × ${item.quantity}
            </span>

            <strong>
                ${formatMoney(total)}
            </strong>

        `;


        container.appendChild(row);

    });


    const total =
        calculateCartTotal();


    const totalDiv =
        document.createElement("div");


    totalDiv.className =
        "order-preview-total";


    totalDiv.innerHTML = `

        <span>Total</span>

        <strong>
            ${formatMoney(total)}
        </strong>

    `;


    container.appendChild(
        totalDiv
    );

}


/* =========================================================
   CHECKOUT FORM
========================================================= */

function setupForms() {

    document
        .getElementById(
            "checkoutForm"
        )
        .addEventListener(
            "submit",
            processOrder
        );


    document
        .getElementById(
            "customerForm"
        )
        .addEventListener(
            "submit",
            saveCustomer
        );


    document
        .getElementById(
            "productForm"
        )
        .addEventListener(
            "submit",
            saveProduct
        );


    document
        .getElementById(
            "saleForm"
        )
        .addEventListener(
            "submit",
            saveSale
        );

}


function processOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "customerName"
        ).value.trim();

    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();

    const email =
        document.getElementById(
            "customerEmail"
        ).value.trim();

    const city =
        document.getElementById(
            "customerCity"
        ).value;

    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();

    const payment =
        document.getElementById(
            "paymentMethod"
        ).value;


    const message =
        document.getElementById(
            "checkoutMessage"
        );


    clearCheckoutValidation();


    let valid = true;


    if (name.length < 3) {

        showCheckoutError(
            "customerName",
            "Please enter a valid name."
        );

        valid = false;

    }


    if (!/^09\d{9}$/.test(phone)) {

        showCheckoutError(
            "customerPhone",
            "Enter a valid 11-digit mobile number."
        );

        valid = false;

    }


    if (!validateEmail(email)) {

        showCheckoutError(
            "customerEmail",
            "Enter a valid email address."
        );

        valid = false;

    }


    if (!city) {

        showCheckoutError(
            "customerCity",
            "Please select a city."
        );

        valid = false;

    }


    if (address.length < 10) {

        showCheckoutError(
            "customerAddress",
            "Address must be at least 10 characters."
        );

        valid = false;

    }


    if (!payment) {

        showCheckoutError(
            "paymentMethod",
            "Please select a payment method."
        );

        valid = false;

    }


    if (!valid) {

        showAuthMessage(
            message,
            "Please correct the highlighted fields.",
            "error"
        );

        return;
    }


    /*
       Check stock before processing.
    */

    for (const item of cart) {

        const product =
            products.find(
                p =>
                    p.id ===
                    item.productId
            );


        if (
            !product ||
            item.quantity >
            product.stock
        ) {

            showAuthMessage(
                message,
                "Some products no longer have enough stock.",
                "error"
            );

            renderMenu();

            return;
        }

    }


    /*
       Find existing customer.
    */

    let customer =
        customers.find(
            c =>
                c.email.toLowerCase() ===
                email.toLowerCase()
        );


    /*
       If customer does not exist,
       create a customer record.
    */

    if (!customer) {

        customer = {

            id:
                generateCustomerId(),

            name:
                name,

            phone:
                phone,

            email:
                email,

            city:
                city,

            address:
                address

        };


        customers.push(
            customer
        );

    }

    else {

        /*
           Update customer's information.
        */

        customer.name =
            name;

        customer.phone =
            phone;

        customer.city =
            city;

        customer.address =
            address;

    }


    /*
       If customer is logged in,
       update current customer account.
    */

    if (
        currentUser &&
        currentUser.role === "customer"
    ) {

        currentUser.name =
            name;

        currentUser.customerId =
            customer.id;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

    }


    /*
       Create sales records.
    */

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    cart.forEach(item => {

        const product =
            products.find(
                p =>
                    p.id ===
                    item.productId
            );


        if (!product) {
            return;
        }


        const total =
            product.price *
            item.quantity;


        sales.push({

            id:
                generateSaleId(),

            customer:
                customer.name,

            product:
                product.name,

            quantity:
                item.quantity,

            total:
                total,

            payment:
                payment,

            date:
                today

        });


        /*
           Reduce inventory.
        */

        product.stock -=
            item.quantity;

    });


    const orderNumber =
        "ORD-" +
        Date.now();


    /*
       Clear cart.
    */

    cart = [];


    saveAllData();


    /*
       Refresh interface.
    */

    renderMenu();

    renderCart();

    renderCustomers();

    renderInventory();

    renderSales();

    renderDashboard();

    updateUserInterface();


    /*
       Reset checkout.
    */

    document
        .getElementById(
            "checkoutForm"
        )
        .reset();


    /*
       Show success message.
    */

    document.getElementById(
        "successMessage"
    ).textContent =
        `Order ${orderNumber} has been successfully recorded. Thank you for ordering from Marcelino's Fried Itik!`;


    document
        .getElementById(
            "successModal"
        )
        .classList.add("show");


    showSectionById(
        "dashboard"
    );

}


/* =========================================================
   CUSTOMER CRUD
========================================================= */

function renderCustomers() {

    const tbody =
        document.getElementById(
            "customerTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    customers.forEach(customer => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${escapeHtml(customer.id)}
                </strong>
            </td>

            <td>
                ${escapeHtml(customer.name)}
            </td>

            <td>
                ${escapeHtml(customer.phone)}
            </td>

            <td>
                ${escapeHtml(customer.email)}
            </td>

            <td>
                ${escapeHtml(customer.city)}
            </td>

            <td>
                ${escapeHtml(customer.address)}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        onclick="
                            editCustomer(
                                '${customer.id}'
                            )
                        ">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="
                            deleteCustomer(
                                '${customer.id}'
                            )
                        ">
                        Delete
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   ADD CUSTOMER MODAL
========================================================= */

function openCustomerModal() {

    document.getElementById(
        "customerModalTitle"
    ).textContent =
        "Add Customer";


    document.getElementById(
        "customerForm"
    ).reset();


    document.getElementById(
        "editCustomerId"
    ).value = "";


    document.getElementById(
        "customerModal"
    ).classList.add("show");

}


/* =========================================================
   EDIT CUSTOMER
========================================================= */

function editCustomer(id) {

    const customer =
        customers.find(
            c =>
                c.id === id
        );


    if (!customer) {
        return;
    }


    document.getElementById(
        "customerModalTitle"
    ).textContent =
        "Edit Customer";


    document.getElementById(
        "editCustomerId"
    ).value =
        customer.id;


    document.getElementById(
        "modalCustomerName"
    ).value =
        customer.name;


    document.getElementById(
        "modalCustomerPhone"
    ).value =
        customer.phone;


    document.getElementById(
        "modalCustomerEmail"
    ).value =
        customer.email;


    document.getElementById(
        "modalCustomerCity"
    ).value =
        customer.city;


    document.getElementById(
        "modalCustomerAddress"
    ).value =
        customer.address;


    document.getElementById(
        "customerModal"
    ).classList.add("show");

}


/* =========================================================
   SAVE CUSTOMER
========================================================= */

function saveCustomer(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editCustomerId"
        ).value;


    const name =
        document.getElementById(
            "modalCustomerName"
        ).value.trim();

    const phone =
        document.getElementById(
            "modalCustomerPhone"
        ).value.trim();

    const email =
        document.getElementById(
            "modalCustomerEmail"
        ).value.trim()
        .toLowerCase();

    const city =
        document.getElementById(
            "modalCustomerCity"
        ).value;

    const address =
        document.getElementById(
            "modalCustomerAddress"
        ).value.trim();


    let valid = true;


    clearFormValidation(
        document.getElementById(
            "customerForm"
        )
    );


    if (name.length < 3) {

        showFieldError(
            "modalCustomerName",
            "Name must contain at least 3 characters."
        );

        valid = false;

    }


    if (!/^09\d{9}$/.test(phone)) {

        showFieldError(
            "modalCustomerPhone",
            "Enter a valid mobile number."
        );

        valid = false;

    }


    if (!validateEmail(email)) {

        showFieldError(
            "modalCustomerEmail",
            "Enter a valid email address."
        );

        valid = false;

    }


    if (!city) {

        showFieldError(
            "modalCustomerCity",
            "Please select a city."
        );

        valid = false;

    }


    if (address.length < 10) {

        showFieldError(
            "modalCustomerAddress",
            "Address must be at least 10 characters."
        );

        valid = false;

    }


    /*
       Prevent duplicate emails.
    */

    const duplicate =
        customers.find(
            c =>
                c.email.toLowerCase() === email &&
                c.id !== id
        );


    if (duplicate) {

        showFieldError(
            "modalCustomerEmail",
            "Another customer already uses this email."
        );

        valid = false;

    }


    if (!valid) {
        return;
    }


    if (id) {

        /*
           UPDATE
        */

        const customer =
            customers.find(
                c =>
                    c.id === id
            );


        if (customer) {

            customer.name =
                name;

            customer.phone =
                phone;

            customer.email =
                email;

            customer.city =
                city;

            customer.address =
                address;

        }


        /*
           Update account information
           if this customer has an account.
        */

        const account =
            customerAccounts.find(
                a =>
                    a.customerId === id
            );


        if (account) {

            account.name =
                name;

            account.email =
                email;

            account.phone =
                phone;

        }


        /*
           Update related sales.
        */

        sales.forEach(sale => {

            if (
                sale.customer ===
                customer.name
            ) {

                sale.customer =
                    name;

            }

        });

        alert(
            "Customer record updated successfully."
        );

    }

    else {

        /*
           INSERT
        */

        const newCustomer = {

            id:
                generateCustomerId(),

            name:
                name,

            phone:
                phone,

            email:
                email,

            city:
                city,

            address:
                address

        };


        customers.push(
            newCustomer
        );


        alert(
            "Customer added successfully."
        );

    }


    saveAllData();

    renderCustomers();

    renderSales();

    renderDashboard();

    closeModal(
        "customerModal"
    );

}


/* =========================================================
   DELETE CUSTOMER
========================================================= */

function deleteCustomer(id) {

    const customer =
        customers.find(
            c =>
                c.id === id
        );


    if (!customer) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to permanently delete ${customer.name}?`
        );


    if (!confirmed) {
        return;
    }


    customers =
        customers.filter(
            c =>
                c.id !== id
        );


    /*
       Remove account associated
       with customer.
    */

    customerAccounts =
        customerAccounts.filter(
            account =>
                account.customerId !== id
        );


    saveAllData();

    renderCustomers();

    renderDashboard();


    alert(
        "Customer record deleted successfully."
    );

}


/* =========================================================
   INVENTORY CRUD
========================================================= */

function renderInventory() {

    const tbody =
        document.getElementById(
            "inventoryTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    products.forEach(product => {

        let statusClass =
            "status-good";

        let statusText =
            "In Stock";


        if (product.stock === 0) {

            statusClass =
                "status-out";

            statusText =
                "Out of Stock";

        }

        else if (product.stock <= 5) {

            statusClass =
                "status-low";

            statusText =
                "Low Stock";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

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
                        class="action-btn edit-btn"
                        onclick="
                            editProduct(
                                '${product.id}'
                            )
                        ">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="
                            deleteProduct(
                                '${product.id}'
                            )
                        ">
                        Delete
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   ADD PRODUCT
========================================================= */

function openProductModal() {

    document.getElementById(
        "productModalTitle"
    ).textContent =
        "Add Product";


    document.getElementById(
        "productForm"
    ).reset();


    document.getElementById(
        "editProductId"
    ).value = "";


    document.getElementById(
        "productModal"
    ).classList.add("show");

}


/* =========================================================
   EDIT PRODUCT
========================================================= */

function editProduct(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) {
        return;
    }


    document.getElementById(
        "productModalTitle"
    ).textContent =
        "Edit Product";


    document.getElementById(
        "editProductId"
    ).value =
        product.id;


    document.getElementById(
        "modalProductName"
    ).value =
        product.name;


    document.getElementById(
        "modalProductCategory"
    ).value =
        product.category;


    document.getElementById(
        "modalProductPrice"
    ).value =
        product.price;


    document.getElementById(
        "modalProductStock"
    ).value =
        product.stock;


    document.getElementById(
        "modalProductIcon"
    ).value =
        product.icon;


    document.getElementById(
        "productModal"
    ).classList.add("show");

}


/* =========================================================
   SAVE PRODUCT
========================================================= */

function saveProduct(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editProductId"
        ).value;


    const name =
        document.getElementById(
            "modalProductName"
        ).value.trim();

    const category =
        document.getElementById(
            "modalProductCategory"
        ).value.trim();

    const price =
        Number(
            document.getElementById(
                "modalProductPrice"
            ).value
        );

    const stock =
        Number(
            document.getElementById(
                "modalProductStock"
            ).value
        );

    const icon =
        document.getElementById(
            "modalProductIcon"
        ).value.trim() ||
        "🍗";


    let valid = true;


    clearFormValidation(
        document.getElementById(
            "productForm"
        )
    );


    if (name.length < 3) {

        showFieldError(
            "modalProductName",
            "Product name must contain at least 3 characters."
        );

        valid = false;

    }


    if (category.length < 3) {

        showFieldError(
            "modalProductCategory",
            "Category is required."
        );

        valid = false;

    }


    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        showFieldError(
            "modalProductPrice",
            "Price must be greater than zero."
        );

        valid = false;

    }


    if (
        !Number.isInteger(stock) ||
        stock < 0
    ) {

        showFieldError(
            "modalProductStock",
            "Stock cannot be negative."
        );

        valid = false;

    }


    if (!valid) {
        return;
    }


    if (id) {

        /*
           UPDATE PRODUCT
        */

        const product =
            products.find(
                p =>
                    p.id === id
            );


        if (product) {

            product.name =
                name;

            product.category =
                category;

            product.price =
                price;

            product.stock =
                stock;

            product.icon =
                icon;

        }


        alert(
            "Product updated successfully."
        );

    }

    else {

        /*
           INSERT PRODUCT
        */

        const newProduct = {

            id:
                generateProductId(),

            name:
                name,

            category:
                category,

            price:
                price,

            stock:
                stock,

            icon:
                icon

        };


        products.push(
            newProduct
        );


        alert(
            "Product added successfully."
        );

    }


    saveAllData();

    renderProductsAfterChange();

    closeModal(
        "productModal"
    );

}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(id) {

    const product =
        products.find(
            p =>
                p.id === id
        );


    if (!product) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to permanently delete ${product.name}?`
        );


    if (!confirmed) {
        return;
    }


    /*
       Check if product is in cart.
    */

    const cartItem =
        cart.find(
            item =>
                item.productId === id
        );


    if (cartItem) {

        alert(
            "This product is currently in the cart. Remove it from the cart first."
        );

        return;
    }


    products =
        products.filter(
            p =>
                p.id !== id
        );


    saveAllData();

    renderProductsAfterChange();


    alert(
        "Product deleted successfully."
    );

}


function renderProductsAfterChange() {

    renderMenu();

    renderInventory();

    renderDashboard();

}


/* =========================================================
   SALES CRUD
========================================================= */

function renderSales() {

    const tbody =
        document.getElementById(
            "salesTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    sales.forEach(sale => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${escapeHtml(sale.id)}
                </strong>
            </td>

            <td>
                ${escapeHtml(sale.customer)}
            </td>

            <td>
                ${escapeHtml(sale.product)}
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
                ${escapeHtml(sale.payment)}
            </td>

            <td>
                ${escapeHtml(sale.date)}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        onclick="
                            editSale(
                                '${sale.id}'
                            )
                        ">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="
                            deleteSale(
                                '${sale.id}'
                            )
                        ">
                        Delete
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   EDIT SALE
========================================================= */

function editSale(id) {

    const sale =
        sales.find(
            s =>
                s.id === id
        );


    if (!sale) {
        return;
    }


    document.getElementById(
        "editSaleId"
    ).value =
        sale.id;


    document.getElementById(
        "modalSaleCustomer"
    ).value =
        sale.customer;


    document.getElementById(
        "modalSaleProduct"
    ).value =
        sale.product;


    document.getElementById(
        "modalSaleQuantity"
    ).value =
        sale.quantity;


    document.getElementById(
        "modalSaleTotal"
    ).value =
        sale.total;


    document.getElementById(
        "modalSalePayment"
    ).value =
        sale.payment;


    document.getElementById(
        "saleModal"
    ).classList.add("show");

}


/* =========================================================
   UPDATE SALE
========================================================= */

function saveSale(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "editSaleId"
        ).value;


    const customer =
        document.getElementById(
            "modalSaleCustomer"
        ).value.trim();

    const product =
        document.getElementById(
            "modalSaleProduct"
        ).value.trim();

    const quantity =
        Number(
            document.getElementById(
                "modalSaleQuantity"
            ).value
        );

    const total =
        Number(
            document.getElementById(
                "modalSaleTotal"
            ).value
        );

    const payment =
        document.getElementById(
            "modalSalePayment"
        ).value;


    if (
        customer.length < 3 ||
        !product ||
        quantity < 1 ||
        total < 0 ||
        !payment
    ) {

        alert(
            "Please enter valid sales information."
        );

        return;
    }


    const sale =
        sales.find(
            s =>
                s.id === id
        );


    if (!sale) {
        return;
    }


    sale.customer =
        customer;

    sale.product =
        product;

    sale.quantity =
        quantity;

    sale.total =
        total;

    sale.payment =
        payment;


    saveAllData();

    renderSales();

    renderDashboard();

    closeModal(
        "saleModal"
    );


    alert(
        "Sales record updated successfully."
    );

}


/* =========================================================
   DELETE SALE
========================================================= */

function deleteSale(id) {

    const sale =
        sales.find(
            s =>
                s.id === id
        );


    if (!sale) {
        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to permanently delete sales record ${sale.id}?`
        );


    if (!confirmed) {
        return;
    }


    sales =
        sales.filter(
            s =>
                s.id !== id
        );


    saveAllData();

    renderSales();

    renderDashboard();


    alert(
        "Sales record deleted successfully."
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const productCount =
        document.getElementById(
            "dashboardProducts"
        );

    const customerCount =
        document.getElementById(
            "dashboardCustomers"
        );

    const orderCount =
        document.getElementById(
            "dashboardOrders"
        );

    const totalSales =
        document.getElementById(
            "dashboardSales"
        );


    if (!productCount) {
        return;
    }


    productCount.textContent =
        products.length;


    customerCount.textContent =
        customers.length;


    orderCount.textContent =
        sales.length;


    const total =
        sales.reduce(
            (sum, sale) =>
                sum +
                Number(sale.total || 0),

            0
        );


    totalSales.textContent =
        formatMoney(total);

}


/* =========================================================
   VALIDATION FUNCTIONS
========================================================= */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


function showFieldError(
    fieldId,
    message
) {

    const field =
        document.getElementById(
            fieldId
        );


    if (!field) {
        return;
    }


    field.classList.add(
        "input-error"
    );


    const error =
        document.getElementById(
            fieldId + "Error"
        );


    if (error) {

        error.textContent =
            message;

    }

}


function clearFormValidation(form) {

    form
        .querySelectorAll(
            "input, select, textarea"
        )
        .forEach(field => {

            field.classList.remove(
                "input-error"
            );

            field.classList.remove(
                "input-valid"
            );

        });


    form
        .querySelectorAll(
            ".error-message"
        )
        .forEach(error => {

            error.textContent = "";

        });

}


function clearCheckoutValidation() {

    const form =
        document.getElementById(
            "checkoutForm"
        );


    clearFormValidation(form);

}


function showCheckoutError(
    fieldId,
    message
) {

    showFieldError(
        fieldId,
        message
    );

}


function showAuthMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        "auth-message " +
        type;

}


/* =========================================================
   MODALS
========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/*
   Close modal if user clicks
   outside modal content.
*/

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   ID GENERATORS
========================================================= */

function generateCustomerId() {

    let number =
        customers.length + 1;


    let id =
        "C" +
        String(number)
            .padStart(3, "0");


    while (
        customers.some(
            customer =>
                customer.id === id
        )
    ) {

        number++;

        id =
            "C" +
            String(number)
                .padStart(3, "0");

    }


    return id;
}


function generateProductId() {

    let number =
        products.length + 1;


    let id =
        "P" +
        String(number)
            .padStart(3, "0");


    while (
        products.some(
            product =>
                product.id === id
        )
    ) {

        number++;

        id =
            "P" +
            String(number)
                .padStart(3, "0");

    }


    return id;
}


function generateSaleId() {

    let number =
        sales.length + 1;


    let id =
        "S" +
        String(number)
            .padStart(3, "0");


    while (
        sales.some(
            sale =>
                sale.id === id
        )
    ) {

        number++;

        id =
            "S" +
            String(number)
                .padStart(3, "0");

    }


    return id;
}


/* =========================================================
   MONEY FORMAT
========================================================= */

function formatMoney(amount) {

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP"
        }
    ).format(
        Number(amount) || 0
    );

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHtml(value) {

    return String(value)
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
   AUTO LOGIN IF SESSION EXISTS
========================================================= */

if (currentUser) {

    window.addEventListener(
        "load",
        function () {

            enterSystem();

        }
    );

}
