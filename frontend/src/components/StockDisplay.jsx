import React from 'react';
import themeStore from '../store/themeStore';

const stock = {
  symbol: "AAPL",
  name: "Apple Inc.",
  currentPrice: 145.09,
  percentageChange: 1.23, // Positive value for increase, negative for decrease
};

const StockDisplay = () => {
  const { symbol, name, currentPrice, percentageChange } = stock;
  const { theme } = themeStore((state) => state);

  const changeColor = percentageChange > 0 ? "text-green-400" : "text-red-400";

  return (
    <div
      className={`w-64 p-4 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Stock Details */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{symbol}</h2>
          <p className="text-sm text-gray-400">{name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">${currentPrice}</p>
          <p className={`text-sm font-medium ${changeColor}`}>
            {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockDisplay;
