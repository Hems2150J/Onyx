/**
 * PORTFOLIA - MAIN APPLICATION LOGIC
 * Manages states, forms, events, preview renders, and File System exports.
 */

// Default starter profile state
const defaultState = {
    name: "Jane Doe",
    title: "Computer Science Student & Researcher",
    bio: "I am a junior computer science student passionate about artificial intelligence, human-computer interaction, and building responsive frontend experiences.",
    email: "jane.doe@university.edu",
    location: "Boston, MA",
    github: "janedoe",
    linkedin: "jane-doe-edu",
    skills: [
        { category: "Languages", items: ["Python", "Java", "JavaScript", "C++", "HTML/CSS"] },
        { category: "Frameworks & Tools", items: ["React", "Node.js", "Git", "GitHub Pages", "VS Code"] }
    ],
    projects: [
        { 
            name: "Smart Campus Dashboard", 
            desc: "Designed and implemented a real-time web portal tracking university study-space occupancies. Reduced search times by 40%.", 
            tech: "React, CSS Variables, Firebase, ChartJS", 
            link: "https://github.com/janedoe/smart-campus" 
        },
        { 
            name: "EcoNotify Engine", 
            desc: "A background service that sends daily air-quality analysis alerts to registered subscribers using environmental APIs.", 
            tech: "Node.js, Express, OpenWeather API", 
            link: "" 
        }
    ],
    education: [
        { school: "Massachusetts Tech", degree: "B.S. in Computer Science", year: "2023 - 2027" }
    ],
    experience: [
        { 
            company: "Dept of Computer Science", 
            role: "Undergraduate Research Assistant", 
            duration: "Sep 2025 - Present", 
            desc: "Assisting in building data visualizers for molecular sequence alignments. Co-authored a toolkit for sequence mappings." 
        },
        { 
            company: "TechCorps NGO", 
            role: "Web Design Instructor", 
            duration: "Summer 2025", 
            desc: "Instructed 30+ high school students on HTML/CSS foundations and responsive portfolio construction." 
        }
    ],
    selectedTemplate: "neoglow",
    themeColor: "blue",
    font: "plus-jakarta"
};

let portfolioState = {};

// On Load initialization
document.addEventListener("DOMContentLoaded", () => {
    // Check local storage for state
    const saved = localStorage.getItem("portfolia_state");
    if (saved) {
        try {
            portfolioState = JSON.parse(saved);
        } catch (e) {
            portfolioState = { ...defaultState };
        }
    } else {
        portfolioState = { ...defaultState };
    }

    // Bind static fields
    bindStaticFields();

    // Render Dynamic Form items
    renderDynamicForms();

    // Setup tabs
    setupTabSystem();

    // Apply active color and font selectors
    applyThemeSelections();

    // If already logged in, skip auth screen (for debugging, but let's always show it once for cool demo)
    const loggedIn = localStorage.getItem("portfolia_logged_in");
    if (loggedIn === "true") {
        document.getElementById("authScreen").classList.add("hidden");
        document.getElementById("appWorkspace").classList.remove("hidden");
        updateLivePreview(true);
    }
});

// Bind UI static elements to state changes
function bindStaticFields() {
    const fields = ['pName', 'pTitle', 'pBio', 'pEmail', 'pLocation', 'pGithub', 'pLinkedin'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Map state properties
            const prop = id.charAt(1).toLowerCase() + id.slice(2);
            el.value = portfolioState[prop] || "";
            
            el.addEventListener("input", (e) => {
                portfolioState[prop] = e.target.value;
                updateLivePreview();
            });
        }
    });
}

// Google Login Mock Animation Sequence
function triggerGoogleLogin() {
    const btn = document.getElementById("googleLoginBtn");
    const loader = document.getElementById("authLoading");
    const statusText = document.getElementById("authStatusText");

    btn.classList.add("hidden");
    loader.classList.remove("hidden");

    setTimeout(() => {
        statusText.innerText = "Authenticating with Jane Doe's account...";
    }, 800);

    setTimeout(() => {
        statusText.innerText = "Synchronizing profiles...";
    }, 1800);

    setTimeout(() => {
        statusText.innerHTML = "<span style='color: #10b981; font-weight: 700;'>✔ Connected as Jane Doe!</span>";
        localStorage.setItem("portfolia_logged_in", "true");
    }, 2800);

    setTimeout(() => {
        const auth = document.getElementById("authScreen");
        const work = document.getElementById("appWorkspace");
        
        auth.style.opacity = "0";
        auth.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            auth.classList.add("hidden");
            work.classList.remove("hidden");
            work.style.opacity = "0";
            setTimeout(() => {
                work.style.transition = "opacity 0.6s ease";
                work.style.opacity = "1";
                updateLivePreview(true);
                showToast("Workspace unlocked. Welcome, Jane!");
            }, 50);
        }, 300);
    }, 3800);
}

