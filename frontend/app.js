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

document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       Dashboard Navigation
    ========================== */

    const dashboardOptions = document.querySelectorAll(".dashboard-option");
    const dashboardSections = document.querySelectorAll(".dashboard-section");

    dashboardOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const targetSectionId = option.dataset.section;

            dashboardOptions.forEach((item) => {
                item.classList.remove("active");
            });

            dashboardSections.forEach((section) => {
                section.hidden = true;
            });

            option.classList.add("active");

            const targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                targetSection.hidden = false;
            }
        });
    });


    /* =========================
       Internship Search and Filter
    ========================== */

    const internshipSearch = document.getElementById("internshipSearch");
    const internshipType = document.getElementById("internshipType");
    const internshipCards = document.querySelectorAll(".internship-card");

    function filterInternships() {
        const searchValue = internshipSearch.value.toLowerCase().trim();
        const selectedType = internshipType.value.toLowerCase();

        internshipCards.forEach((card) => {
            const cardText = card.textContent.toLowerCase();
            const cardType = card.dataset.type.toLowerCase();

            const matchesSearch = cardText.includes(searchValue);
            const matchesType =
                selectedType === "all" || cardType === selectedType;

            card.style.display =
                matchesSearch && matchesType ? "flex" : "none";
        });
    }

    internshipSearch.addEventListener("input", filterInternships);
    internshipType.addEventListener("change", filterInternships);


    /* =========================
       Internship Apply Buttons
    ========================== */

    const applyButtons = document.querySelectorAll(".apply-button");

    applyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".internship-card");

            if (!card) return;

            const isApplied = card.classList.toggle("applied");

            button.textContent = isApplied ? "APPLIED" : "APPLY";
        });
    });


    /* =========================
       Modal References
    ========================== */

    const communityModal = document.getElementById("communityModal");
    const mentorModal = document.getElementById("mentorModal");

    const closeCommunityModalButton = document.getElementById(
        "closeCommunityModal"
    );

    const closeMentorModalButton = document.getElementById(
        "closeMentorModal"
    );

    const connectCommunityButton = document.getElementById(
        "connectCommunityButton"
    );

    const connectMentorButton = document.getElementById(
        "connectMentorButton"
    );


    /* =========================
       Modal Functions
    ========================== */

    function closeAllModals() {
        communityModal.hidden = true;
        mentorModal.hidden = true;

        document.body.classList.remove("modal-open");
    }

    function openCommunityModal() {
        closeAllModals();

        communityModal.hidden = false;
        document.body.classList.add("modal-open");
    }

    function openMentorModal() {
        closeAllModals();

        mentorModal.hidden = false;
        document.body.classList.add("modal-open");
    }


    /* =========================
       Community Data
    ========================== */

    const communityData = {
        "all-discussions": {
            category: "COMMUNITY",
            title: "All Discussions",
            description:
                "Explore conversations, questions, project ideas, and opportunities shared by students.",
            members: "1,250+ members",
            activity: "Active daily",
            topics: [
                "Project collaboration",
                "Internship opportunities",
                "Technical questions",
                "Career guidance"
            ]
        },

        "web-development": {
            category: "TECHNICAL COMMUNITY",
            title: "Web Development",
            description:
                "A community for students interested in frontend, backend, full-stack development, and modern web technologies.",
            members: "420+ members",
            activity: "Active every day",
            topics: [
                "HTML, CSS, and JavaScript",
                "React and frontend frameworks",
                "Backend development",
                "Full-stack projects"
            ]
        },

        "python-backend": {
            category: "TECHNICAL COMMUNITY",
            title: "Python & Backend",
            description:
                "Discuss Python, Flask, APIs, databases, automation, and backend development projects.",
            members: "310+ members",
            activity: "Active weekly",
            topics: [
                "Python programming",
                "Flask and Django",
                "REST APIs",
                "SQLite and databases"
            ]
        },

        "design-creativity": {
            category: "CREATIVE COMMUNITY",
            title: "Design & Creativity",
            description:
                "A space for students exploring graphic design, branding, UI concepts, visual storytelling, and creative technology.",
            members: "275+ members",
            activity: "Active weekly",
            topics: [
                "Graphic design",
                "Branding and identity",
                "Creative portfolios",
                "Design feedback"
            ]
        },

        hackathons: {
            category: "PROJECT COMMUNITY",
            title: "Hackathons",
            description:
                "Find teammates, discuss ideas, share resources, and prepare for upcoming hackathons.",
            members: "530+ members",
            activity: "Highly active",
            topics: [
                "Hackathon announcements",
                "Team formation",
                "Project ideation",
                "Technical implementation"
            ]
        },

        "career-internships": {
            category: "CAREER COMMUNITY",
            title: "Career Community",
            description:
                "Share internship leads, resume advice, interview preparation tips, and early-career opportunities.",
            members: "680+ members",
            activity: "Active daily",
            topics: [
                "Internship opportunities",
                "Resume reviews",
                "Interview preparation",
                "Career planning"
            ]
        }
    };


    /* =========================
       Community Modal Elements
    ========================== */

    const communityLinks = document.querySelectorAll(".community-link");

    const modalCommunityCategory = document.getElementById(
        "modalCommunityCategory"
    );

    const modalCommunityTitle = document.getElementById(
        "modalCommunityTitle"
    );

    const modalCommunityDescription = document.getElementById(
        "modalCommunityDescription"
    );

    const modalCommunityMembers = document.getElementById(
        "modalCommunityMembers"
    );

    const modalCommunityActivity = document.getElementById(
        "modalCommunityActivity"
    );

    const modalCommunityTopics = document.getElementById(
        "modalCommunityTopics"
    );


    /* =========================
       Community Modal Events
    ========================== */

    communityLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const communityId = link.dataset.community;
            const data = communityData[communityId];

            if (!data) return;

            communityLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            modalCommunityCategory.textContent = data.category;
            modalCommunityTitle.textContent = data.title;
            modalCommunityDescription.textContent = data.description;
            modalCommunityMembers.textContent = data.members;
            modalCommunityActivity.textContent = data.activity;

            modalCommunityTopics.innerHTML = "";

            data.topics.forEach((topic) => {
                const listItem = document.createElement("li");
                listItem.textContent = topic;
                modalCommunityTopics.appendChild(listItem);
            });

            connectCommunityButton.textContent = "CONNECT";
            connectCommunityButton.classList.remove("connected");

            openCommunityModal();
        });
    });


    /* =========================
       Mentor Search and Filter
    ========================== */

    const mentorSearch = document.getElementById("mentorSearch");
    const mentorCategory = document.getElementById("mentorCategory");
    const mentorCards = document.querySelectorAll(".mentor-card");

    function filterMentors() {
        const searchValue = mentorSearch.value.toLowerCase().trim();
        const selectedCategory = mentorCategory.value.toLowerCase();

        mentorCards.forEach((card) => {
            const name = card.dataset.name.toLowerCase();
            const skills = card.dataset.skills.toLowerCase();
            const category = card.dataset.category.toLowerCase();

            const matchesSearch =
                name.includes(searchValue) ||
                skills.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            card.style.display =
                matchesSearch && matchesCategory ? "flex" : "none";
        });
    }

    mentorSearch.addEventListener("input", filterMentors);
    mentorCategory.addEventListener("change", filterMentors);


    /* =========================
       Mentor Data
    ========================== */

    const mentorData = {
        "Rahul Sharma": {
            avatar: "RS",
            category: "MENTOR",
            name: "Rahul Sharma",
            role: "Frontend Developer",
            description:
                "Helps students understand frontend development, portfolio building, and technical interview preparation.",
            experience: "5+ years in frontend development",
            availability: "Weekends",
            skills: [
                "HTML and CSS",
                "JavaScript",
                "React",
                "Portfolio development"
            ]
        },

        "Meera Nair": {
            avatar: "MN",
            category: "MENTOR",
            name: "Meera Nair",
            role: "Backend Engineer",
            description:
                "Guides students through backend development, APIs, databases, and practical software projects.",
            experience: "4+ years in backend engineering",
            availability: "Evenings",
            skills: [
                "Python",
                "Flask",
                "REST APIs",
                "SQL and databases"
            ]
        },

        "Aditya Menon": {
            avatar: "AM",
            category: "MENTOR",
            name: "Aditya Menon",
            role: "Product and Design Mentor",
            description:
                "Supports students working on creative projects, product ideas, branding, and presentation quality.",
            experience: "6+ years in product and design",
            availability: "By appointment",
            skills: [
                "Product thinking",
                "Graphic design",
                "Branding",
                "Project presentation"
            ]
        }
    };


    /* =========================
       Mentor Modal Elements
    ========================== */

    const modalMentorAvatar = document.getElementById("modalMentorAvatar");
    const modalMentorCategory = document.getElementById("modalMentorCategory");
    const modalMentorTitle = document.getElementById("modalMentorTitle");
    const modalMentorRole = document.getElementById("modalMentorRole");

    const modalMentorDescription = document.getElementById(
        "modalMentorDescription"
    );

    const modalMentorExperience = document.getElementById(
        "modalMentorExperience"
    );

    const modalMentorAvailability = document.getElementById(
        "modalMentorAvailability"
    );

    const modalMentorSkills = document.getElementById("modalMentorSkills");


    /* =========================
       Mentor Modal Events
    ========================== */

    mentorCards.forEach((card) => {
        const mentorButton = card.querySelector(".mentor-button");

        function showMentorModal() {
            const mentorName = card.dataset.name;
            const data = mentorData[mentorName];

            if (!data) return;

            modalMentorAvatar.textContent = data.avatar;
            modalMentorCategory.textContent = data.category;
            modalMentorTitle.textContent = data.name;
            modalMentorRole.textContent = data.role;
            modalMentorDescription.textContent = data.description;
            modalMentorExperience.textContent = data.experience;
            modalMentorAvailability.textContent = data.availability;

            modalMentorSkills.innerHTML = "";

            data.skills.forEach((skill) => {
                const listItem = document.createElement("li");
                listItem.textContent = skill;
                modalMentorSkills.appendChild(listItem);
            });

            connectMentorButton.textContent = "CONNECT";
            connectMentorButton.classList.remove("connected");

            openMentorModal();
        }

        card.addEventListener("click", (event) => {
            if (event.target.closest(".mentor-button")) {
                return;
            }

            showMentorModal();
        });

        mentorButton.addEventListener("click", (event) => {
            event.stopPropagation();
            showMentorModal();
        });
    });


    /* =========================
       Close Modal Events
    ========================== */

    closeCommunityModalButton.addEventListener(
        "click",
        closeAllModals
    );

    closeMentorModalButton.addEventListener(
        "click",
        closeAllModals
    );

    communityModal.addEventListener("click", (event) => {
        if (event.target === communityModal) {
            closeAllModals();
        }
    });

    mentorModal.addEventListener("click", (event) => {
        if (event.target === mentorModal) {
            closeAllModals();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });


    /* =========================
       Connect Buttons
    ========================== */

    connectCommunityButton.addEventListener("click", () => {
        const isConnected =
            connectCommunityButton.classList.toggle("connected");

        connectCommunityButton.textContent = isConnected
            ? "CONNECTED"
            : "CONNECT";
    });

    connectMentorButton.addEventListener("click", () => {
        const isConnected =
            connectMentorButton.classList.toggle("connected");

        connectMentorButton.textContent = isConnected
            ? "REQUEST SENT"
            : "CONNECT";
    });


    /* =========================
       File Upload
    ========================== */

    const projectFile = document.getElementById("projectFile");
    const selectedFileName = document.getElementById("selectedFileName");
    const uploadProjectButton = document.getElementById(
        "uploadProjectButton"
    );

    projectFile.addEventListener("change", () => {
        const file = projectFile.files[0];

        selectedFileName.textContent = file
            ? `Selected file: ${file.name}`
            : "No file selected";
    });

    uploadProjectButton.addEventListener("click", () => {
        if (!projectFile.files.length) {
            alert("Please select a project file first.");
            return;
        }

        const file = projectFile.files[0];

        alert(
            `File "${file.name}" selected successfully. Backend upload will be connected later.`
        );
    });


    /* =========================
       GitHub Link Validation
    ========================== */

    const githubRepoLink = document.getElementById("githubRepoLink");
    const githubValidationMessage = document.getElementById(
        "githubValidationMessage"
    );

    const submitGithubButton = document.getElementById(
        "submitGithubButton"
    );

    const githubUrlPattern =
        /^https:\/\/github\.com\/[A-Za-z0-9-]+\/[A-Za-z0-9._-]+\/?$/;

    function validateGithubLink() {
        const url = githubRepoLink.value.trim();

        if (!url) {
            githubValidationMessage.textContent = "";
            githubValidationMessage.className = "validation-message";
            return false;
        }

        if (!githubUrlPattern.test(url)) {
            githubValidationMessage.textContent =
                "Enter a valid public GitHub repository link.";

            githubValidationMessage.className =
                "validation-message invalid";

            return false;
        }

        githubValidationMessage.textContent =
            "The link format is valid. The repository must be public.";

        githubValidationMessage.className =
            "validation-message valid";

        return true;
    }

    githubRepoLink.addEventListener("input", validateGithubLink);

    submitGithubButton.addEventListener("click", () => {
        const isValid = validateGithubLink();

        if (!isValid) {
            return;
        }

        alert(
            "GitHub link submitted. Public repository verification will be connected to the backend later."
        );
    });


    /* =========================
       Create Post
    ========================== */

    const createPostButton = document.getElementById("createPostButton");

    createPostButton.addEventListener("click", () => {
        alert("The create-post feature will be added soon.");
    });


    /* =========================
       Initial State
    ========================== */

    closeAllModals();

    dashboardSections.forEach((section, index) => {
        section.hidden = index !== 0;
    });
});