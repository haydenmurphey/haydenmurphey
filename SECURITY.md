# Security Policy

## Reporting Security Vulnerabilities

We take the security of this portfolio template seriously. If you discover a security vulnerability, please follow responsible disclosure practices. The project is maintained by Marcos Oliveira ([@zer0spin](https://github.com/zer0spin)).

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues via:

- **Email**: [zer0spinsec@proton.me](mailto:zer0spinsec@proton.me)
- **Subject**: `[SECURITY] Brief description of the issue`
- **Include**:
  - Description of the vulnerability
  - Steps to reproduce
  - Potential impact
  - Suggested fix (if available)

### Response Time

- We aim to acknowledge reports within **48 hours**
- We will provide regular updates on the status of your report
- We follow a **90-day disclosure timeline** for coordinated disclosure

### Security Best Practices

When using this template:

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

2. **Configure environment variables securely**
   - Never commit `.env.local` to version control
   - Use secure values for all API keys and secrets

3. **Enable security headers** (already configured in middleware)
   - CSP (Content Security Policy)
   - HSTS (HTTP Strict Transport Security)
   - X-Frame-Options
   - X-Content-Type-Options

4. **Review content before publishing**
   - Sanitize user-generated content
   - Validate all blog post frontmatter
   - Check for exposed sensitive information

For detailed security implementation, see [docs/SECURITY.md](./docs/SECURITY.md)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Features

This template includes:

- ✅ XSS Protection (DOMPurify sanitization)
- ✅ Path Traversal Prevention
- ✅ Nonce-based CSP
- ✅ HSTS Headers
- ✅ Zero CVE Dependencies
- ✅ Static Site Generation (minimal attack surface)

## Acknowledgments

We appreciate responsible disclosure and will credit security researchers (with permission) for their contributions to improving the security of this project.
