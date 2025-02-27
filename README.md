# Book Search App

A **React-based Book Search Application** that allows users to search for books using the **Google Books API**. It dynamically fetches search results and displays popular books.

## 🌟 Features

- 🔍 **Live Search**: Fetches books dynamically as the user types.
- 📚 **Popular Books**: Displays the top 10 books when the search input is empty.
- ⏳ **Debounced API Calls**: Reduces unnecessary API requests for better performance.
- 🎨 **Responsive UI**: Works seamlessly across all devices.
- ⚡ **Optimized Performance**: Uses React best practices and efficient API fetching.

## 🚀 Installation

### Prerequisites
- **Node.js** (Download from [Node.js official site](https://nodejs.org/))
- **Git** (Optional, for cloning the repository)

### Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/book-search-app.git
   cd book-search-app
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Create a `.env` file** in the root directory and add your **Google API Key**:
   ```sh
   VITE_GOOGLE_API_KEY=your_google_api_key
   ```
4. **Start the development server**:
   ```sh
   npm run dev
   ```

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS
- **API**: Google Books API
