# SABIL LMS - Learning Management System

A modern, full-featured Learning Management System built with Next.js, TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

### 🎨 Modern UI/UX
- Responsive design with SABIL brand colors (#23544e, #0b867a)
- Clean, professional interface
- Modern authentication pages
- Interactive dashboards

### 👥 User Management
- Role-based access control (Student, Admin, Instructor)
- Secure authentication with NextAuth.js
- User profiles with department and position tracking

### 📚 Course Management
- Course categories with filtering
- Course enrollment system
- Progress tracking
- Certificate generation

### 📊 Admin Dashboard
- User analytics and management
- Course creation and management
- Real-time statistics
- Interactive reporting

### 🏆 Student Portal
- Personal learning dashboard
- Course catalog browsing
- Progress tracking
- Certificate collection

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Heroicons
- **Charts**: Recharts (ready for implementation)

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sabil
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Update the `.env` file with your database connection:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sabil_lms?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with admin user and sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Accounts

### Admin Account
- **Email**: admin@sabil.com
- **Password**: Admin@123123

### Student Account
- Create your own account using the sign-up page

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## 🏗️ Project Structure

```
sabil/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── dashboard/         # Student dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility libraries
├── prisma/               # Database schema
├── scripts/              # Database seeds and scripts
└── types/                # TypeScript type definitions
```

## 🎨 Brand Colors

- **Primary**: #23544e (Dark teal)
- **Secondary**: #0b867a (Teal)

## 🔄 Current Status

### ✅ Completed Features
- ✅ Modern landing page with SABIL branding
- ✅ User authentication (sign up/sign in)
- ✅ Role-based access control
- ✅ Student dashboard with course categories
- ✅ Admin dashboard with analytics framework
- ✅ Database schema and relationships
- ✅ Responsive design
- ✅ Empty state handling

### 🚧 Ready for Implementation
- 📝 Course creation and management
- 📊 Advanced analytics and charts
- 🏆 Certificate generation system
- 👥 User management interface
- 📱 Mobile app support
- 🔍 Advanced search and filtering
- 📧 Email notifications
- 📈 Progress tracking

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically with each push

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS
- Google Cloud Platform

## 📝 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for SABIL by the development team**
