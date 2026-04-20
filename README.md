# WebDev Project 02 - E-Commerce Application

A modern, responsive e-commerce web application built with React and Vite, featuring product browsing, shopping cart, wishlist management, and checkout functionality.

## 🚀 Features

- **Product Catalog**: Browse a collection of products with detailed information
- **Product Details**: View comprehensive product information including images, descriptions, and pricing
- **Shopping Cart**: Add/remove items, update quantities, and manage cart contents
- **Wishlist**: Save favorite products for later
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Toast Notifications**: User-friendly feedback for actions
- **React Router**: Seamless navigation between pages

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Unique IDs**: UUID
- **Linting**: ESLint

## 📁 Project Structure

```
WebDev_Project_02/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── component/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── contexts/
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   └── Wishlist.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🏗️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunaljaiswal2461-lab/WebDev--Project-2.git
   cd WebDev_Project_02
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## 📖 Usage

- **Browse Products**: Visit the Products page to see all available items
- **View Details**: Click on any product card to see detailed information
- **Add to Cart**: Use the "Add to Cart" button on product cards or detail pages
- **Manage Cart**: View cart contents, update quantities, or remove items
- **Wishlist**: Save products for later by adding them to your wishlist
- **Checkout**: Proceed to checkout when ready to purchase

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Styling

The application uses Tailwind CSS for styling. Custom styles are defined in:
- `src/index.css` - Global styles and Tailwind imports
- `src/App.css` - Application-specific styles

## 🌐 API Integration

The app integrates with external APIs via Axios (configured in `src/services/api.js`). Update the API endpoints as needed for your backend.

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Kunal Jaiswal**
- GitHub: [@kunaljaiswal2461-lab](https://github.com/kunaljaiswal2461-lab)

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- All contributors and open-source projects used in this application
