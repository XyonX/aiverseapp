# AIVerse

<div align="center">

![AIVerse](https://raw.githubusercontent.com/XyonX/portfolio-content/main/Portfolios/aiverse/images/aiverse-thumbnail.png)

A modern, feature-rich AI development and experimentation platform built with Next.js 15+.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)](https://tailwindcss.com/)

</div>

## Overview

AIVerse is a comprehensive platform for AI model interaction and experimentation. It provides a modern interface for working with various AI models, managing conversations, and exploring AI capabilities.

![Features Overview](https://raw.githubusercontent.com/XyonX/portfolio-content/main/Portfolios/aiverse/images/features.png)

## Features

- Modern and responsive UI built with Tailwind CSS and Radix UI
- Firebase integration for authentication and data storage
- Theme switching with dark mode support
- Mobile-friendly and responsive design
- Built on Next.js 15+ for optimal performance
- 3D capabilities with Three.js and React Three Fiber
- Data visualization with Recharts
- Real-time updates and interactions
- Secure authentication and authorization
- Markdown support with syntax highlighting

### AI Model Support

![Supported Models](https://raw.githubusercontent.com/XyonX/portfolio-content/main/Portfolios/aiverse/images/supported-models.png)

### Conversation Interface

![Conversation Interface](https://raw.githubusercontent.com/XyonX/portfolio-content/main/Portfolios/aiverse/images/conversation_area.png)

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- Yarn or npm package manager
- Git

### Installation

1. Clone the repositories
```bash
# Frontend
git clone https://github.com/yourusername/aiverse.git
# Backend
git clone https://github.com/XyonX/aiverse-backend.git
```

2. Install dependencies
```bash
# Frontend
cd aiverse
yarn install

# Backend
cd aiverse-backend
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration values.

4. Start the development servers
```bash
# Frontend
yarn dev

# Backend
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
aiverse/
├── app/           # Next.js app directory
├── components/    # Reusable UI components
├── context/      # React context providers
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── models/       # Data models and types
├── public/       # Static assets
└── utils/        # Helper functions
```

## Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Firebase](https://firebase.google.com/) - Backend and authentication
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Three.js](https://threejs.org/) - 3D graphics library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## Related Repositories

- [AIVerse Backend](https://github.com/XyonX/aiverse-backend) - Backend API and services

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js team](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com) for the hosting platform
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- All our contributors and supporters

---

<div align="center">
Made with ❤️ by the AIVerse team
</div>
