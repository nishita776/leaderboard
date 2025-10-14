import React, { useEffect, useState } from "react";

const SPREADSHEET_ID = '1pAc8AlCdPFduk1cblYitu9fz3eg8_05OfFsQg2GF48I';
const API_KEY = 'AIzaSyDDBamzwXUcw-HhP9BoqDvLurLTBA9Pzvs';
const SHEET_NAME = 'Sheet1';

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          console.log("Google Sheets data:", data);
          setEntries(data.values || []);
        })
        .catch((err) => console.error("Error fetching data:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, []);

  if (!entries.length)
    return <div className="text-center text-gray-500 mt-20">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Leaderboard</h1>
      <div className="flex flex-col w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-4 space-y-3">
        {entries.slice(1).map((row, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-700 rounded-xl px-5 py-3 hover:bg-gray-600 transition"
          >
            <span className="font-semibold">{idx + 1}. {row[0]}</span>
            <span className="text-yellow-400 font-bold">{row[1]}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-400">Auto-refreshes every 5 seconds</p>
    </div>
  );
}

export default Leaderboard;
