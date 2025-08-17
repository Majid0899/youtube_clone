export default function formatViews(views) {
  if (views < 1000) return views.toString();
  if (views < 1_000_000) return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (views < 1_000_000_000) return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  return (views / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
}