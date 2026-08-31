/**
 * ONYX - CORE APPLICATION CONTROLLER
 * Controls conversational terminal states, live previews, custom cursors, magnetic physics, and File System exports.
 */

// --- 1. APPLICATION STATE ---
const state = {
    // User Profile
    name: "Jane Doe",
    department: "Computer Science & Engineering",
    rollNumber: "CSE-2026-088",
    bio: "I am a junior computer science student passionate about artificial intelligence, human-computer interaction, and building responsive frontend experiences.",
    skills: "JavaScript, HTML/CSS, React, Python, Git",
    certificates: "Google UX Design Professional Certificate, AWS Certified Developer",
    selectedTemplate: "cosmic",
    
    // UI Mechanics
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    
    // Magnetic Button trackers
    magneticButtons: [],
    
    // Terminal Wizard Flow
    currentStep: 0,
    terminalHistory: [],
    isTyping: false
};

// Conversational prompts list
const terminalPrompts = [
    {
        field: "name",
        prompt: "ACCESS GRANTED. INITIALIZING PROFILE BUILDER...\n\nENTER CREATOR FULL NAME:",
        placeholder: "e.g., Jane Doe"
    },
    {
        field: "department",
        prompt: "NAME LOGGED.\n\nENTER ACADEMIC DEPARTMENT / MAJOR:",
        placeholder: "e.g., Computer Science & Engineering"
    },
    {
        field: "rollNumber",
        prompt: "DEPARTMENT RECORDED.\n\nENTER STUDENT ID / ROLL NUMBER:",
        placeholder: "e.g., CSE-2026-088"
    },
    {
        field: "bio",
        prompt: "ROLL NUMBER INDEXED.\n\nPROVIDE A BRIEF PROFESSIONAL BIO / CREATOR STATEMENT:",
        placeholder: "A passionate student developer exploring..."
    },
    {
        field: "skills",
        prompt: "STATEMENT COMPILED.\n\nENTER CORE SKILLS (comma-separated):",
        placeholder: "HTML, CSS, JavaScript, React, Python"
    },
    {
        field: "certificates",
        prompt: "SKILLS INDEXED.\n\nENTER VALIDATED CREDENTIALS / CERTIFICATES (comma-separated):",
        placeholder: "Google UX Professional Certificate, AWS Certified Cloud Practitioner"
    }
];

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
    const buttonIds = ["googleLoginBtn", "termSendBtn", "exportBtn"];
    
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

// --- 6. GOOGLE SIGN IN ACTION ---
function triggerGoogleLogin() {
    const btn = document.getElementById("googleLoginBtn");
    const loader = document.getElementById("authLoading");
    const statusText = document.getElementById("authStatusText");

    if (btn) btn.style.display = "none";
    if (loader) loader.classList.remove("hidden");

    setTimeout(() => {
        if (statusText) statusText.innerText = "Securing OAuth 2.0 Credentials...";
    }, 800);

    setTimeout(() => {
        if (statusText) statusText.innerText = "Establishing encrypted profile gateway...";
    }, 1800);

    setTimeout(() => {
        if (statusText) statusText.innerHTML = "<span style='color: #10b981;'>✔ GATEWAY LOCK RESOLVED</span>";
    }, 2800);

    setTimeout(() => {
        // Transition to Screen 2: Conversational Terminal
        const screen1 = document.getElementById("screenAuth");
        const screen2 = document.getElementById("screenTerminal");
        
        if (screen1) screen1.classList.add("hidden");
        if (screen2) {
            screen2.classList.remove("hidden");
            // Focus terminal input
            const input = document.getElementById("terminalInput");
            if (input) input.focus();
            
            // Kick off conversational wizard
            initTerminalWizard();
        }
    }, 3600);
}

// --- 7. CONVERSATIONAL TERMINAL SYSTEM ---
function initTerminalWizard() {
    const screen = document.getElementById("terminalScreen");
    if (!screen) return;

    // Reset wizard
    state.currentStep = 0;
    screen.innerHTML = "";
    
    // First message print
    printTerminalLine("SYSTEM STATUS // ONYX PORTAL INITIALIZED SUCCESS", "sys");
    setTimeout(() => {
        promptNextStep();
    }, 800);

    // Bind terminal prompt form submit
    const termForm = document.getElementById("terminalPromptForm");
    if (termForm) {
        termForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleTerminalSubmit();
        });
    }

    // Keep focus on terminal text box when clicking the screen container
    screen.addEventListener("click", () => {
        const input = document.getElementById("terminalInput");
        if (input) input.focus();
    });
}

function printTerminalLine(text, type = "normal") {
    const screen = document.getElementById("terminalScreen");
    if (!screen) return;

    const line = document.createElement("div");
    line.className = `term-log ${type}`;
    screen.appendChild(line);

    // Typing effect for text line
    let index = 0;
    state.isTyping = true;
    
    function typeChar() {
        if (index < text.length) {
            line.innerHTML += text.charAt(index);
            index++;
            screen.scrollTop = screen.scrollHeight;
            setTimeout(typeChar, 10);
        } else {
            state.isTyping = false;
        }
    }
    typeChar();
}

