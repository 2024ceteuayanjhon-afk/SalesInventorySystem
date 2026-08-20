/* =========================
   SALES AND INVENTORY SYSTEM
   LOGIN SCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // GET HTML ELEMENTS
    // =========================

    const loginBtn = document.getElementById("loginBtn");

    const loginForm = document.getElementById("loginForm");

    const submitLogin = document.getElementById("submitLogin");

    const username = document.getElementById("username");

    const password = document.getElementById("password");

    const loginMessage = document.getElementById("loginMessage");

    const loginOverlay = document.getElementById("loginOverlay");

    const mainSystem = document.getElementById("mainSystem");

    const footer = document.getElementById("footer");


    // =========================
    // LOGIN BUTTON
    // =========================

    loginBtn.addEventListener("click", function () {

        // Hide original Login button
        loginBtn.style.display = "none";

        // Show login form
        loginForm.style.display = "block";

        // Put cursor inside username
        username.focus();

    });


    // =========================
    // LOGIN FUNCTION
    // =========================

    function login() {

        const enteredUsername = username.value.trim();

        const enteredPassword = password.value;


        // =========================
        // LOGIN DETAILS
        // =========================

        const correctUsername = "admin";

        const correctPassword = "admin123";


        // =========================
        // CHECK USERNAME/PASSWORD
        // =========================

        if (
            enteredUsername === correctUsername &&
            enteredPassword === correctPassword
        ) {

            // Successful login message
            loginMessage.textContent = "Login successful!";

            loginMessage.style.color = "green";


            // Small delay so user can see success message
            setTimeout(function () {

                // Hide login screen
                loginOverlay.style.display = "none";

                // Show main system
                mainSystem.style.display = "block";

                // Show footer
                footer.style.display = "block";

            }, 500);


        } else {

            // Wrong login details
            loginMessage.textContent =
                "Invalid username or password.";

            loginMessage.style.color = "red";


            // Clear password
            password.value = "";

            // Put cursor back into password
            password.focus();

        }

    }


    // =========================
    // SIGN IN BUTTON
    // =========================

    submitLogin.addEventListener("click", function () {

        login();

    });


    // =========================
    // ENTER KEY LOGIN
    // =========================

    username.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            password.focus();

        }

    });


    password.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            login();

        }

    });


    // =========================
    // CONSOLE MESSAGE
    // =========================

    console.log(
        "Sales and Inventory System Loaded Successfully"
    );

});
