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
    title: 'Pintos',
    description:
      'Four part group project for teaching operating system designed for the 80x86 architecture that requires implementing fundamental kernel features including a priority-based scheduler and a robust virtual memory system. This project involves developing core OS primitives like system call handling, process management, and an extensible indexed file system to support concurrent user programs.',
  image: '/images/site/pintos.webp',
    status: 'Academic Project',
    statusColor: 'bg-cyber-cyan',
    tags: ['C', 'Makefile', 'Assembly', 'Operating Systems', 'System Calls', 'Scheduling'],
    links: {
      github: 'https://github.com/haydenmurphey/pintos',
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
    title: 'Ruby-Based Full-Stack Language Interpreter & Interactive TUI',
    description:
      'This is a custom-built, dynamically typed programming language engine implemented in Ruby. This project demonstrates the complete lifecycle of a language tool, from lexical analysis and parsing to a decoupled execution runtime and an interactive developer interface.',
  image: '/images/site/tui_example.webp',
    status: 'Academic Project',
    statusColor: 'bg-cyber-cyan',
    tags: ['ruby', 'interpreter', 'compiler', 'AST', 'curses', 'dev-tools'],
    links: {
      github: 'https://github.com/haydenmurphey/ruby-ast-interpreter',
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
      'Professional cyber portfolio with integrated blog system using MDX, modern Next.js architecture, and responsive design. This project will remain in production as my career develops as an intro cyber professional.',
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
