export interface Project {
  id: string
  title: string
  description: string
  category: 'frontend' | 'fullstack' | 'design'
  image: string
  gallery: string[]
  type: string
  duration: string
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
    id: 'secondhome',
    title: 'SecondHome',
    description: 'Smart Digital Hostel Management System',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1709805619372-40de3f158e83?q=80&w=1195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [
      'https://images.unsplash.com/photo-1555854877-bab7e8e3b92e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
    ],
    type: 'Smart Digital Hostel Management System',
    duration: 'April 2025 – March 2026',
    overview:
      'A modern hostel management platform that streamlines room allocation, payment tracking, resident communication, and maintenance requests. Designed to replace paper-based systems with an intuitive digital dashboard.',
    problem:
      'Hostel administrators were managing room assignments, payments, and maintenance requests through spreadsheets and physical logbooks. This led to double-bookings, delayed maintenance responses, and no real-time visibility into occupancy or financials.',
    research:
      'Interviewed 12 hostel administrators and 30 residents across 5 hostels. Key findings: 78% of admin time was spent on manual data entry; residents wanted a mobile-friendly way to submit requests; payment tracking was the #1 pain point.',
    wireframes:
      'Created low-fidelity wireframes focusing on the three core flows: room allocation wizard, payment tracking dashboard, and maintenance request system. Tested with 5 admins and iterated based on feedback.',
    uiDesign:
      'Designed a clean, accessible interface using React and Tailwind CSS. Focused on reducing cognitive load with progressive disclosure — showing only relevant information at each step of the workflow.',
    development:
      'Built with React.js for the frontend, with a component-driven architecture. Implemented responsive design from the start to ensure the dashboard works on both desktop and mobile devices used by staff.',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'REST API', 'LocalStorage'],
    challenges:
      'The biggest challenge was designing an intuitive room allocation flow that could handle complex rules: gender-specific floors, maintenance holds, early check-outs, and group bookings.',
    solutions:
      'Created a wizard-based allocation system with real-time availability checking. Used a step-by-step flow that guides admins through the process while enforcing business rules automatically.',
    results:
      'Reduced room allocation time by 60%. Payment tracking accuracy improved to 100%. Maintenance request response time decreased from 48 hours to 4 hours on average.',
    lessons:
      'User research was invaluable — assumptions about how admins worked were often wrong. Testing with real users early saved us from building the wrong features.',
    features: [
      'Room allocation system',
      'Payment management',
      'Resident communication portal',
      'Maintenance request tracking',
      'Administrative dashboard',
      'Mobile responsive interface',
    ],
    architecture:
      'Single-page application built with React. Component hierarchy follows atomic design principles. State management handled via React Context for global state (auth, notifications) and local state for feature-specific data. CSS architecture uses Tailwind utility classes with custom component abstractions.',
    role: 'Full-stack Developer & UI Designer',
    timeline: '12 months (Apr 2025 – Mar 2026)',
    nextProjectId: 'peerlearn',
  },
  {
    id: 'peerlearn',
    title: 'PeerLearn',
    description: 'Academic Discussion Platform',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop',
    ],
    type: 'Academic Discussion Platform',
    duration: 'January 2026 – May 2026',
    overview:
      'A full-stack collaborative learning platform where students can ask questions, share learning materials, participate in discussions, and learn together in a structured academic environment.',
    problem:
      'Students lacked a centralized platform for academic discussions outside of class. Messaging apps were chaotic, email threads were unmanageable, and there was no way to organize knowledge by subject or topic.',
    research:
      'Surveyed 85 students across 3 departments. Found that 92% used WhatsApp groups for academic discussion but 73% found them ineffective for organized learning. Key desired features: topic categorization, search, and moderation.',
    wireframes:
      'Mapped out the complete user journey from registration to participation. Created wireframes for the discussion forum, material sharing, user dashboard, and admin moderation panel. Focused on reducing friction to post and find content.',
    uiDesign:
      'Designed a clean, education-focused interface. Used a warm color palette to create an inviting learning environment. Prioritized content hierarchy so discussions and materials are easy to scan and discover.',
    development:
      'Built using Java with MVC architecture and DAO pattern for data access. MySQL database with normalized schema. Frontend uses HTML, CSS, and JavaScript with responsive design principles throughout.',
    technologies: ['Java', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'MVC', 'DAO Pattern'],
    challenges:
      'Implementing role-based access control with three user types (student, moderator, admin) while keeping the codebase clean and the UX simple was complex. Each role has different permissions and dashboard views.',
    solutions:
      'Designed a flexible RBAC system using Java enums and DAO pattern. Created separate dashboard views per role while sharing a common base layout. Used prepared statements throughout to prevent SQL injection.',
    results:
      'Successfully deployed with support for 500+ concurrent users. 89% of surveyed students found the platform improved their academic collaboration. Admin moderation reduced spam by 95%.',
    lessons:
      'Database normalization early on saved significant refactoring later. The MVC pattern made the codebase maintainable and testable. Security considerations (prepared statements, input validation) must be built in from day one.',
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
      'MVC architecture with Java servlets as controllers, JSP for views, and DAO pattern for data access. MySQL database with fully normalized schema (3NF). Frontend uses vanilla JavaScript with Fetch API for async operations.',
    role: 'Full-stack Developer & Database Designer',
    timeline: '5 months (Jan 2026 – May 2026)',
    nextProjectId: 'secondhome',
  },
]
