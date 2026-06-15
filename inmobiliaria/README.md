# Inmobiliaria Final

Real estate management application with Next.js frontend and Express.js backend.

## Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v5.7 or higher)
- Accounts at:
  - [Cloudinary](https://console.cloudinary.com/) — image hosting
  - [Mailtrap](https://mailtrap.io/) — email testing

## Project Structure

```
inmobiliaria/
├── front/          # Next.js frontend (port 3000)
├── back/           # Express.js backend (port 3001)
└── README.md       # This file
```

## Setup Instructions

### 1. Install Dependencies

#### Frontend
```bash
cd inmobiliaria/front
npm install
```

#### Backend
```bash
cd inmobiliaria/back
npm install
```

### 2. Database Setup

Import the SQL schema and data:

```bash
# Connect to MySQL and run the SQL script
mysql -u root -p < inmobiliaria/back/resources/db.sql
```

Or using MySQL client:
```sql
USE mysql;
SOURCE /path/to/inmobiliaria/back/resources/db.sql;
```

If you're using a GUI (MySQL Workbench, phpMyAdmin):
1. Open the tool
2. Create a new database: `inmobiliaria`
3. Right-click → Import → Select `inmobiliaria/back/resources/db.sql`

### 3. Environment Configuration

#### Backend `.env` file
Create `inmobiliaria/back/.env` with:

```env
# Database
MYSQL_HOST=localhost
MYSQL_DB_NAME=inmobiliaria
MYSQL_USER=root
MYSQL_PASSWORD=

# Port
PORT=3001

# Cloudinary (get from https://console.cloudinary.com/)
CLOUDINARY_URL=cloudinary://YOUR_API_KEY:YOUR_API_SECRET@YOUR_CLOUD_NAME

# Email (Mailtrap credentials from https://mailtrap.io/)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=YOUR_MAILTRAP_USER
SMTP_PASSWORD=YOUR_MAILTRAP_PASSWORD

# Admin email for receiving contact/tasacion requests
ADMIN_EMAIL=your-email@example.com
```

#### Frontend `.env` file
Create `inmobiliaria/front/.env` with:

```env
ADMIN_API_BASE_URL=http://localhost:3001
```

### 4. Start Development Servers

#### Terminal 1: Backend
```bash
cd inmobiliaria/back
npm start
```
✓ Runs on `http://localhost:3001`

#### Terminal 2: Frontend
```bash
cd inmobiliaria/front
npm run dev
```
✓ Runs on `http://localhost:3000`

## Features

- **Frontend** (Next.js App Router)
  - Home, Properties, Tasaciones (valuations), Contact
  - Client form submissions with error handling
  - Responsive design

- **Backend** (Express.js)
  - Admin CRUD for properties (properties/tasaciones)
  - Session-based authentication
  - Email notifications via Nodemailer
  - Image uploads to Cloudinary
  - REST API endpoints

## Admin Login

Default credentials (set in database):
- **Usuario:** natalia
- **Contraseña:** 1234

Access admin panel: `http://localhost:3000/admin/login`

## API Endpoints

- `GET /api/propiedades` — List all properties
- `GET /api/propiedades/:id` — Get property by ID
- `POST /api/contacto` — Submit contact form
- `POST /api/tasaciones` — Submit valuation request

Admin routes (require session):
- `GET /admin/tasaciones` — Property list
- `GET /admin/tasaciones/agregar` — Add property form
- `POST /admin/tasaciones/agregar` — Create property
- `GET /admin/tasaciones/modificar/:id` — Edit property form
- `POST /admin/tasaciones/modificar` — Update property
- `GET /admin/tasaciones/eliminar/:id` — Delete property

## External Services

### Cloudinary (Image Hosting)
1. Go to [https://console.cloudinary.com/](https://console.cloudinary.com/)
2. Sign up / log in
3. Copy your `CLOUDINARY_URL` from the dashboard
4. Paste into `back/.env` → `CLOUDINARY_URL`

### Mailtrap (Email Testing)
1. Go to [https://mailtrap.io/](https://mailtrap.io/)
2. Sign up / log in
3. Create an Inbox (testing email service)
4. Copy SMTP credentials:
   - **Host:** smtp.mailtrap.io
   - **Port:** 2525
   - **User:** (from dashboard)
   - **Password:** (from dashboard)
5. Paste into `back/.env`

## Troubleshooting

**Backend won't start on port 3001:**
```bash
# Kill process on port 3001
lsof -ti TCP:3001 | xargs kill -9
npm start
```

**Frontend can't reach backend:**
- Ensure backend is running on `http://localhost:3001`
- Check `front/.env` has correct `ADMIN_API_BASE_URL`
- Verify CORS headers in `back/app.js`

**Email not sending:**
- Check Mailtrap credentials in `back/.env`
- Verify inbox settings at https://mailtrap.io/
- Check backend console for error messages

**Images not uploading:**
- Verify Cloudinary credentials in `back/.env`
- Check console for Cloudinary API errors
- Ensure file size is within limits
