/**
 * ONYX - PORTFOLIO ENGINE & TEMPLATES
 * Generates beautiful, responsive student portfolio websites.
 */

// Available templates config
const PortfolioTemplates = {
    cosmic: {
        name: "Cosmic Nebula",
        description: "An atmospheric space-themed design with glowing neon gradients and GSAP animations.",
        render: (data) => generateCosmicPortfolio(data)
    },
    cyber: {
        name: "Cyber Grid",
        description: "A dark cyberpunk console-inspired grid layout with sharp accents and interactive details.",
        render: (data) => generateCosmicPortfolio(data)
    }
};

function buildPortfolioHTML(state) {
    return generateCosmicPortfolio(state);
}

// ==========================================
// HIGH-TECH GSAP COSMIC PORTFOLIO GENERATOR ENGINE
// ==========================================
function generateCosmicPortfolio(userData = {}) {
    const {
        name = "N. Hemnath",
        department = "AIDS",
        rollNumber = "21222100100",
        bio = "Artificial Intelligence & Data Science specialist passionate about neural network architectures, high-tech agent systems, and cinematic web experiences.",
        skills = "Python, PyTorch, TensorFlow, JavaScript, GSAP, Deep Learning, SQL, Computer Vision",
        certificates = "Google AI Professional Certificate, AWS Machine Learning Specialty, DeepLearning.AI Specialization, Onyx Engineering Honor",
        avatarBase64 = null
    } = userData;

    const skillList = typeof skills === 'string' 
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(skills) ? skills : []);

    const certList = typeof certificates === 'string'
        ? certificates.split(',').map(c => c.trim()).filter(Boolean)
        : (Array.isArray(certificates) ? certificates : []);

    const avatarMarkup = avatarBase64 ? `
        <div class="avatar-glow-ring">
            <img src="${avatarBase64}" alt="${name}" class="user-avatar-img">
        </div>
    ` : `
        <div class="avatar-glow-ring">
            <div class="user-avatar-fallback">
                <span>${(name || 'NH').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}</span>
            </div>
        </div>
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Onyx Cosmic Matrix</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- GSAP (GreenSock) & ScrollTrigger CDNs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <style>
        :root {
            --bg-dark: #02040a;
            --primary: #00f2fe;
            --primary-glow: rgba(0, 242, 254, 0.4);
            --secondary: #9b51e0;
            --secondary-glow: rgba(155, 81, 224, 0.4);
            --accent: #ff007f;
            --accent-glow: rgba(255, 0, 127, 0.4);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --glass-bg: rgba(13, 17, 38, 0.65);
            --glass-border: rgba(255, 255, 255, 0.08);
            --font-sans: 'Plus Jakarta Sans', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            font-family: var(--font-sans);
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
        }

        /* 3D Cinematic Starfield Canvas */
        #space-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            pointer-events: none;
        }

        /* Movie-Quality Lighting & Aurora Nebulae */
        .aurora-sphere {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(140px);
            opacity: 0.4;
            z-index: 1;
            mix-blend-mode: screen;
            will-change: transform;
            animation: auroraFloat 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }

        .aurora-1 {
            width: 60vw;
            height: 60vw;
            background: radial-gradient(circle, var(--primary) 0%, rgba(2, 4, 10, 0) 70%);
            top: -20vh;
            left: -15vw;
        }

        .aurora-2 {
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, var(--secondary) 0%, rgba(2, 4, 10, 0) 70%);
            bottom: -15vh;
            right: -10vw;
            animation-delay: -7s;
        }

        .aurora-3 {
            width: 40vw;
            height: 40vw;
            background: radial-gradient(circle, var(--accent) 0%, rgba(2, 4, 10, 0) 70%);
            top: 40vh;
            left: 30vw;
            animation-delay: -12s;
            opacity: 0.25;
        }

        @keyframes auroraFloat {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-4%, 5%) scale(1.08); }
        }

        /* Top Navigation Header Bar */
        .cosmic-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            padding: 1.25rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(2, 4, 10, 0.4);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-family: var(--font-mono);
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 2px;
            color: var(--primary);
            text-transform: uppercase;
        }

        .nav-brand-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--primary);
            box-shadow: 0 0 10px var(--primary);
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary);
        }

        /* Main Content Container */
        .main-wrapper {
            position: relative;
            z-index: 10;
            max-width: 1100px;
            margin: 0 auto;
            padding: 7rem 2rem 4rem;
            display: flex;
            flex-direction: column;
            gap: 6rem;
        }

        /* Frosted Glass Container Base */
        .glass-panel {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 3rem;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 
                0 16px 40px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .glass-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--secondary), transparent);
        }

        /* Section Title Header */
        .section-header {
            margin-bottom: 2.5rem;
        }

        .section-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 0.75rem;
            background: rgba(0, 242, 254, 0.08);
            border: 1px solid rgba(0, 242, 254, 0.2);
            padding: 0.35rem 0.9rem;
            border-radius: 20px;
        }

        .section-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* SECTION 1: HERO */
        #hero {
            min-height: calc(85vh - 7rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 240px;
            gap: 3rem;
            align-items: center;
        }

        @media (max-width: 868px) {
            .hero-grid {
                grid-template-columns: 1fr;
            }
        }

        .hero-dept-tag {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--primary);
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .hero-name-title {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin-bottom: 1.25rem;
            min-height: 4.2rem;
            background: linear-gradient(135deg, #ffffff 30%, var(--primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .typing-cursor {
            display: inline-block;
            width: 4px;
            height: 3rem;
            background: var(--primary);
            margin-left: 4px;
            vertical-align: middle;
            box-shadow: 0 0 10px var(--primary);
            animation: blink 0.8s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        .hero-bio {
            font-size: 1.15rem;
            line-height: 1.7;
            color: var(--text-muted);
            margin-bottom: 2rem;
            max-width: 650px;
        }

        .hero-meta-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 1.25rem;
            margin-bottom: 2.5rem;
        }

        .meta-chip {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .meta-chip-label {
            color: var(--text-muted);
        }

        .meta-chip-val {
            color: var(--primary);
            font-weight: 700;
        }

        .hero-ctas {
            display: flex;
            gap: 1rem;
        }

        .cosmic-btn {
            background: linear-gradient(135deg, var(--primary) 0%, #0099ff 100%);
            color: #02040a;
            border: none;
            padding: 0.9rem 2rem;
            border-radius: 14px;
            font-family: var(--font-sans);
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            box-shadow: 0 0 25px rgba(0, 242, 254, 0.35);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cosmic-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 35px rgba(0, 242, 254, 0.6);
        }

        .cosmic-btn-outline {
            background: transparent;
            color: var(--text-main);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: none;
        }

        .cosmic-btn-outline:hover {
            border-color: var(--primary);
            color: var(--primary);
            background: rgba(0, 242, 254, 0.05);
            box-shadow: 0 0 20px rgba(0, 242, 254, 0.2);
        }

        /* Avatar Node */
        .avatar-glow-ring {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            position: relative;
            padding: 5px;
            background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.3);
            animation: ringGlow 6s ease-in-out infinite alternate;
        }

        @keyframes ringGlow {
            0% { filter: drop-shadow(0 0 15px rgba(0, 242, 254, 0.4)); }
            100% { filter: drop-shadow(0 0 25px rgba(155, 81, 224, 0.6)); }
        }

        .user-avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        .user-avatar-fallback {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #090d24;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary);
            font-family: var(--font-mono);
        }

        /* SECTION 2: SKILLS GRID */
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1.5rem;
        }

        .skill-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 18px;
            padding: 1.5rem;
            backdrop-filter: blur(12px);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
        }

        .skill-card:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: var(--primary);
            box-shadow: 0 10px 30px rgba(0, 242, 254, 0.15);
        }

        .skill-card-icon {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--primary);
            font-family: var(--font-mono);
        }

        .skill-card-name {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #fff;
        }

        .skill-progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 1rem;
        }

        .skill-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            border-radius: 4px;
            width: 85%;
        }

        /* SECTION 3: CREDENTIALS GALLERY */
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.75rem;
        }

        .cert-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 20px;
            padding: 1.75rem;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(12px);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-card:hover {
            transform: translateY(-6px);
            border-color: var(--secondary);
            box-shadow: 0 12px 35px rgba(155, 81, 224, 0.2);
        }

        .cert-badge-tag {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--secondary);
            background: rgba(155, 81, 224, 0.1);
            border: 1px solid rgba(155, 81, 224, 0.3);
            padding: 0.25rem 0.6rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }

        .cert-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.5rem;
            line-height: 1.4;
        }

        .cert-issuer {
            font-size: 0.85rem;
            color: var(--text-muted);
            font-family: var(--font-mono);
        }

        /* SECTION 4: ABOUT & CONTACT */
        .about-terminal {
            background: #030712;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.8;
            margin-top: 1.5rem;
        }

        .terminal-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .term-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }

        .term-title {
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-left: auto;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 3rem 0;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--text-muted);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            margin-top: 4rem;
        }

        .footer span {
            color: var(--primary);
        }
    </style>
</head>
<body>

    <!-- 3D Starfield Canvas -->
    <canvas id="space-canvas"></canvas>

    <!-- Movie-Quality Lighting & Aurora Nebulae -->
    <div class="aurora-sphere aurora-1"></div>
    <div class="aurora-sphere aurora-2"></div>
    <div class="aurora-sphere aurora-3"></div>

    <!-- Navigation Header -->
    <nav class="cosmic-nav">
        <div class="nav-brand">
            <div class="nav-brand-dot"></div>
            <span>ONYX // ${(name || 'USER').split(' ')[0]}</span>
        </div>
        <ul class="nav-links">
            <li><a href="#hero">Hero</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#gallery">Credentials</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </nav>

    <!-- Main Content Stage -->
    <div class="main-wrapper">

        <!-- SECTION 1: HERO SECTION -->
        <section id="hero">
            <div class="glass-panel">
                <div class="hero-grid">
                    <div class="hero-info-col">
                        <div class="hero-dept-tag hero-stagger">
                            <span>//</span> ${department} DEPARTMENT
                        </div>
                        <h1 class="hero-name-title hero-stagger">
                            <span id="typing-hero-title"></span><span class="typing-cursor"></span>
                        </h1>
                        <p class="hero-bio hero-stagger">
                            ${bio}
                        </p>

                        <div class="hero-meta-bar hero-stagger">
                            <div class="meta-chip">
                                <span class="meta-chip-label">ROLL NO:</span>
                                <span class="meta-chip-val">${rollNumber}</span>
                            </div>
                            <div class="meta-chip">
                                <span class="meta-chip-label">DEPT:</span>
                                <span class="meta-chip-val">${department}</span>
                            </div>
                            <div class="meta-chip">
                                <span class="meta-chip-label">STATUS:</span>
                                <span class="meta-chip-val" style="color: #10b981;">VERIFIED PROTOCOL</span>
                            </div>
                        </div>

                        <div class="hero-ctas hero-stagger">
                            <a href="#skills" class="cosmic-btn">
                                <span>Explore Core Matrix</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </a>
                            <a href="#gallery" class="cosmic-btn cosmic-btn-outline">
                                <span>View Credentials</span>
                            </a>
                        </div>
                    </div>

                    <div class="hero-avatar-col hero-stagger">
                        ${avatarMarkup}
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 2: SKILLS GRID SECTION -->
        <section id="skills">
            <div class="glass-panel">
                <div class="section-header">
                    <div class="section-badge">// TECHNICAL MATRIX</div>
                    <h2 class="section-title">Core Competencies & Skills</h2>
                </div>

                <div class="skills-grid">
                    ${skillList.map((skill, idx) => `
                        <div class="skill-card">
                            <div class="skill-card-icon">&lt;0${idx + 1}&gt;</div>
                            <div class="skill-card-name">${skill}</div>
                            <div class="skill-progress-bar">
                                <div class="skill-progress-fill" style="width: ${Math.min(95, 75 + (idx * 5) % 25)}%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- SECTION 3: CREDENTIALS GALLERY SECTION -->
        <section id="gallery">
            <div class="glass-panel">
                <div class="section-header">
                    <div class="section-badge">// CREDENTIALS GALLERY</div>
                    <h2 class="section-title">Certifications & Achievements</h2>
                </div>

                <div class="gallery-grid">
                    ${certList.map((cert, idx) => `
                        <div class="cert-card">
                            <span class="cert-badge-tag">VERIFIED CREDENTIAL #${idx + 1}</span>
                            <h3 class="cert-title">${cert}</h3>
                            <p class="cert-issuer">Issued by Academic & Industry Certification Authority</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- SECTION 4: ABOUT & CONTACT SECTION -->
        <section id="about">
            <div class="glass-panel about-glass-panel">
                <div class="section-header">
                    <div class="section-badge">// STUDENT PROFILE</div>
                    <h2 class="section-title">Terminal & Background</h2>
                </div>

                <p style="color: var(--text-muted); line-height: 1.7; font-size: 1.05rem;">
                    Full profile verification for <strong>${name}</strong> (${department}). Compiled using Onyx High-Tech Cosmic Generator Engine.
                </p>

                <div class="about-terminal">
                    <div class="terminal-header">
                        <div class="term-dot dot-red"></div>
                        <div class="term-dot dot-yellow"></div>
                        <div class="term-dot dot-green"></div>
                        <span class="term-title">onyx-os --profile-dump</span>
                    </div>
                    <div>&gt; ONYX_USER: "${name}"</div>
                    <div>&gt; DEPARTMENT: "${department}"</div>
                    <div>&gt; ROLL_NUMBER: "${rollNumber}"</div>
                    <div>&gt; ACTIVE_SKILLS: [${skillList.map(s => `"${s}"`).join(', ')}]</div>
                    <div>&gt; CERTIFICATES: [${certList.map(c => `"${c}"`).join(', ')}]</div>
                    <div style="color: #10b981;">&gt; SYSTEM_STATUS: 200 OK (PORTFOLIO READY FOR DEPLOYMENT)</div>
                </div>
            </div>
        </section>

        <!-- FOOTER -->
        <footer class="footer">
            <p>COMPILED WITH <span>ONYX HIGH-TECH PORTFOLIO ENGINE</span> • ${name} • ${new Date().getFullYear()}</p>
        </footer>

    </div>

    <!-- GSAP Initialization Script -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // Register GSAP ScrollTrigger
            if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
                gsap.registerPlugin(ScrollTrigger);

                // GSAP Typing Text Effect for Hero Title
                const heroTitleText = ${JSON.stringify(name)};
                const typingElement = document.getElementById("typing-hero-title");
                if (typingElement) {
                    typingElement.textContent = "";
                    let i = 0;
                    function typeChar() {
                        if (i < heroTitleText.length) {
                            typingElement.textContent += heroTitleText.charAt(i);
                            i++;
                            setTimeout(typeChar, 70);
                        }
                    }
                    setTimeout(typeChar, 250);
                }

                // Staggered Entrance Animation for Hero
                gsap.from(".hero-stagger", {
                    opacity: 0,
                    y: 35,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out"
                });

                // ScrollTrigger Animations for Skills Grid
                gsap.from(".skill-card", {
                    scrollTrigger: {
                        trigger: "#skills",
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 45,
                    scale: 0.92,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out(1.4)"
                });

                // ScrollTrigger Animations for Credentials Gallery
                gsap.from(".cert-card", {
                    scrollTrigger: {
                        trigger: "#gallery",
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power2.out"
                });

                // ScrollTrigger Animation for About Terminal
                gsap.from(".about-glass-panel", {
                    scrollTrigger: {
                        trigger: "#about",
                        start: "top 85%",
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.9,
                    ease: "power3.out"
                });
            }

            // Starfield Particle Loop
            const canvas = document.getElementById("space-canvas");
            if (canvas) {
                const ctx = canvas.getContext("2d");
                let stars = [];
                function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
                resizeCanvas();
                window.addEventListener("resize", resizeCanvas);

                for (let i = 0; i < 160; i++) {
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 1.5 + 0.3,
                        alpha: Math.random() * 0.8 + 0.2,
                        speed: Math.random() * 0.05 + 0.01
                    });
                }

                function drawStars() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    stars.forEach(s => {
                        s.y -= s.speed;
                        if (s.y < 0) s.y = canvas.height;
                        ctx.beginPath();
                        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                        ctx.fillStyle = \`rgba(255, 255, 255, \${s.alpha})\`;
                        ctx.fill();
                    });
                    requestAnimationFrame(drawStars);
                }
                drawStars();
            }
        });
    </script>
</body>
</html>`;
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