function promptNextStep() {
    if (state.currentStep >= terminalPrompts.length) {
        // End of questions - load Engine Workspace
        printTerminalLine("\nDATA COMPILING PROCESS RESOLVED...", "success");
        setTimeout(() => {
            printTerminalLine("GENERATING SITE METRIC NODES...", "sys");
        }, 800);
        
        setTimeout(() => {
            printTerminalLine("LAUNCHING LIVE ENGINE CORE...", "success");
        }, 1800);

        setTimeout(() => {
            transitionToWorkspace();
        }, 2800);
        return;
    }

    const item = terminalPrompts[state.currentStep];
    printTerminalLine("\n" + item.prompt, "sys");

    const input = document.getElementById("terminalInput");
    if (input) {
        input.value = "";
        input.placeholder = item.placeholder;
        input.disabled = false;
        input.focus();
    }
}

function handleTerminalSubmit() {
    if (state.isTyping) return; // Prevent spamming while text prints

    const input = document.getElementById("terminalInput");
    if (!input) return;

    const value = input.value.trim();
    if (!value) return;

    // Log the user's input response in the terminal window
    printTerminalLine("> " + value, "normal");

    // Save user response to state
    const field = terminalPrompts[state.currentStep].field;
    state[field] = value;

    // Disable input while advancing
    input.disabled = true;
    
    // Advance step
    state.currentStep++;
    
    setTimeout(() => {
        promptNextStep();
    }, 600);
}

function transitionToWorkspace() {
    const screen2 = document.getElementById("screenTerminal");
    const screen3 = document.getElementById("screenWorkspace");

    if (screen2) screen2.classList.add("hidden");
    if (screen3) {
        screen3.classList.remove("hidden");
        
        // Sync terminal entries directly to the editor form sidebar
        document.getElementById("editName").value = state.name;
        document.getElementById("editDept").value = state.department;
        document.getElementById("editRoll").value = state.rollNumber;
        document.getElementById("editBio").value = state.bio;
        document.getElementById("editSkills").value = state.skills;
        document.getElementById("editCert").value = state.certificates;

        // Render preview
        updateLivePreview();
    }
}

// --- 8. EDITOR SIDEBAR PANEL SYNCS ---
function bindEditorFields() {
    const inputs = ["editName", "editDept", "editRoll", "editBio", "editSkills", "editCert"];
    
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener("input", (e) => {
            const field = id.replace("edit", "").toLowerCase();
            // Mapping special fields manually
            let stateField = field;
            if (field === "dept") stateField = "department";
            if (field === "roll") stateField = "rollNumber";
            if (field === "cert") stateField = "certificates";

            state[stateField] = e.target.value;
            
            // Re-render live preview IFrame
            updateLivePreview();
        });
    });
}

function selectTheme(themeKey) {
    state.selectedTemplate = themeKey;
    
    // Update active visual tags
    const opts = document.querySelectorAll(".theme-opt");
    opts.forEach(opt => {
        opt.classList.remove("active");
        if (opt.getAttribute("onclick").includes(themeKey)) {
            opt.classList.add("active");
        }
    });

    updateLivePreview();
}

// --- 9. REAL-TIME PREVIEW GENERATION ---
function updateLivePreview() {
    const iframe = document.getElementById("previewIframe");
    if (!iframe) return;

    // Use builder functions inside templates.js
    if (typeof buildPortfolioHTML === "function") {
        const compiledHTML = buildPortfolioHTML(state);
        iframe.srcdoc = compiledHTML;
    }
}

// --- 10. NATIVE FILE SYSTEM DIRECTORY ACCESS API EXPORTER ---
async function exportPortfolio() {
    // Generate compiled code
    const portfolioContent = buildPortfolioHTML(state);

    // Try modern directory picker API first
    if ('showDirectoryPicker' in window) {
        try {
            // Prompt folder picker dialog
            const dirHandle = await window.showDirectoryPicker();
            
            // Create index.html file handle
            const fileHandle = await dirHandle.getFileHandle('index.html', { create: true });
            
            // Request permissions write access stream
            const writable = await fileHandle.createWritable();
            
            // Write string content
            await writable.write(portfolioContent);
            
            // Close stream saving changes
            await writable.close();
            
            // Trigger floating success notification
            showToast("PORTFOLIO index.html WRITTEN TO LOCAL FOLDER!");
        } catch (err) {
            console.error("Directory Picker Error/Canceled: ", err);
            // Handle User Cancelation vs API write failure
            if (err.name !== 'AbortError') {
                // Trigger fallback download
                triggerBlobDownload(portfolioContent);
            }
        }
    } else {
        // Fallback: browser does not support Directory Picker API (e.g. Firefox/Safari)
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

function showToast(message) {
    const toast = document.getElementById("toastNotice");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}