// Renders dynamic forms (skills, projects, etc.) without losing state
function renderDynamicForms() {
    renderSkillsForms();
    renderProjectsForms();
    renderEducationForms();
    renderExperienceForms();
}

// -------------------------------------------------------------
// Skills Category render & logic
// -------------------------------------------------------------
function renderSkillsForms() {
    const container = document.getElementById("skillsContainer");
    container.innerHTML = "";
    
    portfolioState.skills.forEach((cat, idx) => {
        const row = document.createElement("div");
        row.className = "dynamic-item-card";
        row.innerHTML = `
            <button class="card-remove-btn" onclick="removeSkillCategory(${idx})" title="Delete Section">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <div class="form-group">
                <label>Category Title</label>
                <input type="text" value="${cat.category}" placeholder="e.g., Programming Languages" oninput="updateSkillCategory(${idx}, this.value)">
            </div>
            <div class="form-group">
                <label>Skills (Comma-separated)</label>
                <input type="text" value="${cat.items.join(', ')}" placeholder="e.g., Python, C++, Go" oninput="updateSkillItems(${idx}, this.value)">
            </div>
        `;
        container.appendChild(row);
    });
}

function addSkillCategory(catName = "", items = "") {
    portfolioState.skills.push({
        category: catName || "New Category",
        items: items ? items.split(",").map(i => i.trim()) : []
    });
    renderSkillsForms();
    updateLivePreview();
}

function updateSkillCategory(idx, val) {
    portfolioState.skills[idx].category = val;
    updateLivePreview();
}

function updateSkillItems(idx, val) {
    portfolioState.skills[idx].items = val.split(",").map(i => i.trim()).filter(i => i.length > 0);
    updateLivePreview();
}

function removeSkillCategory(idx) {
    portfolioState.skills.splice(idx, 1);
    renderSkillsForms();
    updateLivePreview();
}

