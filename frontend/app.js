// ================================
// HOME PAGE
// ================================

const loginBoxes = document.querySelectorAll(".login-box");

loginBoxes.forEach(box => {
    box.addEventListener("click", function (event) {
        event.preventDefault();
        const target = this.getAttribute("href");
        let direction;
        if (target === "/frontend/html/student_login.html") {
            direction = "right";
        }
        else if (target === "/frontend/html/mentor_login.html") {
            direction = "up";
        }
        else if (target === "/frontend/html/hiring_login.html") {
            direction = "left";
        }

        // Remember direction for the Back button
        sessionStorage.setItem("transitionDirection", direction);

        // Play exit animation
        document.body.classList.add(`exit-${direction}`);

        // Navigate after animation finishes
        setTimeout(() => {
            window.location.href = target;
        }, 600);
    });
});

// ================================
// BACK BUTTON
// ================================

window.addEventListener("pageshow", function () {
    const direction = sessionStorage.getItem("transitionDirection");
    if (!direction) {
        return;
    }
    // Only animate when returning to the home page
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "index.html" || currentPage === "") {
        document.body.classList.add(`back-${direction}`);
        sessionStorage.removeItem("transitionDirection");
    }
});

// ================================
// LOGIN / SIGN UP
// ================================

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

if (loginTab && signupTab && loginForm && signupForm) {
    loginTab.addEventListener("click", function() {
        loginForm.hidden = false;
        signupForm.hidden = true;

        loginTab.classList.add("active");
        signupTab.classList.remove("active");
    });

    signupTab.addEventListener("click", function() {
        loginForm.hidden = true;
        signupForm.hidden = false;

        signupTab.classList.add("active");
        loginTab.classList.remove("active");
    });
}

//Sudent home page

document.addEventListener("DOMContentLoaded", function() {
    const dashboardOptions = document.querySelectorAll(".dashboard-option");
    const dashboardSections = document.querySelectorAll(".dashboard-section");

    dashboardOptions.forEach(function(option) {
        option.addEventListener("click", function() {
            const selectedSection = option.getAttribute("data-section");

            dashboardOptions.forEach(function(button) {
                button.classList.remove("active");
            });

            dashboardSections.forEach(function(section) {
                section.hidden = true;
            });

            option.classList.add("active");

            const sectionToShow = document.getElementById(selectedSection);

            if (sectionToShow) {
                sectionToShow.hidden = false;
            }
        });
    });
});

const internshipSearch = document.getElementById("internshipSearch");
const internshipCards = document.querySelectorAll(".internship-card");

if (internshipSearch) {
    internshipSearch.addEventListener("input", function() {
        const searchTerm = internshipSearch.value.toLowerCase().trim();

        internshipCards.forEach(function(card) {
            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchTerm)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}