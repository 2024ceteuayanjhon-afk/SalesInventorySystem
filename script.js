/* =========================================================
   SALES AND INVENTORY SYSTEM
   SIGN IN / SIGN UP / USER MANAGEMENT
   ========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           GET AUTHENTICATION ELEMENTS
           ================================================= */

        const loginOverlay =
            document.getElementById(
                "loginOverlay"
            );


        const signInCard =
            document.getElementById(
                "signInCard"
            );


        const signUpCard =
            document.getElementById(
                "signUpCard"
            );


        const showSignUp =
            document.getElementById(
                "showSignUp"
            );


        const showSignIn =
            document.getElementById(
                "showSignIn"
            );


        const loginForm =
            document.getElementById(
                "loginForm"
            );


        const signUpForm =
            document.getElementById(
                "signUpForm"
            );


        const loginUsername =
            document.getElementById(
                "loginUsername"
            );


        const loginPassword =
            document.getElementById(
                "loginPassword"
            );


        const rememberMe =
            document.getElementById(
                "rememberMe"
            );


        const loginMessage =
            document.getElementById(
                "loginMessage"
            );


        const signUpMessage =
            document.getElementById(
                "signUpMessage"
            );


        const mainSystem =
            document.getElementById(
                "mainSystem"
            );


        const footer =
            document.getElementById(
                "footer"
            );


        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );



        /* =================================================
           DEFAULT ADMIN ACCOUNT
           ================================================= */

        const defaultAdmin = {

            id: "U001",

            username: "admin",

            email: "admin@marcelinos.com",

            department: "Management",

            password: "admin123",

            status: "Active",

            rights: [
                "Read",
                "Write",
                "Execute",
                "Admin"
            ],

            expiration:
                "December 31, 2026"

        };



        /* =================================================
           GET REGISTERED USERS
           ================================================= */

        function getUsers() {

            const savedUsers =
                localStorage.getItem(
                    "salesInventoryUsers"
                );


            if (savedUsers) {

                return JSON.parse(
                    savedUsers
                );

            }


            const defaultUsers = [
                defaultAdmin
            ];


            localStorage.setItem(
                "salesInventoryUsers",
                JSON.stringify(
                    defaultUsers
                )
            );


            return defaultUsers;

        }



        /* =================================================
           SAVE USERS
           ================================================= */

        function saveUsers(users) {

            localStorage.setItem(
                "salesInventoryUsers",
                JSON.stringify(users)
            );

        }



        /* =================================================
           SHOW SIGN IN
           ================================================= */

        showSignIn.addEventListener(
            "click",
            function () {

                signUpCard.style.display =
                    "none";

                signInCard.style.display =
                    "block";

                signUpMessage.textContent =
                    "";

                loginMessage.textContent =
                    "";

            }
        );



        /* =================================================
           SHOW SIGN UP
           ================================================= */

        showSignUp.addEventListener(
            "click",
            function () {

                signInCard.style.display =
                    "none";

                signUpCard.style.display =
                    "block";

                loginMessage.textContent =
                    "";

                signUpMessage.textContent =
                    "";

            }
        );



        /* =================================================
           SIGN UP
           ================================================= */

        signUpForm.addEventListener(
            "submit",
            function (event) {


                event.preventDefault();



                /* -----------------------------------------
                   GET FORM VALUES
                   ----------------------------------------- */

                const username =
                    document.getElementById(
                        "signUpUsername"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "signUpEmail"
                    ).value.trim();


                const department =
                    document.getElementById(
                        "signUpDepartment"
                    ).value;


                const password =
                    document.getElementById(
                        "signUpPassword"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                const status =
                    document.getElementById(
                        "signUpStatus"
                    ).value;



                /* -----------------------------------------
                   PASSWORD VALIDATION
                   ----------------------------------------- */

                if (password.length < 6) {

                    signUpMessage.textContent =
                        "Password must contain at least 6 characters.";

                    signUpMessage.style.color =
                        "red";

                    return;

                }


                if (
                    password !==
                    confirmPassword
                ) {

                    signUpMessage.textContent =
                        "Passwords do not match.";

                    signUpMessage.style.color =
                        "red";

                    return;

                }



                /* -----------------------------------------
                   GET EXISTING USERS
                   ----------------------------------------- */

                const users =
                    getUsers();



                /* -----------------------------------------
                   CHECK USERNAME
                   ----------------------------------------- */

                const usernameExists =
                    users.some(
                        function (user) {

                            return (
                                user.username
                                    .toLowerCase() ===
                                username.toLowerCase()
                            );

                        }
                    );


                if (usernameExists) {

                    signUpMessage.textContent =
                        "Username already exists.";

                    signUpMessage.style.color =
                        "red";

                    return;

                }



                /* -----------------------------------------
                   CHECK EMAIL
                   ----------------------------------------- */

                const emailExists =
                    users.some(
                        function (user) {

                            return (
                                user.email
                                    .toLowerCase() ===
                                email.toLowerCase()
                            );

                        }
                    );


                if (emailExists) {

                    signUpMessage.textContent =
                        "Email address is already registered.";

                    signUpMessage.style.color =
                        "red";

                    return;

                }



                /* -----------------------------------------
                   CREATE USER ID
                   ----------------------------------------- */

                const newNumber =
                    users.length + 1;


                const newUserId =
                    "U" +
                    String(newNumber)
                        .padStart(3, "0");



                /* -----------------------------------------
                   CREATE NEW USER
                   ----------------------------------------- */

                const newUser = {

                    id: newUserId,

                    username: username,

                    email: email,

                    department: department,

                    password: password,

                    status: status,

                    rights: [
                        "Read"
                    ],

                    expiration:
                        "December 31, 2026"

                };



                /* -----------------------------------------
                   SAVE USER
                   ----------------------------------------- */

                users.push(
                    newUser
                );


                saveUsers(
                    users
                );



                /* -----------------------------------------
                   SUCCESS MESSAGE
                   ----------------------------------------- */

                signUpMessage.textContent =
                    "Account created successfully!";

                signUpMessage.style.color =
                    "green";



                /* -----------------------------------------
                   CLEAR FORM
                   ----------------------------------------- */

                signUpForm.reset();



                /* -----------------------------------------
                   MOVE TO SIGN IN
                   ----------------------------------------- */

                setTimeout(
                    function () {

                        signUpCard.style.display =
                            "none";

                        signInCard.style.display =
                            "block";


                        loginUsername.value =
                            username;


                        loginMessage.textContent =
                            "Account created. Please sign in.";

                        loginMessage.style.color =
                            "green";

                    },
                    1000
                );

            }
        );



        /* =================================================
           SIGN IN
           ================================================= */

        loginForm.addEventListener(
            "submit",
            function (event) {


                event.preventDefault();



                const enteredUsername =
                    loginUsername.value.trim();


                const enteredPassword =
                    loginPassword.value;



                /* -----------------------------------------
                   GET USERS
                   ----------------------------------------- */

                const users =
                    getUsers();



                /* -----------------------------------------
                   FIND USER
                   ----------------------------------------- */

                const foundUser =
                    users.find(
                        function (user) {

                            return (

                                (
                                    user.username
                                        .toLowerCase() ===
                                    enteredUsername
                                        .toLowerCase()
                                )

                                ||

                                (
                                    user.email
                                        .toLowerCase() ===
                                    enteredUsername
                                        .toLowerCase()
                                )

                            );

                        }
                    );



                /* -----------------------------------------
                   USER NOT FOUND
                   ----------------------------------------- */

                if (!foundUser) {

                    loginMessage.textContent =
                        "Username or email does not exist.";

                    loginMessage.style.color =
                        "red";

                    return;

                }



                /* -----------------------------------------
                   CHECK PASSWORD
                   ----------------------------------------- */

                if (
                    foundUser.password !==
                    enteredPassword
                ) {

                    loginMessage.textContent =
                        "Incorrect password.";

                    loginMessage.style.color =
                        "red";

                    loginPassword.value =
                        "";

                    loginPassword.focus();

                    return;

                }



                /* -----------------------------------------
                   CHECK ACCOUNT STATUS
                   ----------------------------------------- */

                if (
                    foundUser.status !==
                    "Active"
                ) {

                    loginMessage.textContent =
                        "This account is not active.";

                    loginMessage.style.color =
                        "red";

                    return;

                }



                /* -----------------------------------------
                   SUCCESS
                   ----------------------------------------- */

                loginMessage.textContent =
                    "Login successful!";

                loginMessage.style.color =
                    "green";



                /* -----------------------------------------
                   REMEMBER ME
                   ----------------------------------------- */

                if (
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "rememberedUser",
                        foundUser.username
                    );

                }

                else {

                    localStorage.removeItem(
                        "rememberedUser"
                    );

                }



                /* -----------------------------------------
                   SAVE CURRENT USER
                   ----------------------------------------- */

                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify(
                        foundUser
                    )
                );



                /* -----------------------------------------
                   OPEN DASHBOARD
                   ----------------------------------------- */

                setTimeout(
                    function () {

                        loginOverlay.style.display =
                            "none";

                        mainSystem.style.display =
                            "block";

                        footer.style.display =
                            "block";

                        updateUserCount();

                        window.scrollTo(
                            0,
                            0
                        );

                    },
                    600
                );

            }
        );



        /* =================================================
           REMEMBERED USER
           ================================================= */

        const rememberedUser =
            localStorage.getItem(
                "rememberedUser"
            );


        if (rememberedUser) {

            loginUsername.value =
                rememberedUser;

            rememberMe.checked =
                true;

        }



        /* =================================================
           LOGOUT
           ================================================= */

        logoutBtn.addEventListener(
            "click",
            function () {


                sessionStorage.removeItem(
                    "currentUser"
                );


                mainSystem.style.display =
                    "none";


                footer.style.display =
                    "none";


                loginOverlay.style.display =
                    "flex";


                signInCard.style.display =
                    "block";


                signUpCard.style.display =
                    "none";


                loginPassword.value =
                    "";


                loginMessage.textContent =
                    "";


                window.scrollTo(
                    0,
                    0
                );

            }
        );



        /* =================================================
           FORM 1 - ADD USER
           ================================================= */

        const addUserForm =
            document.getElementById(
                "addUserForm"
            );


        const userMessage =
            document.getElementById(
                "userMessage"
            );


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


                const password =
                    document.getElementById(
                        "initialPassword"
                    ).value;


                const status =
                    document.getElementById(
                        "userStatus"
                    ).value;



                if (
                    username === "" ||
                    email === "" ||
                    department === "" ||
                    password === "" ||
                    status === ""
                ) {

                    userMessage.textContent =
                        "Please complete all required fields.";

                    userMessage.style.color =
                        "red";

                    return;

                }



                const users =
                    getUsers();



                const exists =
                    users.some(
                        function (user) {

                            return (
                                user.username
                                    .toLowerCase() ===
                                username.toLowerCase()
                            );

                        }
                    );


                if (exists) {

                    userMessage.textContent =
                        "Username already exists.";

                    userMessage.style.color =
                        "red";

                    return;

                }



                const newUser = {

                    id:
                        "U" +
                        String(
                            users.length + 1
                        ).padStart(3, "0"),

                    username:
                        username,

                    email:
                        email,

                    department:
                        department,

                    password:
                        password,

                    status:
                        status,

                    rights:
                        ["Read"],

                    expiration:
                        "December 31, 2026"

                };



                users.push(
                    newUser
                );


                saveUsers(
                    users
                );


                userMessage.textContent =
                    "User " +
                    username +
                    " added successfully.";

                userMessage.style.color =
                    "green";


                addUserForm.reset();


                updateUserCount();

            }
        );



        /* =================================================
           FORM 2 - ACCESS ASSIGNMENT
           ================================================= */

        const accessForm =
            document.getElementById(
                "accessForm"
            );


        const accessMessage =
            document.getElementById(
                "accessMessage"
            );


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


                const selectedRights = [];


                const rights =
                    document.querySelectorAll(
                        'input[name="accessRights"]:checked'
                    );


                rights.forEach(
                    function (right) {

                        selectedRights.push(
                            right.value
                        );

                    }
                );



                if (userId === "") {

                    accessMessage.textContent =
                        "Please select a User ID.";

                    accessMessage.style.color =
                        "red";

                    return;

                }


                if (
                    selectedRights.length === 0
                ) {

                    accessMessage.textContent =
                        "Please select at least one access right.";

                    accessMessage.style.color =
                        "red";

                    return;

                }


                if (
                    expirationDate === ""
                ) {

                    accessMessage.textContent =
                        "Please select an expiration date.";

                    accessMessage.style.color =
                        "red";

                    return;

                }



                /* UPDATE USER ACCESS */

                const users =
                    getUsers();


                const user =
                    users.find(
                        function (item) {

                            return (
                                item.id ===
                                userId
                            );

                        }
                    );


                if (user) {

                    user.rights =
                        selectedRights;

                    user.expiration =
                        expirationDate;

                    saveUsers(
                        users
                    );

                }



                accessMessage.textContent =
                    "Access successfully assigned to " +
                    userId +
                    ".";

                accessMessage.style.color =
                    "green";


                accessForm.reset();

            }
        );



        /* =================================================
           EXPIRATION DATE
           ================================================= */

        const expirationDate =
            document.getElementById(
                "expirationDate"
            );


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        expirationDate.min =
            today;



        /* =================================================
           UPDATE USER COUNT
           ================================================= */

        function updateUserCount() {

            const users =
                getUsers();


            const totalUsers =
                document.getElementById(
                    "totalUsers"
                );


            if (totalUsers) {

                totalUsers.textContent =
                    users.length;

            }

        }


        updateUserCount();



        /* =================================================
           CONSOLE
           ================================================= */

        console.log(
            "Sales and Inventory System Loaded Successfully"
        );


    }
);



/* =========================================================
   EDIT USER
   ========================================================= */

function editUser(userId) {

    alert(

        "EDIT USER ACCESS\n\n" +

        "User ID: " +
        userId +

        "\n\n" +

        "The user access information can be updated " +
        "using the Role & Access Assignment form."

    );

}



/* =========================================================
   DELETE USER
   ========================================================= */

function deleteUser(userId) {


    if (
        userId === "U001"
    ) {

        alert(
            "The main admin account cannot be deleted."
        );

        return;

    }



    const confirmation =
        confirm(

            "Are you sure you want to delete User " +
            userId +
            "?"

        );


    if (!confirmation) {

        return;

    }



    const savedUsers =
        localStorage.getItem(
            "salesInventoryUsers"
        );


    if (!savedUsers) {

        return;

    }


    let users =
        JSON.parse(
            savedUsers
        );


    users =
        users.filter(
            function (user) {

                return (
                    user.id !==
                    userId
                );

            }
        );


    localStorage.setItem(
        "salesInventoryUsers",
        JSON.stringify(
            users
        )
    );


    alert(
        "User " +
        userId +
        " has been deleted."
    );


    location.reload();

}
