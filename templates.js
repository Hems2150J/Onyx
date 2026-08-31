/**
 * PORTFOLIA - TEMPLATE ENGINE
 * Generates beautiful, semantic portfolios based on user state and templates.
 */

const AccentColors = {
    blue: { primary: '#3b82f6', hover: '#2563eb', rgb: '59, 130, 246' },
    emerald: { primary: '#10b981', hover: '#059669', rgb: '16, 185, 129' },
    violet: { primary: '#8b5cf6', hover: '#7c3aed', rgb: '139, 92, 246' },
    pink: { primary: '#ec4899', hover: '#db2777', rgb: '236, 72, 153' },
    amber: { primary: '#f59e0b', hover: '#d97706', rgb: '245, 158, 11' }
};

const Fonts = {
    'plus-jakarta': {
        name: 'Plus Jakarta Sans',
        import: '@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");',
        fallback: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    'jetbrains': {
        name: 'JetBrains Mono',
        import: '@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap");',
        fallback: "'JetBrains Mono', monospace"
    },
    'playfair': {
        name: 'Playfair Display',
        import: '@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap");',
        fallback: "'Playfair Display', Georgia, serif"
    }
};

// HTML Layout Generator
function buildPortfolioHTML(state, isPreview = false) {
    const {
        name = 'Jane Doe',
        title = 'Computer Science Student',
        bio = 'A passionate developer and student.',
        email = '',
        location = '',
        github = '',
        linkedin = '',
        skills = [],
        projects = [],
        education = [],
        experience = [],
        selectedTemplate = 'neoglow'
    } = state;

    // Build parts
    const skillsHTML = skills.map(cat => {
        if (!cat.items || cat.items.length === 0) return '';
        const badges = cat.items.map(item => `<span class="badge-item">${item.trim()}</span>`).join('');
        return `
        <div class="skill-category-card">
            <h4>${cat.category}</h4>
            <div class="badges-wrapper">${badges}</div>
        </div>`;
    }).join('');

    const projectsHTML = projects.map(proj => {
        const linkHTML = proj.link ? `<a href="${proj.link}" target="_blank" class="project-link">
            <span>View Project</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>` : '';
        const techHTML = proj.tech ? `<div class="project-tech">${proj.tech.split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('')}</div>` : '';
        return `
        <div class="project-card">
            <h3>${proj.name}</h3>
            <p>${proj.desc}</p>
            ${techHTML}
            ${linkHTML}
        </div>`;
    }).join('');

    const educationHTML = education.map(edu => {
        return `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-header">
                <span class="timeline-period">${edu.year}</span>
                <h3>${edu.degree}</h3>
            </div>
            <p class="timeline-subtitle">${edu.school}</p>
        </div>`;
    }).join('');

    const experienceHTML = experience.map(exp => {
        return `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-header">
                <span class="timeline-period">${exp.duration}</span>
                <h3>${exp.role}</h3>
            </div>
            <p class="timeline-subtitle">${exp.company}</p>
            <p class="timeline-body">${exp.desc}</p>
        </div>`;
    }).join('');

    // Social Links
    let socialsHTML = '';
    if (github) {
        socialsHTML += `<a href="https://github.com/${github}" target="_blank" class="social-icon-link" aria-label="GitHub">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>`;
    }
    if (linkedin) {
        socialsHTML += `<a href="https://linkedin.com/in/${linkedin}" target="_blank" class="social-icon-link" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>`;
    }
    if (email) {
        socialsHTML += `<a href="mailto:${email}" class="social-icon-link" aria-label="Email">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </a>`;
    }

    // Stylesheet reference (Preview directly embeds it; Production links it)
    const styleRef = isPreview 
        ? `<style>${buildPortfolioCSS(state)}</style>` 
        : `<link rel="stylesheet" href="style.css">`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} - Student Portfolio</title>
    ${styleRef}
</head>
<body class="theme-${selectedTemplate}">

    <!-- Navigation Header -->
    <header class="navbar">
        <div class="nav-container">
            <a href="#" class="nav-brand">${name}</a>
            <nav class="nav-menu">
                <a href="#about">About</a>
                ${skills.length > 0 ? '<a href="#skills">Skills</a>' : ''}
                ${projects.length > 0 ? '<a href="#projects">Projects</a>' : ''}
                ${(education.length > 0 || experience.length > 0) ? '<a href="#timeline">Journey</a>' : ''}
                <a href="#contact" class="nav-cta-btn">Connect</a>
            </nav>
        </div>
    </header>

    <!-- Hero / Profile Intro Section -->
    <section id="hero" class="hero-section">
        <div class="container hero-content">
            <h1 class="hero-title">Hi, I'm <span class="accent-text">${name}</span></h1>
            <p class="hero-tagline">${title}</p>
            <p class="hero-desc">${bio}</p>
            <div class="social-links-row">${socialsHTML}</div>
            <div class="hero-actions">
                <a href="#contact" class="btn-cta">Get in Touch</a>
                ${projects.length > 0 ? '<a href="#projects" class="btn-outline-cta">View My Work</a>' : ''}
            </div>
        </div>
    </section>

    <!-- About Detail Section -->
    <section id="about" class="about-section">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            <div class="about-grid">
                <div class="about-info-block">
                    <p>I am currently focused on advancing my career and academic profile in the field. Below is a quick overview of where to find me and how to reach me.</p>
                    <ul class="info-list">
                        ${location ? `<li><strong>Location:</strong> <span>${location}</span></li>` : ''}
                        ${email ? `<li><strong>Email:</strong> <span><a href="mailto:${email}">${email}</a></span></li>` : ''}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    ${skills.length > 0 ? `
    <section id="skills" class="skills-section">
        <div class="container">
            <h2 class="section-title">Skills & Technologies</h2>
            <div class="skills-grid">
                ${skillsHTML}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Projects Section -->
    ${projects.length > 0 ? `
    <section id="projects" class="projects-section">
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                ${projectsHTML}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Timeline Journey Section -->
    ${(education.length > 0 || experience.length > 0) ? `
    <section id="timeline" class="timeline-section">
        <div class="container">
            <h2 class="section-title">My Journey</h2>
            <div class="timeline-grid">
                
                ${education.length > 0 ? `
                <div class="timeline-column">
                    <h3 class="column-title">Education</h3>
                    <div class="timeline-wrapper">
                        ${educationHTML}
                    </div>
                </div>
                ` : ''}

                ${experience.length > 0 ? `
                <div class="timeline-column">
                    <h3 class="column-title">Work & Leadership</h3>
                    <div class="timeline-wrapper">
                        ${experienceHTML}
                    </div>
                </div>
                ` : ''}

            </div>
        </div>
    </section>
    ` : ''}

    <!-- Contact & Footer -->
    <section id="contact" class="contact-section">
        <div class="container">
            <h2 class="section-title">Let's Connect</h2>
            <p class="contact-pitch">Whether you want to discuss research opportunities, internships, or just talk tech, feel free to drop me a message.</p>
            <div class="contact-card">
                <h3>Send an Email</h3>
                ${email ? `<a href="mailto:${email}" class="contact-btn-main">${email}</a>` : '<p>No email provided</p>'}
                <div class="footer-socials">${socialsHTML}</div>
            </div>
        </div>
    </section>

    <footer class="main-footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${name}. Handcrafted portfolio.</p>
        </div>
    </footer>

</body>
</html>`;
}

// CSS Style Generator
function buildPortfolioCSS(state) {
    const {
        themeColor = 'blue',
        font = 'plus-jakarta',
        selectedTemplate = 'neoglow'
    } = state;

    const accent = AccentColors[themeColor] || AccentColors.blue;
    const fontInfo = Fonts[font] || Fonts['plus-jakarta'];

    let templateCSS = '';

    // ==========================================================================
    // NEO-GLOW STYLE (DARK MODERN)
    // ==========================================================================
    if (selectedTemplate === 'neoglow') {
        templateCSS = `
        :root {
            --bg-color: #030712;
            --bg-card: rgba(17, 24, 39, 0.7);
            --border-glow: rgba(${accent.rgb}, 0.15);
            --border-hover: rgba(${accent.rgb}, 0.35);
            --text-main: #f3f4f6;
            --text-sub: #9ca3af;
            --accent: ${accent.primary};
            --accent-rgb: ${accent.rgb};
        }

        body {
            background-color: var(--bg-color);
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(${accent.rgb}, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 40%);
            color: var(--text-main);
        }

        .navbar {
            background-color: rgba(3, 7, 18, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .nav-brand {
            color: #fff;
            font-weight: 800;
        }

        .nav-menu a {
            color: var(--text-sub);
        }
        .nav-menu a:hover {
            color: var(--accent);
        }
        .nav-cta-btn {
            border: 1px solid var(--accent);
            color: var(--accent) !important;
            box-shadow: 0 0 10px var(--border-glow);
        }
        .nav-cta-btn:hover {
            background-color: var(--accent);
            color: #fff !important;
            box-shadow: 0 0 20px rgba(${accent.rgb}, 0.3);
        }

        /* Hero styling */
        .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
        }
        .accent-text {
            background: linear-gradient(135deg, var(--accent), #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 40px rgba(${accent.rgb}, 0.2);
        }
        .hero-tagline {
            font-size: 1.5rem;
            color: var(--text-sub);
        }
        .hero-desc {
            max-width: 600px;
            margin: 0 auto;
        }

        .btn-cta {
            background-color: var(--accent);
            color: white;
            box-shadow: 0 0 20px var(--border-glow);
        }
        .btn-cta:hover {
            box-shadow: 0 0 30px rgba(${accent.rgb}, 0.4);
            transform: translateY(-2px);
        }
        .btn-outline-cta {
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-main);
        }
        .btn-outline-cta:hover {
            background-color: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.2);
        }

        /* Skill & Project Cards */
        .skill-category-card, .project-card {
            background-color: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px);
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .skill-category-card:hover, .project-card:hover {
            transform: translateY(-5px);
            border-color: var(--border-hover);
            box-shadow: 0 15px 40px rgba(${accent.rgb}, 0.15);
        }

        .badge-item {
            background-color: rgba(${accent.rgb}, 0.1);
            color: var(--accent);
            border: 1px solid rgba(${accent.rgb}, 0.2);
        }

        .tech-tag {
            background-color: rgba(255,255,255,0.05);
            color: var(--text-sub);
        }

        .project-link {
            color: var(--accent);
        }

        /* Timelines */
        .timeline-dot {
            background-color: var(--accent);
            box-shadow: 0 0 10px var(--accent);
        }
        .timeline-period {
            background-color: rgba(${accent.rgb}, 0.1);
            color: var(--accent);
            border: 1px solid rgba(${accent.rgb}, 0.2);
        }

        /* Contact Details */
        .contact-card {
            background-color: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
        }

        .contact-btn-main {
            background: linear-gradient(135deg, var(--accent), #a78bfa);
            color: white;
            box-shadow: 0 0 25px var(--border-glow);
        }

        .social-icon-link {
            background-color: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-sub);
        }
        .social-icon-link:hover {
            background-color: var(--accent);
            color: white;
            transform: scale(1.1);
        }
        `;
    } 
    // ==========================================================================
    // MINIMALIST STYLE (ACADEMIC / ELEGANT LIGHT)
    // ==========================================================================
    else if (selectedTemplate === 'minimalist') {
        templateCSS = `
        :root {
            --bg-color: #ffffff;
            --bg-card: #f8fafc;
            --border-glow: rgba(0,0,0,0.05);
            --border-hover: rgba(0,0,0,0.1);
            --text-main: #0f172a;
            --text-sub: #475569;
            --accent: ${accent.primary};
            --accent-rgb: ${accent.rgb};
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            line-height: 1.7;
        }

        .navbar {
            background-color: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid #f1f5f9;
        }
        
        .nav-brand {
            color: var(--text-main);
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .nav-menu a {
            color: var(--text-sub);
            font-weight: 500;
        }
        .nav-menu a:hover {
            color: var(--text-main);
            text-decoration: underline;
        }
        .nav-cta-btn {
            border: 1px solid var(--text-main);
            color: var(--text-main) !important;
            border-radius: 4px;
        }
        .nav-cta-btn:hover {
            background-color: var(--text-main);
            color: #fff !important;
        }

        /* Hero styling */
        .hero-title {
            font-size: 3.8rem;
            font-weight: 700;
            letter-spacing: -0.03em;
        }
        .accent-text {
            color: var(--accent);
        }
        .hero-tagline {
            font-size: 1.6rem;
            color: var(--text-sub);
            font-style: italic;
        }

        .btn-cta {
            background-color: var(--text-main);
            color: white;
            border-radius: 4px;
        }
        .btn-cta:hover {
            background-color: #334155;
            transform: translateY(-1px);
        }
        .btn-outline-cta {
            border: 1px solid #cbd5e1;
            color: var(--text-main);
            border-radius: 4px;
        }
        .btn-outline-cta:hover {
            background-color: #f1f5f9;
        }

        /* Skill & Project Cards */
        .skill-category-card, .project-card {
            background-color: var(--bg-card);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            transition: all 0.2s ease-in-out;
        }
        
        .skill-category-card:hover, .project-card:hover {
            transform: translateY(-2px);
            border-color: #cbd5e1;
            box-shadow: 0 10px 20px rgba(0,0,0,0.03);
        }

        .badge-item {
            background-color: #fff;
            color: var(--text-main);
            border: 1px solid #cbd5e1;
        }

        .tech-tag {
            background-color: #e2e8f0;
            color: var(--text-sub);
        }

        .project-link {
            color: var(--accent);
            text-decoration: underline;
        }

        /* Timelines */
        .timeline-dot {
            background-color: var(--text-main);
        }
        .timeline-period {
            background-color: #f1f5f9;
            color: var(--text-sub);
            border: 1px solid #e2e8f0;
        }

        /* Contact Details */
        .contact-card {
            background-color: var(--bg-card);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
        }

        .contact-btn-main {
            background-color: var(--text-main);
            color: white;
            border-radius: 4px;
        }
        .contact-btn-main:hover {
            background-color: #334155;
        }

        .social-icon-link {
            background-color: white;
            border: 1px solid #e2e8f0;
            color: var(--text-sub);
        }
        .social-icon-link:hover {
            background-color: var(--text-main);
            color: white;
        }
        `;
    } 
    // ==========================================================================
    // CREATIVE PASTEL STYLE (PLAYFUL DESIGNER)
    // ==========================================================================
    else if (selectedTemplate === 'creative') {
        templateCSS = `
        :root {
            --bg-color: #fcfaf7;
            --bg-card: #ffffff;
            --border-glow: rgba(${accent.rgb}, 0.05);
            --border-hover: rgba(${accent.rgb}, 0.2);
            --text-main: #2d2a26;
            --text-sub: #6b6359;
            --accent: ${accent.primary};
            --accent-rgb: ${accent.rgb};
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
        }

        .navbar {
            background-color: rgba(252, 250, 247, 0.9);
            backdrop-filter: blur(10px);
            border-bottom: 2px solid #f3ece3;
        }
        
        .nav-brand {
            color: var(--text-main);
            font-weight: 800;
        }

        .nav-menu a {
            color: var(--text-sub);
            font-weight: 600;
        }
        .nav-menu a:hover {
            color: var(--accent);
        }
        .nav-cta-btn {
            border: 2px solid var(--accent);
            color: var(--accent) !important;
            border-radius: 20px;
            background-color: rgba(${accent.rgb}, 0.05);
        }
        .nav-cta-btn:hover {
            background-color: var(--accent);
            color: #fff !important;
        }

        /* Hero styling */
        .hero-title {
            font-size: 3.6rem;
            font-weight: 800;
        }
        .accent-text {
            color: var(--accent);
            position: relative;
            z-index: 1;
        }
        .accent-text::after {
            content: '';
            position: absolute;
            bottom: 4px; left: 0; width: 100%; height: 12px;
            background-color: rgba(${accent.rgb}, 0.15);
            z-index: -1;
            border-radius: 4px;
        }
        .hero-tagline {
            font-size: 1.6rem;
            color: var(--text-sub);
            font-weight: 600;
        }

        .btn-cta {
            background-color: var(--accent);
            color: white;
            border-radius: 30px;
        }
        .btn-cta:hover {
            box-shadow: 0 8px 20px rgba(${accent.rgb}, 0.3);
            transform: translateY(-2px);
        }
        .btn-outline-cta {
            border: 2px solid #e9dfd3;
            color: var(--text-main);
            border-radius: 30px;
        }
        .btn-outline-cta:hover {
            background-color: #f3ece3;
        }

        /* Skill & Project Cards */
        .skill-category-card, .project-card {
            background-color: var(--bg-card);
            border: 2px solid #f3ece3;
            border-radius: 20px;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .skill-category-card:hover, .project-card:hover {
            transform: translateY(-6px);
            border-color: var(--accent);
            box-shadow: 0 12px 24px rgba(0,0,0,0.04);
        }

        .badge-item {
            background-color: #fbf6f0;
            color: var(--text-sub);
            border: 1px solid #eedecf;
            border-radius: 12px;
        }

        .tech-tag {
            background-color: rgba(${accent.rgb}, 0.08);
            color: var(--accent);
            border-radius: 6px;
        }

        .project-link {
            color: var(--accent);
            font-weight: 700;
        }

        /* Timelines */
        .timeline-dot {
            background-color: var(--accent);
            border: 4px solid #fcfaf7;
            width: 16px; height: 16px;
        }
        .timeline-period {
            background-color: rgba(${accent.rgb}, 0.1);
            color: var(--accent);
            border-radius: 30px;
            font-weight: 700;
        }

        /* Contact Details */
        .contact-card {
            background-color: var(--bg-card);
            border: 2px solid #f3ece3;
            border-radius: 24px;
        }

        .contact-btn-main {
            background-color: var(--accent);
            color: white;
            border-radius: 30px;
        }

        .social-icon-link {
            background-color: #f3ece3;
            color: var(--text-sub);
            border-radius: 50%;
        }
        .social-icon-link:hover {
            background-color: var(--accent);
            color: white;
            transform: translateY(-3px) rotate(8deg);
        }
        `;
    }
    // ==========================================================================
    // CYBERPUNK STYLE (TERMINAL MONO)
    // ==========================================================================
    else if (selectedTemplate === 'cyberpunk') {
        templateCSS = `
        :root {
            --bg-color: #020617;
            --bg-card: #0b1329;
            --border-glow: #10b981;
            --border-hover: ${accent.primary};
            --text-main: #10b981;
            --text-sub: #34d399;
            --text-dark: #064e3b;
            --accent: ${accent.primary};
            --accent-rgb: ${accent.rgb};
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: var(--font-mono);
            background-image: 
                linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
        }

        .navbar {
            background-color: #020617;
            border-bottom: 2px solid var(--text-main);
        }
        
        .nav-brand {
            color: var(--text-main);
            font-family: var(--font-mono);
            font-weight: 700;
        }
        .nav-brand::before {
            content: './';
        }

        .nav-menu a {
            color: var(--text-sub);
            font-family: var(--font-mono);
        }
        .nav-menu a:hover {
            background-color: rgba(16, 185, 129, 0.1);
            color: #fff;
        }
        .nav-cta-btn {
            border: 1px solid var(--text-main);
            color: var(--text-main) !important;
            background-color: transparent;
        }
        .nav-cta-btn:hover {
            background-color: var(--text-main) !important;
            color: var(--bg-color) !important;
        }

        /* Hero styling */
        .hero-title {
            font-size: 3rem;
            font-weight: 700;
            text-transform: uppercase;
        }
        .hero-title::before {
            content: '>> ';
        }
        .accent-text {
            color: #fff;
            background-color: rgba(16, 185, 129, 0.2);
            padding: 0 8px;
            border: 1px dashed var(--text-main);
        }
        .hero-tagline {
            font-size: 1.4rem;
            color: var(--accent);
        }
        .hero-tagline::before {
            content: '[ROLE]: ';
        }

        .btn-cta {
            background-color: transparent;
            border: 1px solid var(--text-main);
            color: var(--text-main);
        }
        .btn-cta:hover {
            background-color: var(--text-main);
            color: var(--bg-color);
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
        }
        .btn-outline-cta {
            border: 1px solid var(--accent);
            color: var(--accent);
        }
        .btn-outline-cta:hover {
            background-color: var(--accent);
            color: var(--bg-color);
            box-shadow: 0 0 15px rgba(${accent.rgb}, 0.4);
        }

        /* Skill & Project Cards */
        .skill-category-card, .project-card {
            background-color: var(--bg-card);
            border: 1px solid var(--text-main);
            border-radius: 0;
            position: relative;
        }
        .skill-category-card::before, .project-card::before {
            content: '[SYSTEM_UNIT]';
            position: absolute;
            top: -10px; right: 10px;
            font-size: 0.6rem;
            background-color: var(--bg-color);
            padding: 0 5px;
            color: var(--accent);
        }
        
        .skill-category-card:hover, .project-card:hover {
            border-color: var(--accent);
            box-shadow: inset 0 0 10px rgba(${accent.rgb}, 0.1), 0 0 15px rgba(${accent.rgb}, 0.2);
        }

        .badge-item {
            background-color: var(--bg-color);
            color: var(--text-sub);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 0;
        }

        .tech-tag {
            background-color: var(--text-dark);
            color: var(--text-main);
            border-radius: 0;
        }

        .project-link {
            color: var(--accent);
            font-family: var(--font-mono);
        }

        /* Timelines */
        .timeline-dot {
            background-color: var(--text-main);
            border-radius: 0;
            width: 10px; height: 10px;
        }
        .timeline-period {
            background-color: var(--text-dark);
            color: var(--text-main);
            border: 1px solid var(--text-main);
            border-radius: 0;
        }

        /* Contact Details */
        .contact-card {
            background-color: var(--bg-card);
            border: 2px solid var(--text-main);
            border-radius: 0;
        }

        .contact-btn-main {
            background-color: var(--text-main);
            color: var(--bg-color);
            font-weight: 700;
        }
        .contact-btn-main:hover {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }

        .social-icon-link {
            background-color: var(--bg-color);
            border: 1px solid var(--text-main);
            color: var(--text-main);
            border-radius: 0;
        }
        .social-icon-link:hover {
            background-color: var(--text-main);
            color: var(--bg-color);
        }
        `;
    }

    // ==========================================================================
    // CORE LAYOUT RULES (COMMON TO ALL SITES)
    // ==========================================================================
    const layoutCSS = `
    ${fontInfo.import}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    body {
        font-family: ${fontInfo.fallback};
        font-size: 16px;
        overflow-x: hidden;
    }

    a {
        text-decoration: none;
        transition: all 0.2s ease-in-out;
    }

    .container {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    /* Navbar */
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        z-index: 100;
    }

    .nav-container {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-brand {
        font-size: 1.5rem;
    }

    .nav-menu {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .nav-menu a {
        font-size: 0.95rem;
        font-weight: 500;
    }

    .nav-cta-btn {
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 600;
    }

    /* Sections */
    section {
        padding: 100px 0;
    }

    .section-title {
        font-size: 2.2rem;
        font-weight: 800;
        margin-bottom: 3rem;
        position: relative;
        text-align: center;
        letter-spacing: -0.02em;
    }

    /* Hero */
    .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        text-align: center;
        padding-top: 140px;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .hero-tagline {
        font-weight: 600;
    }

    .hero-desc {
        font-size: 1.15rem;
        color: var(--text-sub);
        line-height: 1.6;
        max-width: 650px;
    }

    .social-links-row {
        display: flex;
        gap: 12px;
        margin: 10px 0;
    }

    .social-icon-link {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }

    .hero-actions {
        display: flex;
        gap: 16px;
        margin-top: 15px;
    }

    .btn-cta, .btn-outline-cta {
        padding: 12px 28px;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        transition: all 0.2s;
    }

    /* About section */
    .about-section {
        background-color: var(--bg-card);
    }
    
    .about-grid {
        display: flex;
        justify-content: center;
    }

    .about-info-block {
        max-width: 700px;
        text-align: center;
    }
    .about-info-block p {
        font-size: 1.1rem;
        color: var(--text-sub);
        margin-bottom: 2rem;
    }

    .info-list {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
    }
    .info-list li {
        font-size: 0.95rem;
        color: var(--text-sub);
    }
    .info-list li strong {
        color: var(--text-main);
        margin-right: 5px;
    }
    .info-list li a {
        color: var(--accent);
    }

    /* Skills Grid */
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .skill-category-card {
        padding: 2rem;
    }

    .skill-category-card h4 {
        font-size: 1.15rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        color: var(--text-main);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .badges-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .badge-item {
        padding: 6px 12px;
        font-size: 0.85rem;
        font-weight: 600;
        border-radius: 6px;
    }

    /* Projects Grid */
    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
    }

    .project-card {
        padding: 2.2rem;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .project-card h3 {
        font-size: 1.35rem;
        font-weight: 700;
        color: var(--text-main);
    }

    .project-card p {
        font-size: 0.95rem;
        color: var(--text-sub);
        line-height: 1.6;
        flex-grow: 1;
    }

    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 8px 0;
    }

    .tech-tag {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 4px;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 8px;
        width: fit-content;
    }

    /* Timelines */
    .timeline-section {
        background-color: var(--bg-card);
    }

    .timeline-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
    }

    @media (max-width: 768px) {
        .timeline-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }
    }

    .column-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: var(--text-main);
        text-align: center;
    }

    .timeline-wrapper {
        border-left: 2px solid rgba(255,255,255,0.06);
        padding-left: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;
    }
    
    .theme-minimalist .timeline-wrapper {
        border-left-color: #e2e8f0;
    }

    .timeline-item {
        position: relative;
    }

    .timeline-dot {
        position: absolute;
        left: calc(-1.5rem - 6px);
        top: 6px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .timeline-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 4px;
    }

    .timeline-period {
        font-size: 0.75rem;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 12px;
    }

    .timeline-item h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-main);
    }

    .timeline-subtitle {
        font-size: 0.9rem;
        color: var(--text-sub);
        font-weight: 600;
        margin-bottom: 8px;
    }

    .timeline-body {
        font-size: 0.9rem;
        color: var(--text-sub);
        line-height: 1.6;
    }

    /* Contact & Footer */
    .contact-section {
        text-align: center;
    }

    .contact-pitch {
        font-size: 1.15rem;
        color: var(--text-sub);
        max-width: 600px;
        margin: 0 auto 3rem auto;
        line-height: 1.6;
    }

    .contact-card {
        max-width: 500px;
        margin: 0 auto;
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    .contact-btn-main {
        padding: 14px 32px;
        font-size: 1.1rem;
        font-weight: 700;
        border-radius: 8px;
        display: inline-block;
        transition: all 0.3s;
    }
    .contact-btn-main:hover {
        transform: translateY(-2px);
    }

    .footer-socials {
        display: flex;
        gap: 12px;
        margin-top: 1rem;
    }

    .main-footer {
        padding: 2rem 0;
        border-top: 1px solid rgba(255,255,255,0.05);
        text-align: center;
        font-size: 0.9rem;
        color: var(--text-sub);
    }
    
    .theme-minimalist .main-footer {
        border-top-color: #e2e8f0;
    }

    /* Mobile Responsive Toggles */
    @media (max-width: 768px) {
        .navbar {
            height: 70px;
        }
        .nav-menu {
            display: none; /* simple placeholder layout, templates can customize */
        }
        .hero-title {
            font-size: 2.5rem;
        }
        .section-title {
            font-size: 1.8rem;
            margin-bottom: 2rem;
        }
        section {
            padding: 60px 0;
        }
    }
    `;

    return templateCSS + layoutCSS;
}

// Generate Readme.md File
function buildReadmeMD(name) {
    return `# ${name}'s Portfolio

This portfolio website was handcrafted and exported using **Portfolia**.

## Project Structure
- \`index.html\`: The main webpage structure containing your profile, skills, projects, education, and experience.
- \`style.css\`: The styling variables, custom layout grid, and selected premium theme configurations.
- \`portfolio-data.json\`: The raw configuration of your data. You can import this file back into Portfolia at any time to update your content!

## Customizing Locally
Feel free to open \`index.html\` or \`style.css\` in any code editor (like VS Code) to make custom tweaks, change colors, or adjust content manually.

## Deployment Options
To share your portfolio with the world, you can host it for free using:
1. **GitHub Pages** (Recommended)
   - Create a new repository on GitHub.
   - Upload your files (\`index.html\` and \`style.css\`).
   - Go to Settings -> Pages, select the \`main\` branch, and click Save.
2. **Netlify**
   - Drag and drop your folder onto Netlify Drop (https://app.netlify.com/drop).
3. **Vercel**
   - Use the Vercel CLI or deploy via GitHub integration.
`;
}
