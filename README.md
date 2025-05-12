# Xeno CRM 🎯

Xeno CRM is a smart customer segmentation and campaign automation platform built using the MERN stack, designed to help businesses define targeted audiences and launch personalized campaigns with ease. The project features a modern frontend built with Next.js (App Router) and Bootstrap, and a robust backend using Express.js and MongoDB, deployed via Vercel and Render respectively. Users can log in using Google authentication powered by NextAuth, and create dynamic audience segments using rules like “spend > ₹5000 AND visits < 3.” The platform lets users preview audience size before launching a campaign and tracks delivery statistics like messages sent, failed, and total audience reached. For AI integration, the app uses Cohere's language generation API to suggest personalized marketing messages based on plain English campaign goals. This makes it easy for non-technical marketers to craft effective communication. The backend simulates delivery using dummy logic (~90% success) and logs results in a communication log, with an optional vendor receipt endpoint to simulate status updates. All past campaigns are listed in a clean dashboard with search and delete options, and individual logs are viewable with one click. The app architecture is modular and scalable, and while the current version uses mocked delivery and basic DB queries, it lays the foundation for deeper enhancements like Kafka-based queuing, real-time updates, and role-based access. The AI feature currently supports message generation, and future versions could support natural language segmentation and smart scheduling. This repository contains everything you need to run the project locally, including `.env` setup instructions, architecture flow, AI tool references, and known limitations or trade-offs. A public GitHub repo and deployed frontend/backend links are available, along with a demo video explaining features, decisions, and development insights. Thank you for reviewing Xeno CRM!

 Live Demo

Frontend (Vercel): [https://xeno-crm-murex.vercel.app](https://xeno-crm-murex.vercel.app)  
Backend (Render): [https://xeno-crm-4-vlo4.onrender.com](https://xeno-crm-4-vlo4.onrender.com)

Tech Stack

- **Frontend:** Next.js 14 (App Router), Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Auth:** NextAuth.js (Google OAuth)
- **AI Integration:** Cohere API for message generation
- **Deployment:** Vercel (frontend), Render (backend)

-  Local Setup
-  1. colne the repo
-  git clone https://github.com/Nikita-039/xeno-crm
   cd xeno-crm
   2. Backend setup
   cd backend
   npm install
   # Create a .env file
   PORT = 5000 
   MONGO_URI = mongodb+srv://anshikaansh2501:ros1BYQKHEvKziPe@cluster0.ggtyoax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   run node index.js
   3. Frontend setup
   cd frontend
   npm install
   # Create a .env.local file
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=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
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=d3c936eb4c249a554411e3eaec8eaa3c
   COHERE_API_KEY=vXs4Qwvp87g3mrzJXaJ6JC5tlLEJ7CZ4vbhaW6J6


   AI Feature: Message Generator
   Cohere’s Generate API to create short, personalized marketing messages from plain English goals.
   Example prompt: “Bring back inactive users”
   Returns 3 options that you can copy and use manually

   
 Architecture Diagram

→ Frontend (Next.js)
→ Backend API (Express)
   → MongoDB
   → AI API (Cohere)

  Trade-offs & Assumptions
- Used dummy delivery simulation.
- Performance not optimized for large datasets

  Known Limitations
- No user role management (admin vs. user)
- AI message suggestions aren’t stored 
