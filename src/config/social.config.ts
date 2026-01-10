/**
 * Social Media Configuration
 * Central configuration for all social media links and profiles.
 */

export const socialConfig = {
  /**
   * LinkedIn profile
   */
  linkedin: {
    username: 'haydenmurphey',
    url: 'https://linkedin.com/in/haydenmurphey',
    label: 'LinkedIn',
  },

  /**
   * GitHub profile
   */
  github: {
    username: 'haydenmurphey',
    url: 'https://github.com/haydenmurphey',
    label: 'GitHub',
  },

  /**
   * Additional social platforms (optional)
   * Uncomment and configure as needed:
   */

  email: {
    address: 'hsmurphey@gmail.com',
    url: 'mailto:hsmurphey@gmail.com',
    label: 'Email',
  },

  // mastodon: {
  //   username: '@yourusername@mastodon.social',
  //   url: 'https://mastodon.social/@yourusername',
  //   label: 'Mastodon',
  // },

  // medium: {
  //   username: 'yourusername',
  //   url: 'https://medium.com/@yourusername',
  //   label: 'Medium',
  // },
} as const;

export type SocialConfig = typeof socialConfig;
