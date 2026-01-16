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
    title: 'Autonomous Search & Rescue Navigation System for ROS2 TurtleBot 3',
    description:
      'Developed a robust algorithmic movement system in Python using ROS2 to simulate high-stakes search and rescue operations. This project centered on a custom autonomous function that orchestrated a TurtleBot 3 through a dynamic environment to locate and identify victims. Tested in a competition environemnt.',
  image: '/images/site/turtlebot3.webp',
    status: 'Academic Project',
    statusColor: 'bg-cyber-cyan',
    tags: ['ArUco', 'LiDAR', 'TurtleBot3', 'Gazebo', 'ROS2', 'Python'],
    links: {
      github: 'https://github.com/haydenmurphey/ros2-turtlebot3-search-rescue',
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
  {
    title: 'Outdated Portfolio',
    description:
      'Initial professional portfolio site with academic details, skills, social links, and more. First attempt at web based development utilizing CSS, HTML, and JavaScript.',
    image: '/images/site/outdated-portfolio.webp',
    status: 'Completed',
    statusColor: 'bg-cyber-cyan',
    tags: ['Dynamic', 'Portfolio', 'CSS', 'JavaScript', 'HTML'],
    links: {
      github: 'https://github.com/haydenmurphey/outdated-portfolio',
    },
  },
];
