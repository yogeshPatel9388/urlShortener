import React, { useState } from "react";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Replace with your Render URL after backend deployment
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          LinkZap
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Shorten your long URLs instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            required
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Paste a long link..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg font-bold text-lg transition-all transform active:scale-95"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-dashed border-gray-600 animate-fade-in">
            <p className="text-sm text-gray-400 mb-2">
              Success! Here is your short link:
            </p>
            <div className="flex items-center justify-between">
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 font-medium truncate mr-4"
              >
                {shortUrl}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  alert("Copied!");
                }}
                className="bg-gray-700 px-4 py-2 rounded text-xs hover:bg-gray-600 transition"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
