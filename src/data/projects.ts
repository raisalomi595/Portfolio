export interface Project {
  id: string
  title: string
  description: string
  // TODO: replace Unsplash references with real product screenshots
  image: string
  // TODO: replace gallery images with real screenshots
  gallery: string[]
  type: string
  overview: string
  problem: string
  research: string
  wireframes: string
  uiDesign: string
  development: string
  technologies: string[]
  challenges: string
  solutions: string
  results: string
  lessons: string
  features: string[]
  architecture: string
  role: string
  timeline: string
  liveUrl?: string
  repoUrl?: string
  nextProjectId: string
}

export const projects: Project[] = [
  {
    id: 'jobnepal',
    title: 'JobNepal',
    description:
      'A job portal for the Nepali market — real listings, resilient logo handling, and a responsive layout.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    ],
    type: 'Frontend Application',
    overview:
      'A job portal frontend built for the Nepali market, showing real listings from Nepali companies with their actual logos. Job seekers can browse, search, and open positions across categories without fighting the interface.',
    problem:
      'Job platforms tend to bury relevant listings behind cluttered feeds and slow, awkward mobile layouts. On small screens — where most people actually search — filters break, logos vanish, and company branding becomes untrustworthy.',
    research:
      'I walked the flows of the major job boards by hand — home, listing, filters, job detail, application — and took notes on where they lose people. The recurring gaps: unfiltered result pages, inconsistent logo treatment, and no clear signal of which listings are trustworthy. Applying for jobs myself gave me a running list of frustrations to design against.',
    wireframes:
      'Mapped the key flows first: home with an instant-jobs sidebar, listing page with filters, job detail with breadcrumbs, and employer/auth pages. Content hierarchy came before styling — the fastest path to a job card always won.',
    uiDesign:
      'A clean, readable interface with a warm professional palette, tuned for scanning long lists of listings. Tailwind CSS 4 utility classes kept spacing, typography, and breakpoints consistent across every screen.',
    development:
      'Built with React 19 and Vite 8 for fast iteration and small production bundles. React Router v7 handles client-side routing with nested layouts; Tailwind CSS 4 provides a token-driven design system.',
    technologies: ['React 19', 'Vite 8', 'Tailwind CSS 4', 'React Router v7', 'ESLint'],
    challenges:
      'Company logos arrive from everywhere — CDNs, company sites, or nowhere at all. The sidebar (Instant Jobs + Hot Jobs) also had to stay useful at every width without collapsing into clutter.',
    solutions:
      'Built a layered logo-resolution chain: primary source → CDN → site fallback → generated avatar, so a missing logo never breaks a card. The sidebar uses CSS grid with named areas — stacked on mobile, two columns on desktop.',
    results:
      'Shipped to Vercel with real listings from companies like Ncell, Nabil Bank, Nepal Telecom, Yeti Airlines, and Pathao. The logo chain degrades gracefully instead of showing broken images, and the layout holds from 375px up to desktop.',
    lessons:
      'Production-quality frontends are mostly defensive rendering — fallbacks, empty states, and graceful degradation. Vite 8 made iterating on all of it significantly faster than older tooling.',
    features: [
      'Real job listings from Nepali companies',
      'Company logos with fallback chain',
      'Job detail page with breadcrumbs',
      'Browse all jobs with search',
      'Employer registration portal',
      'User authentication (login/signup)',
      'Responsive sidebar layout',
      'Instant Jobs & Hot Jobs sections',
    ],
    architecture:
      'Single-page application built with React 19 and Vite 8. React Router v7 provides declarative routing with nested layouts. Components are organized feature-by-feature, styling runs through Tailwind CSS 4 theme tokens, and data flows through a service layer for API integration.',
    role: 'Frontend Developer & UI Designer',
    timeline: '1 month (May 2026 – June 2026)',
    liveUrl: 'https://job-nepal.vercel.app',
    repoUrl: 'https://github.com/raisalomi595/JobNepal',
    nextProjectId: 'secondhome',
  },
  {
    id: 'secondhome',
    title: 'SecondHome',
    description:
      'Hostel management — room allocation, payments, and maintenance requests in one dashboard.',
    image: 'https://images.unsplash.com/photo-1709805619372-40de3f158e83?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab7e8e3b92e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
    ],
    type: 'Full-stack System',
    overview:
      'A hostel management platform covering room allocation, payment tracking, resident communication, and maintenance requests — built to replace paper registers and spreadsheets with one dashboard.',
    problem:
      'Hostel administration usually runs on registers, spreadsheets, and memory. Room assignments get double-booked, payment history lives in three different notebooks, and maintenance requests disappear into group chats with no record of who promised what.',
    research:
      'I traced how hostels around me actually operate: a register for room assignment, a ledger for payments, and WhatsApp for maintenance. The weak points were consistent — no single view of occupancy, no history you could search, and requests that fell between pages. Those observations became the three core flows.',
    wireframes:
      'Started with low-fidelity wireframes for the three flows that mattered: a room-allocation wizard, a payment-tracking dashboard, and a maintenance request system. Each screen shows only what the current step needs.',
    uiDesign:
      'A clean, accessible interface in React and Tailwind CSS, built around progressive disclosure — admins see availability, holds, and conflicts at the moment they matter rather than all at once.',
    development:
      'Built with React and a component-driven architecture. Responsive from the start, since staff use both desktops and phones to check occupancy.',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'REST API', 'LocalStorage'],
    challenges:
      'Room allocation carries real-world rules: gender-specific floors, maintenance holds, early check-outs, and group bookings — all of which can contradict each other.',
    solutions:
      'A wizard-based allocation flow with real-time availability checks. The step-by-step path enforces the business rules automatically, so an admin cannot create a conflict even by accident.',
    results:
      'Allocation that took cross-referencing several pages now happens in a few guided clicks, with conflicts blocked up front. Payments and maintenance history live in one searchable place instead of scattered notebooks.',
    lessons:
      'Assumptions about how admins worked were regularly wrong — tracing the paper flow first was worth more than any feature I sketched. The wizard structure came directly from watching the real process.',
    features: [
      'Room allocation system',
      'Payment management',
      'Resident communication portal',
      'Maintenance request tracking',
      'Administrative dashboard',
      'Mobile responsive interface',
    ],
    architecture:
      'Single-page React application with a component hierarchy following atomic design. Global state (auth, notifications) runs through React Context; feature data stays local. Styling uses Tailwind utility classes with small component abstractions.',
    role: 'Full-stack Developer & UI Designer',
    timeline: '12 months (Apr 2025 – Mar 2026)',
    nextProjectId: 'peerlearn',
  },
  {
    id: 'peerlearn',
    title: 'PeerLearn',
    description:
      'Academic discussion platform — role-based forums, material sharing, and moderation.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop',
    ],
    type: 'Full-stack Platform',
    overview:
      'A collaborative learning platform where students ask questions, share materials, and take part in discussions organized by subject — with moderators keeping order.',
    problem:
      'Academic discussion outside class happens in messaging groups where questions sink within a day and materials scatter across chats. Nothing is organized by subject, nothing is searchable, and nobody is accountable for keeping it usable.',
    research:
      'I compared how classmates actually discuss coursework — group chats, shared drives, email threads — against what a structured forum needs. The same requests kept surfacing: topics, search, and someone moderating. Those three became the product core.',
    wireframes:
      'Mapped the full journey from registration to first post, then wireframed the discussion forum, material sharing, user dashboard, and admin moderation panel. Friction to post and friction to find were the two metrics that mattered.',
    uiDesign:
      'An education-focused interface with a warm palette so the platform feels inviting rather than institutional. Content hierarchy keeps long discussions scannable.',
    development:
      'Built in Java with MVC architecture and the DAO pattern for data access, against a normalized MySQL schema. The frontend uses HTML, CSS, and JavaScript with responsive layouts throughout.',
    technologies: ['Java', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'MVC', 'DAO Pattern'],
    challenges:
      'Three user types — student, moderator, admin — each need different permissions and dashboards, while the codebase stays clean and the UX stays simple.',
    solutions:
      'A role-based access system built on Java enums and the DAO pattern, with per-role dashboard views sharing a common base layout. Prepared statements are used throughout to prevent SQL injection.',
    results:
      'A working full-stack platform with authentication, RBAC, forums, material sharing, and both user and admin dashboards — built through to a normalized (3NF) schema rather than stopped at the frontend.',
    lessons:
      'Normalizing the database early saved a large refactor later, and MVC kept the growing codebase maintainable. Security — prepared statements, input validation — has to be built in from day one, not added at the end.',
    features: [
      'User authentication',
      'Role-based access control',
      'Discussion forums',
      'Material sharing',
      'Admin moderation panel',
      'CRUD operations',
      'User dashboard',
      'Admin dashboard',
    ],
    architecture:
      'MVC architecture with Java servlets as controllers, JSP views, and DAO-pattern data access over a normalized (3NF) MySQL schema. The frontend uses vanilla JavaScript with the Fetch API for async operations.',
    role: 'Full-stack Developer & Database Designer',
    timeline: '5 months (Jan 2026 – May 2026)',
    nextProjectId: 'jobnepal',
  },
]
