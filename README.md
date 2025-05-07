# NEXORA – The Ultimate IoT Visualization Web Application

## 📌 Aim

The aim of the Nexora project is to build a robust and scalable IoT-based Dashboard System that monitors environmental parameters like temperature and humidity in real-time. It is designed to simulate real-world smart environment applications, providing insights through analytics and data visualization.

This platform not only collects and stores simulated sensor data but also integrates AI-based calculations to analyze trends and detect anomalies. Nexora also implements secure authentication using multi-step login with OTP and token-based access, making it highly secure and ideal for high-integrity data systems.

---

## 📍 Project Use Case

Nexora emulates a smart environmental monitoring system with real-life applicability in:

- **Smart Homes:** Automating devices based on temperature/humidity.
- **Industrial Monitoring:** Ensuring environment-sensitive manufacturing stays within safe limits.
- **Weather Logging:** Monitoring weather changes over time and analyzing data trends.

### Workflow:
1. Simulated temperature and humidity data is sent to Spring Boot REST APIs.
2. Data is stored securely in a MySQL database.
3. React frontend visualizes real-time sensor data using charts.
4. Node.js + Python-based backend processes data for analytics.
5. Alerts are triggered when threshold values are breached.
6. JWT + OTP email authentication protects sensitive routes.

---

## 🛠️ Tech Stack Used

### Frontend – `React.js`
- Modern UI using Tailwind CSS.
- Lucid Charts for dynamic data visualization.
- Axios for API integration.
- Fully responsive layout.

### Backend – `Spring Boot`
- REST API creation for user/device management.
- MySQL integration for persistent storage.
- Core business logic and validations.

### Middleware – `Express.js`
- OTP-based email authentication with NodeMailer.
- JWT token generation & verification.
- Data preprocessing and notification handling.

### Database – `MySQL`
- Stores user, device, and sensor data with relational integrity.

### AI / Analytics – `Python Scripts`
- Calculates min, max, avg values from data.
- Sends alerts on threshold violations.

---

## 👥 Sign Up Page

Users can register with the following:
- First Name, Last Name
- Unique Username
- Valid Email Address
- Password (min 6 characters)

Backend validates the input and stores data securely in MySQL. The frontend features a modern glassmorphism UI with mobile responsiveness.

---

## 🔐 Sign In Page

Users log in with:
- Username
- Password

Upon valid credentials, an OTP is sent to the registered email to proceed further, enhancing authentication security.

---

## 📧 OTP Mail Page

After login credentials:
- Enter 6-digit OTP sent to email.
- Verified using Express.js backend.
- On success, a JWT is issued and user is redirected to the home page.

Invalid or expired OTPs prompt for re-entry or resend options.

---

## 🏠 Home Page

Introduces Nexora’s purpose:
- Real-time monitoring
- Device registration
- Analytics and alerting

Also offers navigation to the main dashboard.

---

## 🔌 Device Registering Page

Before viewing sensor data:
- Enter Device ID and Name.
- Device is linked to the user and stored in the database.

Incoming data is mapped accordingly for accurate visualization.

---

## 📊 Analytics Dashboard Page

The core visual center of Nexora:
- Real-time charts via Lucid Charts.
- Displays temperature/humidity.
- AI-generated:
  - Minimum
  - Maximum
  - Average
- Auto-updating graphs, dark/light themes, and responsive layout.

---

## ⚙️ Threshold Update Page

Allows user to:
- Set upper/lower bounds for data.
- Store in backend for real-time checks.
- Alert when thresholds are breached.

This feature supports customizable monitoring for different environmental conditions.

---

## ✅ Conclusion

**Nexora** is a powerful full-stack web app that simulates real-time IoT monitoring. It unites modern frontend design (React), robust backend (Spring Boot, Express.js), secure login flow, and AI-based analytics.

From device registration to dynamic dashboards and threshold-based notifications, Nexora delivers a complete smart environment simulation ready for real-world application and deployment.

---

### 📂 Project Highlights
- Secure multi-factor authentication
- Real-time sensor data monitoring
- AI-driven insights
- Scalable backend with RESTful architecture
- Dynamic UI with responsive design





