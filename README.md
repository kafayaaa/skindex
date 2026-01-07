<div align="center" style="display: flex; align-items: center; justify-content: center; gap: 15px;">
  <img src="./frontend/public/logo.webp" alt="Skindex Logo" width="150" style="margin-bottom: 10px;">
  <h1 style="border-bottom: none; margin-bottom: 20px;">Skindex</h1>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Lucide_React-F7B93E?style=for-the-badge&logo=lucide&logoColor=black" />
</p>

---

**Skindex** is an intelligent skin health companion that leverages Artificial Intelligence to analyze skin conditions through image recognition. It provides users with instant insights, potential skin type identification, and personalized skincare recommendations.

## ✨ Key Features

- **🔍 AI Skin Analysis**: Upload or take a photo of your skin to get an instant analysis powered by Google Gemini AI.
- **🛡️ Personalized Advice**: Receive customized skincare routines and product ingredient recommendations based on your results.
- **🔐 Secure Data**: User profiles and analysis history are securely managed using Supabase.
- **⚡ Robust Backend**: Powered by Express.js for efficient API handling and data processing.
- **📊 Condition Tracking**: Keep a history of your skin's progress and monitor changes over time.
- **💡 Educational Insights**: Learn about various skin conditions and how to maintain a healthy skin barrier.
- **📱 Responsive Design**: Optimized for both mobile and desktop users with a clean, modern UI.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Backend**: Express.js (Node.js)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS & Shadcn UI
- **AI Engine**: Google Gemini API (Generative AI)
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v18.x or later)
- npm / yarn / pnpm
- Supabase Project & API Keys
- Google Gemini API Key (obtainable from [Google AI Studio](https://aistudio.google.com/))

### Installation & Setup

1. **Clone the repository:**
   
   ```bash
   git clone [https://github.com/kafayaaa/skindex.git](https://github.com/kafayaaa/skindex.git)
   cd skindex

2. **Install dependencies:**
   
   ```bash
   # Install frontend dependencies
   npm install
    
   # If your backend is in a separate folder (e.g., /server)
   cd server && npm install

3. **Configure Environment Variables: Create a .env.local file in the root directory:**
   
   ```bash
   # AI Config
   GEMINI_API_KEY=your_gemini_api_key
    
   # Supabase Config
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
    
   # Backend Config
   PORT=5000

4. **Run the development server:**

   ```bash
   # Run backend (from server directory)
   npm run dev
    
   # Run frontend (from root directory)
   npm run dev

The application will be available at http://localhost:3000.

## 📂 Project Structure

- /frontend - Next.js application files.

- /server (or /backend) - Express.js API and logic.

- /public - Static assets including the logo and icons.

- /lib - Helper functions and AI configuration.

# 📜 License

This project is licensed under the MIT License.

Developed with ❤️ by kafayaaa
