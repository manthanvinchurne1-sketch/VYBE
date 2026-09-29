/* ==================================================
   VYBE FRONTEND
   UI-only build — ready for later API integration.
================================================== */

"use strict";

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

/* ==================================================
   ELEMENTS
================================================== */

const loginScreen = $("#login-screen");
const registerScreen = $("#register-screen");
const appShell = $("#app-shell");
const sidebar = $("#sidebar");

const loginForm = $("#login-form");
const registerForm = $("#register-form");
const emailInput = $("#email");
const passwordInput = $("#password");

const registerName = $("#register-name");
const registerEmail = $("#register-email");
const registerPassword = $("#register-password");
const confirmPassword = $("#confirm-password");

const createAccountButton = $("#create-account-button");
const backToLoginButton = $("#back-to-login");
const demoLoginButton = $("#demo-login");
const logoutButton = $("#logout-button");

const toggleLoginPassword = $("#toggle-login-password");
const toggleRegisterPassword = $("#toggle-register-password");

const navItems = $$(".nav-item");
const views = $$(".view");
const sidebarCollapse = $("#sidebar-collapse");
const myProfileButton = $("#my-profile-button");
const settingsButton = $("#settings-button");

/* ==================================================
   CHAT
================================================== */

const chatList = $("#chat-list");
const chatSearchInput = $("#chat-search-input");
const chatEmptyState = $("#chat-empty-state");
const activeChat = $("#active-chat");
const chatUserName = $("#chat-user-name");
const chatUserStatus = $("#chat-user-status");
const chatAvatar = $("#chat-avatar");
const chatProfileButton = $("#chat-profile-button");
const chatOpenProfile = $("#chat-open-profile");
const chatMore = $("#chat-more");
const messages = $("#messages");
const messageForm = $("#message-form");
const messageInput = $("#message-input");
const composerPlus = $("#composer-plus");
const composerEmoji = $("#composer-emoji");

/* ==================================================
   PEOPLE
================================================== */

const peopleList = $("#people-list");
const peopleSearchInput = $("#people-search-input");
const peopleCount = $("#people-count");
const addPersonButton = $("#add-person-button");
const openPeopleFromChat = $("#open-people-from-chat");
const emptyFindPeople = $("#empty-find-people");

const addPersonModal = $("#add-person-modal");
const closeModal = $("#close-modal");
const peopleSearchForm = $("#people-search-form");
const usernameInput = $("#username-input");
const searchResult = $("#search-result");

/* ==================================================
   PROFILE
================================================== */

const sidebarAvatar = $("#sidebar-avatar");
const sidebarName = $("#sidebar-name");
const sidebarStatus = $("#sidebar-status");

const profileModal = $("#profile-modal");
const closeProfileModal = $("#close-profile-modal");
const profileAvatar = $("#profile-avatar");
const profileTitle = $("#profile-title");
const profileHandle = $("#profile-handle");
const profileStatus = $("#profile-status");
const profileVibeTitle = $("#profile-vibe-title");
const profileVibeNote = $("#profile-vibe-note");
const profileConnectionType = $("#profile-connection-type");
const profileSince = $("#profile-since");
const profileMessageButton = $("#profile-message-button");

/* ==================================================
   MOMENTS
================================================== */

const momentList = $("#moment-list");
const createMomentButton = $("#create-moment-button");
const quickMomentButton = $("#quick-moment-button");
const momentModal = $("#moment-modal");
const closeMomentModal = $("#close-moment-modal");
const momentText = $("#moment-text");
const momentCharacterCount = $("#moment-character-count");
const publishMomentButton = $("#publish-moment-button");

/* ==================================================
   MY VIBE
================================================== */

const vibeMood = $("#vibe-mood");
const vibeActivity = $("#vibe-activity");
const vibeNote = $("#vibe-note");
const vibeVisible = $("#vibe-visible");
const saveVibeButton = $("#save-vibe-button");

const vibeAvatar = $("#vibe-avatar");
const vibeProfileName = $("#vibe-profile-name");
const vibeProfileHandle = $("#vibe-profile-handle");
const vibePreviewMood = $("#vibe-preview-mood");
const vibePreviewActivity = $("#vibe-preview-activity");
const vibePreviewNote = $("#vibe-preview-note");

/* ==================================================
   SETTINGS
================================================== */

const settingsModal = $("#settings-modal");
const closeSettingsModal = $("#close-settings-modal");

const messageAlertsSetting =
    $("#setting-message-alerts");

