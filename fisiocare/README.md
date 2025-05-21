# Node MVC App

This project is a Node.js web application structured using the Model-View-Controller (MVC) architecture. It consists of two main modules: "Citas" and "Usuarios".

## Project Structure

```
node-mvc-app
├── src
│   ├── controllers        # Contains the controllers for handling requests
│   │   ├── citasController.js
│   │   └── usuariosController.js
│   ├── models             # Contains the models for data structure and interaction
│   │   ├── citasModel.js
│   │   └── usuariosModel.js
│   ├── routes             # Contains the route definitions for the application
│   │   ├── citasRoutes.js
│   │   └── usuariosRoutes.js
│   ├── views              # Contains the view templates for rendering data
│   │   ├── citas
│   │   │   └── index.ejs
│   │   └── usuarios
│   │       └── index.ejs
│   └── app.js             # Entry point of the application
├── package.json           # NPM configuration file
├── .env                   # Environment variables
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd node-mvc-app
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your environment variables, such as database connection strings.

4. **Run the application:**
   ```
   npm start
   ```

## Usage

- Access the "Citas" module at `/citas`
- Access the "Usuarios" module at `/usuarios`

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.