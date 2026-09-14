/* =========================================================
   SALES AND INVENTORY SYSTEM
   Marcelino's Fried Itik

   TASK 6 - DATA INPUT VALIDATION
   Fully Functional Front-End System
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DEFAULT DATA
    ====================================================== */

    const defaultProducts = [
        {
            id: "P001",
            name: "Fried Itik Original",
            category: "Food",
            price: 350,
            stock: 25
        },
        {
            id: "P002",
            name: "Fried Itik Spicy",
            category: "Food",
            price: 375,
            stock: 20
        },
        {
            id: "P003",
            name: "Fried Itik Family Pack",
            category: "Food",
            price: 650,
            stock: 15
        },
        {
            id: "P004",
            name: "Itik Special Sauce",
            category: "Sauce",
            price: 120,
            stock: 30
        },
        {
            id: "P005",
            name: "Itik Meal Combo",
            category: "Meal",
            price: 450,
            stock: 18
        }
    ];


    const defaultCustomers = [
        {
            id: "C001",
            name: "Juan Dela Cruz",
            phone: "09171234567",
            email: "juan@gmail.com",
            city: "Oroquieta"
        },
        {
            id: "C002",
            name: "Maria Santos",
            phone: "09281234567",
            email: "maria@gmail.com",
            city: "Ozamis"
        },
        {
            id: "C003",
            name: "Mark Reyes",
            phone: "09391234567",
            email: "mark@gmail.com",
            city: "Tangub"
        },
        {
            id: "C004",
            name: "Anna Garcia",
            phone: "09451234567",
            email: "anna@gmail.com",
            city: "Pagadian"
        },
        {
            id: "C005",
            name: "Pedro Ramos",
            phone: "09561234567",
            email: "pedro@gmail.com",
            city: "Iligan"
        }
    ];


    const defaultSales = [
        {
            id: "S001",
            customerId: "C001",
            productId: "P001",
            quantity: 2,
            total: 700,
            date: "2026-09-01"
        },
        {
            id: "S002",
            customerId: "C002",
            productId: "P002",
            quantity: 1,
            total: 375,
            date: "2026-09-02"
        },
        {
            id: "S003",
            customerId: "C003",
            productId: "P003",
            quantity: 1,
            total: 650,
            date: "2026-09-03"
        },
        {
            id: "S004",
            customerId: "C004",
            productId: "P004",
            quantity: 3,
            total: 360,
            date: "2026-09-04"
        },
        {
            id: "S005",
            customerId: "C005",
            productId: "P005",
            quantity: 2,
            total: 900,
            date: "2026-09-05"
        }
    ];


    /* =====================================================
       LOCAL STORAGE
    ====================================================== */

    let products =
        JSON.parse(
            localStorage.getItem("products")
        ) || defaultProducts;

    let customers =
        JSON.parse(
            localStorage.getItem("customers")
        ) || defaultCustomers;

    let sales =
        JSON.parse(
            localStorage.getItem("sales")
        ) || defaultSales;


    saveAllData();


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
    }


    /* =====================================================
       LOGIN
    ====================================================== */

    const loginPage =
        document.getElementById("loginPage");

    const app =
        document.getElementById("app");

    const loginForm =
        document.getElementById("loginForm");

    const username =
        document.getElementById("username");

    const password =
        document.getElementById("password");

    const loginMessage =
        document.getElementById("loginMessage");


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            clearValidation(username);
            clearValidation(password);

            let valid = true;


            if (
                username.value.trim() === ""
            ) {

                showError(
                    username,
                    "Username is required."
                );

                valid = false;

            }
            else if (
                username.value.trim().length < 3
            ) {

                showError(
                    username,
                    "Username must contain at least 3 characters."
                );

                valid = false;

            }
            else {

                showValid(username);

            }


            if (
                password.value === ""
            ) {

                showError(
                    password,
                    "Password is required."
                );

                valid = false;

            }
            else if (
                password.value.length < 8
            ) {

                showError(
                    password,
                    "Password must contain at least 8 characters."
                );

                valid = false;

            }
            else {

                showValid(password);

            }


            if (!valid) {

                loginMessage.textContent =
                    "Please correct the errors above.";

                loginMessage.style.color =
                    "#dc3545";

                return;
            }


            if (
                username.value.trim() === "admin" &&
                password.value === "admin123"
            ) {

                loginMessage.textContent =
                    "Login successful!";

                loginMessage.style.color =
                    "#198754";


                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                setTimeout(
                    function () {

                        loginPage.classList.add(
                            "hidden"
                        );

                        app.classList.remove(
                            "hidden"
                        );

                        initializeSystem();

                    },
                    500
                );

            }
            else {

                loginMessage.textContent =
                    "Invalid username or password.";

                loginMessage.style.color =
                    "#dc3545";

                password.value = "";

                password.focus();

            }

        }
    );


    /* =====================================================
       LOGOUT
    ====================================================== */

    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "loggedIn"
                );

                app.classList.add(
                    "hidden"
                );

                loginPage.classList.remove(
                    "hidden"
                );

                loginForm.reset();

                clearValidation(username);
                clearValidation(password);

                loginMessage.textContent = "";

            }
        );


    /* =====================================================
       NAVIGATION
    ====================================================== */

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".content-section");

    const pageTitle =
        document.getElementById("pageTitle");


    navItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const sectionName =
                        item.dataset.section;


                    navItems.forEach(
                        function (nav) {

                            nav.classList.remove(
                                "active"
                            );

                        }
                    );


                    item.classList.add(
                        "active"
                    );


                    sections.forEach(
                        function (section) {

                            section.classList.remove(
                                "active-section"
                            );

                        }
                    );


                    document
                        .getElementById(sectionName)
                        .classList.add(
                            "active-section"
                        );


                    const titles = {
                        dashboard: "Dashboard",
                        inventory: "Product Inventory",
                        customers: "Customer Information",
                        sales: "Sales Transactions",
                        validation: "Data Input Validation"
                    };


                    pageTitle.textContent =
                        titles[sectionName];

                }
            );

        }
    );


    /* =====================================================
       DATE
    ====================================================== */

    function updateDate() {

        const dateElement =
            document.getElementById(
                "currentDate"
            );

        const today =
            new Date();


        dateElement.textContent =
            today.toLocaleDateString(
                "en-PH",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );
    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    function initializeSystem() {

        updateDate();

        renderProducts();

        renderCustomers();

        renderSales();

        updateDashboard();

        updateSaleDropdowns();

    }


    /* =====================================================
       PRODUCT FORM
    ====================================================== */

    const showProductForm =
        document.getElementById(
            "showProductForm"
        );

    const productFormContainer =
        document.getElementById(
            "productFormContainer"
        );

    const cancelProduct =
        document.getElementById(
            "cancelProduct"
        );

    const productForm =
        document.getElementById(
            "productForm"
        );


    showProductForm.addEventListener(
        "click",
        function () {

            productFormContainer.classList.toggle(
                "hidden"
            );

        }
    );


    cancelProduct.addEventListener(
        "click",
        function () {

            productForm.reset();

            clearAllValidation(
                productForm
            );

            productFormContainer.classList.add(
                "hidden"
            );

        }
    );


    productForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "productName"
                );

            const category =
                document.getElementById(
                    "productCategory"
                );

            const price =
                document.getElementById(
                    "productPrice"
                );

            const stock =
                document.getElementById(
                    "productStock"
                );


            let valid = true;


            clearAllValidation(
                productForm
            );


            if (
                name.value.trim().length < 3
            ) {

                showError(
                    name,
                    "Product name must contain at least 3 characters."
                );

                valid = false;

            }
            else {

                showValid(name);

            }


            if (
                category.value === ""
            ) {

                showError(
                    category,
                    "Please select a category."
                );

                valid = false;

            }
            else {

                showValid(category);

            }


            if (
                price.value === ""
            ) {

                showError(
                    price,
                    "Price is required."
                );

                valid = false;

            }
            else if (
                Number(price.value) <= 0
            ) {

                showError(
                    price,
                    "Price must be greater than zero."
                );

                valid = false;

            }
            else {

                showValid(price);

            }


            if (
                stock.value === ""
            ) {

                showError(
                    stock,
                    "Stock quantity is required."
                );

                valid = false;

            }
            else if (
                Number(stock.value) < 1
            ) {

                showError(
                    stock,
                    "Stock must be at least 1."
                );

                valid = false;

            }
            else {

                showValid(stock);

            }


            if (!valid) {

                return;
            }


            const newProduct = {

                id: generateId(
                    "P",
                    products
                ),

                name:
                    name.value.trim(),

                category:
                    category.value,

                price:
                    Number(price.value),

                stock:
                    Number(stock.value)

            };


            products.push(
                newProduct
            );


            saveAllData();


            productForm.reset();

            clearAllValidation(
                productForm
            );


            document.getElementById(
                "productSuccess"
            ).textContent =
                "Product added successfully!";


            renderProducts();

            updateDashboard();

            updateSaleDropdowns();


            setTimeout(
                function () {

                    document.getElementById(
                        "productSuccess"
                    ).textContent = "";

                    productFormContainer.classList.add(
                        "hidden"
                    );

                },
                1000
            );

        }
    );


    /* =====================================================
       RENDER PRODUCTS
    ====================================================== */

    function renderProducts(
        search = ""
    ) {

        const table =
            document.getElementById(
                "inventoryTable"
            );


        table.innerHTML = "";


        const filtered =
            products.filter(
                function (product) {

                    return (
                        product.name
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||

                        product.category
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||

                        product.id
                            .toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                    );

                }
            );


        if (filtered.length === 0) {

            table.innerHTML =
                `
                <tr>
                    <td colspan="7"
                        class="empty-row">
                        No products found.
                    </td>
                </tr>
                `;

            return;
        }


        filtered.forEach(
            function (product) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>${product.id}</td>

                    <td>
                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>
                    </td>

                    <td>${product.category}</td>

                    <td>
                        ${formatCurrency(product.price)}
                    </td>

                    <td>${product.stock}</td>

                    <td>
                        ${getStockStatus(product.stock)}
                    </td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteProduct('${product.id}')">

                            Delete

                        </button>

                    </td>
                `;


                table.appendChild(row);

            }
        );

    }


    /* =====================================================
       PRODUCT SEARCH
    ====================================================== */

    document
        .getElementById("productSearch")
        .addEventListener(
            "input",
            function () {

                renderProducts(
                    this.value
                );

            }
        );


    /* =====================================================
       CUSTOMER FORM
    ====================================================== */

    const showCustomerForm =
        document.getElementById(
            "showCustomerForm"
        );

    const customerFormContainer =
        document.getElementById(
            "customerFormContainer"
        );

    const cancelCustomer =
        document.getElementById(
            "cancelCustomer"
        );

    const customerForm =
        document.getElementById(
            "customerForm"
        );


    showCustomerForm.addEventListener(
        "click",
        function () {

            customerFormContainer.classList.toggle(
                "hidden"
            );

        }
    );


    cancelCustomer.addEventListener(
        "click",
        function () {

            customerForm.reset();

            clearAllValidation(
                customerForm
            );

            customerFormContainer.classList.add(
                "hidden"
            );

        }
    );


    customerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                );

            const phone =
                document.getElementById(
                    "customerPhone"
                );

            const email =
                document.getElementById(
                    "customerEmail"
                );

            const city =
                document.getElementById(
                    "customerCity"
                );


            let valid = true;


            clearAllValidation(
                customerForm
            );


            if (
                name.value.trim().length < 3
            ) {

                showError(
                    name,
                    "Customer name must contain at least 3 characters."
                );

                valid = false;

            }
            else {

                showValid(name);

            }


            const phonePattern =
                /^09[0-9]{9}$/;


            if (
                !phonePattern.test(
                    phone.value.trim()
                )
            ) {

                showError(
                    phone,
                    "Enter a valid 11-digit Philippine phone number."
                );

                valid = false;

            }
            else {

                showValid(phone);

            }


            if (
                !email.validity.valid
            ) {

                showError(
                    email,
                    "Enter a valid email address."
                );

                valid = false;

            }
            else {

                showValid(email);

            }


            if (
                city.value === ""
            ) {

                showError(
                    city,
                    "Please select a city."
                );

                valid = false;

            }
            else {

                showValid(city);

            }


            if (!valid) {

                return;
            }


            const newCustomer = {

                id:
                    generateId(
                        "C",
                        customers
                    ),

                name:
                    name.value.trim(),

                phone:
                    phone.value.trim(),

                email:
                    email.value.trim(),

                city:
                    city.value

            };


            customers.push(
                newCustomer
            );


            saveAllData();


            customerForm.reset();

            clearAllValidation(
                customerForm
            );


            document.getElementById(
                "customerSuccess"
            ).textContent =
                "Customer registered successfully!";


            renderCustomers();

            updateDashboard();

            updateSaleDropdowns();


            setTimeout(
                function () {

                    document.getElementById(
                        "customerSuccess"
                    ).textContent = "";

                    customerFormContainer.classList.add(
                        "hidden"
                    );

                },
                1000
            );

        }
    );


    /* =====================================================
       RENDER CUSTOMERS
    ====================================================== */

    function renderCustomers(
        search = ""
    ) {

        const table =
            document.getElementById(
                "customerTable"
            );


        table.innerHTML = "";


        const filtered =
            customers.filter(
                function (customer) {

                    const value =
                        search.toLowerCase();


                    return (

                        customer.name
                            .toLowerCase()
                            .includes(value) ||

                        customer.email
                            .toLowerCase()
                            .includes(value) ||

                        customer.phone
                            .includes(value) ||

                        customer.city
                            .toLowerCase()
                            .includes(value) ||

                        customer.id
                            .toLowerCase()
                            .includes(value)

                    );

                }
            );


        if (filtered.length === 0) {

            table.innerHTML =
                `
                <tr>
                    <td colspan="6"
                        class="empty-row">
                        No customers found.
                    </td>
                </tr>
                `;

            return;
        }


        filtered.forEach(
            function (customer) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>${customer.id}</td>

                    <td>
                        <strong>
                            ${escapeHTML(customer.name)}
                        </strong>
                    </td>

                    <td>${customer.phone}</td>

                    <td>${escapeHTML(customer.email)}</td>

                    <td>${customer.city}</td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteCustomer('${customer.id}')">

                            Delete

                        </button>

                    </td>

                `;


                table.appendChild(row);

            }
        );

    }


    /* =====================================================
       CUSTOMER SEARCH
    ====================================================== */

    document
        .getElementById("customerSearch")
        .addEventListener(
            "input",
            function () {

                renderCustomers(
                    this.value
                );

            }
        );


    /* =====================================================
       SALES FORM
    ====================================================== */

    const showSaleForm =
        document.getElementById(
            "showSaleForm"
        );

    const saleFormContainer =
        document.getElementById(
            "saleFormContainer"
        );

    const cancelSale =
        document.getElementById(
            "cancelSale"
        );

    const saleForm =
        document.getElementById(
            "saleForm"
        );

    const saleCustomer =
        document.getElementById(
            "saleCustomer"
        );

    const saleProduct =
        document.getElementById(
            "saleProduct"
        );

    const saleQuantity =
        document.getElementById(
            "saleQuantity"
        );

    const saleTotal =
        document.getElementById(
            "saleTotal"
        );


    showSaleForm.addEventListener(
        "click",
        function () {

            updateSaleDropdowns();

            saleFormContainer.classList.toggle(
                "hidden"
            );

        }
    );


    cancelSale.addEventListener(
        "click",
        function () {

            saleForm.reset();

            saleQuantity.value = 1;

            saleTotal.value = "₱0.00";

            clearAllValidation(
                saleForm
            );

            saleFormContainer.classList.add(
                "hidden"
            );

        }
    );


    /* =====================================================
       SALE DROPDOWNS
    ====================================================== */

    function updateSaleDropdowns() {

        saleCustomer.innerHTML =
            `
            <option value="">
                Select Customer
            </option>
            `;


        customers.forEach(
            function (customer) {

                saleCustomer.innerHTML +=
                    `
                    <option value="${customer.id}">
                        ${escapeHTML(customer.name)}
                    </option>
                    `;

            }
        );


        saleProduct.innerHTML =
            `
            <option value="">
                Select Product
            </option>
            `;


        products.forEach(
            function (product) {

                if (product.stock > 0) {

                    saleProduct.innerHTML +=
                        `
                        <option value="${product.id}">
                            ${escapeHTML(product.name)}
                            - ${formatCurrency(product.price)}
                            (${product.stock} available)
                        </option>
                        `;

                }

            }
        );


        calculateSaleTotal();

    }


    /* =====================================================
       CALCULATE SALE TOTAL
    ====================================================== */

    saleProduct.addEventListener(
        "change",
        calculateSaleTotal
    );


    saleQuantity.addEventListener(
        "input",
        calculateSaleTotal
    );


    function calculateSaleTotal() {

        const product =
            products.find(
                function (item) {

                    return item.id ===
                        saleProduct.value;

                }
            );


        if (!product) {

            saleTotal.value =
                "₱0.00";

            return;
        }


        const quantity =
            Number(
                saleQuantity.value
            ) || 0;


        const total =
            product.price *
            quantity;


        saleTotal.value =
            formatCurrency(total);

    }


    /* =====================================================
       CREATE SALE
    ====================================================== */

    saleForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            clearAllValidation(
                saleForm
            );


            let valid = true;


            if (
                saleCustomer.value === ""
            ) {

                showError(
                    saleCustomer,
                    "Please select a customer."
                );

                valid = false;

            }
            else {

                showValid(saleCustomer);

            }


            if (
                saleProduct.value === ""
            ) {

                showError(
                    saleProduct,
                    "Please select a product."
                );

                valid = false;

            }
            else {

                showValid(saleProduct);

            }


            const quantity =
                Number(
                    saleQuantity.value
                );


            const product =
                products.find(
                    function (item) {

                        return item.id ===
                            saleProduct.value;

                    }
                );


            if (
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {

                showError(
                    saleQuantity,
                    "Quantity must be at least 1."
                );

                valid = false;

            }
            else if (
                product &&
                quantity > product.stock
            ) {

                showError(
                    saleQuantity,
                    "Not enough stock available."
                );

                valid = false;

            }
            else {

                showValid(
                    saleQuantity
                );

            }


            if (!valid) {

                return;
            }


            const customer =
                customers.find(
                    function (item) {

                        return item.id ===
                            saleCustomer.value;

                    }
                );


            const total =
                product.price *
                quantity;


            const newSale = {

                id:
                    generateId(
                        "S",
                        sales
                    ),

                customerId:
                    customer.id,

                productId:
                    product.id,

                quantity:
                    quantity,

                total:
                    total,

                date:
                    getToday()

            };


            sales.push(
                newSale
            );


            /* ---------------------------------------------
               DEDUCT INVENTORY STOCK
            --------------------------------------------- */

            product.stock -=
                quantity;


            saveAllData();


            saleForm.reset();

            saleQuantity.value = 1;

            saleTotal.value =
                "₱0.00";


            clearAllValidation(
                saleForm
            );


            document.getElementById(
                "saleSuccess"
            ).textContent =
                "Sale completed successfully!";


            renderSales();

            renderProducts();

            updateDashboard();

            updateSaleDropdowns();


            setTimeout(
                function () {

                    document.getElementById(
                        "saleSuccess"
                    ).textContent = "";

                    saleFormContainer.classList.add(
                        "hidden"
                    );

                },
                1000
            );

        }
    );


    /* =====================================================
       RENDER SALES
    ====================================================== */

    function renderSales(
        search = ""
    ) {

        const table =
            document.getElementById(
                "salesTable"
            );


        table.innerHTML = "";


        const filtered =
            sales.filter(
                function (sale) {

                    const customer =
                        customers.find(
                            function (c) {

                                return c.id ===
                                    sale.customerId;

                            }
                        );


                    const product =
                        products.find(
                            function (p) {

                                return p.id ===
                                    sale.productId;

                            }
                        );


                    const customerName =
                        customer
                            ? customer.name
                            : "";


                    const productName =
                        product
                            ? product.name
                            : "";


                    const value =
                        search.toLowerCase();


                    return (

                        sale.id
                            .toLowerCase()
                            .includes(value) ||

                        customerName
                            .toLowerCase()
                            .includes(value) ||

                        productName
                            .toLowerCase()
                            .includes(value)

                    );

                }
            );


        if (filtered.length === 0) {

            table.innerHTML =
                `
                <tr>
                    <td colspan="7"
                        class="empty-row">
                        No sales transactions found.
                    </td>
                </tr>
                `;

            return;
        }


        filtered.forEach(
            function (sale) {

                const customer =
                    customers.find(
                        function (c) {

                            return c.id ===
                                sale.customerId;

                        }
                    );


                const product =
                    products.find(
                        function (p) {

                            return p.id ===
                                sale.productId;

                        }
                    );


                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>${sale.id}</td>

                    <td>
                        ${customer
                            ? escapeHTML(customer.name)
                            : "Unknown"}
                    </td>

                    <td>
                        ${product
                            ? escapeHTML(product.name)
                            : "Unknown"}
                    </td>

                    <td>${sale.quantity}</td>

                    <td>
                        <strong>
                            ${formatCurrency(sale.total)}
                        </strong>
                    </td>

                    <td>${sale.date}</td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteSale('${sale.id}')">

                            Delete

                        </button>

                    </td>

                `;


                table.appendChild(row);

            }
        );

    }


    /* =====================================================
       SALES SEARCH
    ====================================================== */

    document
        .getElementById("saleSearch")
        .addEventListener(
            "input",
            function () {

                renderSales(
                    this.value
                );

            }
        );


    /* =====================================================
       DASHBOARD
    ====================================================== */

    function updateDashboard() {

        document.getElementById(
            "totalProducts"
        ).textContent =
            products.length;


        document.getElementById(
            "totalCustomers"
        ).textContent =
            customers.length;


        document.getElementById(
            "totalSales"
        ).textContent =
            sales.length;


        const revenue =
            sales.reduce(
                function (sum, sale) {

                    return sum +
                        Number(sale.total);

                },
                0
            );


        document.getElementById(
            "totalRevenue"
        ).textContent =
            formatCurrency(revenue);


        renderLowStock();

    }


    /* =====================================================
       LOW STOCK
    ====================================================== */

    function renderLowStock() {

        const table =
            document.getElementById(
                "lowStockTable"
            );


        table.innerHTML = "";


        const lowStock =
            products.filter(
                function (product) {

                    return product.stock <= 10;

                }
            );


        if (lowStock.length === 0) {

            table.innerHTML =
                `
                <tr>
                    <td colspan="4"
                        class="empty-row">

                        All products currently
                        have sufficient stock.

                    </td>
                </tr>
                `;

            return;
        }


        lowStock.forEach(
            function (product) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>${product.id}</td>

                    <td>
                        ${escapeHTML(product.name)}
                    </td>

                    <td>${product.stock}</td>

                    <td>
                        ${getStockStatus(product.stock)}
                    </td>

                `;


                table.appendChild(row);

            }
        );

    }


    /* =====================================================
       DELETE PRODUCT
    ====================================================== */

    window.deleteProduct =
        function (id) {

            const product =
                products.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!product) {
                return;
            }


            const confirmed =
                confirm(
                    "Are you sure you want to delete " +
                    product.name +
                    "?"
                );


            if (!confirmed) {
                return;
            }


            products =
                products.filter(
                    function (item) {

                        return item.id !== id;

                    }
                );


            saveAllData();

            renderProducts();

            updateDashboard();

            updateSaleDropdowns();

        };


    /* =====================================================
       DELETE CUSTOMER
    ====================================================== */

    window.deleteCustomer =
        function (id) {

            const customer =
                customers.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!customer) {
                return;
            }


            const hasSales =
                sales.some(
                    function (sale) {

                        return sale.customerId === id;

                    }
                );


            if (hasSales) {

                alert(
                    "This customer cannot be deleted because " +
                    "there are existing sales transactions."
                );

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to delete " +
                    customer.name +
                    "?"
                );


            if (!confirmed) {
                return;
            }


            customers =
                customers.filter(
                    function (item) {

                        return item.id !== id;

                    }
                );


            saveAllData();

            renderCustomers();

            updateDashboard();

            updateSaleDropdowns();

        };


    /* =====================================================
       DELETE SALE
    ====================================================== */

    window.deleteSale =
        function (id) {

            const sale =
                sales.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!sale) {
                return;
            }


            const confirmed =
                confirm(
                    "Delete this sale and return the " +
                    "quantity to inventory?"
                );


            if (!confirmed) {
                return;
            }


            const product =
                products.find(
                    function (item) {

                        return item.id ===
                            sale.productId;

                    }
                );


            if (product) {

                product.stock +=
                    sale.quantity;

            }


            sales =
                sales.filter(
                    function (item) {

                        return item.id !== id;

                    }
                );


            saveAllData();

            renderSales();

            renderProducts();

            updateDashboard();

            updateSaleDropdowns();

        };


    /* =====================================================
       QUICK NAVIGATION BUTTONS
    ====================================================== */

    document
        .querySelectorAll("[data-go]")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const destination =
                            this.dataset.go;


                        const nav =
                            document.querySelector(
                                `[data-section="${destination}"]`
                            );


                        if (nav) {

                            nav.click();

                        }

                    }
                );

            }
        );


    /* =====================================================
       VALIDATION FUNCTIONS
    ====================================================== */

    function showError(
        input,
        message
    ) {

        input.classList.remove(
            "input-valid"
        );

        input.classList.add(
            "input-error"
        );


        const error =
            document.getElementById(
                input.id + "Error"
            );


        if (error) {

            error.textContent =
                message;

        }

    }


    function showValid(
        input
    ) {

        input.classList.remove(
            "input-error"
        );

        input.classList.add(
            "input-valid"
        );


        const error =
            document.getElementById(
                input.id + "Error"
            );


        if (error) {

            error.textContent = "";

        }

    }


    function clearValidation(
        input
    ) {

        input.classList.remove(
            "input-error"
        );

        input.classList.remove(
            "input-valid"
        );


        const error =
            document.getElementById(
                input.id + "Error"
            );


        if (error) {

            error.textContent = "";

        }

    }


    function clearAllValidation(
        form
    ) {

        form.querySelectorAll(
            "input, select"
        ).forEach(
            function (input) {

                clearValidation(
                    input
                );

            }
        );

    }


    /* =====================================================
       GENERATE ID
    ====================================================== */

    function generateId(
        prefix,
        array
    ) {

        let maxNumber = 0;


        array.forEach(
            function (item) {

                const number =
                    parseInt(
                        item.id.substring(1)
                    );


                if (
                    !isNaN(number) &&
                    number > maxNumber
                ) {

                    maxNumber = number;

                }

            }
        );


        return (
            prefix +
            String(maxNumber + 1)
                .padStart(3, "0")
        );

    }


    /* =====================================================
       CURRENCY
    ====================================================== */

    function formatCurrency(
        amount
    ) {

        return Number(amount).toLocaleString(
            "en-PH",
            {
                style: "currency",
                currency: "PHP"
            }
        );

    }


    /* =====================================================
       STOCK STATUS
    ====================================================== */

    function getStockStatus(
        stock
    ) {

        if (stock === 0) {

            return `
                <span class="status status-out">
                    Out of Stock
                </span>
            `;

        }


        if (stock <= 10) {

            return `
                <span class="status status-low">
                    Low Stock
                </span>
            `;

        }


        return `
            <span class="status status-good">
                Available
            </span>
        `;

    }


    /* =====================================================
       TODAY
    ====================================================== */

    function getToday() {

        const today =
            new Date();


        return today
            .toISOString()
            .split("T")[0];

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(
        value
    ) {

        return String(value)
            .replace(
                /[&<>"']/g,
                function (character) {

                    const entities = {

                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#039;"

                    };

                    return entities[
                        character
                    ];

                }
            );

    }


    /* =====================================================
       AUTO LOGIN CHECK
    ====================================================== */

    if (
        localStorage.getItem(
            "loggedIn"
        ) === "true"
    ) {

        loginPage.classList.add(
            "hidden"
        );

        app.classList.remove(
            "hidden"
        );

        initializeSystem();

    }


    console.log(
        "Sales and Inventory System loaded successfully."
    );

});