const connectionAlertsSetting =
    $("#setting-connection-alerts");

const onlineStatusSetting =
    $("#setting-online-status");

const profileDiscoverySetting =
    $("#setting-profile-discovery");

const themeSetting =
    $("#setting-theme");

const chatDensitySetting =
    $("#setting-chat-density");

const saveSettingsButton =
    $("#save-settings-button");

const clearLocalDataButton =
    $("#clear-local-data-button");

/* ==================================================
   LOGOUT
================================================== */

const logoutModal = $("#logout-modal");

const saveInfoLogoutButton =
    $("#save-info-logout");

const notNowLogoutButton =
    $("#not-now-logout");

const toastRegion =
    $("#toast-region");

/* ==================================================
   STATE
================================================== */

const STORAGE_KEY =
    "vybe_frontend_state_v2";

const defaultState = {
    profile: {
        name: "My Profile",
        username: "you",
        email: "",
        status: "Online"
    },

    settings: {
        messageAlerts: true,
        connectionAlerts: true,
        onlineStatus: true,
        profileDiscovery: true,
        theme: "dark",
        chatDensity: "comfortable"
    },

    people: [],

    moments: [],

    vibe: {
        mood: "",
        activity: "",
        note: "",
        visible: true
    },

    currentView: "chats",

    activePersonId: null
};

let state = loadState();

let activeProfilePersonId = null;

/* ==================================================
   STORAGE
================================================== */

function cloneDefaultState() {

    return JSON.parse(
        JSON.stringify(defaultState)
    );
}


function loadState() {

    try {

        const raw =
            localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return cloneDefaultState();
        }

        const saved =
            JSON.parse(raw);

        return {

            ...cloneDefaultState(),

            ...saved,

            profile: {
                ...defaultState.profile,
                ...(saved.profile || {})
            },

            settings: {
                ...defaultState.settings,
                ...(saved.settings || {})
            },

            vibe: {
                ...defaultState.vibe,
                ...(saved.vibe || {})
            },

            people:
                Array.isArray(saved.people)
                    ? saved.people
                    : [],

            moments:
                Array.isArray(saved.moments)
                    ? saved.moments
                    : []
        };

    } catch (error) {

        console.error(
            "VYBE state load failed:",
            error
        );

        return cloneDefaultState();
    }
}


function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}

/* ==================================================
   UTILITIES
================================================== */

function createId(prefix) {

    return (
        `${prefix}_${Date.now()}_` +
        `${Math.random().toString(36).slice(2, 8)}`
    );
}


function getInitials(name = "") {

    const clean =
        name.trim();

    if (!clean) {
        return "ME";
    }

    const words =
        clean.split(/\s+/);

    if (words.length === 1) {

        return words[0]
            .slice(0, 2)
            .toUpperCase();
    }

    return (
        `${words[0][0]}${words[1][0]}`
    ).toUpperCase();
}


function escapeHTML(value = "") {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;
}


function formatTime(timestamp) {

    if (!timestamp) {
        return "";
    }

    const date =
        new Date(timestamp);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    return date.toLocaleTimeString(
        [],
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );
}


function formatDate(timestamp) {

    if (!timestamp) {
        return "—";
    }

    const date =
        new Date(timestamp);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
    }

    return date.toLocaleDateString(
        [],
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


function showToast(
    message,
    type = "success"
) {

    if (!toastRegion) {
        return;
    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent =
        message;

    toastRegion.appendChild(
        toast
    );

    setTimeout(
        () => toast.remove(),
        2600
    );
}


function openModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "hidden"
    );
}


function closeModalSafe(modal) {

    if (!modal) {
        return;
    }

    modal.classList.add(
        "hidden"
    );
}


function currentPerson() {

    return state.people.find(
        (person) =>
            person.id ===
            state.activePersonId
    ) || null;
}

/* ==================================================
   AUTH / SCREENS
================================================== */

function showLogin() {

    loginScreen.classList.remove(
        "hidden"
    );

    registerScreen.classList.add(
        "hidden"
    );

    appShell.classList.add(
        "hidden"
    );
}


function showRegister() {

    loginScreen.classList.add(
        "hidden"
    );

    registerScreen.classList.remove(
        "hidden"
    );

    appShell.classList.add(
        "hidden"
    );
}


function showApp() {

    loginScreen.classList.add(
        "hidden"
    );

    registerScreen.classList.add(
        "hidden"
    );

    appShell.classList.remove(
        "hidden"
    );

    applySettings();

    renderAll();

    switchView(
        state.currentView ||
        "chats"
    );
}


