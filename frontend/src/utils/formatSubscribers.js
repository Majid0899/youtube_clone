// Format subscribers (K/M suffixes)
 export default function formatSubscribers (count) {
    if (typeof count !== "number") return "0";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };