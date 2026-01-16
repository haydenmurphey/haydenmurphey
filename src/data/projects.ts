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
    title: 'Security Orchestration Automation',
    description:
      'Security orchestration, automation and response (SOAR) playbooks for common incident response scenarios. Automates repetitive security tasks including phishing analysis, malware triage, and vulnerability management. Integrates with leading SIEM, EDR, and ticketing systems for streamlined security operations.',
  image: '/images/site/blog-cover1.webp',
    status: 'Active Development',
    statusColor: 'bg-cyber-green',
    tags: ['SOAR', 'Security Automation', 'Incident Response', 'Python', 'API', 'Integration'],
    links: {
      github: 'https://github.com/yourusername/soar-playbooks',
      demo: 'https://demo.example.com',
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