createAccountButton.addEventListener(
    "click",
    showRegister
);


backToLoginButton.addEventListener(
    "click",
    showLogin
);


/* ==================================================
   LOGIN
================================================== */

loginForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const identity =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();

        if (
            !identity ||
            !password
        ) {

            showToast(
                "Enter your login details.",
                "error"
            );

            return;
        }

        if (
            identity.includes("@")
        ) {

            state.profile.email =
                identity;
        }

        saveState();

        showApp();
    }
);


/* ==================================================
   DEMO LOGIN
================================================== */

demoLoginButton.addEventListener(
    "click",
    showApp
);


/* ==================================================
   REGISTER
================================================== */

registerForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const name =
            registerName.value.trim();

        const email =
            registerEmail.value.trim();

        const password =
            registerPassword.value;

        const confirm =
            confirmPassword.value;


        if (
            !name ||
            !email ||
            !password ||
            !confirm
        ) {

            showToast(
                "Complete all fields.",
                "error"
            );

            return;
        }


        if (
            !/^\S+@\S+\.\S+$/.test(
                email
            )
        ) {

            showToast(
                "Enter a valid email.",
                "error"
            );

            return;
        }


        if (
            password.length < 8
        ) {

            showToast(
                "Use at least 8 characters.",
                "error"
            );

            return;
        }


        if (
            password !== confirm
        ) {

            showToast(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        state.profile.name =
            name;

        state.profile.email =
            email;

        state.profile.username =
            name
                .toLowerCase()
                .replace(
                    /[^a-z0-9]/g,
                    ""
                )
                .slice(
                    0,
                    24
                ) || "you";


        saveState();

        registerForm.reset();

        showToast(
            "Account details ready."
        );

        showApp();
    }
);


/* ==================================================
   PASSWORD TOGGLES
================================================== */

function togglePassword(
    input,
    button
) {

    const visible =
        input.type === "text";

    input.type =
        visible
            ? "password"
            : "text";

    button.textContent =
        visible
            ? "Show"
            : "Hide";
}


toggleLoginPassword?.addEventListener(
    "click",
    () => {

        togglePassword(
            passwordInput,
            toggleLoginPassword
        );
    }
);


toggleRegisterPassword?.addEventListener(
    "click",
    () => {

        togglePassword(
            registerPassword,
            toggleRegisterPassword
        );
    }
);


/* ==================================================
   NAVIGATION
================================================== */

navItems.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                switchView(
                    button.dataset.view
                );
            }
        );
    }
);


function switchView(
    viewName
) {

    state.currentView =
        viewName;

    saveState();


    navItems.forEach(
        (button) => {

            button.classList.toggle(
                "active",
                button.dataset.view ===
                    viewName
            );
        }
    );


    views.forEach(
        (view) => {

            view.classList.toggle(
                "active",
                view.dataset.viewPanel ===
                    viewName
            );
        }
    );


    if (
        viewName === "chats"
    ) {

        renderChatList(
            chatSearchInput.value.trim()
        );

        renderActiveChat();
    }


    if (
        viewName === "people"
    ) {

        renderPeople(
            peopleSearchInput.value.trim()
        );
    }


    if (
        viewName === "moments"
    ) {

        renderMoments();
    }


    if (
        viewName === "my-vibe"
    ) {

        renderVibe();
    }
}


sidebarCollapse.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "collapsed"
        );
    }
);


/* ==================================================
   PROFILE IDENTITY
================================================== */

function renderProfileIdentity() {

    const initials =
        getInitials(
            state.profile.name
        );


    sidebarAvatar.textContent =
        initials;

    sidebarName.textContent =
        state.profile.name;

    sidebarStatus.textContent =
        state.settings.onlineStatus
            ? "● Online"
            : "● Hidden";


    vibeAvatar.textContent =
        initials;

    vibeProfileName.textContent =
        state.profile.name;

    vibeProfileHandle.textContent =
        `@${state.profile.username}`;
}


myProfileButton.addEventListener(
    "click",
    openOwnProfile
);


