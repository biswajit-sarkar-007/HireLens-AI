# HireLens-AI  

A modern web application that helps job seekers analyze and improve their resumes using AI. The application provides detailed feedback on resume content, ATS (Applicant Tracking System) compatibility, and suggestions for improvement.

## ✨ Features

- **Resume Upload & Parsing**: Upload and parse PDF resumes with ease
- **AI-Powered Analysis**: Get detailed feedback on your resume content
- **ATS Compatibility Check**: See how well your resume performs with Applicant Tracking Systems
- **Interactive UI**: Clean, responsive interface built with React and Tailwind CSS
- **Secure Authentication**: Protected routes with Puter SDK integration
- **PDF Preview**: View your uploaded resume directly in the browser

## 🚀 Tech Stack

- **Frontend**: 
  - React 19
  - TypeScript
  - React Router v7
  - Tailwind CSS
  - Zustand (State Management)
- **Build Tools**:
  - Vite
  - TypeScript
  - Tailwind CSS
- **PDF Processing**:
  - PDF.js
- **Deployment**:
  - Docker

## 📂 Project Structure

```
my-app/
├── app/
│   ├── components/         # Reusable UI components
│   ├── constants/          # Application constants
│   ├── lib/                # Utility functions and services
│   │   ├── pdf2img.ts      # PDF to image conversion
│   │   ├── puter.ts        # Puter SDK integration
│   │   └── utils.ts        # Helper functions
│   ├── routes/             # Application routes
│   │   ├── auth.tsx        # Authentication
│   │   ├── home.tsx        # Landing page
│   │   ├── resume.tsx      # Resume analysis
│   │   └── upload.tsx      # File upload
│   ├── types/              # TypeScript type definitions
│   ├── root.tsx            # Root layout
│   └── routes.ts           # Route configuration
├── public/                
│   ├── icons/              # SVG icons
│   └── images/             # Static images
├── .gitignore
├── Dockerfile
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🐳 Docker Support

The project includes a Dockerfile for containerized deployment:

```bash
# Build the Docker image
docker build -t ai-resume-analyzer .

# Run the container
docker run -p 3000:3000 ai-resume-analyzer
```

## 🔒 Authentication

The application uses Puter SDK for authentication. Make sure to:
1. Sign up for a Puter account
2. Configure your Puter credentials in the application
3. Ensure proper CORS settings in your Puter app configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Puter](https://puter.com/) for the backend services
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the amazing developer experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
