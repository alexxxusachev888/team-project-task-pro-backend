# TaskProApp Server

TaskProApp Server is a robust and feature-rich server-side application developed with Node.js. It is designed to offer various functionalities to manage tasks efficiently and securely. The server is the backbone of TaskProApp, a user-friendly task management application that allows users to create tasks, organize them into boards and columns, and customize board backgrounds for an enhanced user experience.

## Features

The TaskProApp server-side provides the following main features:

- User Authentication: Implementation of JWT-based user authentication for secure access.
- Task Management: Efficient handling and management of tasks.
- Email Services: Functionality for sending emails, powered by Nodemailer.
- Image Handling: Functionality for image upload and manipulation, powered by Multer, Cloudinary, and Jimp.
- Validation: Usage of Joi for request data validation.
- Logging: Morgan is used for logging HTTP requests.
- Avatar Services: Use of Gravatar for avatar management.

## Libraries and Technologies

TaskProApp utilizes a collection of powerful libraries and technologies:

- Node.js: The server is built on Node.js, providing a highly scalable architecture.
- Express.js: A minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- Bcryptjs: Library to help you hash passwords for secure storage.
- JSON Web Tokens: A standard for securely transmitting information between parties as a JSON object.
- Nodemailer: A module for Node.js applications to allow easy email sending.
- Multer: Middleware for handling multipart/form-data, which is primarily used for uploading files.
- Multer-storage-cloudinary and Cloudinary: Libraries used for uploading files to Cloudinary, a cloud-based image and video management solution.
- Jimp: An image processing library written entirely in JavaScript for Node, with zero external or native dependencies.
- Joi: The most powerful schema description language and data validator for JavaScript.
- Morgan: HTTP request logger middleware for Node.js.

## Installation and Running the Server

1. Clone the repository: 

```bash
git clone <repository-url>
```

2. Navigate into the directory: 

```bash
cd task-pro-app-nodejs
```
3. Install the dependencies: 

```bash
npm install
```
This command installs both the production and development dependencies for the project.

4. Environment Variables: 
Create a .env file in the root directory of the project. Populate it with the necessary environment variables. Refer to .env.example for the variables needed.

5. Start the server: 
- To start the server in development mode: 
```bash
npm run dev
```
- To start the server in production mode: 
```bash
npm start
```