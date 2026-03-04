# API Health Monitoring Platform

A full-stack system for monitoring the health of external APIs. The platform periodically checks registered APIs, measures response time, logs results in MongoDB, and displays uptime statistics through a live dashboard.

The project demonstrates backend monitoring logic, scheduled background jobs, and a real-time frontend dashboard for visualizing API performance.

---

## Dashboard
<img width="1470" height="840" alt="Screenshot 2026-03-05 at 2 35 10 AM" src="https://github.com/user-attachments/assets/958e3af4-e0f5-4986-85d7-a1dedb3db5ca" />



---

## Features

* Automated health checks for registered APIs
* Measurement and storage of response time metrics
* Historical logging of API performance in MongoDB
* Uptime percentage calculation based on monitoring logs
* Email alerts when an API becomes unavailable
* Scheduled monitoring using cron jobs
* Interactive dashboard displaying API status and metrics
* Automatic dashboard refresh for near real-time updates

---

## Tech Stack

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* Axios
* node-cron
* Nodemailer

### Frontend

* React
* Material UI
* Chart.js

---

## System Architecture

```
React Dashboard
        │
        ▼
Express API Server
        │
        ▼
Monitoring Engine (Cron Jobs)
        │
        ▼
MongoDB (Logs and Metrics)
```

---

## Running the Project

### Clone the repository

```
git clone https://github.com/uzairjameelece24-ui/api-health-monitor.git
cd api-health-monitor
```

### Install backend dependencies

```
npm install
```

### Start the backend server

```
npm run dev
```

### Start the dashboard

```
cd dashboard
npm install
npm run dev
```

The backend will run on:

```
http://localhost:5001
```

The dashboard will run on:

```
http://localhost:5173
```

---

## Example Monitoring Output

| API       | Status | Response Time | Uptime |
| --------- | ------ | ------------- | ------ |
| Google    | UP     | 110 ms        | 99.8%  |
| TestAPI   | UP     | 80 ms         | 99.5%  |
| BrokenAPI | DOWN   | —             | 0%     |

---

## Possible Improvements

Future iterations of the project could include:

* Slack or Discord alert integrations
* Containerization with Docker
* Deployment to cloud infrastructure
* Multi-region API monitoring
* Authentication and user management for the dashboard

---

## Author

Uzair Jameel
