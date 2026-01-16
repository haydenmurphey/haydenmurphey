export interface ProjectLink {
  github?: string;
  demo?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  status: string;
  statusColor: string;
  tags: string[];
  links: ProjectLink;
}

export const projects: Project[] = [
  {
    title: 'SIEM Analytics Dashboard',
    description:
      'Enterprise security information and event management (SIEM) analytics dashboard with real-time threat detection, automated incident response workflows, and comprehensive security metrics visualization. Built with security-first principles including role-based access control, encrypted data transmission, and audit logging.',
  image: '/images/site/blog-cover1.webp',
    status: 'Example Project',
    statusColor: 'bg-cyber-green',
    tags: ['Python', 'Elastic Stack', 'Splunk', 'Security Analytics', 'Threat Detection', 'DevSecOps'],
    links: {
      github: 'https://github.com/yourusername/siem-dashboard',
      demo: 'https://demo.example.com',
    },
  },
  {
    title: 'Automated Threat Intelligence Platform',
    description:
      'Open-source threat intelligence aggregation platform that collects, correlates, and analyzes indicators of compromise (IOCs) from multiple feeds. Includes MITRE ATT&CK mapping, automated threat scoring, and integration with popular security tools. Designed for SOC teams to enhance threat hunting capabilities.',
  image: '/images/site/blog-cover2.webp',
    status: 'Open Source',
    statusColor: 'bg-cyber-cyan',
    tags: ['Threat Intelligence', 'MITRE ATT&CK', 'Python', 'API Integration', 'SOC Tools', 'Security Automation'],
    links: {
      github: 'https://github.com/yourusername/threat-intel-platform',
    },
  },
  {
    title: 'Fixture Flow',
    description:
      'Fixture Flow is a personalized, accessibility-first web application designed to solve "information overload" in sports tracking. While most soccer platforms overwhelm users with dense layouts and unnecessary data, Fixture Flow prioritizes a clean, curated experience. Users can select their favorite teams and leagues to create a bespoke home screen that delivers real-time scores and upcoming schedules at a glance.',
  image: '/images/site/fixtureflow.webp',
    status: 'Academic Project',
    statusColor: 'bg-cyber-cyan',
    tags: ['Asynch API', 'WCAG-Compliant', 'localStorage', 'CSS', 'HTML', 'JavaScript', 'PHP'],
    links: {
      github: 'https://github.com/haydenmurphey/fixtureflow',
      demo: 'https://fixtureflow.page.gd/',
    },
  },
  {
    title: 'Professional Portfolio',
    description:
      'Professional cybersecurity portfolio with integrated blog system using MDX, modern Next.js architecture, and responsive design. This project will remain in production as my career develops as an intro cybersecurity professional.',
    image: 'current-site',
    status: 'On-going',
    statusColor: 'bg-cyber-green',
    tags: ['MDX Blog', 'TypeScript', 'CSS', 'JavaScript', 'Responsive'],
    links: {
      github: 'https://github.com/haydenmurphey/haydenmurphey',
    },
  },
];