function openOwnProfile() {

    activeProfilePersonId =
        null;

    profileAvatar.textContent =
        getInitials(
            state.profile.name
        );

    profileTitle.textContent =
        state.profile.name;

    profileHandle.textContent =
        `@${state.profile.username}`;

    profileStatus.textContent =
        state.settings.onlineStatus
            ? "Online"
            : "Online status hidden";


    if (
        state.vibe.visible &&
        (
            state.vibe.mood ||
            state.vibe.activity ||
            state.vibe.note
        )
    ) {

        profileVibeTitle.textContent =
            state.vibe.activity
                ? `${state.vibe.mood || "Current"} • ${state.vibe.activity}`
                : (
                    state.vibe.mood ||
                    "Current VYBE"
                );


        profileVibeNote.textContent =
            state.vibe.note ||
            "Your VYBE is visible to your people.";

    } else {

        profileVibeTitle.textContent =
            "VYBE not set";

        profileVibeNote.textContent =
            "Set a VYBE to show people what you are up to.";
    }


    profileConnectionType.textContent =
        "You";

    profileSince.textContent =
        "Your profile";

    profileMessageButton.classList.add(
        "hidden"
    );


    openModal(
        profileModal
    );
}


closeProfileModal.addEventListener(
    "click",
    () =>
        closeModalSafe(
            profileModal
        )
);


profileModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            profileModal
        ) {

            closeModalSafe(
                profileModal
            );
        }
    }
);


/* ==================================================
   OTHER USER PROFILE
================================================== */

function openPersonProfile(
    personId
) {

    const person =
        state.people.find(
            (item) =>
                item.id ===
                personId
        );


    if (!person) {
        return;
    }


    activeProfilePersonId =
        person.id;


    profileAvatar.textContent =
        person.initials;

    profileTitle.textContent =
        person.name;

    profileHandle.textContent =
        `@${person.username}`;

    profileStatus.textContent =
        person.status ||
        "Available";


    if (
        person.vibe?.visible &&
        (
            person.vibe.mood ||
            person.vibe.activity
        )
    ) {

        profileVibeTitle.textContent =
            person.vibe.activity
                ? `${person.vibe.mood || "Current"} • ${person.vibe.activity}`
                : (
                    person.vibe.mood ||
                    "Current VYBE"
                );


        profileVibeNote.textContent =
            person.vibe.note ||
            "VYBE shared.";

    } else {

        profileVibeTitle.textContent =
            "VYBE not set";

        profileVibeNote.textContent =
            "This person has not shared a current VYBE yet.";
    }


    profileConnectionType.textContent =
        person.connected
            ? "Connected"
            : "Not connected";


    profileSince.textContent =
        person.createdAt
            ? formatDate(
                person.createdAt
              )
            : "—";


    profileMessageButton.classList.toggle(
        "hidden",
        !person.connected
    );


    openModal(
        profileModal
    );
}


profileMessageButton.addEventListener(
    "click",
    () => {

        const person =
            state.people.find(
                (item) =>
                    item.id ===
                    activeProfilePersonId
            );


        if (!person) {
            return;
        }


        closeModalSafe(
            profileModal
        );

        openChat(
            person.id
        );
    }
);


/* ==================================================
   SETTINGS
================================================== */

settingsButton.addEventListener(
    "click",
    openSettings
);


closeSettingsModal.addEventListener(
    "click",
    () =>
        closeModalSafe(
            settingsModal
        )
);


settingsModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            settingsModal
        ) {

            closeModalSafe(
                settingsModal
            );
        }
    }
);


function openSettings() {

    messageAlertsSetting.checked =
        state.settings.messageAlerts;

    connectionAlertsSetting.checked =
        state.settings.connectionAlerts;

    onlineStatusSetting.checked =
        state.settings.onlineStatus;

    profileDiscoverySetting.checked =
        state.settings.profileDiscovery;

    themeSetting.value =
        state.settings.theme;

    chatDensitySetting.value =
        state.settings.chatDensity;


    openModal(
        settingsModal
    );
}


saveSettingsButton.addEventListener(
    "click",
    () => {

        state.settings.messageAlerts =
            messageAlertsSetting.checked;

        state.settings.connectionAlerts =
            connectionAlertsSetting.checked;

        state.settings.onlineStatus =
            onlineStatusSetting.checked;

        state.settings.profileDiscovery =
            profileDiscoverySetting.checked;

        state.settings.theme =
            themeSetting.value;

        state.settings.chatDensity =
            chatDensitySetting.value;


        applySettings();

        saveState();

        closeModalSafe(
            settingsModal
        );

        renderProfileIdentity();

        showToast(
            "Settings saved."
        );
    }
);


function applySettings() {

    document.body.dataset.theme =
        state.settings.theme;

    document.body.dataset.chatDensity =
        state.settings.chatDensity;
}


