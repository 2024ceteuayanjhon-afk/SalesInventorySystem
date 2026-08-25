/* =========================
   SALES AND INVENTORY SYSTEM
   ========================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       GET ELEMENTS
       ========================= */

    const loginOverlay =
        document.getElementById("loginOverlay");

    const loginForm =
        document.getElementById("loginForm");

    const loginUsername =
        document.getElementById("loginUsername");

    const loginPassword =
        document.getElementById("loginPassword");

    const rememberMe =
        document.getElementById("rememberMe");

    const loginMessage =
        document.getElementById("loginMessage");

    const mainSystem =
        document.getElementById("mainSystem");

    const footer =
        document.getElementById("footer");

    const logoutBtn =
        document.getElementById("logoutBtn");


    /* =========================
       CHECK REMEMBERED USER
       ========================= */

    const rememberedUser =
        localStorage.getItem("rememberedUser");


    if (rememberedUser) {

        loginUsername.value = rememberedUser;

        rememberMe.checked = true;

    }


    /* =========================
       SYSTEM LOGIN
       FORM 3
       ========================= */

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const enteredUsername =
                loginUsername.value.trim();

            const enteredPassword =
                loginPassword.value;


            /*
             * DEMO LOGIN ACCOUNT
             *
             * Username: admin
             * Password: admin123
             */

            const correctUsername =
                "admin";

            const correctPassword =
                "admin123";


            /* =========================
               VALIDATE LOGIN
               ========================= */

            if (
                enteredUsername === correctUsername &&
                enteredPassword === correctPassword
            ) {

                loginMessage.textContent =
                    "Login successful!";

                loginMessage.style.color =
                    "green";


                /* =========================
                   REMEMBER ME
                   ========================= */

                if (rememberMe.checked) {

                    localStorage.setItem(
                        "rememberedUser",
                        enteredUsername
                    );

                } else {

                    localStorage.removeItem(
                        "rememberedUser"
                    );

                }


                /* =========================
                   OPEN SYSTEM
                   ========================= */

                setTimeout(function () {

                    loginOverlay.style.display =
                        "none";

                    mainSystem.style.display =
                        "block";

                    footer.style.display =
                        "block";

                    window.scrollTo(
                        0,
                        0
                    );

                }, 500);


            } else {

                loginMessage.textContent =
                    "Invalid username or password.";

                loginMessage.style.color =
                    "red";

                loginPassword.value = "";

                loginPassword.focus();

            }

        }
    );


    /* =========================
       LOGOUT
       ========================= */

    logoutBtn.addEventListener(
        "click",
        function () {

            mainSystem.style.display =
                "none";

            footer.style.display =
                "none";

            loginOverlay.style.display =
                "flex";

            loginPassword.value = "";

            loginMessage.textContent = "";

            window.scrollTo(
                0,
                0
            );

        }
    );


    /* =========================
       FORM 1 — ADD USER
       ========================= */

    const addUserForm =
        document.getElementById("addUserForm");

    const userMessage =
        document.getElementById("userMessage");


    addUserForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "username"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const department =
                document.getElementById(
                    "department"
                ).value;

            const initialPassword =
                document.getElementById(
                    "initialPassword"
                ).value;

            const status =
                document.getElementById(
                    "userStatus"
                ).value;


            /* =========================
               VALIDATION
               ========================= */

            if (
                username === "" ||
                email === "" ||
                department === "" ||
                initialPassword === "" ||
                status === ""
            ) {

                userMessage.textContent =
                    "Please complete all required fields.";

                userMessage.style.color =
                    "red";

                return;

            }


            /* =========================
               SUCCESS
               ========================= */

            userMessage.textContent =
                "User '" +
                username +
                "' added successfully.";

            userMessage.style.color =
                "green";


            /* =========================
               RESET FORM
               ========================= */

            addUserForm.reset();

        }
    );


    /* =========================
       FORM 2 — ACCESS ASSIGNMENT
       ========================= */

    const accessForm =
        document.getElementById("accessForm");

    const accessMessage =
        document.getElementById("accessMessage");


    accessForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const userId =
                document.getElementById(
                    "userId"
                ).value;

            const expirationDate =
                document.getElementById(
                    "expirationDate"
                ).value;


            /* =========================
               GET CHECKED RIGHTS
               ========================= */

            const selectedRights = [];


            const rights =
                document.querySelectorAll(
                    'input[name="accessRights"]:checked'
                );


            rights.forEach(function (right) {

                selectedRights.push(
                    right.value
                );

            });


            /* =========================
               VALIDATION
               ========================= */

            if (userId === "") {

                accessMessage.textContent =
                    "Please select a User ID.";

                accessMessage.style.color =
                    "red";

                return;

            }


            if (selectedRights.length === 0) {

                accessMessage.textContent =
                    "Please select at least one access right.";

                accessMessage.style.color =
                    "red";

                return;

            }


            if (expirationDate === "") {

                accessMessage.textContent =
                    "Please select an expiration date.";

                accessMessage.style.color =
                    "red";

                return;

            }


            /* =========================
               SUCCESS MESSAGE
               ========================= */

            accessMessage.textContent =
                "Access assigned to " +
                userId +
                ": " +
                selectedRights.join(", ") +
                ".";


            accessMessage.style.color =
                "green";


            /* =========================
               RESET FORM
               ========================= */

            accessForm.reset();

        }
    );


    /* =========================
       PREVENT OLD DATE
       ========================= */

    const expirationDate =
        document.getElementById(
            "expirationDate"
        );


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    expirationDate.min = today;


    /* =========================
       CONSOLE MESSAGE
       ========================= */

    console.log(
        "Sales and Inventory System Loaded Successfully"
    );

});
