export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  category: 'frontend' | 'fullstack' | 'design' | 'all'
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Echo Dashboard',
    description: 'Real-time analytics dashboard with live data streams',
    longDescription:
      'A full-featured analytics dashboard built for Echo SaaS platform. Features real-time WebSocket data streams, interactive D3.js charts, role-based access control, and dark mode. Handles 10k+ concurrent users.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com/echo',
    repoUrl: 'https://github.com/example/echo',
    category: 'frontend',
  },
  {
    id: 'p2',
    title: 'Harvest API',
    description: 'RESTful API for farm management and crop tracking',
    longDescription:
      'Designed and implemented a RESTful API for managing farms, crops, inventory, and supply chain. Built with Node.js, Express, PostgreSQL, and Redis caching. OpenAPI 3.0 documented with automated client generation.',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    repoUrl: 'https://github.com/example/harvest',
    category: 'fullstack',
  },
  {
    id: 'p3',
    title: 'Morph UI',
    description: 'Open-source component library with 60+ accessible components',
    longDescription:
      'An open-source React component library focused on accessibility and customization. Includes 60+ components with full ARIA support, keyboard navigation, themeable design tokens, and comprehensive Storybook documentation. 2k+ GitHub stars.',
    tags: ['React', 'Storybook', 'A11y', 'CSS'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com/morph',
    repoUrl: 'https://github.com/example/morph',
    category: 'design',
  },
  {
    id: 'p4',
    title: 'Voyager Travel',
    description: 'Full-stack travel booking platform with itinerary builder',
    longDescription:
      'A comprehensive travel booking platform with flight/hotel search, interactive maps, itinerary builder, and payment integration. Microservices architecture with React frontend, NestJS backend, and MongoDB.',
    tags: ['React', 'NestJS', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com/voyager',
    category: 'fullstack',
  },
  {
    id: 'p5',
    title: 'Pulse Fitness',
    description: 'Workout tracking app with progress visualizations',
    longDescription:
      'A progressive web app for tracking workouts, sets, reps, and body measurements. Features custom workout plans, progress charts, social sharing, and offline support via Service Workers.',
    tags: ['React', 'PWA', 'Chart.js', 'IndexedDB'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
    liveUrl: 'https://example.com/pulse',
    repoUrl: 'https://github.com/example/pulse',
    category: 'frontend',
  },
  {
    id: 'p6',
    title: 'Craft Design System',
    description: 'Scalable design system for a B2B SaaS suite',
    longDescription:
      'A comprehensive design system supporting 5 product teams across a B2B SaaS suite. Includes Figma component library, React implementation, responsive grid system, typography scale, and accessibility guidelines.',
    tags: ['Figma', 'React', 'Design Tokens', 'Documentation'],
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop',
    category: 'design',
  },
]