clearLocalDataButton.addEventListener(
    "click",
    () => {

        const confirmed =
            window.confirm(
                "Clear locally saved VYBE data from this device?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            STORAGE_KEY
        );

        state =
            cloneDefaultState();

        activeProfilePersonId =
            null;


        closeModalSafe(
            settingsModal
        );

        applySettings();

        renderAll();

        switchView(
            "chats"
        );

        showLogin();

        showToast(
            "Local data cleared."
        );
    }
);


/* ==================================================
   LOGOUT
================================================== */

logoutButton.addEventListener(
    "click",
    () => {

        openModal(
            logoutModal
        );
    }
);


notNowLogoutButton.addEventListener(
    "click",
    () => {

        closeModalSafe(
            logoutModal
        );
    }
);


saveInfoLogoutButton.addEventListener(
    "click",
    () => {

        saveState();

        state.activePersonId =
            null;

        closeModalSafe(
            logoutModal
        );

        showLogin();
    }
);


logoutModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            logoutModal
        ) {

            closeModalSafe(
                logoutModal
            );
        }
    }
);


/* ==================================================
   PEOPLE
================================================== */

addPersonButton.addEventListener(
    "click",
    () => {

        usernameInput.value =
            "";

        searchResult.innerHTML =
            "";

        openModal(
            addPersonModal
        );


        setTimeout(
            () =>
                usernameInput.focus(),
            40
        );
    }
);


closeModal.addEventListener(
    "click",
    () =>
        closeModalSafe(
            addPersonModal
        )
);


addPersonModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            addPersonModal
        ) {

            closeModalSafe(
                addPersonModal
            );
        }
    }
);


openPeopleFromChat.addEventListener(
    "click",
    () => {

        switchView(
            "people"
        );

        openModal(
            addPersonModal
        );
    }
);


emptyFindPeople.addEventListener(
    "click",
    () => {

        switchView(
            "people"
        );
    }
);


peopleSearchForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const username =
            usernameInput.value
                .trim()
                .replace(
                    /^@+/,
                    ""
                )
                .toLowerCase();


        if (!username) {

            showToast(
                "Enter a username.",
                "error"
            );

            return;
        }


        if (
            username ===
            state.profile.username.toLowerCase()
        ) {

            showToast(
                "That is your username.",
                "error"
            );

            return;
        }


        const existing =
            state.people.find(
                (person) =>
                    person.username
                        .toLowerCase() ===
                    username
            );


        const preview =
            existing ||
            {

                id:
                    createId(
                        "person"
                    ),

                username,

                name:
                    username,

                initials:
                    getInitials(
                        username
                    ),

                status:
                    "Available to connect",

                createdAt:
                    null,

                connected:
                    false,

                vibe: {
                    mood: "",
                    activity: "",
                    note: "",
                    visible: false
                },

                messages:
                    []
            };


        searchResult.innerHTML = `

            <div
                class="search-user-result"
            >

                <div
                    class="avatar avatar-gradient"
                >
                    ${escapeHTML(
                        preview.initials
                    )}
                </div>


                <div
                    class="search-user-copy"
                >

                    <strong>
                        @${escapeHTML(
                            preview.username
                        )}
                    </strong>

                    <span>
                        ${
                            existing
                                ? "Already connected"
                                : "VYBE username"
                        }
                    </span>

                    <small>
                        ${
                            existing
                                ? "Open their profile and VYBE."
                                : "Add them to your people."
                        }
                    </small>

                </div>


                <button
                    class="button ${
                        existing
                            ? "button-secondary"
                            : "button-primary"
                    } add-search-result-button"
                    type="button"
                >
                    ${
                        existing
                            ? "Open profile"
                            : "Add to VYBE"
                    }
                </button>

            </div>
        `;


        const resultButton =
            searchResult.querySelector(
                ".add-search-result-button"
            );


        resultButton.addEventListener(
            "click",
            () => {

                if (existing) {

                    closeModalSafe(
                        addPersonModal
                    );

                    openPersonProfile(
                        existing.id
                    );

                    return;
                }


                const person = {

                    ...preview,

                    connected:
                        true,

                    createdAt:
                        new Date()
                            .toISOString(),

                    status:
                        "Online",

                    messages:
                        []
                };


                state.people.push(
                    person
                );

                saveState();

                closeModalSafe(
                    addPersonModal
                );

                renderPeople();

                showToast(
                    `@${person.username} added to your people.`
                );

                openPersonProfile(
                    person.id
                );
            }
        );
    }
);


