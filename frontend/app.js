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