// -------------------------------------------------------------
// Projects render & logic
// -------------------------------------------------------------
function renderProjectsForms() {
    const container = document.getElementById("projectsContainer");
    container.innerHTML = "";
    
    portfolioState.projects.forEach((proj, idx) => {
        const card = document.createElement("div");
        card.className = "dynamic-item-card";
        card.innerHTML = `
            <button class="card-remove-btn" onclick="removeProjectItem(${idx})" title="Delete Project">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <div class="form-group">
                <label>Project Title</label>
                <input type="text" value="${proj.name}" placeholder="e.g., Campus Map App" oninput="updateProjectField(${idx}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Brief Description</label>
                <textarea rows="2" placeholder="Describe the purpose and your impact..." oninput="updateProjectField(${idx}, 'desc', this.value)">${proj.desc}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" value="${proj.tech || ''}" placeholder="e.g., React, Node, WebGL" oninput="updateProjectField(${idx}, 'tech', this.value)">
                </div>
                <div class="form-group">
                    <label>Project URL (Optional)</label>
                    <input type="text" value="${proj.link || ''}" placeholder="e.g., https://github.com/..." oninput="updateProjectField(${idx}, 'link', this.value)">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function addProjectItem() {
    portfolioState.projects.push({ name: "New Project", desc: "Short description.", tech: "", link: "" });
    renderProjectsForms();
    updateLivePreview();
}

function updateProjectField(idx, field, val) {
    portfolioState.projects[idx][field] = val;
    updateLivePreview();
}

function removeProjectItem(idx) {
    portfolioState.projects.splice(idx, 1);
    renderProjectsForms();
    updateLivePreview();
}

// -------------------------------------------------------------
// Education render & logic
// -------------------------------------------------------------
function renderEducationForms() {
    const container = document.getElementById("educationContainer");
    container.innerHTML = "";

    portfolioState.education.forEach((edu, idx) => {
        const card = document.createElement("div");
        card.className = "dynamic-item-card";
        card.innerHTML = `
            <button class="card-remove-btn" onclick="removeEducationItem(${idx})" title="Delete Entry">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <div class="form-group">
                <label>Institution / School</label>
                <input type="text" value="${edu.school}" placeholder="e.g., State University" oninput="updateEducationField(${idx}, 'school', this.value)">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Degree & Major</label>
                    <input type="text" value="${edu.degree}" placeholder="e.g., B.S. in Software Engineering" oninput="updateEducationField(${idx}, 'degree', this.value)">
                </div>
                <div class="form-group">
                    <label>Years / Timeline</label>
                    <input type="text" value="${edu.year}" placeholder="e.g., 2024 - Present" oninput="updateEducationField(${idx}, 'year', this.value)">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function addEducationItem() {
    portfolioState.education.push({ school: "New University", degree: "Bachelor's Degree", year: "" });
    renderEducationForms();
    updateLivePreview();
}

function updateEducationField(idx, field, val) {
    portfolioState.education[idx][field] = val;
    updateLivePreview();
}

function removeEducationItem(idx) {
    portfolioState.education.splice(idx, 1);
    renderEducationForms();
    updateLivePreview();
}

// -------------------------------------------------------------
// Experience render & logic
// -------------------------------------------------------------
function renderExperienceForms() {
    const container = document.getElementById("experienceContainer");
    container.innerHTML = "";

    portfolioState.experience.forEach((exp, idx) => {
        const card = document.createElement("div");
        card.className = "dynamic-item-card";
        card.innerHTML = `
            <button class="card-remove-btn" onclick="removeExperienceItem(${idx})" title="Delete Entry">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <div class="form-group">
                <label>Company / Organization</label>
                <input type="text" value="${exp.company}" placeholder="e.g., Google" oninput="updateExperienceField(${idx}, 'company', this.value)">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Role / Position</label>
                    <input type="text" value="${exp.role}" placeholder="e.g., Software Intern" oninput="updateExperienceField(${idx}, 'role', this.value)">
                </div>
                <div class="form-group">
                    <label>Timeline / Duration</label>
                    <input type="text" value="${exp.duration}" placeholder="e.g., June 2025 - August 2025" oninput="updateExperienceField(${idx}, 'duration', this.value)">
                </div>
            </div>
            <div class="form-group">
                <label>Description of Activities</label>
                <textarea rows="2" placeholder="Detail your accomplishments..." oninput="updateExperienceField(${idx}, 'desc', this.value)">${exp.desc}</textarea>
            </div>
        `;
        container.appendChild(card);
    });
}

function addExperienceItem() {
    portfolioState.experience.push({ company: "New Company", role: "Specialist", duration: "", desc: "" });
    renderExperienceForms();
    updateLivePreview();
}

function updateExperienceField(idx, field, val) {
    portfolioState.experience[idx][field] = val;
    updateLivePreview();
}

function removeExperienceItem(idx) {
    portfolioState.experience.splice(idx, 1);
    renderExperienceForms();
    updateLivePreview();
}

// -------------------------------------------------------------
// Live Preview engine & autosave
// -------------------------------------------------------------
let updateTimeout = null;

function updateLivePreview(immediate = false) {
    // Save to local storage
    localStorage.setItem("portfolia_state", JSON.stringify(portfolioState));

    if (updateTimeout) clearTimeout(updateTimeout);
    
    const delay = immediate ? 0 : 80;
    updateTimeout = setTimeout(() => {
        // Read templates selections
        const tRadios = document.getElementsByName("selectedTemplate");
        for (let rad of tRadios) {
            if (rad.checked) {
                portfolioState.selectedTemplate = rad.value;
                break;
            }
        }

        portfolioState.font = document.getElementById("fontSelect").value;

        // Render preview content
        const iframe = document.getElementById("livePreviewIframe");
        if (iframe) {
            const previewHTML = buildPortfolioHTML(portfolioState, true); // true = inline styles for iframe preview
            iframe.srcdoc = previewHTML;
        }
    }, delay);
}

// -------------------------------------------------------------
// Viewport & Customization settings
// -------------------------------------------------------------
function setDeviceView(device) {
    const wrapper = document.getElementById("previewWrapper");
    
    // Toggle active state in menu
    const devices = ['desktop', 'tablet', 'mobile'];
    devices.forEach(d => {
        const btn = document.getElementById(`btnDevice${d.charAt(0).toUpperCase() + d.slice(1)}`);
        if (btn) btn.classList.remove("active");
    });
    
    document.getElementById(`btnDevice${device.charAt(0).toUpperCase() + device.slice(1)}`).classList.add("active");

    // Set wrapper classes
    wrapper.className = `iframe-wrapper ${device}`;
}

function applyThemeSelections() {
    // Preset accent colors
    setAccentColor(portfolioState.themeColor || 'blue', false);
    
    // Preset font
    const fontSelect = document.getElementById("fontSelect");
    if (fontSelect) fontSelect.value = portfolioState.font || "plus-jakarta";

    // Preset template radios
    const tRadios = document.getElementsByName("selectedTemplate");
    for (let rad of tRadios) {
        if (rad.value === portfolioState.selectedTemplate) {
            rad.checked = true;
            break;
        }
    }
}

function setAccentColor(color, doRender = true) {
    portfolioState.themeColor = color;
    
    // Update theme selectors active state
    const dots = document.querySelectorAll(".color-dot");
    dots.forEach(d => {
        d.classList.remove("active");
        if (d.getAttribute("data-color") === color) {
            d.classList.add("active");
        }
    });

    // Update active variable color in editor itself
    const root = document.documentElement;
    const key = `accent-${color}`;
    const value = root.style.getPropertyValue(`--accent-${color}`) || getComputedStyle(root).getPropertyValue(`--accent-${color}`);
    root.style.setProperty('--accent', value);
    root.style.setProperty('--accent-glow', `rgba(${AccentColors[color].rgb}, 0.15)`);

    if (doRender) {
        updateLivePreview();
        showToast(`Accent color updated to ${color}`);
    }
}

// Tab Panels toggle system
function setupTabSystem() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));

            // Add active classes
            btn.classList.add("active");
            const targetId = `tab${btn.getAttribute("data-tab").charAt(0).toUpperCase() + btn.getAttribute("data-tab").slice(1)}`;
            const panel = document.getElementById(targetId);
            if (panel) panel.classList.add("active");
        });
    });
}

