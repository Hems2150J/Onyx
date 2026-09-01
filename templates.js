/**
 * ONYX - PORTFOLIO ENGINE & TEMPLATES
 * Generates beautiful, responsive student portfolio websites.
 */

// Available templates config
const PortfolioTemplates = {
    cosmic: {
        name: "Cosmic Nebula",
        description: "An atmospheric space-themed design with glowing neon gradients and floating stars.",
        render: (data) => renderCosmicTemplate(data)
    },
    cyber: {
        name: "Cyber Grid",
        description: "A dark cyberpunk console-inspired grid layout with sharp accents and interactive details.",
        render: (data) => renderCyberTemplate(data)
    }
};

function buildPortfolioHTML(state) {
    const templateKey = state.selectedTemplate || 'cosmic';
    const template = PortfolioTemplates[templateKey] || PortfolioTemplates.cosmic;
    return template.render(state);
}

// ==========================================
// COSMIC NEBULA TEMPLATE
// ==========================================
function renderCosmicTemplate(data) {
    const {
        name = "Jane Doe",
        department = "Computer Science & Engineering",
        rollNumber = "CSE-2026-088",
        bio = "An aspiring software engineer seeking to build products that make a difference.",
        skills = "JavaScript, CSS, HTML, Node.js, Python",
        certificates = "Google UX Design Professional Certificate, AWS Certified Developer",
        avatarBase64 = null
    } = data;

    const skillList = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const certList = certificates.split(',').map(c => c.trim()).filter(c => c.length > 0);
    
    const avatarHTML = avatarBase64 ? `
        <img src="${avatarBase64}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2.5px solid var(--primary); box-shadow: 0 0 15px var(--primary-glow); flex-shrink: 0;">
    ` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Student Portfolio</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #03040b;
            --primary: #00f2fe;
            --primary-glow: rgba(0, 242, 254, 0.4);
            --secondary: #9b51e0;
            --secondary-glow: rgba(155, 81, 224, 0.4);
            --accent: #ff007f;
            --text-color: #f3f4f6;
            --glass-bg: rgba(10, 11, 30, 0.65);
            --glass-border: rgba(255, 255, 255, 0.08);
            --font-sans: 'Plus Jakarta Sans', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-sans);
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Ambient Glowing Nebula Elements */
        .glow-sphere {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(140px);
            opacity: 0.45;
            z-index: 1;
            mix-blend-mode: screen;
        }

        .glow-1 {
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, var(--primary) 0%, rgba(3, 4, 11, 0) 70%);
            top: -10vh;
            left: -10vw;
        }

        .glow-2 {
            width: 45vw;
            height: 45vw;
            background: radial-gradient(circle, var(--secondary) 0%, rgba(3, 4, 11, 0) 70%);
            bottom: -10vh;
            right: -10vw;
        }

        /* Space Canvas for Stars */
        #starfield {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            pointer-events: none;
        }

        /* Portfolio Layout Grid */
        .container {
            width: 100%;
            max-width: 800px;
            padding: 4rem 1.5rem;
            z-index: 10;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }

        /* Glass Panel Styling */
        .glass-panel {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 16px;
            padding: 2.5rem;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
        }

        .glass-panel:hover {
            border-color: rgba(0, 242, 254, 0.25);
            transform: translateY(-2px);
        }

        .glass-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), transparent);
        }

        /* Typography */
        h1, h2, h3 {
            letter-spacing: -0.02em;
        }

        .role-badge {
            background: rgba(0, 242, 254, 0.1);
            border: 1px solid rgba(0, 242, 254, 0.3);
            color: var(--primary);
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.3rem 0.8rem;
            border-radius: 30px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-bottom: 1rem;
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
        }

        .name-title {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.25rem;
        }

        .dept-title {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .bio-text {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #d1d5db;
        }

        .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-top: 2rem;
            border-top: 1px dashed rgba(255,255,255,0.08);
            padding-top: 1.5rem;
        }

        .meta-item {
            font-family: var(--font-mono);
            font-size: 0.8rem;
        }

        .meta-label {
            color: var(--text-muted);
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 1px;
            margin-bottom: 0.25rem;
        }

        .meta-val {
            color: #fff;
            font-weight: 700;
        }

        /* Section Headings */
        .section-title {
            font-family: var(--font-mono);
            font-size: 0.9rem;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .section-title::before {
            content: '//';
            font-weight: 800;
        }

        /* Skills tag style */
        .tags-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
        }

        .skill-tag {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #e5e7eb;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            padding: 0.4rem 0.9rem;
            border-radius: 6px;
            transition: all 0.3s ease;
        }

        .skill-tag:hover {
            border-color: var(--primary);
            background: rgba(0, 242, 254, 0.05);
            color: var(--primary);
            box-shadow: 0 0 12px rgba(0, 242, 254, 0.15);
        }

        /* Certificate list styling */
        .certificate-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .certificate-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }

        .certificate-item:first-child {
            padding-top: 0;
        }

        .cert-icon {
            color: var(--secondary);
            font-size: 1.2rem;
            margin-top: 0.1rem;
            text-shadow: 0 0 10px var(--secondary-glow);
        }

        .cert-info h4 {
            font-size: 0.95rem;
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 0.15rem;
        }

        .cert-info p {
            font-size: 0.8rem;
            color: var(--text-muted);
            font-family: var(--font-mono);
        }

        footer {
            margin-top: auto;
            padding: 3rem 0;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--text-muted);
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <!-- Canvas starfield background -->
    <canvas id="starfield"></canvas>

    <!-- Ambient Glow Orbs -->
    <div class="glow-sphere glow-1"></div>
    <div class="glow-sphere glow-2"></div>

    <div class="container">
        <!-- Hero Header -->
        <header class="glass-panel">
            <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap;">
                ${avatarHTML}
                <div style="flex-grow: 1;">
                    <span class="role-badge">Student Profile</span>
                    <h1 class="name-title">${name}</h1>
                    <p class="dept-title" style="margin-bottom: 0;">${department}</p>
                </div>
            </div>
            <p class="bio-text">${bio}</p>
            
            <div class="meta-grid">
                <div class="meta-item">
                    <p class="meta-label">Roll Number</p>
                    <p class="meta-val">${rollNumber}</p>
                </div>
                <div class="meta-item">
                    <p class="meta-label">Affiliation</p>
                    <p class="meta-val">Onyx Academic Portal</p>
                </div>
            </div>
        </header>

        <!-- Skills Area -->
        <section class="glass-panel">
            <h3 class="section-title">Acquired Skills</h3>
            <div class="tags-wrapper">
                ${skillList.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
            </div>
        </section>

        <!-- Certificates Area -->
        <section class="glass-panel">
            <h3 class="section-title">Credentials & Certifications</h3>
            <div class="cert-list">
                ${certList.map(cert => `
                    <div class="certificate-item">
                        <span class="cert-icon">✦</span>
                        <div class="cert-info">
                            <h4>${cert}</h4>
                            <p>Verified Credential // Academic Record</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        <footer style="text-align: center;">
            ONYX AUTOMATED PORTFOLIO EXPORT SYSTEM // SECURE VERIFICATION ID: ${Math.floor(100000 + Math.random() * 900000)}
        </footer>
    </div>

    <!-- Background script for static drift -->
    <script>
        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');
        let stars = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function init() {
            stars = [];
            for (let i = 0; i < 80; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2 + 0.3,
                    speed: Math.random() * 0.05 + 0.01,
                    opacity: Math.random() * 0.8 + 0.2
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.y -= s.speed;
                if (s.y < 0) s.y = canvas.height;

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = \`rgba(255, 255, 255, \${s.opacity})\`;
                ctx.fill();
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => { resize(); init(); });
        resize();
        init();
        animate();
    </script>
</body>
</html>`;
}

// ==========================================
// CYBER GRID TEMPLATE
// ==========================================
function renderCyberTemplate(data) {
    const {
        name = "Jane Doe",
        department = "Computer Science & Engineering",
        rollNumber = "CSE-2026-088",
        bio = "An aspiring software engineer seeking to build products that make a difference.",
        skills = "JavaScript, CSS, HTML, Node.js, Python",
        certificates = "Google UX Design Professional Certificate, AWS Certified Developer",
        avatarBase64 = null
    } = data;

    const skillList = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const certList = certificates.split(',').map(c => c.trim()).filter(c => c.length > 0);

    const avatarHTML = avatarBase64 ? `
        <img src="${avatarBase64}" style="width: 60px; height: 60px; border-radius: 4px; object-fit: cover; border: 1.5px solid var(--accent); box-shadow: 0 0 10px var(--accent-glow); flex-shrink: 0;">
    ` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Console Deck</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #05060b;
            --accent: #39ff14; /* Matrix neon green */
            --accent-glow: rgba(57, 255, 20, 0.4);
            --border-color: rgba(57, 255, 20, 0.15);
            --text-color: #a8b2c1;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: var(--font-mono);
            overflow-x: hidden;
            min-height: 100vh;
            padding: 3rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Matrix digital background scanlines */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 4px, 6px 100%;
            pointer-events: none;
            z-index: 20;
        }

        .container {
            width: 100%;
            max-width: 800px;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            position: relative;
        }

        /* Tech Panel Frame */
        .panel {
            background: rgba(10, 15, 20, 0.9);
            border: 1px solid var(--border-color);
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.02);
            padding: 2rem;
            position: relative;
        }

        .panel::before {
            content: '▲ ONYX SECURE UNIT';
            position: absolute;
            top: -9px;
            left: 15px;
            background: var(--bg-color);
            color: var(--accent);
            font-size: 0.6rem;
            padding: 0 5px;
            letter-spacing: 1px;
            font-weight: 700;
        }

        .panel-corners::after {
            content: '';
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid var(--accent);
            border-right: 2px solid var(--accent);
        }

        /* Header Info */
        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px dashed rgba(57, 255, 20, 0.2);
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
        }

        h1 {
            color: #fff;
            font-size: 1.8rem;
            font-weight: 700;
            text-transform: uppercase;
            text-shadow: 0 0 10px var(--accent-glow);
        }

        .roll-label {
            font-size: 0.8rem;
            color: var(--accent);
            background: rgba(57, 255, 20, 0.08);
            border: 1px solid var(--accent);
            padding: 0.2rem 0.5rem;
        }

        .dept-title {
            font-size: 0.85rem;
            color: #d1d5db;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }

        .bio-text {
            font-size: 0.9rem;
            line-height: 1.6;
            color: #9ca3af;
        }

        /* Section titles */
        h2.section-header {
            font-size: 0.9rem;
            color: var(--accent);
            text-transform: uppercase;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
        }

        h2.section-header::after {
            content: '';
            flex-grow: 1;
            margin-left: 1rem;
            height: 1px;
            background: rgba(57, 255, 20, 0.15);
        }

        /* Skills grid */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.75rem;
        }

        .skill-cell {
            border: 1px solid rgba(57, 255, 20, 0.1);
            background: rgba(57, 255, 20, 0.02);
            padding: 0.6rem;
            text-align: center;
            font-size: 0.75rem;
            color: #fff;
            transition: all 0.3s;
        }

        .skill-cell:hover {
            border-color: var(--accent);
            background: rgba(57, 255, 20, 0.05);
            text-shadow: 0 0 5px var(--accent);
            transform: scale(1.02);
        }

        /* Credentials list */
        .cert-card {
            border-left: 2px solid var(--accent);
            padding-left: 1rem;
            margin-bottom: 1rem;
        }

        .cert-card:last-child {
            margin-bottom: 0;
        }

        .cert-name {
            color: #fff;
            font-size: 0.85rem;
            font-weight: 700;
        }

        .cert-meta {
            font-size: 0.7rem;
            color: var(--text-muted);
            margin-top: 0.1rem;
        }

        footer {
            text-align: center;
            font-size: 0.7rem;
            color: rgba(57, 255, 20, 0.4);
            margin-top: 3rem;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Hero panel -->
        <div class="panel panel-corners">
            <div class="header-top" style="display: flex; align-items: center; gap: 1.5rem;">
                ${avatarHTML}
                <div style="flex-grow: 1;">
                    <h1>${name}</h1>
                    <p class="dept-title" style="margin-bottom: 0;">${department}</p>
                </div>
                <div class="roll-label">${rollNumber}</div>
            </div>
            <p class="bio-text" style="margin-top: 1rem;">// PROFILE SUMMARY:<br>${bio}</p>
        </div>

        <!-- Skills Panel -->
        <div class="panel panel-corners">
            <h2 class="section-header">Core Competencies</h2>
            <div class="skills-grid">
                ${skillList.map(skill => `<div class="skill-cell">[ ${skill} ]</div>`).join('')}
            </div>
        </div>

        <!-- Credentials Panel -->
        <div class="panel panel-corners">
            <h2 class="section-header">Academic Certifications</h2>
            <div class="cert-list">
                ${certList.map(cert => `
                    <div class="cert-card">
                        <div class="cert-name">${cert}</div>
                        <div class="cert-meta">SYS-ID // VERIFIED_CREDENTIAL_AUTHENTICATED</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <footer>
            ONYX TERMINAL AUTOMATED PREVIEW ENGINE v3.2.1
        </footer>
    </div>
</body>
</html>`;
}
