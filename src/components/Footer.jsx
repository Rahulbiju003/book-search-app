export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-white py-4 mt-10">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="w-20 h-20" />
            <span className="text-lg font-semibold">Book Culb</span>
          </div>
  
          {/* Copyright Text */}
          <p className="text-sm">&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
  
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    );
  }
  