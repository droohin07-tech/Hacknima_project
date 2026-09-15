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
       Community Search and Filter
    ========================== */

    const communitySearch = document.getElementById("communitySearch");
    const communityCategory = document.getElementById("communityCategory");
    const communityCards = document.querySelectorAll(".community-card");

    function filterCommunities() {
        const searchValue = communitySearch.value.toLowerCase().trim();
        const selectedCategory = communityCategory.value.toLowerCase();

        communityCards.forEach((card) => {
            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            const keywords = card.dataset.keywords.toLowerCase();

            const matchesSearch =
                name.includes(searchValue) ||
                keywords.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            card.style.display =
                matchesSearch && matchesCategory ? "flex" : "none";
        });
    }

    communitySearch.addEventListener("input", filterCommunities);
    communityCategory.addEventListener("change", filterCommunities);


    /* =========================
       Community Modal
    ========================== */

    const communityModal = document.getElementById("communityModal");

    const closeCommunityModalButton = document.getElementById(
        "closeCommunityModal"
    );

    const connectCommunityButton = document.getElementById(
        "connectCommunityButton"
    );

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


    const communityData = {
        "web-development": {
            category: "TECHNICAL COMMUNITY",
            title: "Web Development",
            description:
                "A community for students and mentors interested in frontend, backend, full-stack development, and modern web technologies.",
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
                "SQL and databases"
            ]
        },

        "design-creativity": {
            category: "CREATIVE COMMUNITY",
            title: "Design & Creativity",
            description:
                "A space for students and mentors exploring graphic design, branding, UI concepts, visual storytelling, and creative technology.",
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
            title: "Hackathons & Projects",
            description:
                "Find teammates, discuss project ideas, share resources, and help students prepare for hackathons.",
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
            title: "Career & Internships",
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
        },

        "mentorship-leadership": {
            category: "CAREER COMMUNITY",
            title: "Mentorship & Leadership",
            description:
                "A community focused on mentorship, leadership, communication, professional growth, and helping students develop confidence.",
            members: "190+ members",
            activity: "Active regularly",
            topics: [
                "Mentorship practices",
                "Leadership skills",
                "Communication",
                "Professional development"
            ]
        }
    };


    const communityViewButtons = document.querySelectorAll(
        ".community-view-button"
    );

    function openCommunityModal(communityId) {
        const data = communityData[communityId];

        if (!data) return;

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

        connectCommunityButton.textContent = "JOIN COMMUNITY";
        connectCommunityButton.classList.remove("connected");

        communityModal.hidden = false;
    }

    communityViewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const communityId = button.dataset.community;
            openCommunityModal(communityId);
        });
    });


    /* =========================
       Close Community Modal
    ========================== */

    function closeCommunityModal() {
        communityModal.hidden = true;
    }

    closeCommunityModalButton.addEventListener(
        "click",
        closeCommunityModal
    );

    communityModal.addEventListener("click", (event) => {
        if (event.target === communityModal) {
            closeCommunityModal();
        }
    });


    /* =========================
       Connect to Community
    ========================== */

    connectCommunityButton.addEventListener("click", () => {
        const isConnected =
            connectCommunityButton.classList.toggle("connected");

        connectCommunityButton.textContent = isConnected
            ? "JOINED"
            : "JOIN COMMUNITY";
    });


    /* =========================
       Apprentice Buttons
    ========================== */

    const messageApprenticeButton = document.getElementById(
        "messageApprenticeButton"
    );

    const viewProgressButton = document.getElementById(
        "viewProgressButton"
    );

    messageApprenticeButton.addEventListener("click", () => {
        alert("Messaging will be connected to the backend later.");
    });

    viewProgressButton.addEventListener("click", () => {
        alert("Apprentice progress tracking will be added later.");
    });


    /* =========================
       Requests
    ========================== */

    const requestCards = document.querySelectorAll(".request-card");

    requestCards.forEach((card) => {
        const acceptButton = card.querySelector(
            ".accept-request-button"
        );

        const declineButton = card.querySelector(
            ".decline-request-button"
        );

        acceptButton.addEventListener("click", () => {
            card.classList.add("accepted");

            acceptButton.textContent = "ACCEPTED";
        });

        declineButton.addEventListener("click", () => {
            card.classList.add("removed");
        });
    });


    /* =========================
       Escape Key
    ========================== */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCommunityModal();
        }
    });


    /* =========================
       Initial State
    ========================== */

    communityModal.hidden = true;

    dashboardSections.forEach((section, index) => {
        section.hidden = index !== 0;
    });
});

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
       Internship Filtering
    ========================== */

    const internshipSearch = document.getElementById("internshipSearch");
    const internshipType = document.getElementById("internshipType");
    const internshipStatus = document.getElementById("internshipStatus");
    const opportunityCards = document.querySelectorAll(".opportunity-card");

    function filterInternships() {
        const searchValue = internshipSearch.value.toLowerCase().trim();
        const selectedType = internshipType.value.toLowerCase();
        const selectedStatus = internshipStatus.value.toLowerCase();

        opportunityCards.forEach((card) => {
            const title = card.dataset.title.toLowerCase();
            const keywords = card.dataset.keywords.toLowerCase();
            const type = card.dataset.type.toLowerCase();
            const status = card.dataset.status.toLowerCase();

            const matchesSearch =
                title.includes(searchValue) ||
                keywords.includes(searchValue);

            const matchesType =
                selectedType === "all" ||
                type === selectedType;

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;

            card.style.display =
                matchesSearch && matchesType && matchesStatus
                    ? "flex"
                    : "none";
        });
    }

    internshipSearch.addEventListener("input", filterInternships);
    internshipType.addEventListener("change", filterInternships);
    internshipStatus.addEventListener("change", filterInternships);


    /* =========================
       Project Filtering
    ========================== */

    const projectSearch = document.getElementById("projectSearch");
    const projectCategory = document.getElementById("projectCategory");
    const projectSkill = document.getElementById("projectSkill");
    const projectCards = document.querySelectorAll(".project-card");

    function filterProjects() {
        const searchValue = projectSearch.value.toLowerCase().trim();
        const selectedCategory = projectCategory.value.toLowerCase();
        const selectedSkill = projectSkill.value.toLowerCase();

        projectCards.forEach((card) => {
            const title = card.dataset.title.toLowerCase();
            const student = card.dataset.student.toLowerCase();
            const keywords = card.dataset.keywords.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            const skills = card.dataset.skills.toLowerCase();

            const matchesSearch =
                title.includes(searchValue) ||
                student.includes(searchValue) ||
                keywords.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const matchesSkill =
                selectedSkill === "all" ||
                skills.includes(selectedSkill);

            card.style.display =
                matchesSearch && matchesCategory && matchesSkill
                    ? "flex"
                    : "none";
        });
    }

    projectSearch.addEventListener("input", filterProjects);
    projectCategory.addEventListener("change", filterProjects);
    projectSkill.addEventListener("change", filterProjects);


    /* =========================
       Applicant Data
    ========================== */

    const applicantData = {
        frontend: {
            title: "Frontend Development Intern",
            applicants: [
                {
                    initials: "AS",
                    name: "Aarav Sharma",
                    course: "B.Tech Computer Science",
                    match: 94,
                    strengths: [
                        "React",
                        "JavaScript",
                        "Responsive UI",
                        "Git"
                    ]
                },
                {
                    initials: "PK",
                    name: "Priya Kapoor",
                    course: "B.Sc Information Technology",
                    match: 88,
                    strengths: [
                        "HTML/CSS",
                        "JavaScript",
                        "UI Development"
                    ]
                },
                {
                    initials: "RM",
                    name: "Rohan Mehta",
                    course: "B.Tech Software Engineering",
                    match: 81,
                    strengths: [
                        "React",
                        "Problem Solving",
                        "API Integration"
                    ]
                }
            ]
        },

        python: {
            title: "Python Backend Intern",
            applicants: [
                {
                    initials: "NV",
                    name: "Neha Verma",
                    course: "B.Tech Computer Science",
                    match: 96,
                    strengths: [
                        "Python",
                        "Flask",
                        "SQL",
                        "API Design"
                    ]
                },
                {
                    initials: "IR",
                    name: "Ishita Rao",
                    course: "BCA",
                    match: 89,
                    strengths: [
                        "Python",
                        "SQL",
                        "Database Design"
                    ]
                },
                {
                    initials: "KS",
                    name: "Karan Shah",
                    course: "B.Sc Computer Science",
                    match: 78,
                    strengths: [
                        "Python",
                        "Debugging",
                        "Automation"
                    ]
                }
            ]
        },

        design: {
            title: "Graphic Design Intern",
            applicants: [
                {
                    initials: "MI",
                    name: "Maya Iyer",
                    course: "B.Des Communication Design",
                    match: 95,
                    strengths: [
                        "Branding",
                        "Typography",
                        "Packaging",
                        "Photoshop"
                    ]
                },
                {
                    initials: "SN",
                    name: "Sara Nair",
                    course: "BFA Visual Communication",
                    match: 87,
                    strengths: [
                        "Illustration",
                        "Visual Identity",
                        "Layout Design"
                    ]
                },
                {
                    initials: "AD",
                    name: "Ananya Das",
                    course: "B.Des Graphic Design",
                    match: 83,
                    strengths: [
                        "Photoshop",
                        "Social Media Design",
                        "Creative Direction"
                    ]
                }
            ]
        },

        data: {
            title: "Data Analyst Intern",
            applicants: [
                {
                    initials: "KM",
                    name: "Kabir Menon",
                    course: "B.Tech Data Science",
                    match: 91,
                    strengths: [
                        "Python",
                        "SQL",
                        "Data Cleaning",
                        "Excel"
                    ]
                },
                {
                    initials: "TS",
                    name: "Tanvi Shah",
                    course: "B.Sc Statistics",
                    match: 86,
                    strengths: [
                        "Statistics",
                        "Excel",
                        "Data Visualization"
                    ]
                }
            ]
        }
    };


    /* =========================
       Applicants Modal
    ========================== */

    const applicantsModal = document.getElementById("applicantsModal");
    const closeApplicantsModalButton = document.getElementById(
        "closeApplicantsModal"
    );
    const modalOpportunityTitle = document.getElementById(
        "modalOpportunityTitle"
    );
    const applicantsList = document.getElementById("applicantsList");

    const viewApplicantsButtons = document.querySelectorAll(
        ".view-applicants-button"
    );

    function openApplicantsModal(opportunityId) {
        const opportunity = applicantData[opportunityId];

        if (!opportunity) return;

        modalOpportunityTitle.textContent = opportunity.title;
        applicantsList.innerHTML = "";

        opportunity.applicants.forEach((applicant) => {
            const applicantCard = document.createElement("article");
            applicantCard.className = "applicant-card";

            const strengthsHTML = applicant.strengths
                .map((strength) => `<span>${strength}</span>`)
                .join("");

            applicantCard.innerHTML = `
                <div class="applicant-header">
                    <div class="applicant-name-area">
                        <div class="applicant-avatar">
                            ${applicant.initials}
                        </div>

                        <div>
                            <h3>${applicant.name}</h3>
                            <p>${applicant.course}</p>
                        </div>
                    </div>

                    <div>
                        <div class="match-percentage">
                            ${applicant.match}%
                        </div>

                        <span class="match-label">
                            MATCH
                        </span>
                    </div>
                </div>

                <div class="match-bar">
                    <div
                        class="match-bar-fill"
                        style="width: ${applicant.match}%"
                    ></div>
                </div>

                <span class="applicant-section-label">
                    KEY STRENGTHS
                </span>

                <div class="applicant-strengths">
                    ${strengthsHTML}
                </div>

                <div class="applicant-actions">
                    <button
                        class="primary-button contact-applicant-button"
                        type="button"
                        data-applicant="${applicant.name}"
                    >
                        CONTACT
                    </button>

                    <button
                        class="secondary-button view-profile-button"
                        type="button"
                        data-applicant="${applicant.name}"
                    >
                        VIEW PROFILE
                    </button>
                </div>
            `;

            applicantsList.appendChild(applicantCard);
        });

        applicantsModal.hidden = false;
    }

    viewApplicantsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const opportunityId = button.dataset.opportunity;
            openApplicantsModal(opportunityId);
        });
    });


    function closeApplicantsModal() {
        applicantsModal.hidden = true;
    }

    closeApplicantsModalButton.addEventListener(
        "click",
        closeApplicantsModal
    );

    applicantsModal.addEventListener("click", (event) => {
        if (event.target === applicantsModal) {
            closeApplicantsModal();
        }
    });


    /* =========================
       Applicant Actions
    ========================== */

    applicantsList.addEventListener("click", (event) => {
        const contactButton = event.target.closest(
            ".contact-applicant-button"
        );

        const profileButton = event.target.closest(
            ".view-profile-button"
        );

        if (contactButton) {
            const applicantName = contactButton.dataset.applicant;

            contactButton.textContent = "CONTACTED";
            contactButton.disabled = true;

            alert(`Contact request prepared for ${applicantName}.`);
        }

        if (profileButton) {
            const applicantName = profileButton.dataset.applicant;

            alert(`Student profile for ${applicantName} will open here.`);
        }
    });


    /* =========================
       Project Data
    ========================== */

    const projectData = {
        "campus-connect": {
            category: "WEB DEVELOPMENT",
            title: "Campus Connect",
            student: "By Aarav Sharma",
            description:
                "A student networking platform with community discussions, profiles, and event discovery.",
            skills: [
                "React",
                "JavaScript",
                "HTML",
                "CSS",
                "Frontend Development"
            ],
            evaluation:
                "Strong frontend implementation, clear component structure, and good understanding of user-focused interface design."
        },

        medledger: {
            category: "BACKEND",
            title: "MedLedger",
            student: "By Neha Verma",
            description:
                "A privacy-focused medical record access system with consent-based data sharing and audit records.",
            skills: [
                "Python",
                "SQL",
                "Backend Development",
                "API Design",
                "Privacy Systems"
            ],
            evaluation:
                "Demonstrates strong backend thinking, structured data handling, and awareness of privacy and access control."
        },

        studylens: {
            category: "AI AND DATA",
            title: "StudyLens",
            student: "By Kabir Nair",
            description:
                "A learning analytics tool that tracks study patterns and generates personalized performance reports.",
            skills: [
                "Python",
                "SQL",
                "Data Analysis",
                "Analytics",
                "Reporting"
            ],
            evaluation:
                "Shows practical data-processing ability and a clear understanding of turning raw information into useful insights."
        },

        brandboard: {
            category: "DESIGN",
            title: "BrandBoard",
            student: "By Maya Iyer",
            description:
                "A branding case-study collection featuring identity systems, packaging, and campaign design.",
            skills: [
                "Branding",
                "Graphic Design",
                "Packaging",
                "Typography",
                "Visual Identity"
            ],
            evaluation:
                "Demonstrates strong visual consistency, creative direction, and the ability to communicate a brand through multiple formats."
        },

        "pocket-planner": {
            category: "MOBILE",
            title: "Pocket Planner",
            student: "By Dev Malhotra",
            description:
                "A productivity application for managing tasks, reminders, and personal academic schedules.",
            skills: [
                "React",
                "JavaScript",
                "Mobile Development",
                "UI Design",
                "State Management"
            ],
            evaluation:
                "Shows a good understanding of application structure, interaction design, and practical productivity workflows."
        },

        "inventory-lite": {
            category: "BACKEND",
            title: "Inventory Lite",
            student: "By Ishita Rao",
            description:
                "A lightweight inventory management system for tracking stock, sales, and product records.",
            skills: [
                "Python",
                "SQL",
                "Database Design",
                "CRUD Operations",
                "Backend Development"
            ],
            evaluation:
                "Demonstrates practical database knowledge, logical backend structure, and an understanding of business workflows."
        }
    };


    /* =========================
       Project Modal
    ========================== */

    const projectModal = document.getElementById("projectModal");
    const closeProjectModalButton = document.getElementById(
        "closeProjectModal"
    );

    const modalProjectCategory = document.getElementById(
        "modalProjectCategory"
    );

    const modalProjectTitle = document.getElementById(
        "modalProjectTitle"
    );

    const modalProjectStudent = document.getElementById(
        "modalProjectStudent"
    );

    const modalProjectDescription = document.getElementById(
        "modalProjectDescription"
    );

    const modalProjectSkills = document.getElementById(
        "modalProjectSkills"
    );

    const modalProjectEvaluation = document.getElementById(
        "modalProjectEvaluation"
    );

    const contactStudentButton = document.getElementById(
        "contactStudentButton"
    );

    const viewProjectButtons = document.querySelectorAll(
        ".view-project-button"
    );

    function openProjectModal(projectId) {
        const project = projectData[projectId];

        if (!project) return;

        modalProjectCategory.textContent = project.category;
        modalProjectTitle.textContent = project.title;
        modalProjectStudent.textContent = project.student;
        modalProjectDescription.textContent = project.description;
        modalProjectEvaluation.textContent = project.evaluation;

        modalProjectSkills.innerHTML = "";

        project.skills.forEach((skill) => {
            const skillElement = document.createElement("span");
            skillElement.textContent = skill;
            modalProjectSkills.appendChild(skillElement);
        });

        contactStudentButton.textContent = "CONTACT STUDENT";
        contactStudentButton.classList.remove("connected");
        contactStudentButton.disabled = false;

        projectModal.hidden = false;
    }

    viewProjectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const projectId = button.dataset.project;
            openProjectModal(projectId);
        });
    });


    function closeProjectModal() {
        projectModal.hidden = true;
    }

    closeProjectModalButton.addEventListener(
        "click",
        closeProjectModal
    );

    projectModal.addEventListener("click", (event) => {
        if (event.target === projectModal) {
            closeProjectModal();
        }
    });


    /* =========================
       Contact Student
    ========================== */

    contactStudentButton.addEventListener("click", () => {
        contactStudentButton.textContent = "REQUEST SENT";
        contactStudentButton.classList.add("connected");
        contactStudentButton.disabled = true;
    });


    /* =========================
       Escape Key
    ========================== */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeApplicantsModal();
            closeProjectModal();
        }
    });


    /* =========================
       Initial State
    ========================== */

    applicantsModal.hidden = true;
    projectModal.hidden = true;

    dashboardSections.forEach((section, index) => {
        section.hidden = index !== 0;
    });
});