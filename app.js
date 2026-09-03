/**
 * ONYX - CORE APPLICATION CONTROLLER
 * Controls conversational terminal states, live previews, custom cursors, magnetic physics, and File System exports.
 */

// --- 1. APPLICATION STATE ---
const state = {
    // User Profile
    name: "N. Hemnath",
    department: "AIDS",
    rollNumber: "21222100100",
    bio: "Artificial Intelligence & Data Science specialist passionate about neural network architectures, high-tech agent systems, and cinematic web experiences.",
    skills: "Python, PyTorch, TensorFlow, JavaScript, GSAP, Deep Learning, SQL, Computer Vision",
    certificates: "Google AI Professional Certificate, AWS Machine Learning Specialty, DeepLearning.AI Specialization, Onyx Engineering Honor",
    selectedTemplate: "cosmic",
    avatarBase64: null,
    
    // UI Mechanics
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    magneticButtons: [],
    
    // Prompt & Upload trackers
    prompt: "",
    googleName: "N. Hemnath",
    googleAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    certFiles: [],

    // History Dashboard State
    history: [],
    activeHistoryId: null
};

// --- 2. INITIALIZATION ON LOAD ---
document.addEventListener("DOMContentLoaded", () => {
    // A. Setup starfield canvas
    initStarfield();

    // B. Setup custom cursors & loop
    initCursorLoop();

    // C. Setup magnetic elements
    registerMagneticButtons();

    // D. Bind text fields in editor sidebar to state updates
    bindEditorFields();
    
    // E. Initialize Clock
    updateClock();
    setInterval(updateClock, 1000);

    // F. Initialize History Dashboard State & Seed Mock Item
    initHistoryState();
});

function updateClock() {
    const timeEl = document.getElementById("system-time");
    if (timeEl) {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        timeEl.innerText = `ONYX OS // SECURE CONNECTION // ${hrs}:${mins}:${secs}`;
    }
}

// --- 3. CANVAS STARFIELD WITH PARALLAX ---
const canvasState = {
    canvas: null,
    ctx: null,
    stars: []
};

function initStarfield() {
    canvasState.canvas = document.getElementById("space-canvas");
    if (!canvasState.canvas) return;
    canvasState.ctx = canvasState.canvas.getContext("2d");

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Populate initial stars
    for (let i = 0; i < 150; i++) {
        canvasState.stars.push({
            x: Math.random() * canvasState.canvas.width,
            y: Math.random() * canvasState.canvas.height,
            radius: Math.random() * 1.5 + 0.2,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.04 + 0.01,
            depth: Math.random() * 1.2 + 0.3 // parallax depth factor
        });
    }
}

function resizeCanvas() {
    if (!canvasState.canvas) return;
    canvasState.canvas.width = window.innerWidth;
    canvasState.canvas.height = window.innerHeight;
}

function drawStarfield() {
    const { canvas, ctx, stars } = canvasState;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        
        // Vertical drift
        s.y -= s.speed;
        if (s.y < 0) s.y = canvas.height;

        // Parallax coordinates shift based on mouse relative to center
        const mouseDx = (state.mouse.x - window.innerWidth / 2) * 0.015 * s.depth;
        const mouseDy = (state.mouse.y - window.innerHeight / 2) * 0.015 * s.depth;

        let renderX = s.x - mouseDx;
        let renderY = s.y - mouseDy;

        // Wrap around borders
        if (renderX < 0) renderX += canvas.width;
        if (renderX > canvas.width) renderX -= canvas.width;
        if (renderY < 0) renderY += canvas.height;
        if (renderY > canvas.height) renderY -= canvas.height;

        ctx.beginPath();
        ctx.arc(renderX, renderY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
    }
}

