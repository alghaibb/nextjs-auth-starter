# Next.js Auth Starter

Welcome to my **Next.js Auth Starter** kit project! This template aims to make starting a project with authentication simple, quick, and efficient using the latest technologies and best practices.

## Purpose

The purpose of this project is to provide a robust and easy-to-use starter template for authentication in Next.js applications. It leverages Next.js 14, Auth.js v5, Prisma ORM, Tailwind CSS for styling, Zod for validation, and other modern tools to streamline the development process.

## Motivation

Starting a new project often involves setting up a lot of boilerplate code for authentication, validation, styling, and more. This can be time-consuming and repetitive. The `nextjs-auth-starter` aims to eliminate this hassle by providing a ready-to-use template with all the essential features pre-configured, allowing developers to focus on building their application rather than setting up the basics.

## Features

- **Next.js 14 with Turbo Mode:** Fast and efficient development with the latest features of Next.js.
- **Auth.js v5:** Secure and flexible authentication system.
- **Prisma ORM:** Powerful and intuitive ORM for database management.
- **Tailwind CSS:** Utility-first CSS framework for quick and responsive design.
- **Zod:** Schema declaration and validation library for form validation.
- **Next.js Server Actions:** Modern approach to handle API routes.
- **React Email:** Comprehensive library for creating email templates.
- **bcrypt:** Secure password hashing and comparison.
- **Shadcn UI:** Accessible UI components.
- **Email Verification and Password Reset:** Includes email sending for account verification and password reset, using OTP codes for verification.

## Getting Started

### Prerequisites

- Node.js v14 or later
- Yarn or npm

### Installation

1.  Clone the repository:
    `git clone https://github.com/alghaibb/nextjs-auth-starter.git
cd nextjs-auth-starter`

2.  Install dependencies:
    `yarn install

    # or

    npm install`

3.  Set up environment variables: Create a `.env` file in the root directory and add your environment variables. For example:
    // URLS

    NEXT_PUBLIC_BASE_URL="http://localhost:3000"

    // VERCEL POSTGRES CREDENTIALS

    - POSTGRES_URL=""
    - POSTGRES_PRISMA_URL=""
    - POSTGRES_URL_NO_SSL=""
    - POSTGRES_URL_NON_POOLING=""
    - POSTGRES_USER=""
    - POSTGRES_HOST=""
    - POSTGRES_PASSWORD=""
    - POSTGRES_DATABASE=""

    // AUTHJS CREDENTIALS

    - AUTH_SECRET=""

    // RESEND/EMAILS CREDENTIALS

    - RESEND_API_KEY=""

4.  Run the development server:
    `yarn dev
or
npm run dev`

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
