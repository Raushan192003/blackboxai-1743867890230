
Built by https://www.blackbox.ai

---

# Diamond Casino

![Diamond Casino Logo](https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg)

Welcome to **Diamond Casino**, the ultimate online platform to experience thrilling casino games. Join us to enjoy exciting games such as Teen Patti, Aviator, and Color Prediction while reaping amazing rewards!

## Project Overview

**Diamond Casino** offers a variety of online casino games that can be played anytime, anywhere. Our platform features secure gameplay, quick transactions, and 24/7 customer support, ensuring a premium gaming experience for our users.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [MongoDB](https://www.mongodb.com/) running locally or via a cloud service
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed

### Steps to run the project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/diamond-casino.git
   cd diamond-casino
   ```

2. **Install dependencies:**
   Navigate to the project directory and run:
   ```bash
   npm install
   ```

3. **Set up the database:**
   Ensure MongoDB is installed and running. The app connects to a local MongoDB instance by default.

4. **Run the server:**
   Start your server using:
   ```bash
   node server.js
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application in action.

## Usage

- **Registration:** New users can create an account via the registration page.  
- **Login:** Existing users can log in using their credentials.
- **Playing Games:** Once logged in, users can access the game lobby and start playing any available games.
- **Transaction Management:** Users can deposit and withdraw funds to manage their balances.

## Features

- **Secure gameplay**: Using encrypted transactions and authentication.
- **Multiple games**: Includes Teen Patti, Aviator, Color Prediction, and more.
- **24/7 Support**: Dedicated customer support service for users.
- **Real-time Notifications**: Users receive real-time updates about their balance and game results.

## Dependencies

The project's primary dependencies listed in the `package.json` include:

```json
{
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.10.9",
    "bcrypt": "^5.0.1",
    "jsonwebtoken": "^8.5.1",
    "cors": "^2.8.5",
    "ws": "^7.4.6"
  }
}
```

## Project Structure

```
diamond-casino/
├── index.html
├── script.js
├── login.html
├── register.html
├── lobby.html
├── teen-patti.html
├── aviator.html
├── color-prediction.html
├── server.js
└── package.json
```

### File descriptions:

- `index.html`: The main entry point for the casino platform.
- `script.js`: Contains all necessary client-side scripts for interactive elements and API calls.
- `login.html`: HTML file for user login interface.
- `register.html`: HTML file for user registration interface.
- `lobby.html`: HTML file for the main lobby where users can select games.
- `teen-patti.html`: HTML file for the Teen Patti game interface.
- `aviator.html`: HTML file for the Aviator game interface.
- `color-prediction.html`: HTML file for the Color Prediction game interface.
- `server.js`: Backend server with routes for game operations and user authentications.
- `package.json`: Documentation of npm dependencies and scripts.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to enhance the Diamond Casino experience.

---

Enjoy your time at Diamond Casino, and please play responsibly!

For any questions or feedback, feel free to [contact us](mailto:contact@diamondcasino.com).