peopleSearchInput.addEventListener(
    "input",
    () => {

        renderPeople(
            peopleSearchInput.value.trim()
        );
    }
);


function renderPeople(
    searchText = ""
) {

    const search =
        searchText.toLowerCase();


    const people =
        state.people.filter(
            (person) =>
                `${person.name} ${person.username}`
                    .toLowerCase()
                    .includes(search)
        );


    peopleCount.textContent =
        `${people.length} ${
            people.length === 1
                ? "person"
                : "people"
        }`;


    if (!people.length) {

        peopleList.innerHTML = `

            <div
                class="people-empty"
            >

                <div>

                    <div
                        class="people-empty-icon"
                    >
                        ♙
                    </div>

                    <p class="eyebrow">
                        ${
                            search
                                ? "NO MATCHES"
                                : "START YOUR CIRCLE"
                        }
                    </p>

                    <h3>
                        ${
                            search
                                ? "No one matches that search."
                                : "Your People space is still yours to fill."
                        }
                    </h3>

                    <p>
                        ${
                            search
                                ? "Try another name or username."
                                : "Add someone by VYBE username and their profile will live here."
                        }
                    </p>


                    ${
                        search
                            ? ""
                            : `
                                <button
                                    class="button button-secondary"
                                    type="button"
                                    id="empty-people-add"
                                >
                                    + Add people
                                </button>
                            `
                    }

                </div>

            </div>
        `;


        $("#empty-people-add")
            ?.addEventListener(
                "click",
                () =>
                    openModal(
                        addPersonModal
                    )
            );

        return;
    }


    peopleList.innerHTML =
        people
            .map(
                (person) => `

                    <article
                        class="person-card"
                        data-person-id="${person.id}"
                    >

                        <div
                            class="avatar avatar-gradient"
                        >
                            ${escapeHTML(
                                person.initials
                            )}
                        </div>


                        <div
                            class="person-copy"
                        >

                            <strong>
                                ${escapeHTML(
                                    person.name
                                )}
                            </strong>

                            <span>
                                @${escapeHTML(
                                    person.username
                                )}
                            </span>

                        </div>


                        <div
                            class="person-presence"
                        >

                            <span
                                class="status-dot"
                            ></span>

                            <span>
                                ${escapeHTML(
                                    person.status ||
                                    "Available"
                                )}
                            </span>

                        </div>


                        <span
                            class="person-arrow"
                        >
                            ›
                        </span>

                    </article>
                `
            )
            .join("");


    $$(".person-card")
        .forEach(
            (card) => {

                card.addEventListener(
                    "click",
                    () =>
                        openPersonProfile(
                            card.dataset.personId
                        )
                );
            }
        );
}


/* ==================================================
   CHAT
================================================== */

chatSearchInput.addEventListener(
    "input",
    () =>
        renderChatList(
            chatSearchInput.value.trim()
        )
);


chatProfileButton.addEventListener(
    "click",
    () => {

        const person =
            currentPerson();

        if (person) {
            openPersonProfile(
                person.id
            );
        }
    }
);


chatOpenProfile.addEventListener(
    "click",
    () => {

        const person =
            currentPerson();

        if (person) {
            openPersonProfile(
                person.id
            );
        }
    }
);


chatMore.addEventListener(
    "click",
    () =>
        showToast(
            "More chat actions will come later."
        )
);


composerPlus.addEventListener(
    "click",
    () =>
        showToast(
            "Attachments will come later."
        )
);


composerEmoji.addEventListener(
    "click",
    () => {

        messageInput.value +=
            " 🙂";

        messageInput.focus();
    }
);