// --- 4. FLUID PHYSICS CUSTOM CURSOR ---
function initCursorLoop() {
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");

    window.addEventListener("mousemove", (e) => {
        state.mouse.x = e.clientX;
        state.mouse.y = e.clientY;
        
        // Immediate position for center dot
        if (cursorDot) {
            cursorDot.style.left = `${state.mouse.x}px`;
            cursorDot.style.top = `${state.mouse.y}px`;
        }

        // Apply mouse-move parallax on ambient glow circles
        const glows = document.querySelectorAll(".ambient-glow");
        glows.forEach((glow, idx) => {
            const factor = (idx + 1) * 0.03;
            const dx = (state.mouse.x - window.innerWidth / 2) * factor;
            const dy = (state.mouse.y - window.innerHeight / 2) * factor;
            glow.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        });
    });

    // Custom animation tick
    function tick() {
        // Redraw starfield
        drawStarfield();

        // Cursor ring trailing with linear interpolation (lerp)
        const activeMagnet = state.magneticButtons.find(btn => btn.isHovered);
        
        if (activeMagnet && cursorRing) {
            // Snapped state: Lock outer ring around the button boundaries
            const rect = activeMagnet.element.getBoundingClientRect();
            const targetX = rect.left + rect.width / 2;
            const targetY = rect.top + rect.height / 2;

            state.cursor.x += (targetX - state.cursor.x) * 0.22;
            state.cursor.y += (targetY - state.cursor.y) * 0.22;

            cursorRing.style.left = `${state.cursor.x}px`;
            cursorRing.style.top = `${state.cursor.y}px`;
        } else if (cursorRing) {
            // Normal trailing state
            state.cursor.x += (state.mouse.x - state.cursor.x) * 0.15;
            state.cursor.y += (state.mouse.y - state.cursor.y) * 0.15;

            cursorRing.style.left = `${state.cursor.x}px`;
            cursorRing.style.top = `${state.cursor.y}px`;
        }

        // Run magnetic button transformations
        updateMagneticPhysics();

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// --- 5. MAGNETIC UI INTERACTION ---
function registerMagneticButtons() {
    // Register buttons by IDs
    const buttonIds = ["googleLoginBtn", "githubLoginBtn", "githubPushBtn", "generateBtn", "exportBtn", "plusAvatarBtn", "plusCertBtn", "chooserCustomBtn"];
    
    buttonIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        const record = {
            id: id,
            element: el,
            parent: el.parentElement,
            isHovered: false,
            // Track translated coords
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0
        };

        // Event triggers
        el.addEventListener("mouseenter", () => {
            record.isHovered = true;
            
            const cursorRing = document.getElementById("cursor-ring");
            const cursorDot = document.getElementById("cursor-dot");
            if (cursorRing) {
                cursorRing.classList.add("magnet-locked");
                if (id === "exportBtn") cursorRing.classList.add("magnet-locked-export");
                if (id === "generateBtn") cursorRing.classList.add("magnet-locked-generate");
                if (id === "chooserCustomBtn") cursorRing.classList.add("magnet-locked-custom");
                if (id === "plusAvatarBtn" || id === "plusCertBtn") cursorRing.classList.add("magnet-locked-plus");
            }
            if (cursorDot) cursorDot.classList.add("magnet-locked");
        });

        el.addEventListener("mouseleave", () => {
            record.isHovered = false;
            record.targetX = 0;
            record.targetY = 0;

            const cursorRing = document.getElementById("cursor-ring");
            const cursorDot = document.getElementById("cursor-dot");
            if (cursorRing) {
                cursorRing.classList.remove("magnet-locked");
                cursorRing.classList.remove("magnet-locked-export");
                cursorRing.classList.remove("magnet-locked-generate");
                cursorRing.classList.remove("magnet-locked-custom");
                cursorRing.classList.remove("magnet-locked-plus");
            }
            if (cursorDot) cursorDot.classList.remove("magnet-locked");
        });

        state.magneticButtons.push(record);
    });
}

