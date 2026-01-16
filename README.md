
# 📂 Jotter - Secure Cloud File Manager

**Jotter** is a modern, secure, and user-friendly file management system built with the MERN stack (MongoDB, Express, Node.js). It allows users to upload, organize, search, and manage their files efficiently in a secure cloud environment.


---

## 🚀 Features

- **User Authentication:** Secure Sign Up, Sign In, and Google OAuth Integration.
- **File Management:** Upload, Rename, Delete, Duplicate, and View files.
- **Folder System:** Create folders and organize files seamlessly.
- **Advanced Search:** Search files by keyword, file type, or date.
- **Favorites:** Mark important files as favorites for quick access.
- **Storage Insights:** Visual representation of used storage and file types.
- **Secure:** JWT-based authentication and secure cookies.
- **Responsive Design:** Mobile-friendly UI with a modern look and feel.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** (Server Framework)
- **TypeScript** (Type Safety)
- **MongoDB** & **Mongoose** (Database)
- **Passport.js** (Google OAuth)
- **Multer** (File Uploads)
- **JWT** (Authentication)



## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/mjunayed2003/Storage-Management-System.git
cd jotter-backend
```

### 2. Backend Setup
Navigate to the root directory and install dependencies.
```bash
npm install
```

Create a `.env` file in the root directory and add the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/auth/google/callback
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password
```

Run the backend server:
```bash
npm run dev
```
*(Server will start on `http://localhost:3000`)*



## 📚 API Documentation

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/user/signUP` | Register a new user |
| `POST` | `/user/signIn` | Login user |
| `GET` | `/user/isLogged` | Check login status |
| `GET` | `/user/logout` | Logout user |
| `GET` | `/auth/google` | Google OAuth Login |

### File Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/upload/:folderName` | Upload file to a folder |
| `GET` | `/file/list/:folderName` | Get list of files in a folder |
| `PATCH` | `/file/rename/:id` | Rename a file |
| `DELETE` | `/file/fileDelete/:id` | Delete a file |
| `POST` | `/file/duplicate/:id` | Duplicate a file |
| `GET` | `/file/recentFile` | Get recently uploaded files |

### Folder Management
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/folderCreate` | Create a new folder |
| `GET` | `/allFOlders` | Get all folders |
| `DELETE` | `/folderDelete/:id` | Delete a folder |

### Favorites & Search
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/file/favorite/:id` | Toggle favorite status |
| `POST` | `/file/favorite` | Get all favorite files |
| `POST` | `/file/allSearch` | Search files by keyword |

---

## 🧪 Testing with Postman

You can import the `jotter_api.json` file included in this repository to test all API endpoints effortlessly.

1. Open **Postman**.
2. Click **Import** > Upload `postman_collection.json`.
3. Set your environment variables (EMAIL, PASSWORD) if needed.
4. Start testing!

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



### 👨‍💻 Author

**Md. Junayed**  
Full Stack Developer  
[GitHub Profile](https://github.com/mjunayed2003)