function renderChatList(
    searchText = ""
) {

    const search =
        searchText.toLowerCase();


    const chats =
        state.people.filter(
            (person) => {

                const matches =
                    `${person.name} ${person.username}`
                        .toLowerCase()
                        .includes(search);

                const hasMessages =
                    Array.isArray(
                        person.messages
                    ) &&
                    person.messages.length >
                        0;


                return (
                    matches &&
                    (
                        hasMessages ||
                        !search
                    )
                );
            }
        );


    if (!chats.length) {

        chatList.innerHTML = `

            <div
                class="people-empty"
                style="
                    min-height:220px;
                    margin:8px 4px;
                "
            >

                <div>

                    <div
                        class="people-empty-icon"
                    >
                        ⌁
                    </div>

                    <h3>
                        No chats yet
                    </h3>

                    <p>
                        Start a conversation with someone from People.
                    </p>

                </div>

            </div>
        `;

        return;
    }


    chatList.innerHTML =
        chats
            .map(
                (person) => {

                    const last =
                        person.messages?.[
                            person.messages.length -
                            1
                        ];


                    return `

                        <article
                            class="
                                chat-list-item
                                ${
                                    person.id ===
                                    state.activePersonId
                                        ? "active"
                                        : ""
                                }
                            "
                            data-person-id="${person.id}"
                        >

                            <div
                                class="
                                    avatar
                                    avatar-gradient
                                "
                            >
                                ${escapeHTML(
                                    person.initials
                                )}
                            </div>


                            <div
                                class="
                                    chat-list-item-copy
                                "
                            >

                                <strong>
                                    ${escapeHTML(
                                        person.name
                                    )}
                                </strong>

                                <p>
                                    ${
                                        last
                                            ? escapeHTML(
                                                last.text
                                            )
                                            : "Start the conversation"
                                    }
                                </p>

                            </div>


                            <span
                                class="
                                    chat-list-item-time
                                "
                            >
                                ${
                                    last
                                        ? formatTime(
                                            last.createdAt
                                        )
                                        : ""
                                }
                            </span>

                        </article>
                    `;
                }
            )
            .join("");


    $$(".chat-list-item")
        .forEach(
            (item) => {

                item.addEventListener(
                    "click",
                    () =>
                        openChat(
                            item.dataset.personId
                        )
                );
            }
        );
}


function openChat(
    personId
) {

    const person =
        state.people.find(
            (item) =>
                item.id ===
                personId
        );


    if (!person) {
        return;
    }


    state.activePersonId =
        person.id;

    saveState();

    switchView(
        "chats"
    );
}


function renderActiveChat() {

    const person =
        currentPerson();


    if (!person) {

        chatEmptyState.classList.remove(
            "hidden"
        );

        activeChat.classList.add(
            "hidden"
        );

        return;
    }


    chatEmptyState.classList.add(
        "hidden"
    );

    activeChat.classList.remove(
        "hidden"
    );


    chatUserName.textContent =
        person.name;

    chatUserStatus.textContent =
        person.status ||
        "Available";

    chatAvatar.textContent =
        person.initials;


    renderMessages();
}


function renderMessages() {

    const person =
        currentPerson();


    if (!person) {

        messages.innerHTML =
            "";

        return;
    }


    const items =
        Array.isArray(
            person.messages
        )
            ? person.messages
            : [];


    if (!items.length) {

        messages.innerHTML = `

            <div
                class="chat-empty"
            >

                <div
                    class="empty-illustration"
                >

                    <div
                        class="empty-ring"
                    ></div>

                    <span>
                        ⌁
                    </span>

                </div>


                <p class="eyebrow">
                    NEW CONVERSATION
                </p>

                <h2>
                    Say hello to
                    ${escapeHTML(
                        person.name
                    )}.
                </h2>

                <p>
                    Start with something simple.
                </p>

            </div>
        `;

        return;
    }


    messages.innerHTML =
        items
            .map(
                (message) => `

                    <div
                        class="
                            message
                            ${
                                message.sender ===
                                "me"
                                    ? "sent"
                                    : "received"
                            }
                        "
                    >

                        <div>

                            <div
                                class="
                                    message-bubble
                                "
                            >
                                ${escapeHTML(
                                    message.text
                                )}
                            </div>


                            <div
                                class="
                                    message-meta
                                "
                            >
                                ${formatTime(
                                    message.createdAt
                                )}
                            </div>

                        </div>

                    </div>
                `
            )
            .join("");


    messages.scrollTop =
        messages.scrollHeight;
}


messageForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const person =
            currentPerson();

        const text =
            messageInput.value.trim();


        if (!person) {

            showToast(
                "Choose someone first.",
                "error"
            );

            return;
        }


        if (!text) {
            return;
        }


        if (
            !Array.isArray(
                person.messages
            )
        ) {

            person.messages = [];
        }


        person.messages.push({

            id:
                createId(
                    "message"
                ),

            text,

            sender:
                "me",

            createdAt:
                new Date()
                    .toISOString()
        });


        messageInput.value =
            "";

        saveState();

        renderMessages();

        renderChatList(
            chatSearchInput.value.trim()
        );
    }
);


/* ==================================================
   MOMENTS
================================================== */

createMomentButton.addEventListener(
    "click",
    openMomentComposer
);


