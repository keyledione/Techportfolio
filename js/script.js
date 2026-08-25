/**
 * ============================================================
 *  script.js — Keyle Dione Portfolio
 *  All vanilla JS: cursor glow, progress bar, skill filters,
 *  project filters, counters, typing effect, scroll reveals,
 *  mobile nav, theme toggle, and premium background system.
 * ============================================================
 */

"use strict";

// ============================================================
//   DATA — All skills and projects
// ============================================================

const skillsData = [
  // Programming Languages
  { name: "Python", cat: "programming", icon: "fab fa-python" },
  { name: "JavaScript", cat: "programming", icon: "fab fa-js" },
  { name: "HTML5", cat: "programming", icon: "fab fa-html5" },
  { name: "CSS3", cat: "programming", icon: "fab fa-css3-alt" },
  { name: "SQL", cat: "programming", icon: "fas fa-database" },
  { name: "R", cat: "programming", icon: "fas fa-chart-bar" },
  { name: "STATA", cat: "programming", icon: "fas fa-chart-line" },
  { name: "PHP", cat: "programming", icon: "fab fa-php" },

  // Web Development
  { name: "Responsive Design", cat: "web", icon: "fas fa-mobile-alt" },
  { name: "Tailwind CSS", cat: "web", icon: "fab fa-tailwind" },
  { name: "React", cat: "web", icon: "fab fa-react" },
  { name: "Node.js", cat: "web", icon: "fab fa-node" },

  // Data Science & Analytics
  { name: "Power BI", cat: "data", icon: "fas fa-chart-pie" },
  { name: "Tableau", cat: "data", icon: "fas fa-chart-area" },
  { name: "MySQL", cat: "data", icon: "fas fa-database" },
  { name: "PostgreSQL", cat: "data", icon: "fas fa-database" },

  // Graphic Design
  { name: "Adobe Photoshop", cat: "design", icon: "fab fa-adobe" },
  { name: "Adobe Illustrator", cat: "design", icon: "fab fa-adobe" },
  { name: "Figma", cat: "design", icon: "fab fa-figma" },
  { name: "Canva", cat: "design", icon: "fas fa-paint-brush" },

  // Hardware & Systems
  { name: "Computer Hardware", cat: "hardware", icon: "fas fa-microchip" },
  { name: "Networking", cat: "hardware", icon: "fas fa-network-wired" },
  { name: "Linux", cat: "hardware", icon: "fab fa-linux" },
  { name: "Windows", cat: "hardware", icon: "fab fa-windows" },

  // Tools & DevOps
  { name: "Git", cat: "tools", icon: "fab fa-git-alt" },
  { name: "GitHub", cat: "tools", icon: "fab fa-github" },
  { name: "VS Code", cat: "tools", icon: "fas fa-code" },
  { name: "Jupyter Notebook", cat: "tools", icon: "fas fa-book" },
  { name: "XAMPP", cat: "tools", icon: "fas fa-server" },
  { name: "Docker", cat: "tools", icon: "fab fa-docker" },
];

const projectsData = [
  {
    title: "Intra Creative Studios",
    desc: "A modern creative agency website built with HTML, CSS and JavaScript.",
    tags: ["web", "js"],
    icon: "fa-paint-brush",
  },
  {
    title: "Employee Management System",
    desc: "A web-based employee management system developed using PHP, HTML, CSS and Tailwind CSS.",
    tags: ["web", "systems"],
    icon: "fa-users",
  },
  {
    title: "Patient Referral System",
    desc: "A digital system designed to manage and organize patient referral information.",
    tags: ["systems", "web"],
    icon: "fa-hospital",
  },
  {
    title: "ShopEase",
    desc: "An e-commerce website concept demonstrating product presentation and shopping interactions.",
    tags: ["web", "js"],
    icon: "fa-shopping-cart",
  },
  {
    title: "Pizza Sales Dashboard",
    desc: "A data analytics project involving SQL and Power BI to analyze pizza sales.",
    tags: ["data"],
    icon: "fa-chart-bar",
  },
  {
    title: "HR Analytics",
    desc: "A data analysis and visualization project focused on human resource insights.",
    tags: ["data"],
    icon: "fa-chart-line",
  },
  {
    title: "WASH Study",
    desc: "A data-oriented project involving analysis and presentation of WASH-related information.",
    tags: ["data"],
    icon: "fa-water",
  },
];

