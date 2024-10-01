# 📚 Hacker News Search App

Welcome to the **Hacker News Search App**! This project is a simple and interactive way to explore the content on Hacker News using the [Hacker News Algolia API](https://hn.algolia.com/api). 🚀

## 📝 Project Overview

This app allows users to search for news articles and stories from the Hacker News community. Users can input any keyword, navigate through multiple pages of results, and view detailed information about each story, such as the number of comments, author, and score.

![Hacker News Logo](https://hn.algolia.com/assets/logo-hn-search-8c5e5c6b.png)

### Key Features

- 🔍 **Search Functionality**: Enter any search term to retrieve relevant stories and articles.
- 🗂 **Pagination**: Navigate through multiple pages of results with "Next" and "Previous" buttons.
- 📄 **Story Details**: View the story's title, author, points, comments, and a snippet of the text (if available).
- 🎨 **Skeleton Loading State**: Displays skeleton cards while fetching data to improve UX.
- 📱 **Responsive Design**: The app is fully responsive and works across desktop and mobile devices.

## 📂 Project Structure

The project is built with **React** using a component-based architecture. It leverages various UI components such as `Card`, `Button`, and `Input` from a custom library. Below is a high-level structure of the app:

```bash
.
├── components
│   ├── ui
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── skeleton.tsx
├── pages
│   └── hacker-search.tsx
└── README.md
```

## 🚀 Getting Started

### Prerequisites

To run this app locally, make sure you have the following installed:

- **Node.js**: v14 or higher
- **npm**: v6 or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hacker-news-search.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hacker-news-search
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the App

Start the app in development mode:

```bash
npm run dev
```

This command will start a local development server. Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the app in action! 🎉

## 🔧 Project Details

### React Components Used

1. **Input Component**: A text input field to enter the search query.
2. **Button Component**: Used for initiating searches and navigating between pages.
3. **Card Component**: Displays each story's details such as the title, author, points, and comments.
4. **Skeleton Component**: Used to show loading placeholders when fetching data.

### API Integration

The app uses the Hacker News Algolia API to retrieve search results based on user queries. The relevant API endpoint is:

```
https://hn.algolia.com/api/v1/search?query=YOUR_QUERY&page=PAGE_NUMBER&hitsPerPage=20
```

#### Example API Call

For a search on "React", the request URL would look like:

```
https://hn.algolia.com/api/v1/search?query=React&page=0&hitsPerPage=20
```

### State Management

- **`query`**: Stores the current search term.
- **`page`**: Tracks the current page number for pagination.
- **`results`**: Holds the array of search results from the API.
- **`totalPages`**: Keeps the total number of pages available.
- **`isLoading`**: Manages the loading state for the app.

### Component Breakdown

- **`SkeletonCard` Component**: Displays skeleton cards during data fetching.
- **`HackerSearch` Component**: The main component that brings all functionalities together.

## 🤝 Contributing

If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request. Let's make this app better together! 💪

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch-name`).
6. Open a Pull Request.

## 🔗 Useful Links

- [Hacker News API Documentation](https://hn.algolia.com/api)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Create Next App Documentation](https://nextjs.org/docs/getting-started)

## 🛠️ Built With

- **React** for UI components.
- **Next.js** for server-side rendering.
- **TypeScript** for type safety.
- **Hacker News Algolia API** for fetching news stories.

## 👥 Author

**Your Name**  
[GitHub Profile](https://github.com/Paul-Okello)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy using the Hacker News Search App? Don’t forget to ⭐ the repo if you find it useful! 😊