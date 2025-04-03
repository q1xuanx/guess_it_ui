# 🎮 Guess It - Mini Game Web App

**Guess It** is a fun and interactive mini game where players try to guess the secret password of the day. The first player to guess correctly gets featured on a real-time leaderboard — styled in a playful, podium-like fashion inspired by Kahoot!

---

## 🔧 Tech Stack

### 💻 Back-End
- **Spring Boot**: REST API development and WebSocket integration
- **PostgreSQL**: persistent storage for leaderboard and user data
- **WebSocket (STOMP + SockJS)**: real-time updates to the leaderboard
- **Basic Authentication**: secure password guessing and user registration
- Repository of api: [Guess_It](https://github.com/q1xuanx/guess_it)
### 🌐 Front-End
- **HTML/CSS/JavaScript** (Vanilla)
- **Bootstrap 5**: layout, modals, responsive UI
- **Animate.css**: fun entry animations for content
- **NES.css** (optional parts): game-style buttons and retro visuals
- **Custom styling**: low-poly and game-inspired aesthetic

---

## 🔥 Key Features

- 🎯 **Daily Password Challenge**: a new password is generated each day, based on the current date + special characters.
- 🔁 **Unlimited Attempts Per Day**: players can keep guessing until one gets it right.
- 🔐 **Secure Guessing API**: all guesses are authenticated using Basic Auth.
- 🏆 **Real-Time Leaderboard**:
  - Automatically updates when a new correct user is submitted
  - WebSocket-powered using `/topic/leader-board`
  - Fun podium layout for top 3 and list view for the rest
- 📥 **Name Submission Modal**: upon a correct guess, the winner is prompted to submit their name.
- 🎨 **Custom UI Theme**: pixelated fonts, animations, color-coded rankings, and playful interface.

---

### Created by the Guess It Team 
