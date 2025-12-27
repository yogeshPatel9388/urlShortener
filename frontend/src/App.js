import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Moon } from "lucide-react"; // npm install lucide-react

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Theme State Logic
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/shorten`, {
        longUrl,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 flex flex-col items-center justify-between p-4 font-sans">
      {/* Header & Toggle */}
      <nav className="w-full max-w-4xl flex justify-between items-center py-6">
        <div className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          {/* Logo with "Y" */}
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/40 transform -rotate-3">
            <span className="text-white text-2xl font-black font-serif">Y</span>
          </div>
          <span className="tracking-tight">
            Zip<span className="text-orange-600">URL</span>
          </span>
        </div>

        {/* Slider Switch */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-14 h-7 bg-orange-200 dark:bg-slate-800 rounded-full cursor-pointer p-1 transition-all"
        >
          <div
            className={`absolute w-5 h-5 bg-white dark:bg-orange-500 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              darkMode ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {darkMode ? (
              <Moon size={12} className="text-white" fill="currentColor" />
            ) : (
              <Sun size={12} className="text-orange-500" fill="currentColor" />
            )}
          </div>
        </div>
      </nav>

      {/* Main Container - REMOVED [2.5rem], ADDED rounded-2xl */}
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl shadow-xl shadow-orange-200/50 dark:shadow-none border border-orange-100 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold text-center mb-2">
          Shorten Your <span className="text-orange-500">Links</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-10">
          A fast and zestful way to manage your URLs.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            required
            className="w-full p-4 rounded-xl bg-orange-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all dark:text-white text-lg"
            placeholder="Paste a long link..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all transform active:scale-95 disabled:opacity-70"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-500/10 rounded-xl border-2 border-dashed border-orange-200 dark:border-orange-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-slate-500 dark:text-orange-300 mb-3 font-medium text-center">
              Success! Your short link is ready:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 dark:text-orange-400 font-bold truncate underline decoration-orange-300 w-full text-center sm:text-left"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  alert("Link copied to clipboard!");
                }}
                className="bg-slate-900 dark:bg-orange-500 text-white px-6 py-3 rounded-lg text-sm font-bold transition shadow-lg w-full sm:w-auto"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full py-10 text-center">
        <div className="w-12 h-1 bg-orange-200 dark:bg-slate-800 mx-auto mb-6 rounded-full"></div>
        <p className="text-slate-400 dark:text-slate-500 font-medium tracking-wide">
          made with ❤️ by{" "}
          <span className="text-orange-500 font-black hover:underline cursor-pointer">
            YOGI
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