// ============================================================
//   CLASS: WaveLines — Warm, visible animated waves
// ============================================================
class WaveLines {
  constructor() {
    this.canvas = document.getElementById("bg-waves");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.time = 0;
    this.resize();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize());
  }

  animate() {
    this.time += 0.005;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    const baseOpacity = isLight ? 0.15 : 0.15;

    // Three warm waves
    const waves = [
      {
        amplitude: 22,
        frequency: 0.005,
        speed: 0.25,
        offset: 0,
        color: `rgba(220, 38, 38, ${baseOpacity})`,
      },
      {
        amplitude: 30,
        frequency: 0.0035,
        speed: 0.18,
        offset: 130,
        color: `rgba(37, 99, 235, ${baseOpacity * 0.7})`,
      },
      {
        amplitude: 16,
        frequency: 0.007,
        speed: 0.35,
        offset: 260,
        color: `rgba(245, 237, 230, ${baseOpacity * 0.5})`,
      },
    ];

    waves.forEach((wave) => {
      ctx.beginPath();
      for (let x = 0; x < w; x += 2) {
        const y =
          h * 0.25 +
          wave.offset * 0.25 +
          wave.amplitude *
            Math.sin(x * wave.frequency + this.time * wave.speed) +
          wave.amplitude *
            0.4 *
            Math.sin(x * wave.frequency * 2 + this.time * wave.speed * 0.6 + 1);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });

    // Bottom wave - warm accent
    ctx.beginPath();
    for (let x = 0; x < w; x += 2) {
      const y =
        h * 0.78 +
        20 * Math.sin(x * 0.007 + this.time * 0.18) +
        14 * Math.sin(x * 0.013 + this.time * 0.28 + 2);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(220, 38, 38, ${baseOpacity * 0.6})`;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================================
//   CLASS: ThemeManager — Dark/Light theme toggle
// ============================================================
class ThemeManager {
  constructor() {
    this.toggle = document.getElementById("themeToggle");
    this.currentTheme = localStorage.getItem("theme") || "dark";
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    this.currentTheme = theme;
    localStorage.setItem("theme", theme);

    const icon = this.toggle.querySelector("i");
    if (theme === "dark") {
      icon.className = "fas fa-moon";
    } else {
      icon.className = "fas fa-sun";
    }
  }

  toggleTheme() {
    const next = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(next);
  }

  bindEvents() {
    this.toggle.addEventListener("click", () => {
      this.toggleTheme();
    });
  }
}

// ============================================================
//   CLASS: CursorGlow — Follows mouse with smooth transition
// ============================================================
class CursorGlow {
  constructor() {
    this.el = document.getElementById("cursor-glow");
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.el.style.left = this.x + "px";
      this.el.style.top = this.y + "px";
    });
  }
}

// ============================================================
//   CLASS: ProgressBar — Updates width on scroll
// ============================================================
class ProgressBar {
  constructor() {
    this.el = document.getElementById("progress-bar");
    this.bindScroll();
  }

  bindScroll() {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      this.el.style.width = progress + "%";
    });
  }
}

// ============================================================
//   CLASS: SkillManager — Renders and filters skills
// ============================================================
class SkillManager {
  constructor() {
    this.grid = document.getElementById("skillsGrid");
    this.filterButtons = document.querySelectorAll("#skillFilters button");
    this.currentFilter = "all";
    this.bindEvents();
    this.render("all");
  }

  render(filter) {
    this.grid.innerHTML = "";
    const filtered =
      filter === "all"
        ? skillsData
        : skillsData.filter((s) => s.cat === filter);

    filtered.forEach((skill, index) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.style.transitionDelay = index * 0.05 + "s";
      card.innerHTML = `
        <i class="${skill.icon}"></i>
        <div class="skill-name">${skill.name}</div>
        <div class="skill-cat">${skill.cat}</div>
      `;
      this.grid.appendChild(card);

      setTimeout(
        () => {
          card.classList.add("visible");
        },
        50 + index * 50,
      );
    });
  }

  bindEvents() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFilter = btn.dataset.filter;
        this.render(this.currentFilter);
      });
    });
  }
}

// ============================================================
//   CLASS: ProjectManager — Renders and filters projects
// ============================================================
class ProjectManager {
  constructor() {
    this.grid = document.getElementById("projectsGrid");
    this.filterButtons = document.querySelectorAll("#projectFilters button");
    this.currentFilter = "all";
    this.bindEvents();
    this.render("all");
  }

  render(filter) {
    this.grid.innerHTML = "";
    const filtered =
      filter === "all"
        ? projectsData
        : projectsData.filter((p) => p.tags.includes(filter));

    filtered.forEach((project, index) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.style.transitionDelay = index * 0.08 + "s";
      card.innerHTML = `
        <div class="project-icon"><i class="fas ${project.icon}"></i></div>
        <div class="body">
          <h3>${project.title}</h3>
          <p>${project.desc}</p>
          <div class="project-tags">${project.tags.map((t) => `<span>#${t}</span>`).join("")}</div>
          <button class="magnetic-btn" style="padding:8px 20px; font-size:0.8rem; margin-top:0.5rem;">
            <span class="relative z-10">View Project</span>
          </button>
        </div>
      `;
      this.grid.appendChild(card);

      setTimeout(
        () => {
          card.classList.add("visible");
        },
        100 + index * 80,
      );
    });
  }

  bindEvents() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentFilter = btn.dataset.filter;
        this.render(this.currentFilter);
      });
    });
  }
}

// ============================================================
//   CLASS: AnimatedCounters — Triggers on scroll
// ============================================================
class AnimatedCounters {
  constructor() {
    this.counters = document.querySelectorAll(".stat-item .num");
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = el.dataset.count;
            if (target === "∞") {
              el.textContent = "∞";
              return;
            }
            const num = parseInt(target, 10);
            let current = 0;
            const step = Math.max(1, Math.ceil(num / 50));
            const interval = setInterval(() => {
              current += step;
              if (current >= num) {
                el.textContent = num;
                clearInterval(interval);
              } else {
                el.textContent = current;
              }
            }, 25);
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 },
    );

    this.counters.forEach((c) => this.observer.observe(c));
  }
}

// ============================================================
//   CLASS: TypingEffect — Cycles through brand slogans
// ============================================================
// ============================================================
//   CLASS: TypingEffect — Cycles through brand slogans
// ============================================================
class TypingEffect {
  constructor() {
    this.el = document.getElementById("typingText");
    this.slogans = [
      "Building digital experiences.",
      "Tech · Data · Design.",
      "Code with purpose.",
      "Practical solutions, clean code.",
      "Hardware · Software · Data.",
    ];
    this.index = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.slogans[this.index];
    if (this.isDeleting) {
      this.el.textContent = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.el.textContent = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? 30 : 60;

    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.index = (this.index + 1) % this.slogans.length;
      speed = 500;
    }

    setTimeout(() => this.type(), speed);
  }
}

// ============================================================
//   CLASS: ScrollReveal — Intersection Observer for lazy reveals
// ============================================================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll(".scroll-reveal");
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );
    this.elements.forEach((el) => this.observer.observe(el));
  }
}

// ============================================================
//   CLASS: ScrollToTop — Appears after 500px
// ============================================================
class ScrollToTop {
  constructor() {
    this.btn = document.getElementById("scrollTopBtn");
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        this.btn.classList.add("visible");
      } else {
        this.btn.classList.remove("visible");
      }
    });

    this.btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// ============================================================
//   CLASS: MobileNav — Toggle mobile menu
// ============================================================
class MobileNav {
  constructor() {
    this.toggle = document.getElementById("mobileToggle");
    this.nav = document.querySelector(".glass-nav");
    this.isOpen = false;
    this.bindEvents();
  }

  bindEvents() {
    this.toggle.addEventListener("click", () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        const existing = document.querySelector(".mobile-dropdown");
        if (!existing) {
          const dropdown = document.createElement("div");
          dropdown.className =
            "mobile-dropdown md:hidden bg-[#1a1410]/95 backdrop-blur-lg border-b border-white/5 px-6 py-8 flex flex-col gap-6 text-white/70";
          dropdown.innerHTML = `
            <a href="#hero" class="hover:text-white transition-colors text-lg">Home</a>
            <a href="#about" class="hover:text-white transition-colors text-lg">About</a>
            <a href="#skills" class="hover:text-white transition-colors text-lg">Skills</a>
            <a href="#projects" class="hover:text-white transition-colors text-lg">Projects</a>
            <a href="#showcase" class="hover:text-white transition-colors text-lg">Showcase</a>
            <a href="#contact" class="magnetic-btn text-center w-full">Let's Work Together</a>
          `;
          this.nav.parentNode.insertBefore(dropdown, this.nav.nextSibling);
          dropdown.classList.add("open");
        }
      } else {
        const dropdown = document.querySelector(".mobile-dropdown");
        if (dropdown) dropdown.remove();
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest('a[href^="#"]')) {
        const dropdown = document.querySelector(".mobile-dropdown");
        if (dropdown) {
          dropdown.remove();
          this.isOpen = false;
        }
      }
    });
  }
}

// ============================================================
//   CLASS: FormValidation — Contact form with validation
// ============================================================
class FormValidation {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.feedback = document.getElementById("formFeedback");
    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("cname").value.trim();
      const email = document.getElementById("cemail").value.trim();
      const message = document.getElementById("cmessage").value.trim();

      this.feedback.style.color = "";
      this.feedback.textContent = "";

      if (!name || !email || !message) {
        this.feedback.style.color = "#ef4444";
        this.feedback.textContent = "⚠️ All fields are required.";
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        this.feedback.style.color = "#ef4444";
        this.feedback.textContent = "⚠️ Please enter a valid email address.";
        return;
      }

      if (message.length < 10) {
        this.feedback.style.color = "#ef4444";
        this.feedback.textContent =
          "⚠️ Message must be at least 10 characters.";
        return;
      }

      this.feedback.style.color = "#22c55e";
      this.feedback.textContent = "✅ Message sent successfully! (demo)";

      const submitBtn = this.form.querySelector(".magnetic-btn");
      submitBtn.textContent = "✓ Sent!";
      submitBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
      setTimeout(() => {
        submitBtn.textContent = "Send Message";
        submitBtn.style.background = "";
      }, 2000);

      this.form.reset();
    });
  }
}

// ============================================================
//   CLASS: NavScroll — Updates nav on scroll
// ============================================================
class NavScroll {
  constructor() {
    this.nav = document.getElementById("mainNav");
    this.links = document.querySelectorAll('.glass-nav a[href^="#"]');
    this.sections = document.querySelectorAll("section[id]");
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.nav.classList.add("scrolled");
      } else {
        this.nav.classList.remove("scrolled");
      }

      let current = "hero";
      this.sections.forEach((sec) => {
        const top = sec.offsetTop - 150;
        if (window.scrollY >= top) {
          current = sec.id;
        }
      });

      this.links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });
  }
}

// ============================================================
//   INIT — Instantiate all classes
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
  new WaveLines(); // Warm animated waves
  new CursorGlow();
  new ProgressBar();
  new SkillManager();
  new ProjectManager();
  new AnimatedCounters();
  new TypingEffect();
  new ScrollReveal();
  new ScrollToTop();
  new MobileNav();
  new FormValidation();
  new NavScroll();
});

console.log(
  "%c◆ Keyle Dione ◆",
  "font-size:24px; font-weight:bold; color:#dc2626;",
);
console.log(
  "%cBuilding digital experiences with code & creativity.",
  "font-size:14px; color:#94a3b8;",
);
console.log(
  "%c✦ Premium animated background system active.",
  "font-size:12px; color:#2563eb;",
);
console.log(
  "%c✦ Dark/Light theme toggle available.",
  "font-size:12px; color:#2563eb;",
);
