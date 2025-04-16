# GoatNotes 🐐✨  
**AI-Powered Note-Taking App with Next.js 15 + ChatGPT**  
[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://goat-notes-mu.vercel.app/) 
[![GitHub](https://img.shields.io/badge/source-code-blue)](https://github.com/ryanhui30/goat-notes)  

---

## **Key Features**  
- **AI-Powered Notes**: Summarize, expand, or ask questions about your notes using ChatGPT.  
- **Next.js 15 App Router**: Fast, SEO-friendly routing with React Server Components.  
- **Secure Auth**: Supabase authentication with email/password + OAuth.  
- **Real-Time DB**: PostgreSQL managed via Prisma ORM with type safety.  
- **Modern UI**: Shadcn components with dark/light mode toggle.  

---

## **Tech Stack**  
| Layer          | Technologies Used                          |
|----------------|-------------------------------------------|
| **Frontend**   | Next.js 15 (App Router), TypeScript, Tailwind, Shadcn |
| **Backend**    | Next.js API Routes, Supabase Auth, Prisma ORM |
| **AI**         | OpenAI API (ChatGPT-4)                    |
| **Database**   | PostgreSQL (Supabase)                     |
| **Deployment** | Vercel (Edge Runtime)                     |

---

## **Development Setup**  
1. **Clone the repo**:  
   ```bash```
   git clone https://github.com/ryanhui30/goat-notes.git
   cd goat-notes

2. **Install dependencies**:
  ```bash```
  npm install

4. **Configure environment variables**:
Duplicate .env.example as .env
Add your:
NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY

5. **Database Setup**:
  ```bash```
  npx prisma generate && npx prisma db push

5. **Run locally**:
  ```bash```
  npm run dev


## **Need Help**?
📩 Contact: ryanhui30@gmail.com
🔗 Portfolio: https://ryanhui-portfolio.vercel.app/


