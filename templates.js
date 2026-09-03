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
        skills = "Python, PyTorch, TensorFlow, JavaScript, GSAP, Three.js, Deep Learning, SQL, Computer Vision",
        certificates = "Google AI Professional Certificate, AWS Machine Learning Specialty, DeepLearning.AI Specialization, Onyx Engineering Honor",
        avatarBase64 = null
    } = userData;

    const skillList = typeof skills === 'string' 
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(skills) ? skills : ["Python", "PyTorch", "TensorFlow", "JavaScript", "GSAP", "Three.js", "Deep Learning", "SQL"]);

    const certList = typeof certificates === 'string'
        ? certificates.split(',').map(c => c.trim()).filter(Boolean)
        : (Array.isArray(certificates) ? certificates : ["Google AI Professional Certificate", "AWS Machine Learning Specialty", "DeepLearning.AI Specialization"]);

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
    <title>${name} | Onyx Modular Cosmic Engine</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- GSAP, ScrollTrigger & Three.js CDNs -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

    <style>
        :root {
            --bg-dark: #02030a;
            --primary: #00f2fe;
            --primary-glow: rgba(0, 242, 254, 0.4);
            --secondary: #9b51e0;
            --secondary-glow: rgba(155, 81, 224, 0.45);
            --accent: #ff007f;
            --accent-glow: rgba(255, 0, 127, 0.45);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --glass-bg: rgba(12, 14, 33, 0.65);
            --glass-border: rgba(255, 255, 255, 0.09);
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

        /* 3D WebGL Three.js Particle Canvas Background */
        #webgl-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 0;
            pointer-events: none;
        }

        /* Movie-Quality Deep Purple Ambient Lighting Spheres */
        .ambient-aurora {
            position: fixed;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(140px);
            opacity: 0.45;
            z-index: 1;
            mix-blend-mode: screen;
            will-change: transform;
            animation: auroraMotion 22s infinite alternate ease-in-out;
        }

        .aurora-purple {
            width: 65vw;
            height: 65vw;
            background: radial-gradient(circle, #6b21a8 0%, rgba(2, 3, 10, 0) 70%);
            top: -25vh;
            left: -15vw;
        }

        .aurora-cyan {
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, var(--primary) 0%, rgba(2, 3, 10, 0) 70%);
            bottom: -15vh;
            right: -10vw;
            animation-delay: -8s;
        }

        .aurora-pink {
            width: 45vw;
            height: 45vw;
            background: radial-gradient(circle, var(--accent) 0%, rgba(2, 3, 10, 0) 70%);
            top: 45vh;
            left: 25vw;
            opacity: 0.3;
            animation-delay: -14s;
        }

        @keyframes auroraMotion {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-3%, 4%) scale(1.08); }
        }

        /* Top Navigation Header */
        .cosmic-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            padding: 1.2rem 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(2, 3, 10, 0.5);
            backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: var(--primary);
            box-shadow: 0 0 12px var(--primary);
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

        /* Main Container Stage */
        .main-stage {
            position: relative;
            z-index: 10;
            max-width: 1100px;
            margin: 0 auto;
            padding: 7rem 2rem 5rem;
            display: flex;
            flex-direction: column;
            gap: 6rem;
        }

        /* Base Frosted Glass Panel */
        .glass-panel {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 3rem;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
            background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent), transparent);
        }

        /* ====================================================
           MODULE A: THE BLACK HOLE (Hero Section)
           ==================================================== */
        .blackhole-hero-stage {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            padding: 2rem 1rem;
        }

        /* Singularity Core Element */
        .blackhole-viewport {
            position: relative;
            width: 260px;
            height: 260px;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .singularity-core {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: #000000;
            box-shadow: 
                0 0 30px #9b51e0,
                0 0 70px #00f2fe,
                0 0 120px rgba(255, 0, 127, 0.6),
                inset 0 0 25px rgba(155, 81, 224, 0.9);
            position: relative;
            z-index: 5;
            animation: singularityPulse 4s ease-in-out infinite alternate;
        }

        .accretion-disk {
            position: absolute;
            width: 230px;
            height: 230px;
            border-radius: 50%;
            border: 3px solid rgba(155, 81, 224, 0.7);
            border-top-color: var(--primary);
            border-bottom-color: var(--accent);
            box-shadow: 0 0 30px var(--secondary), inset 0 0 30px var(--primary);
            transform: rotateX(75deg);
            animation: spinAccretion 10s linear infinite;
        }

        .accretion-disk-outer {
            position: absolute;
            width: 280px;
            height: 280px;
            border-radius: 50%;
            border: 1px dashed rgba(0, 242, 254, 0.4);
            transform: rotateX(75deg) rotateZ(45deg);
            animation: spinAccretionReverse 16s linear infinite;
        }

        @keyframes singularityPulse {
            0% { transform: scale(1); box-shadow: 0 0 30px #9b51e0, 0 0 70px #00f2fe, 0 0 120px rgba(255, 0, 127, 0.6); }
            100% { transform: scale(1.08); box-shadow: 0 0 45px #9b51e0, 0 0 90px #00f2fe, 0 0 150px rgba(255, 0, 127, 0.8); }
        }

        @keyframes spinAccretion {
            100% { transform: rotateX(75deg) rotateZ(360deg); }
        }

        @keyframes spinAccretionReverse {
            100% { transform: rotateX(75deg) rotateZ(-360deg); }
        }

        .hero-dept-badge {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--primary);
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 0.75rem;
            background: rgba(0, 242, 254, 0.08);
            border: 1px solid rgba(0, 242, 254, 0.25);
            padding: 0.4rem 1.2rem;
            border-radius: 20px;
            display: inline-block;
        }

        .hero-name-title {
            font-size: 3.6rem;
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin-bottom: 1.25rem;
            min-height: 4.2rem;
            background: linear-gradient(135deg, #ffffff 30%, var(--primary) 70%, var(--secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .typing-cursor {
            display: inline-block;
            width: 4px;
            height: 3.2rem;
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
            margin: 0 auto 2rem;
            max-width: 700px;
        }

        .hero-meta-bar {
            display: flex;
            justify-content: center;
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

        .meta-chip-label { color: var(--text-muted); }
        .meta-chip-val { color: var(--primary); font-weight: 700; }

        .hero-ctas {
            display: flex;
            justify-content: center;
            gap: 1.25rem;
        }

        .cosmic-btn {
            background: linear-gradient(135deg, var(--primary) 0%, #0099ff 100%);
            color: #02040a;
            border: none;
            padding: 0.95rem 2.2rem;
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

        /* ====================================================
           MODULE B: THE ORBITAL GRID (Skills Section)
           ==================================================== */
        .orbital-grid-stage {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
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
            font-size: 2.2rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 2.5rem;
            background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .orbital-system {
            position: relative;
            width: 440px;
            height: 440px;
            margin: 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @media (max-width: 600px) {
            .orbital-system {
                width: 320px;
                height: 320px;
            }
        }

        /* Central User Image Node */
        .orbital-center-node {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            position: relative;
            z-index: 10;
            padding: 4px;
            background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
            box-shadow: 0 0 35px rgba(0, 242, 254, 0.4);
        }

        .user-center-img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }

        .user-center-fallback {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #090d24;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            font-weight: 800;
            color: var(--primary);
            font-family: var(--font-mono);
        }

        /* Rotating Circular SVG Tracks */
        .orbital-track-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .orbital-ring {
            fill: none;
            stroke-dasharray: 6 6;
            transform-origin: center;
        }

        .ring-1 { stroke: rgba(0, 242, 254, 0.25); stroke-width: 1.5; animation: spinRing 25s linear infinite; }
        .ring-2 { stroke: rgba(155, 81, 224, 0.25); stroke-width: 1.5; animation: spinRingReverse 35s linear infinite; }

        @keyframes spinRing {
            100% { transform: rotate(360deg); }
        }

        @keyframes spinRingReverse {
            100% { transform: rotate(-360deg); }
        }

        /* Orbiting Skill Node Cards */
        .orbiting-skill-node {
            position: absolute;
            background: rgba(12, 14, 33, 0.85);
            border: 1px solid rgba(0, 242, 254, 0.3);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 700;
            color: #fff;
            box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
            backdrop-filter: blur(10px);
            white-space: nowrap;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .orbiting-skill-node:hover {
            transform: scale(1.15) !important;
            border-color: var(--accent);
            box-shadow: 0 0 25px rgba(255, 0, 127, 0.5);
            color: var(--accent);
            z-index: 20;
        }

        /* Skills Progress Grid List */
        .skills-grid-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            gap: 1.5rem;
            width: 100%;
            margin-top: 2.5rem;
        }

        .skill-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 18px;
            padding: 1.5rem;
            backdrop-filter: blur(12px);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skill-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 30px rgba(0, 242, 254, 0.2);
        }

        .skill-card-icon {
            font-size: 1.25rem;
            margin-bottom: 0.75rem;
            color: var(--primary);
            font-family: var(--font-mono);
        }

        .skill-card-name {
            font-size: 1.05rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.5rem;
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
        }

        /* ====================================================
           MODULE C: THE GLASS MATRIX (Credentials & Projects)
           ==================================================== */
        .glass-matrix-stage {
            display: flex;
            flex-direction: column;
        }

        .matrix-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.75rem;
        }

        .matrix-card {
            background: rgba(20, 15, 38, 0.65);
            border: 1px solid rgba(255, 0, 127, 0.25);
            border-radius: 20px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(16px);
            box-shadow: 0 10px 30px rgba(255, 0, 127, 0.12);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .matrix-card:hover {
            transform: translateY(-8px) scale(1.02);
            border-color: var(--accent);
            box-shadow: 0 15px 40px rgba(255, 0, 127, 0.35);
        }

        .matrix-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--accent), var(--secondary), transparent);
        }

        .matrix-badge-tag {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            color: var(--accent);
            background: rgba(255, 0, 127, 0.12);
            border: 1px solid rgba(255, 0, 127, 0.35);
            padding: 0.25rem 0.65rem;
            border-radius: 8px;
            margin-bottom: 1.25rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .matrix-card-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.6rem;
            line-height: 1.4;
        }

        .matrix-card-sub {
            font-size: 0.85rem;
            color: var(--text-muted);
            font-family: var(--font-mono);
            line-height: 1.6;
        }

        /* Terminal Logs Section */
        .terminal-box {
            background: #030612;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 18px;
            padding: 1.75rem;
            font-family: var(--font-mono);
            font-size: 0.9rem;
            color: #cbd5e1;
            line-height: 1.8;
            margin-top: 2rem;
        }

        .terminal-bar {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }

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

        .footer span { color: var(--primary); }
    </style>
</head>
<body>

    <!-- WebGL Three.js Particle Background -->
    <div id="webgl-canvas"></div>

    <!-- Deep Purple Movie-Quality Ambient Aurora Lighting -->
    <div class="ambient-aurora aurora-purple"></div>
    <div class="ambient-aurora aurora-cyan"></div>
    <div class="ambient-aurora aurora-pink"></div>

    <!-- Navigation Header -->
    <nav class="cosmic-nav">
        <div class="nav-brand">
            <div class="nav-brand-dot"></div>
            <span>ONYX // ${(name || 'USER').split(' ')[0]}</span>
        </div>
        <ul class="nav-links">
            <li><a href="#blackhole">Singularity</a></li>
            <li><a href="#orbital">Orbital Grid</a></li>
            <li><a href="#glassmatrix">Glass Matrix</a></li>
            <li><a href="#terminal">Terminal</a></li>
        </ul>
    </nav>

    <!-- Main Container Stage -->
    <div class="main-stage">

        <!-- ====================================================
             MODULE A: THE BLACK HOLE (Hero Section)
             ==================================================== -->
        <section id="blackhole">
            <div class="glass-panel blackhole-hero-stage">
                <div class="blackhole-viewport hero-stagger">
                    <div class="singularity-core"></div>
                    <div class="accretion-disk"></div>
                    <div class="accretion-disk-outer"></div>
                </div>

                <div class="hero-dept-badge hero-stagger">
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
                        <span class="meta-chip-label">DEPARTMENT:</span>
                        <span class="meta-chip-val">${department}</span>
                    </div>
                    <div class="meta-chip">
                        <span class="meta-chip-label">SYSTEM PROTOCOL:</span>
                        <span class="meta-chip-val" style="color: #10b981;">200 OK ACTIVE</span>
                    </div>
                </div>

                <div class="hero-ctas hero-stagger">
                    <a href="#orbital" class="cosmic-btn">
                        <span>Explore Orbital Matrix</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                    <a href="#glassmatrix" class="cosmic-btn cosmic-btn-outline">
                        <span>Glass Credentials</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- ====================================================
             MODULE B: THE ORBITAL GRID (Skills Section)
             ==================================================== -->
        <section id="orbital">
            <div class="glass-panel orbital-grid-stage">
                <div class="section-badge">// ORBITAL GRID</div>
                <h2 class="section-title">Core Competencies & Tech Stack</h2>

                <!-- Circular SVG Orbital Tracks -->
                <div class="orbital-system">
                    <svg class="orbital-track-svg" viewBox="0 0 440 440">
                        <circle class="orbital-ring ring-1" cx="220" cy="220" r="140"/>
                        <circle class="orbital-ring ring-2" cx="220" cy="220" r="200"/>
                    </svg>

                    <!-- Central User Avatar Node -->
                    <div class="orbital-center-node">
                        ${avatarMarkup}
                    </div>

                    <!-- Orbiting Skill Nodes (Placed along circular radius) -->
                    ${skillList.slice(0, 8).map((skill, idx) => {
                        const radius = idx % 2 === 0 ? 140 : 200;
                        const angle = (idx * (360 / Math.min(8, skillList.length))) * (Math.PI / 180);
                        const leftPos = 220 + radius * Math.cos(angle) - 45;
                        const topPos = 220 + radius * Math.sin(angle) - 18;
                        return `<div class="orbiting-skill-node" style="left: ${leftPos}px; top: ${topPos}px;">${skill}</div>`;
                    }).join('')}
                </div>

                <!-- Skills Grid Progress Meters -->
                <div class="skills-grid-list">
                    ${skillList.map((skill, idx) => `
                        <div class="skill-card">
                            <div class="skill-card-icon">&lt;0${idx + 1}&gt;</div>
                            <div class="skill-card-name">${skill}</div>
                            <div class="skill-progress-bar">
                                <div class="skill-progress-fill" style="width: ${Math.min(95, 70 + (idx * 6) % 28)}%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- ====================================================
             MODULE C: THE GLASS MATRIX (Credentials Section)
             ==================================================== -->
        <section id="glassmatrix">
            <div class="glass-panel glass-matrix-stage">
                <div class="section-badge" style="color: var(--accent); border-color: rgba(255,0,127,0.3); background: rgba(255,0,127,0.08);">// GLASS MATRIX</div>
                <h2 class="section-title">Credentials & Certifications</h2>

                <div class="matrix-grid">
                    ${certList.map((cert, idx) => `
                        <div class="matrix-card">
                            <span class="matrix-badge-tag">VERIFIED MATRIX #${idx + 1}</span>
                            <h3 class="matrix-card-title">${cert}</h3>
                            <p class="matrix-card-sub">Issued by Verified Industry & Academic Protocol Authority</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- ====================================================
             SYSTEM TERMINAL LOGS
             ==================================================== -->
        <section id="terminal">
            <div class="glass-panel">
                <div class="section-badge">// SYSTEM DIAGNOSTICS</div>
                <h2 class="section-title">Profile Terminal Verification</h2>

                <div class="terminal-box">
                    <div class="terminal-bar">
                        <div class="term-dot dot-red"></div>
                        <div class="term-dot dot-yellow"></div>
                        <div class="term-dot dot-green"></div>
                        <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: auto;">onyx-os --verify-user</span>
                    </div>
                    <div>&gt; USER_NAME: "${name}"</div>
                    <div>&gt; DEPARTMENT: "${department}"</div>
                    <div>&gt; ROLL_NUMBER: "${rollNumber}"</div>
                    <div>&gt; ORBITAL_NODES: [${skillList.map(s => `"${s}"`).join(', ')}]</div>
                    <div>&gt; GLASS_MATRIX: [${certList.map(c => `"${c}"`).join(', ')}]</div>
                    <div style="color: #10b981;">&gt; MODULAR_ENGINE_STATUS: 200 OK (READY FOR GITHUB DEPLOYMENT)</div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <p>COMPILED WITH <span>ONYX MODULAR ENGINE</span> • ${name} • ${new Date().getFullYear()}</p>
        </footer>

    </div>

    <!-- GSAP & Three.js Initialization Script -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // 1. GSAP ScrollTrigger Registration & Animations
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

                // Staggered Entrance Animation for Black Hole Hero
                gsap.from(".hero-stagger", {
                    opacity: 0,
                    y: 35,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out"
                });

                // ScrollTrigger Animations for Orbital Grid
                gsap.from(".skill-card", {
                    scrollTrigger: {
                        trigger: "#orbital",
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 45,
                    scale: 0.92,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "back.out(1.4)"
                });

                // ScrollTrigger Animations for Glass Matrix Cards
                gsap.from(".matrix-card", {
                    scrollTrigger: {
                        trigger: "#glassmatrix",
                        start: "top 80%",
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power2.out"
                });
            }

            // 2. Three.js Background Particle Renderer
            if (typeof THREE !== "undefined") {
                const container = document.getElementById("webgl-canvas");
                if (container) {
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.z = 400;

                    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    container.appendChild(renderer.domElement);

                    // Particle Geometry
                    const particleCount = 700;
                    const geometry = new THREE.BufferGeometry();
                    const positions = new Float32Array(particleCount * 3);
                    const colors = new Float32Array(particleCount * 3);

                    const colorCyan = new THREE.Color('#00f2fe');
                    const colorPurple = new THREE.Color('#9b51e0');

                    for (let i = 0; i < particleCount * 3; i += 3) {
                        positions[i] = (Math.random() - 0.5) * 1000;
                        positions[i + 1] = (Math.random() - 0.5) * 1000;
                        positions[i + 2] = (Math.random() - 0.5) * 1000;

                        const mixedColor = colorCyan.clone().lerp(colorPurple, Math.random());
                        colors[i] = mixedColor.r;
                        colors[i + 1] = mixedColor.g;
                        colors[i + 2] = mixedColor.b;
                    }

                    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                    const material = new THREE.PointsMaterial({
                        size: 2.5,
                        vertexColors: true,
                        transparent: true,
                        opacity: 0.75
                    });

                    const particles = new THREE.Points(geometry, material);
                    scene.add(particles);

                    function animateWebGL() {
                        particles.rotation.y += 0.0006;
                        particles.rotation.x += 0.0003;
                        renderer.render(scene, camera);
                        requestAnimationFrame(animateWebGL);
                    }
                    animateWebGL();

                    window.addEventListener('resize', () => {
                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    });
                }
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
