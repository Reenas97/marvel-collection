# Marvel Collection

## Marvel API Key Configuration
1. **Get the API Keys**
- Visit the official Marvel API website at [https://developer.marvel.com/](https://developer.marvel.com/).
- Register for an account or sign in if you already have one.
- Navigate to the **"Get a key"** section and generate your **public** and **private** keys.

2. **Project Configuration**
- The Marvel API requires the following parameters for authentication:
  - **ts**: A unique timestamp for each request.
  - **apikey**: Your public API key.
  - **hash**: An MD5 hash generated from the concatenation of `ts`, your `private key`, and your `public key`.
    - In this project, the MD5 hash is generated using the **CryptoJS** library.
---

## How to Run the Project
1. **Clone the Repository**
- Open your terminal and run `git clone <repository-link>` to clone the repository.  
2. **Access the Project Directory**
- Navigate to the project directory using `cd <project-directory>` and open it in an IDE like Visual Studio Code.  
3. **Install Dependencies and Run**
- Run `npm install` in the terminal to install the required dependencies, and then start the development server with `npm run dev`.  
4. **Open in Browser**
- Once the server is running, open the URL shown in the terminal in your browser to access the application