// Accordion expansion logic
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains("active");
    
    // Close other items (optional, but let's allow multi-open for easier scrolling, just toggle)
    item.classList.toggle("active");
}

// -------------------------------------------------------------
// Import / Export Operations
// -------------------------------------------------------------
function triggerImportJson() {
    document.getElementById("importJsonInput").click();
}

function handleImportJson(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // Simple validation check
            if (!data.name || !data.skills) {
                alert("Invalid portfolio-data file structure. Ensure name and skills exist.");
                return;
            }
            
            // Override state
            portfolioState = { ...defaultState, ...data };
            
            // Re-populate static fields
            bindStaticFields();

            // Re-render forms
            renderDynamicForms();

            // Apply style configs
            applyThemeSelections();

            // Refresh preview
            updateLivePreview(true);

            showToast("Portfolio state loaded successfully!");
        } catch (err) {
            alert("Error parsing JSON file: " + err.message);
        }
    };
    reader.readAsText(file);
}

// File System Access API Implementation
async function exportToLocalFolder() {
    try {
        if (!window.showDirectoryPicker) {
            alert('Your browser does not support the File System Access API. Please use a modern desktop version of Chrome or Edge.');
            return;
        }

        // Show directory selector
        const directoryHandle = await window.showDirectoryPicker({
            mode: 'readwrite'
        });

        // 1. Save index.html
        const indexHTML = buildPortfolioHTML(portfolioState, false); // false = link external style.css
        const indexFileHandle = await directoryHandle.getFileHandle('index.html', { create: true });
        const indexWritable = await indexFileHandle.createWritable();
        await indexWritable.write(indexHTML);
        await indexWritable.close();

        // 2. Save style.css
        const customCSS = buildPortfolioCSS(portfolioState);
        const cssFileHandle = await directoryHandle.getFileHandle('style.css', { create: true });
        const cssWritable = await cssFileHandle.createWritable();
        await cssWritable.write(customCSS);
        await cssWritable.close();

        // 3. Save README.md
        const readmeContent = buildReadmeMD(portfolioState.name);
        const readmeFileHandle = await directoryHandle.getFileHandle('README.md', { create: true });
        const readmeWritable = await readmeFileHandle.createWritable();
        await readmeWritable.write(readmeContent);
        await readmeWritable.close();

        // 4. Save portfolio-data.json (for re-importing later)
        const jsonContent = JSON.stringify(portfolioState, null, 2);
        const jsonFileHandle = await directoryHandle.getFileHandle('portfolio-data.json', { create: true });
        const jsonWritable = await jsonFileHandle.createWritable();
        await jsonWritable.write(jsonContent);
        await jsonWritable.close();

        showToast("Success! Web files saved to local folder.");

    } catch (error) {
        console.error("Export failed:", error);
        if (error.name !== 'AbortError') {
            alert('An error occurred during save: ' + error.message);
        }
    }
}

// Simple dynamic Toast notification
function showToast(message) {
    // Check if toast already exists
    let toast = document.getElementById("editorToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "editorToast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    
    toast.innerText = message;
    toast.classList.add("visible");

    // Hide after 3.5 seconds
    setTimeout(() => {
        toast.classList.remove("visible");
    }, 3500);
}