quickMomentButton.addEventListener(
    "click",
    openMomentComposer
);


closeMomentModal.addEventListener(
    "click",
    () =>
        closeModalSafe(
            momentModal
        )
);


momentModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            momentModal
        ) {

            closeModalSafe(
                momentModal
            );
        }
    }
);


momentText.addEventListener(
    "input",
    () => {

        momentCharacterCount.textContent =
            `${momentText.value.length}`;
    }
);


function openMomentComposer() {

    momentText.value =
        "";

    momentCharacterCount.textContent =
        "0";

    openModal(
        momentModal
    );


    setTimeout(
        () =>
            momentText.focus(),
        40
    );
}


publishMomentButton.addEventListener(
    "click",
    () => {

        const text =
            momentText.value.trim();


        if (!text) {

            showToast(
                "Write something first.",
                "error"
            );

            return;
        }


        state.moments.unshift({

            id:
                createId(
                    "moment"
                ),

            text,

            createdAt:
                new Date()
                    .toISOString()
        });


        saveState();

        renderMoments();


        momentText.value =
            "";

        momentCharacterCount.textContent =
            "0";


        closeModalSafe(
            momentModal
        );


        showToast(
            "Moment shared."
        );
    }
);


function renderMoments() {

    if (!state.moments.length) {

        momentList.innerHTML = `

            <div
                class="moment-empty"
            >

                <p class="eyebrow">
                    QUIET FOR NOW
                </p>

                <h3>
                    Your first moment starts here.
                </h3>

                <p>
                    Share something small, not everything.
                </p>

            </div>
        `;

        return;
    }


    momentList.innerHTML =
        state.moments
            .map(
                (moment) => `

                    <article
                        class="moment-item"
                    >

                        <div
                            class="moment-item-head"
                        >

                            <div
                                class="
                                    avatar
                                    avatar-small
                                    avatar-gradient
                                "
                            >
                                ${escapeHTML(
                                    getInitials(
                                        state.profile.name
                                    )
                                )}
                            </div>


                            <div>

                                <strong>
                                    ${escapeHTML(
                                        state.profile.name
                                    )}
                                </strong>

                                <span>
                                    •
                                    ${formatTime(
                                        moment.createdAt
                                    )}
                                </span>

                            </div>

                        </div>


                        <p>
                            ${escapeHTML(
                                moment.text
                            )}
                        </p>

                    </article>
                `
            )
            .join("");
}


/* ==================================================
   MY VIBE
================================================== */

saveVibeButton.addEventListener(
    "click",
    () => {

        state.vibe.mood =
            vibeMood.value;

        state.vibe.activity =
            vibeActivity.value.trim();

        state.vibe.note =
            vibeNote.value.trim();

        state.vibe.visible =
            vibeVisible.checked;


        saveState();

        renderVibe();

        showToast(
            "VYBE updated."
        );
    }
);


function renderVibe() {

    renderProfileIdentity();


    vibeMood.value =
        state.vibe.mood ||
        "";

    vibeActivity.value =
        state.vibe.activity ||
        "";

    vibeNote.value =
        state.vibe.note ||
        "";

    vibeVisible.checked =
        state.vibe.visible !==
        false;


    if (
        !state.vibe.visible
    ) {

        vibePreviewMood.textContent =
            "VYBE hidden";

        vibePreviewActivity.textContent =
            "People will only see your basic profile.";

        vibePreviewNote.textContent =
            "Turn visibility on to show your current VYBE.";

        return;
    }


    if (
        !state.vibe.mood &&
        !state.vibe.activity &&
        !state.vibe.note
    ) {

        vibePreviewMood.textContent =
            "VYBE not set";

        vibePreviewActivity.textContent =
            "Tell people what you're up to.";

        vibePreviewNote.textContent =
            "Your short note will appear here.";

        return;
    }


    vibePreviewMood.textContent =
        state.vibe.activity

            ? `${state.vibe.mood || "Current"} • ${state.vibe.activity}`

            : (
                state.vibe.mood ||
                "Current VYBE"
            );


    vibePreviewActivity.textContent =
        state.vibe.note ||
        "Shared with your people.";


    vibePreviewNote.textContent =
        state.vibe.note ||
        "Your people can see this on your profile.";
}


/* ==================================================
   INITIAL RENDER
================================================== */

function renderAll() {

    renderProfileIdentity();

    renderPeople();

    renderChatList();

    renderActiveChat();

    renderMoments();

    renderVibe();
}


applySettings();

renderAll();

showLogin();