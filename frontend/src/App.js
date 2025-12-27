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
        <div className="text-2xl font-black text-orange-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg rotate-3 shadow-lg"></div>
          ZipURL
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

      {/* Main Container */}
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-orange-100 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-slate-900 dark:text-white">
          Shorten Your <span className="text-orange-500">Links</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
          A fast and zestful way to manage your URLs.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <input
              type="url"
              required
              className="w-full p-4 pr-12 rounded-xl bg-orange-50 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500 focus:outline-none transition-all dark:text-white"
              placeholder="Paste a long link..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all transform active:scale-95 disabled:opacity-70"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-5 bg-orange-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-orange-200 dark:border-slate-700 animate-in fade-in zoom-in duration-300">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
              Success! Your short link is ready:
            </p>
            <div className="flex items-center justify-between gap-3">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-orange-600 dark:text-orange-400 font-bold truncate underline decoration-orange-300"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  alert("Link copied to clipboard!");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-md"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full py-8 text-center">
        <p className="text-slate-400 dark:text-slate-500 font-medium">
          made with ❤️ by{" "}
          <span className="text-orange-500 font-bold hover:underline cursor-pointer">
            Yogi
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
