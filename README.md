# 🔐 Next.js Auth Starter

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Auth.js](https://img.shields.io/badge/Auth.js-v5-green?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

A production-ready Next.js 14 authentication starter template with modern best practices, comprehensive security features, and beautiful UI components.

[Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Authentication Flow](#-authentication-flow)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [API Routes](#-api-routes)
- [Email Templates](#-email-templates)
- [Security Features](#-security-features)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

**Next.js Auth Starter** is a comprehensive, production-ready authentication template built with Next.js 14 and modern web technologies. It provides a solid foundation for building secure web applications with user authentication, email verification, password reset functionality, and more.

### Why Choose This Starter?

- **🚀 Production Ready**: Built with enterprise-grade security and best practices
- **🔒 Complete Auth Flow**: Registration, login, email verification, password reset
- **💎 Modern Stack**: Latest versions of Next.js, Auth.js, Prisma, and Tailwind CSS
- **📱 Responsive Design**: Mobile-first design with beautiful UI components
- **🛡️ Type Safe**: Fully typed with TypeScript and Zod validation
- **📧 Email Integration**: Pre-built email templates with Resend integration
- **🎨 Customizable**: Easy to customize and extend for your needs

## ✨ Features

### 🔐 Authentication Features

- **User Registration** with email verification
- **Secure Login** with credential validation
- **Email Verification** using OTP codes
- **Password Reset** functionality
- **Resend Verification** emails
- **Protected Routes** with middleware
- **Role-based Access Control** (User/Admin roles)
- **Session Management** with JWT tokens

### 🎨 UI/UX Features

- **Responsive Design** for all devices
- **Dark/Light Mode** support (Tailwind CSS)
- **Accessible Components** built with Radix UI
- **Form Validation** with real-time feedback
- **Loading States** and error handling
- **Custom Message Components** for user feedback
- **Beautiful Email Templates** with React Email

### 🛠️ Developer Features

- **TypeScript** for type safety
- **Server Actions** for API calls
- **Zod Schemas** for data validation
- **Prisma ORM** for database operations
- **ESLint** configuration for code quality
- **Turbo Mode** for faster development

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://reactjs.org/)** - UI library

### Authentication & Security

- **[Auth.js v5](https://authjs.dev/)** - Authentication library
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[Zod](https://zod.dev/)** - Schema validation

### Database & ORM

- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Vercel Postgres](https://vercel.com/storage/postgres)** - Managed PostgreSQL

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

### Email & Communication

- **[React Email](https://react.email/)** - Email template builder
- **[Resend](https://resend.com/)** - Email delivery service

### Form Handling

- **[React Hook Form](https://react-hook-form.com/)** - Form library
- **[Input OTP](https://input-otp.rodz.dev/)** - OTP input component

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** database (local or cloud)
- **Resend** account for email functionality

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/alghaibb/nextjs-auth-starter.git
   cd nextjs-auth-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure your environment** (see Environment Setup section below)

5. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Application URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Database (Vercel Postgres)
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

# Authentication Secret
AUTH_SECRET=""

# Email Service (Resend)
RESEND_API_KEY=""
```

### Environment Variables Explained

| Variable               | Description                                                         | Required |
| ---------------------- | ------------------------------------------------------------------- | -------- |
| `NEXT_PUBLIC_BASE_URL` | Your application's base URL                                         | ✅       |
| `POSTGRES_*`           | Database connection strings from Vercel Postgres                    | ✅       |
| `AUTH_SECRET`          | Secret key for JWT tokens (generate with `openssl rand -base64 32`) | ✅       |
| `RESEND_API_KEY`       | API key from Resend for email functionality                         | ✅       |

### Getting API Keys

#### Resend API Key

1. Sign up at [Resend](https://resend.com/)
2. Go to API Keys section
3. Create a new API key
4. Add it to your `.env.local` file

#### Vercel Postgres

1. Create a project on [Vercel](https://vercel.com/)
2. Go to Storage tab
3. Create a new Postgres database
4. Copy the connection strings to your `.env.local` file

## 🗄️ Database Setup

### Schema Overview

The application uses the following database models:

- **User** - User accounts with authentication data
- **Account** - OAuth account linking (Auth.js)
- **VerificationToken** - Email verification tokens
- **ResetPasswordToken** - Password reset tokens

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset
```

### User Model Structure

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String
  salt          String
  role          Role      @default(USER)
  accounts      Account[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

# Usage

### Authentication

Authentication is handled using Auth.js V5 and Prisma as the ORM. You can customize the authentication flow by modifying the files in the `src` directory.

-   **auth.ts**:
    `import prisma from "./lib/prisma";

import NextAuth from "next-auth";

import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "@/utils/user";

export const {

handlers: { GET, POST },

auth,

signIn,

signOut,

} = NextAuth({

callbacks: {

async signIn({ user, account }) {

if (account?.provider !== "credentials") {

return true;

}

const existingUser = await getUserById(user.id ?? "");

if (!existingUser?.emailVerified) {

return false;

}

return true;

},

async session({ token, session }) {

return {

...session,

user: {

...session.user,

id: token.sub,

isOAuth: token.isOauth,

},

};

},

async jwt({ token }) {

if (!token.sub) return token;

const existingUser = await getUserById(token.sub);

if (!existingUser) return token;

token.name = existingUser.name;

token.email = existingUser.email;

return token;

},

},

...authConfig,

session: {

strategy: "jwt",

},

adapter: PrismaAdapter(prisma),

});`

-   **auth.config.ts**:
    `import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "@/utils/user";

import { LoginFormSchema } from "@/schemas/auth";

export default {

providers: [

Credentials({

async authorize(credentials) {

const validatedCredentials = LoginFormSchema.safeParse(credentials);

if (!validatedCredentials.success) {

return null;

}

const { email, password } = validatedCredentials.data;

const user = await getUserByEmail(email);

if (!user || !user.password) {

return null;

}

const passwordsMatch = await bcrypt.compare(password, user.password);

if (passwordsMatch) {

return user;

}

return null;

},

}),

],

} satisfies NextAuthConfig;`

-   **route.ts**:
    `export { GET, POST } from "@/auth";`

### Email Verification and Password Reset

The project includes functionality for email verification and password reset. Users will receive an email with an OTP code that they need to enter for verifying their account. This is managed using the `react-email` library and custom email templates are located in the `src/components/emails` directory.

### Styling

Styling is managed with Tailwind CSS. You can customize your styles in the `tailwind.config.ts`.

### Form Validation

Form validation is handled using Zod. You can define your validation schemas in the `src/schemas/auth/index.ts` file.

### Scripts

- `dev`: Starts the development server with Turbo mode.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint for code linting.
- `postinstall`: Generates Prisma client after installation.

### Contribution

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the project's coding guidelines and maintain a high standard of code quality.

### Branch Naming

For consistency and clarity, please follow these branch naming conventions:

- **New Features:** `feat/your-new-feature`
- **Updates:** `update/what-you-updated`
- **Fixes:** `fix/what-you-fixed`

### Creating a Pull Request

1.  Fork the repository.
2.  Create a new branch following the naming conventions.
3.  Make your changes and commit them with clear and descriptive messages.
4.  Push your branch to your forked repository.
5.  Open a pull request to the main repository.

### License

This project is licensed under the MIT License.
