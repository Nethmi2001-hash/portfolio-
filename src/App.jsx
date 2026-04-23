import { useEffect, useState } from 'react';

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section reveal">
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      {children}
    </section>
  );
}

export default function App() {
  const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light');

  useEffect(() => {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.menu-toggle');
    const revealItems = document.querySelectorAll('.reveal');

    const onToggle = () => {
      if (!nav || !toggle) return;
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    };

    const onNavClick = () => {
      if (!nav || !toggle) return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    if (toggle) {
      toggle.addEventListener('click', onToggle);
    }

    const navLinks = nav ? nav.querySelectorAll('a') : [];
    navLinks.forEach((link) => link.addEventListener('click', onNavClick));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      if (toggle) {
        toggle.removeEventListener('click', onToggle);
      }
      navLinks.forEach((link) => link.removeEventListener('click', onNavClick));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightbox((prev) => ({ ...prev, open: false }));
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const year = new Date().getFullYear();
  const fallbackImage = (event, fallbackSrc) => {
    if (event.currentTarget.src.includes(fallbackSrc)) return;
    event.currentTarget.src = fallbackSrc;
  };

  const openLightbox = (src, alt) => {
    setLightbox({ open: true, src, alt });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, open: false }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home">
          Nethmi
        </a>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle light and dark mode">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
          Menu
        </button>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#highlights">Highlights</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#services">Services</a>
          <a href="#proof">Proof</a>
          <a href="#projects">Projects</a>
          <a href="#snapshot">Snapshot</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section reveal">
          <div className="hero-content">
            <p className="eyebrow">Software Engineering Undergraduate</p>
            <h1>Wasala Mudiyanselage Nethmi Savindani Wasala</h1>
            <p className="lead">
              Software Engineering undergraduate building practical web applications with a quality-first mindset.
            </p>
            <p className="objective">
              Target Role: Internship or junior software role in web development, QA, or full-stack engineering.
            </p>
            <div className="hero-tags" aria-label="Core focus areas">
              <span>PHP</span>
              <span>MySQL</span>
              <span>QA Testing</span>
              <span>Agile Workflow</span>
            </div>
            <div className="tech-icons" aria-label="Primary tech stack">
              <span className="tech-icon" title="PHP">PH</span>
              <span className="tech-icon" title="MySQL">MY</span>
              <span className="tech-icon" title="Python">PY</span>
              <span className="tech-icon" title="GitHub">GH</span>
            </div>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/Nethmi_Savindani_CV.pdf" download>
                Download CV
              </a>
              <a className="btn btn-ghost" href="#projects">
                Featured Projects
              </a>
              <a className="btn btn-ghost" href="#contact">
                Contact Me
              </a>
            </div>
          </div>
          <div className="profile-card" aria-label="Professional profile block">
            <div className="profile-frame">
              <img
                className="profile-image"
                src="/images/profile.jpg"
                alt="Portrait of Nethmi Savindani"
                onError={(event) => fallbackImage(event, '/images/profile-placeholder.svg')}
              />
            </div>
            <h2>Nethmi Savindani</h2>
            <p>Software Engineering Undergraduate</p>
            <p className="profile-meta">Available for internships and junior software roles</p>
          </div>
        </section>

        <section id="proof" className="proof-strip reveal" aria-label="Portfolio proof highlights">
          <article className="proof-item">
            <h3>BSc (Hons)</h3>
            <p>Software Engineering Undergraduate, NSBM Green University</p>
          </article>
          <article className="proof-item">
            <h3>4 Projects</h3>
            <p>Public repositories featured with real source links</p>
          </article>
          <article className="proof-item">
            <h3>QA + Dev</h3>
            <p>Hands-on with web development and software testing workflows</p>
          </article>
          <article className="proof-item">
            <h3>Available</h3>
            <p>Open to internship and junior software engineering roles</p>
          </article>
        </section>

        <Section
          id="highlights"
          title="Recruiter Highlights"
          subtitle="Quick facts hiring managers usually look for during an initial profile review."
        >
          <div className="highlights-grid">
            <article className="card highlight-item">
              <h3>Role Interest</h3>
              <p>Seeking internship or junior opportunities in software engineering, web development, or QA.</p>
            </article>
            <article className="card highlight-item">
              <h3>Core Strength</h3>
              <p>Builds practical web systems and validates quality with structured test case and bug workflows.</p>
            </article>
            <article className="card highlight-item">
              <h3>Tech Focus</h3>
              <p>PHP, MySQL, JavaScript, Python, Git/GitHub, plus SDLC and Agile-based team execution.</p>
            </article>
            <article className="card highlight-item">
              <h3>Communication</h3>
              <p>Clear documentation, team collaboration, and fast learning in delivery-focused environments.</p>
            </article>
          </div>
        </Section>

        <Section
          id="about"
          title="About"
          subtitle="A quick profile of my academic background, interests, and software engineering focus."
        >
          <p>
            I am currently pursuing a BSc (Hons) in Software Engineering at NSBM Green University. My project work
            focuses on web application development, software testing, and system analysis. I aim to contribute to
            production teams through clean implementation, testing discipline, and reliable delivery.
          </p>
        </Section>

        <Section
          id="education"
          title="Education"
          subtitle="My academic journey and milestones that support my software engineering foundation."
        >
          <div className="timeline">
            <article className="timeline-item card">
              <h3>BSc (Hons) in Software Engineering</h3>
              <p>NSBM Green University (Affiliated with University of Plymouth, UK)</p>
              <span>2023 - Present</span>
            </article>
            <article className="timeline-item card">
              <h3>G.C.E. Advanced Level (Biological Science Stream)</h3>
              <span>2022</span>
            </article>
            <article className="timeline-item card">
              <h3>G.C.E. Ordinary Level</h3>
              <span>2017</span>
            </article>
          </div>
        </Section>

        <Section
          id="experience"
          title="Experience"
          subtitle="Practical project-based experience that reflects real development and testing workflows."
        >
          <article className="card">
            <h3>Seeking First Professional Opportunity</h3>
            <p>
              Although pre-industry, I have completed multiple end-to-end projects that reflect real team delivery
              stages.
            </p>
            <ul>
              <li>Built responsive applications with PHP/MySQL and structured relational schemas.</li>
              <li>Implemented authentication, CRUD modules, and complete database integration.</li>
              <li>Applied SDLC and Agile methods in collaborative university projects.</li>
              <li>Executed manual testing with test-case design and bug reporting.</li>
            </ul>
          </article>
        </Section>

        <Section
          id="skills"
          title="Skills"
          subtitle="Core tools, technologies, and methods I use to design, build, and validate software."
        >
          <div className="skills-grid">
            <article className="card">
              <h3>Web Development</h3>
              <p>PHP, MySQL, Responsive Websites</p>
            </article>
            <article className="card">
              <h3>Programming</h3>
              <p>Python, C#</p>
            </article>
            <article className="card">
              <h3>Database</h3>
              <p>Design, Management, Integration</p>
            </article>
            <article className="card">
              <h3>Testing</h3>
              <p>Manual Testing, Test Cases, Bug Reports</p>
            </article>
            <article className="card">
              <h3>Methodologies</h3>
              <p>SDLC, Agile</p>
            </article>
            <article className="card">
              <h3>Tools</h3>
              <p>Git, GitHub</p>
            </article>
          </div>
        </Section>

        <Section
          id="services"
          title="Services"
          subtitle="How I can support projects through development, analysis, database work, and QA."
        >
          <div className="services-grid">
            <article className="card">
              <h3>Web Application Development</h3>
              <p>Build responsive, database-connected web applications using PHP and MySQL.</p>
            </article>
            <article className="card">
              <h3>UI/UX Support</h3>
              <p>Create clean interfaces with clear navigation and user-centered layout decisions.</p>
            </article>
            <article className="card">
              <h3>System Analysis</h3>
              <p>Support requirement analysis and convert functional needs into implementation-ready flows.</p>
            </article>
            <article className="card">
              <h3>Database Design</h3>
              <p>Design efficient relational schemas and practical data-handling logic.</p>
            </article>
            <article className="card">
              <h3>Software Testing</h3>
              <p>Perform manual testing, write test cases, and produce clear defect reports.</p>
            </article>
          </div>
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="Selected case studies showing problem-solving approach, implementation, and measurable outcomes."
        >
          <div className="projects-grid case-studies">
            <article className="card project-card">
              <p className="project-label">Case Study 01</p>
              <button
                type="button"
                className="project-shot-button"
                onClick={() => openLightbox('/images/project-webapp.jpg', 'Screenshot of web application dashboard project')}
                aria-label="Open project screenshot for User Management System"
              >
                <img
                  className="project-shot"
                  src="/images/project-webapp.jpg"
                  alt="Screenshot of user management system project"
                  onError={(event) => fallbackImage(event, '/images/project-webapp-placeholder.svg')}
                />
              </button>
              <h3>User Management System</h3>
              <p>
                <strong>Problem:</strong> Need a structured backend API to manage users with reliable CRUD operations.
              </p>
              <p>
                <strong>Solution:</strong> Built a RESTful API with Node.js, Express, MongoDB, and Mongoose for create,
                read, update, and delete workflows.
              </p>
              <p className="stack">Stack: JavaScript, Node.js, Express, MongoDB, Mongoose</p>
              <p className="outcome">Outcome: Completed an end-to-end API project with clean data modeling.</p>
              <a
                className="text-link"
                href="https://github.com/Nethmi2001-hash/user-management-system"
                target="_blank"
                rel="noreferrer"
              >
                View user-management-system
              </a>
            </article>
            <article className="card project-card">
              <p className="project-label">Case Study 02</p>
              <button
                type="button"
                className="project-shot-button"
                onClick={() => openLightbox('/images/project-api.jpg', 'Screenshot of weather app project')}
                aria-label="Open project screenshot for Weather App"
              >
                <img
                  className="project-shot"
                  src="/images/project-api.jpg"
                  alt="Screenshot of weather app"
                  onError={(event) => fallbackImage(event, '/images/project-api-placeholder.svg')}
                />
              </button>
              <h3>Weather App</h3>
              <p>
                <strong>Problem:</strong> Display real-time weather status in a simple, user-friendly interface.
              </p>
              <p>
                <strong>Solution:</strong> Built a JavaScript weather application that presents weather updates through a
                clean frontend view.
              </p>
              <p className="stack">Stack: JavaScript, HTML, CSS</p>
              <p className="outcome">Outcome: Delivered live weather status rendering for location-based lookups.</p>
              <a className="text-link" href="https://github.com/Nethmi2001-hash/weather-app" target="_blank" rel="noreferrer">
                View weather-app
              </a>
            </article>
            <article className="card project-card">
              <p className="project-label">Case Study 03</p>
              <button
                type="button"
                className="project-shot-button"
                onClick={() => openLightbox('/images/project-team.jpg', 'Screenshot of cinema ticket booking web application')}
                aria-label="Open project screenshot for Cinema Ticket Booking Web Application"
              >
                <img
                  className="project-shot"
                  src="/images/project-team.jpg"
                  alt="Screenshot of cinema ticket booking web application"
                  onError={(event) => fallbackImage(event, '/images/project-team-placeholder.svg')}
                />
              </button>
              <h3>Cinema Ticket Booking Web Application</h3>
              <p>
                <strong>Problem:</strong> Need a structured web workflow for ticket booking with server-side Java
                architecture.
              </p>
              <p>
                <strong>Solution:</strong> Worked with JSP/Servlet architecture, package setup, and database connection
                configuration in a university web application context.
              </p>
              <p className="stack">Stack: Java, JSP, Servlets, Database Connectivity</p>
              <p className="outcome">Outcome: Strengthened full-stack Java web development and team delivery practice.</p>
              <a
                className="text-link"
                href="https://github.com/Nethmi2001-hash/CinemaTicketBookingWebApplication"
                target="_blank"
                rel="noreferrer"
              >
                View CinemaTicketBookingWebApplication
              </a>
            </article>
            <article className="card project-card">
              <p className="project-label">Case Study 04</p>
              <h3>Coffee Website</h3>
              <p>
                <strong>Problem:</strong> Build an attractive, responsive branded landing experience for a coffee theme.
              </p>
              <p>
                <strong>Solution:</strong> Designed and styled a front-end website with SCSS-focused visual structure and
                modern layout composition.
              </p>
              <p className="stack">Stack: SCSS, HTML, JavaScript</p>
              <p className="outcome">Outcome: Improved front-end styling confidence and responsive design skills.</p>
              <a className="text-link" href="https://github.com/Nethmi2001-hash/coffee-website" target="_blank" rel="noreferrer">
                View coffee-website
              </a>
            </article>
          </div>
        </Section>

        <Section
          id="snapshot"
          title="Projects Snapshot"
          subtitle="Quick recruiter view of project name, stack, contribution focus, and source code link."
        >
          <div className="snapshot-wrap card">
            <table className="snapshot-table" aria-label="Projects snapshot table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Stack</th>
                  <th>Role</th>
                  <th>Repo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User Management System</td>
                  <td>Node.js, Express, MongoDB</td>
                  <td>API design and CRUD implementation</td>
                  <td>
                    <a href="https://github.com/Nethmi2001-hash/user-management-system" target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Weather App</td>
                  <td>JavaScript, HTML, CSS</td>
                  <td>Frontend integration and data rendering</td>
                  <td>
                    <a href="https://github.com/Nethmi2001-hash/weather-app" target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Cinema Ticket Booking Web App</td>
                  <td>Java, JSP, Servlets</td>
                  <td>Setup, modules, and database connection</td>
                  <td>
                    <a
                      href="https://github.com/Nethmi2001-hash/CinemaTicketBookingWebApplication"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Coffee Website</td>
                  <td>SCSS, HTML, JavaScript</td>
                  <td>UI styling and responsive frontend structure</td>
                  <td>
                    <a href="https://github.com/Nethmi2001-hash/coffee-website" target="_blank" rel="noreferrer">
                      Open
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <section className="section cta-banner reveal" aria-label="Primary contact call to action">
          <div className="cta-content">
            <p className="eyebrow">Let&apos;s Work Together</p>
            <h2>Building user-focused software with consistency and quality</h2>
            <p>
              Open to internships and junior opportunities in web development, software engineering, and QA testing.
            </p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-primary" href="mailto:nethmisavindani@gmail.com">
              Hire Me
            </a>
            <a className="btn btn-ghost" href="/Nethmi_Savindani_CV.pdf" download>
              Download CV
            </a>
          </div>
        </section>

        <Section
          id="contact"
          title="Contact"
          subtitle="Reach out for internships, junior roles, or collaboration opportunities in software projects."
        >
          <div className="email-shortcuts card" aria-label="Recruiter quick email actions">
            <h3>Quick Recruiter Actions</h3>
            <div className="email-shortcut-actions">
              <a
                className="btn btn-ghost"
                href="mailto:nethmisavindani@gmail.com?subject=Internship%20Opportunity%20-%20Software%20Engineering&body=Hello%20Nethmi%2C%0A%0AWe%20would%20like%20to%20discuss%20an%20internship%20opportunity%20with%20you."
              >
                Internship Inquiry
              </a>
              <a
                className="btn btn-ghost"
                href="mailto:nethmisavindani@gmail.com?subject=Junior%20Developer%20Role%20Discussion&body=Hello%20Nethmi%2C%0A%0AWe%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20junior%20role."
              >
                Junior Role Discussion
              </a>
              <a
                className="btn btn-ghost"
                href="mailto:nethmisavindani@gmail.com?subject=Interview%20Invitation&body=Hello%20Nethmi%2C%0A%0AWe%20would%20like%20to%20invite%20you%20for%20an%20interview."
              >
                Interview Invitation
              </a>
            </div>
          </div>

          <div className="contact-wrap">
            <div className="card contact-details">
              <p>
                <strong>Email:</strong> <a href="mailto:nethmisavindani@gmail.com">nethmisavindani@gmail.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+94713542116">071 354 2116</a>
              </p>
              <p>
                <strong>Location:</strong> Galgamuwa, Kurunegala District, North Western Province, Sri Lanka
              </p>
              <p>
                <strong>LinkedIn:</strong>{' '}
                <a href="https://www.linkedin.com/in/savindani-nethmi-55b585331/" target="_blank" rel="noreferrer">
                  Profile
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{' '}
                <a href="https://github.com/Nethmi2001-hash" target="_blank" rel="noreferrer">
                  Nethmi2001-hash
                </a>
              </p>
            </div>

            <form
              className="card contact-form"
              action="mailto:nethmisavindani@gmail.com"
              method="post"
              encType="text/plain"
            >
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required />

              <button className="btn btn-primary" type="submit">
                Send Message
              </button>
              <p className="form-note">This form opens your email app to send the message.</p>
            </form>
          </div>
        </Section>
      </main>

      {lightbox.open ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project screenshot preview" onClick={closeLightbox}>
          <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Close screenshot preview">
              Close
            </button>
            <img className="lightbox-image" src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      ) : null}

      <footer className="site-footer">
        <p>{`© ${year} Nethmi Savindani. Built with focus and consistency.`}</p>
      </footer>
    </>
  );
}