function updateMagneticPhysics() {
    state.magneticButtons.forEach(btn => {
        const rect = btn.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = state.mouse.x - centerX;
        const dy = state.mouse.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const triggerRadius = 130;

        if (distance < triggerRadius) {
            // Apply magnetic attraction
            const pullFactor = (triggerRadius - distance) / triggerRadius;
            const easePull = Math.pow(pullFactor, 1.8);
            
            // Sub-elements transform weights (parallax layering)
            btn.targetX = dx * easePull * 0.45;
            btn.targetY = dy * easePull * 0.45;

            // Highlight proximity on custom cursor
            const cursorRing = document.getElementById("cursor-ring");
            if (cursorRing && !btn.isHovered) {
                cursorRing.classList.add("magnet-near");
            }
        } else {
            // Reset proximity indicator
            const cursorRing = document.getElementById("cursor-ring");
            if (cursorRing && !state.magneticButtons.some(b => b.isHovered)) {
                cursorRing.classList.remove("magnet-near");
            }
        }

        // Apply smooth lerping on button translation coordinates
        btn.x += (btn.targetX - btn.x) * 0.12;
        btn.y += (btn.targetY - btn.y) * 0.12;

        // Apply transforms to core layers
        btn.element.style.transform = `translate3d(${btn.x}px, ${btn.y}px, 0)`;
        
        // Parallax depth offsets on inner layers
        const glow = btn.element.querySelector(".btn-glow-layer");
        const body = btn.element.querySelector(".btn-body-layer");
        const content = btn.element.querySelector(".btn-content-layer");

        if (glow) glow.style.transform = `translate3d(${btn.x * 0.5}px, ${btn.y * 0.5}px, 0)`;
        if (body) body.style.transform = `translate3d(${btn.x * 0.8}px, ${btn.y * 0.8}px, 0)`;
        if (content) content.style.transform = `translate3d(${btn.x * 1.1}px, ${btn.y * 1.1}px, 10px)`;
    });
}

// --- 6. GOOGLE SIGN IN ACTION & ACCOUNT CHOOSER ---
function triggerGoogleLogin() {
    const btn = document.getElementById("googleLoginBtn");
    const chooser = document.getElementById("googleChooser");

    if (btn) btn.style.display = "none";
    if (chooser) chooser.classList.remove("hidden");
}

function selectGoogleAccount(name, avatarUrl) {
    const chooser = document.getElementById("googleChooser");
    const loader = document.getElementById("authLoading");
    const statusText = document.getElementById("authStatusText");

    if (chooser) chooser.classList.add("hidden");
    if (loader) loader.classList.remove("hidden");

    state.name = name;
    state.googleAvatar = avatarUrl;

    setTimeout(() => {
        if (statusText) statusText.innerText = "Securing OAuth 2.0 Credentials...";
    }, 600);

    setTimeout(() => {
        if (statusText) statusText.innerText = "Establishing encrypted profile gateway...";
    }, 1200);

    setTimeout(() => {
        if (statusText) statusText.innerHTML = "<span style='color: #10b981;'>✔ GATEWAY LOCK RESOLVED</span>";
    }, 1800);

    setTimeout(() => {
        const screen1 = document.getElementById("screenAuth");
        const screen2 = document.getElementById("screenPromptSearch");
        
        if (screen1) screen1.classList.add("hidden");
        if (screen2) {
            screen2.classList.remove("hidden");
            // Set Google Display Info
            document.getElementById("googleNameDisplay").innerText = state.name;
            document.getElementById("googleAvatarImg").src = state.googleAvatar;
            
            // Focus Prompt Bar
            const promptArea = document.getElementById("portfolioPrompt");
            if (promptArea) {
                promptArea.focus();
                // Setup key listeners
                promptArea.addEventListener("input", updatePromptStats);
            }
        }
    }, 2400);
}

function selectCustomGoogleAccount() {
    const input = document.getElementById("customGoogleName");
    const val = input.value.trim() || "Jane Doe";
    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100";
    selectGoogleAccount(val, defaultAvatar);
}

// --- 7. PROMPT SEARCH & FILE ATTACHMENTS SYSTEM ---
function updatePromptStats() {
    const promptArea = document.getElementById("portfolioPrompt");
    const charCount = document.getElementById("promptCharCount");
    if (promptArea && charCount) {
        charCount.innerText = `${promptArea.value.length} characters`;
    }
}

function triggerFileUpload(inputId) {
    const input = document.getElementById(inputId);
    if (input) input.click();
}

// Store uploaded files data URLs
state.avatarBase64 = null;
state.certFiles = []; // array of objects { name: '', dataUrl: '' }

function handlePromptFileUploader(event, type) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
            const dataUrl = e.target.result;
            if (type === "avatar") {
                state.avatarBase64 = dataUrl;
                renderAttachmentPills();
            } else if (type === "cert") {
                state.certFiles.push({
                    name: file.name,
                    dataUrl: dataUrl
                });
                renderAttachmentPills();
            }
        };

        reader.readAsDataURL(file);
    }
}

