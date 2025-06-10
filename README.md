# Sustainable Travel Project - Orizon 🌍✈️

Welcome to the **Sustainable Travel Project - Orizon**! This application offers a unique way to book travel experiences with a strong focus on sustainability, all powered by cryptocurrency. We aim to merge eco-conscious travel with the innovation of decentralized finance. Check it out on: https://sustainable-travel-project.vercel.app/

## Features ✨

- **Crypto Bookings:** Securely book travel using cryptocurrency. 🔒💰
- **Sustainability Focused:** Discover and support travel options that prioritize environmental responsibility. 🌱💚
- **Modern Tech Stack:** Built with cutting-edge web technologies for a smooth and responsive user experience. 🚀

---

## Technologies Used 🛠️

Orizon is built with a robust and modern set of technologies:

- **React:** A declarative, component-based JavaScript library for building user interfaces. ⚛️
- **TypeScript:** Adds static typing to JavaScript, improving code quality and maintainability. 📝
- **Vite:** A fast and opinionated build tool that provides an excellent developer experience. ⚡
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs. 🎨
- **Ethers.js:** A complete and compact library for interacting with the Ethereum blockchain and its ecosystem. 🔗
- **Wagmi:** A collection of React Hooks for Ethereum, making it easier to connect to wallets, interact with contracts, and more. 🎣
- **Lucide React:** A beautiful and consistent icon library. ✨
- **Sepolia Testnet:** Our development and testing environment for blockchain interactions. 🧪

---

## Getting Started 🚀

Follow these simple steps to get the Orizon project up and running on your local machine.

### Prerequisites ✅

Before you begin, ensure you have Node.js and npm (or Yarn) installed on your system.

### Installation 💻

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd sustainable-travel-project-orizon
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the project and add the following variable:

    ```
    VITE_TRAVEL_AGENT_ADDRESS=<your_sepolia_account_address>
    ```

    Replace `<your_sepolia_account_address>` with the Sepolia account address you'll use for funding and interactions.

### Running the Project ▶️

Once the dependencies are installed and your environment variables are set, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

This will typically start the application on `http://localhost:5173` (or another available port). 🖥️

---

## Project Structure 📂

While there isn't a strict, opinionated folder structure, the project is organized to keep related files together, making navigation straightforward. You'll find common patterns like `components` for reusable UI elements and `pages` for different views within the application.

---

## Expanding the ESLint Configuration 📏

The project comes with a robust ESLint configuration to maintain code quality and consistency. It leverages TypeScript-aware lint rules and React-specific guidelines. The `eslint.config.js` file is already set up to include:

- **Type-aware Linting:** `tseslint.configs.recommendedTypeChecked`, `tseslint.configs.strictTypeChecked`, and `tseslint.configs.stylisticTypeChecked` are configured to provide comprehensive type-checking during linting.
- **React-Specific Rules:** `eslint-plugin-react-x` and `eslint-plugin-react-dom` are integrated to enforce best practices and catch common issues in React components and DOM interactions.

The configuration ensures a high standard of code quality out of the box, helping developers write cleaner and more reliable code. ✅

---

## Deployment 🌐

The Sustainable Travel Project - Orizon is deployed using **Vercel**, providing continuous deployment and easy scaling. 🚀
Here is the website: https://sustainable-travel-project.vercel.app/

---

## Contributing 🤝

We welcome contributions to the Sustainable Travel Project - Orizon! If you'd like to contribute, please feel free to fork the repository and submit a pull request. We appreciate your help! 🙏

---
