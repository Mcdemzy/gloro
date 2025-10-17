# Frontend

# Gloro - All-in-One Platform for Gamers

**Gloro** is a comprehensive platform for gamers to register, manage, and compete in gaming competitions. Whether you're looking to host tournaments, join gaming events, or manage your competitive gaming experience, Gloro has you covered.

[![Build Status](https://img.shields.io/github/workflow/status/yourusername/gloro-frontend/CI)](https://github.com/yourusername/gloro-frontend/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🚀 Features

* Register for and manage gaming competitions
* Join various competitive gaming events
* Seamless interface for gamers and organizers

## 🌱 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

* **Node.js** (v14.x or higher)
* **npm** (v6.x or higher)

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/gloro-frontend.git
cd gloro-frontend
```

### Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Run the App Locally

To start the development server, run:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🌿 Branching Workflow

### Branches Overview

* **`dev`**: The development branch where all feature updates and bug fixes are pushed.
* **`test`**: After changes are made to `dev`, they are merged into `test` for staging and testing. This branch is deployed to a staging environment.
* **`main`**: Once changes are tested and approved, they are merged into the `main` branch. The live production app is deployed at [glory.com](https://glory.com).

### Deployment Process

1. Developers push changes to the **`dev`** branch.
2. Merge `dev` into `test` for staging and QA.
3. After successful testing in `test`, merge into the **`main`** branch for production deployment.

### Continuous Integration

We use GitHub Actions for continuous integration. The build status of the `dev` branch can be tracked here:

![Build Status](https://img.shields.io/github/workflow/status/yourusername/gloro-frontend/CI)

## 🤝 Contributing

We welcome contributions from anyone! If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a feature branch off of `dev` (`git checkout -b your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin your-feature`).
5. Open a Pull Request to the `dev` branch with a clear description of your changes.

For any bugs or feature requests, please create an issue in the GitHub Issues tab.

## 📜 License

This project has no license, at least for now