function renderAttachmentPills() {
    const grid = document.getElementById("attachmentGrid");
    if (!grid) return;

    grid.innerHTML = "";

    // Render Avatar Badge
    if (state.avatarBase64) {
        const pill = document.createElement("div");
        pill.className = "attach-pill";
        pill.innerHTML = `
            <img src="${state.avatarBase64}" class="attach-thumb">
            <span>Photo Attached</span>
            <button class="attach-remove" onclick="removeAttachment('avatar', 0)">×</button>
        `;
        grid.appendChild(pill);
    }

    // Render Certifications
    state.certFiles.forEach((cert, idx) => {
        const pill = document.createElement("div");
        pill.className = "attach-pill";
        pill.innerHTML = `
            <span class="attach-type-icon">📎</span>
            <span>${cert.name.length > 15 ? cert.name.substring(0, 12) + '...' : cert.name}</span>
            <button class="attach-remove" onclick="removeAttachment('cert', ${idx})">×</button>
        `;
        grid.appendChild(pill);
    });
}

function removeAttachment(type, index) {
    if (type === "avatar") {
        state.avatarBase64 = null;
    } else if (type === "cert") {
        state.certFiles.splice(index, 1);
    }
    renderAttachmentPills();
}

// --- 8. HISTORY DASHBOARD & STATE MANAGEMENT ---
function initHistoryState() {
    try {
        const saved = localStorage.getItem("onyx_portfolio_history");
        if (saved) {
            state.history = JSON.parse(saved);
        }
    } catch (e) {
        console.warn("Could not parse localStorage history:", e);
    }

    // Pre-populate mock history item if history is empty
    if (!state.history || state.history.length === 0) {
        const mockUserData = {
            name: "N. Hemnath",
            department: "AIDS",
            rollNumber: "21222100100",
            bio: "Artificial Intelligence & Data Science specialist passionate about neural network architectures, high-tech agent systems, and cinematic web experiences.",
            skills: "Python, PyTorch, TensorFlow, JavaScript, GSAP, Deep Learning, SQL, Computer Vision",
            certificates: "Google AI Professional Certificate, AWS Machine Learning Specialty, DeepLearning.AI Specialization, Onyx Engineering Honor",
            prompt: "High-Tech AI & Data Science Cosmic Portfolio with GSAP animations",
            selectedTemplate: "cosmic"
        };

        const mockHtml = typeof generateCosmicPortfolio === "function" 
            ? generateCosmicPortfolio(mockUserData) 
            : (typeof buildPortfolioHTML === "function" ? buildPortfolioHTML(mockUserData) : "");

        const mockItem = {
            id: "hemnath-aids-mock",
            date: "Sep 03, 2026 • 23:08",
            name: "N. Hemnath",
            department: "AIDS",
            prompt: "High-Tech AI & Data Science Cosmic Portfolio with GSAP animations",
            html: mockHtml,
            userData: mockUserData
        };

        state.history = [mockItem];
        saveHistoryToLocalStorage();
    }

    renderHistorySidebar();
    if (state.history.length > 0) {
        selectHistoryItem(state.history[0].id, false);
    }
}

function saveHistoryToLocalStorage() {
    try {
        localStorage.setItem("onyx_portfolio_history", JSON.stringify(state.history));
    } catch (e) {
        console.warn("Failed to write to localStorage:", e);
    }
}

function renderHistorySidebar(filterText = "") {
    const listContainer = document.getElementById("historyList");
    const countBadge = document.getElementById("historyCountBadge");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    const query = (filterText || "").trim().toLowerCase();
    const filtered = state.history.filter(item => {
        if (!query) return true;
        return (item.name && item.name.toLowerCase().includes(query)) ||
               (item.department && item.department.toLowerCase().includes(query)) ||
               (item.prompt && item.prompt.toLowerCase().includes(query));
    });

    if (countBadge) {
        countBadge.innerText = `${filtered.length} Saved`;
    }

    if (filtered.length === 0) {
        listContainer.innerHTML = `<div style="color: var(--text-muted); font-size: 0.8rem; font-family: var(--font-mono); text-align: center; padding: 2rem 0;">No matching portfolios found</div>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = `history-item-card ${item.id === state.activeHistoryId ? 'active' : ''}`;
        card.onclick = () => selectHistoryItem(item.id, true);

        card.innerHTML = `
            <div class="history-card-top">
                <span class="history-card-name">${item.name || 'Untitled'}</span>
                <span class="history-dept-badge">${item.department || 'GENERAL'}</span>
            </div>
            <div class="history-prompt-snippet">${item.prompt || 'Cosmic Portfolio'}</div>
            <div class="history-card-date">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>${item.date}</span>
            </div>
        `;

        listContainer.appendChild(card);
    });
}

function selectHistoryItem(id, animate = true) {
    const item = state.history.find(h => h.id === id);
    if (!item) return;

    state.activeHistoryId = id;

    // Update active highlight classes in history sidebar
    renderHistorySidebar(document.getElementById("historySearchInput")?.value || "");

    // Populate editor fields with selected item's userData
    if (item.userData) {
        Object.assign(state, item.userData);
        if (document.getElementById("editName")) document.getElementById("editName").value = item.userData.name || "";
        if (document.getElementById("editDept")) document.getElementById("editDept").value = item.userData.department || "";
        if (document.getElementById("editRoll")) document.getElementById("editRoll").value = item.userData.rollNumber || "";
        if (document.getElementById("editBio")) document.getElementById("editBio").value = item.userData.bio || "";
        if (document.getElementById("editSkills")) document.getElementById("editSkills").value = item.userData.skills || "";
        if (document.getElementById("editCert")) document.getElementById("editCert").value = item.userData.certificates || "";
    }

    // Update header preview text
    const badgeText = document.getElementById("previewBadgeText");
    if (badgeText) {
        badgeText.innerText = `Live Core Matrix: ${item.name} (${item.department})`;
    }

    // GSAP smooth transition animation on preview frame
    const iframeWrapper = document.getElementById("previewIframeWrapper");
    if (iframeWrapper && typeof gsap !== "undefined" && animate) {
        gsap.fromTo(iframeWrapper,
            { opacity: 0, y: 15, scale: 0.99 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" }
        );
    }

    // Render live HTML string inside preview iframe
    const iframe = document.getElementById("previewIframe");
    if (iframe) {
        iframe.srcdoc = item.html;
    }
}

function filterHistoryList(val) {
    renderHistorySidebar(val);
}

function openPromptSearchScreen() {
    const screen1 = document.getElementById("screenAuth");
    const screen2 = document.getElementById("screenPromptSearch");
    const screen3 = document.getElementById("screenWorkspace");

    if (screen1) screen1.classList.add("hidden");
    if (screen3) screen3.classList.add("hidden");
    if (screen2) screen2.classList.remove("hidden");
}

function toggleEditorDrawer() {
    const drawer = document.getElementById("editorDrawer");
    if (!drawer) return;

    drawer.classList.toggle("hidden");
    if (!drawer.classList.contains("hidden")) {
        if (typeof gsap !== "undefined") {
            gsap.fromTo(drawer,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
        }
    }
}

// --- 9. PROMPT PORTFOLIO GENERATION CORE ---
function compilePromptPortfolio() {
    const promptArea = document.getElementById("portfolioPrompt");
    const prompt = promptArea ? promptArea.value.trim() : "";
    const promptLower = prompt.toLowerCase();
    
    // Customize state values based on prompt
    state.name = state.googleName || "N. Hemnath";
    state.department = "AIDS";
    state.rollNumber = "212221" + Math.floor(10000 + Math.random() * 90000);
    state.bio = prompt ? `Compiled from Onyx Prompt: "${prompt}"` : "Artificial Intelligence & Data Science specialist building high-performance cosmic web applications.";
    state.skills = "Python, PyTorch, TensorFlow, JavaScript, GSAP, Deep Learning, SQL, Computer Vision";
    
    if (promptLower.includes("cyber") || promptLower.includes("security")) {
        state.department = "Cybersecurity & Networks";
        state.skills = "Python, Linux, Wireshark, Cryptography, JS, Bash";
    } else if (promptLower.includes("ui") || promptLower.includes("ux") || promptLower.includes("designer")) {
        state.department = "HCI & UX Design";
        state.skills = "Figma, Wireframing, CSS, HTML5, User Research, JS";
    }

    if (state.certFiles.length > 0) {
        state.certificates = state.certFiles.map(c => c.name.replace(/\.[^/.]+$/, "")).join(", ");
    } else {
        state.certificates = "Google AI Professional Certificate, AWS Machine Learning Specialty, DeepLearning.AI Specialization";
    }

    const userDataCopy = {
        name: state.name,
        department: state.department,
        rollNumber: state.rollNumber,
        bio: state.bio,
        skills: state.skills,
        certificates: state.certificates,
        avatarBase64: state.avatarBase64,
        prompt: prompt || "Custom Cosmic Portfolio Compilation"
    };

    const compiledHTML = typeof generateCosmicPortfolio === "function"
        ? generateCosmicPortfolio(userDataCopy)
        : (typeof buildPortfolioHTML === "function" ? buildPortfolioHTML(userDataCopy) : "");

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + 
                    " • " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newItem = {
        id: "item-" + Date.now(),
        date: dateStr,
        name: userDataCopy.name,
        department: userDataCopy.department,
        prompt: userDataCopy.prompt,
        html: compiledHTML,
        userData: userDataCopy
    };

    // Save to history list
    state.history.unshift(newItem);
    saveHistoryToLocalStorage();

    // Transition to Screen 3: Workspace Dashboard
    const screen2 = document.getElementById("screenPromptSearch");
    const screen3 = document.getElementById("screenWorkspace");

    if (screen2) screen2.classList.add("hidden");
    if (screen3) screen3.classList.remove("hidden");

    selectHistoryItem(newItem.id, true);
    showToast("HIGH-TECH GSAP PORTFOLIO GENERATED & SAVED!");
}

// --- 10. EDITOR SIDEBAR PANEL SYNCS ---
function bindEditorFields() {
    const inputs = ["editName", "editDept", "editRoll", "editBio", "editSkills", "editCert"];
    
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener("input", (e) => {
            const field = id.replace("edit", "").toLowerCase();
            let stateField = field;
            if (field === "dept") stateField = "department";
            if (field === "roll") stateField = "rollNumber";
            if (field === "cert") stateField = "certificates";

            state[stateField] = e.target.value;

            // Regenerate HTML for current active item
            if (state.activeHistoryId) {
                const activeItem = state.history.find(h => h.id === state.activeHistoryId);
                if (activeItem) {
                    activeItem.name = state.name;
                    activeItem.department = state.department;
                    if (!activeItem.userData) activeItem.userData = {};
                    activeItem.userData[stateField] = e.target.value;

                    const updatedHTML = typeof generateCosmicPortfolio === "function" 
                        ? generateCosmicPortfolio(activeItem.userData)
                        : buildPortfolioHTML(state);

                    activeItem.html = updatedHTML;
                    saveHistoryToLocalStorage();

                    const iframe = document.getElementById("previewIframe");
                    if (iframe) iframe.srcdoc = updatedHTML;

                    renderHistorySidebar(document.getElementById("historySearchInput")?.value || "");
                }
            }
        });
    });
}

function selectTheme(themeKey) {
    state.selectedTemplate = themeKey;
    updateLivePreview();
}

function updateLivePreview() {
    const iframe = document.getElementById("previewIframe");
    if (!iframe) return;

    const compiledHTML = typeof generateCosmicPortfolio === "function"
        ? generateCosmicPortfolio(state)
        : buildPortfolioHTML(state);

    iframe.srcdoc = compiledHTML;
}

// --- 11. NATIVE FILE SYSTEM DIRECTORY ACCESS API EXPORTER ---
async function exportPortfolio() {
    const activeItem = state.history.find(h => h.id === state.activeHistoryId);
    const portfolioContent = activeItem 
        ? activeItem.html 
        : (typeof generateCosmicPortfolio === "function" ? generateCosmicPortfolio(state) : buildPortfolioHTML(state));

    // Try modern directory picker API first
    if ('showDirectoryPicker' in window) {
        try {
            // Prompt folder picker dialog
            const dirHandle = await window.showDirectoryPicker();
            
            // Create index.html file handle
            const fileHandle = await dirHandle.getFileHandle('index.html', { create: true });
            
            // Request write access stream
            const writable = await fileHandle.createWritable();
            
            // Write string content
            await writable.write(portfolioContent);
            
            // Close stream saving changes
            await writable.close();
            
            // Trigger floating success notification
            showToast("PORTFOLIO index.html WRITTEN TO LOCAL FOLDER!");
        } catch (err) {
            console.error("Directory Picker Error/Canceled: ", err);
            if (err.name !== 'AbortError') {
                triggerBlobDownload(portfolioContent);
            }
        }
    } else {
        // Fallback: browser does not support Directory Picker API
        triggerBlobDownload(portfolioContent);
    }
}

// Standard Blob Download helper
function triggerBlobDownload(content) {
    const blob = new Blob([content], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "index.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("ONYX COMPILATION DOWNLOADED VIA WEB BLOB STREAM");
}

// --- 12. GITHUB REST API AUTOMATED REPOSITORY & DEPLOYMENT PROTOCOL ---
async function pushToGitHub(htmlString, userAccessToken) {
    let token = userAccessToken || state.githubToken;

    if (!token) {
        token = prompt("Enter GitHub Access Token (with 'repo' scope to push to 'onyx-portfolio'):");
        if (!token) {
            showToast("GITHUB PUSH CANCELLED: OAUTH TOKEN REQUIRED");
            return;
        }
        state.githubToken = token;
    }

    const pushBtnText = document.getElementById("githubPushBtnText");
    if (pushBtnText) pushBtnText.innerText = "Authenticating...";

    try {
        // 1. Fetch authenticated user details
        const userRes = await fetch("https://api.github.com/user", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });

        if (!userRes.ok) {
            throw new Error(`Authentication Failed (${userRes.status}): Ensure token has 'repo' scope`);
        }

        const userData = await userRes.json();
        const username = userData.login;
        const repoName = "onyx-portfolio";

        if (pushBtnText) pushBtnText.innerText = "Creating Repo...";

        // 2. Create public repo if it doesn't already exist
        const createRepoRes = await fetch("https://api.github.com/user/repos", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: repoName,
                description: "High-Tech Cosmic Modular Portfolio compiled via Onyx Engine",
                private: false,
                auto_init: true
            })
        });

        if (createRepoRes.status !== 201 && createRepoRes.status !== 422) {
            const errJson = await createRepoRes.json();
            console.warn("Repo creation note:", createRepoRes.status, errJson);
        }

        if (pushBtnText) pushBtnText.innerText = "Checking SHA...";

        // 3. Check for existing index.html file to retrieve SHA
        let existingSha = null;
        try {
            const checkRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/index.html`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });
            if (checkRes.ok) {
                const checkData = await checkRes.json();
                existingSha = checkData.sha;
            }
        } catch (e) {
            console.log("No existing file, creating fresh commit.");
        }

        if (pushBtnText) pushBtnText.innerText = "Uploading HTML...";

        // 4. Safely Base64 encode the HTML string
        const encodedContent = btoa(unescape(encodeURIComponent(htmlString)));

        const payload = {
            message: "Deploy Onyx High-Tech Cosmic Portfolio",
            content: encodedContent,
            branch: "main"
        };
        if (existingSha) payload.sha = existingSha;

        // 5. Commit index.html to repository
        const putRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/index.html`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!putRes.ok) {
            const putErr = await putRes.json();
            throw new Error(putErr.message || "Failed to commit index.html");
        }

        const putData = await putRes.json();
        const repoUrl = `https://github.com/${username}/${repoName}`;

        if (pushBtnText) pushBtnText.innerText = "Pushed!";
        showToast(`DEPLOYED TO GITHUB: ${username}/${repoName}`);
        console.log("GitHub Deployment Successful:", repoUrl, putData);

        setTimeout(() => {
            if (pushBtnText) pushBtnText.innerText = "Push to GitHub";
        }, 4000);

    } catch (err) {
        console.error("GitHub Push Error:", err);
        showToast(`GITHUB ERROR: ${err.message}`);
        if (pushBtnText) pushBtnText.innerText = "Push Failed";
        setTimeout(() => {
            if (pushBtnText) pushBtnText.innerText = "Push to GitHub";
        }, 4000);
    }
}

function handlePushToGitHubClick() {
    const activeItem = state.history.find(h => h.id === state.activeHistoryId);
    const htmlContent = activeItem 
        ? activeItem.html 
        : (typeof generateCosmicPortfolio === "function" ? generateCosmicPortfolio(state) : buildPortfolioHTML(state));

    pushToGitHub(htmlContent, state.githubToken);
}

function showToast(message) {
    const toast = document.getElementById("toastNotice");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}
