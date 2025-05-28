// components/MetricCard.jsx

export default function MetricCard({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-6 sm:p-7 bg-[var(--card-bg)] text-[var(--foreground)] rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-72 cursor-pointer border-l-4 border-[var(--accent)]"
    >
      <div className="text-md sm:text-lg font-medium text-gray-500 mb-2 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-2xl sm:text-3xl">{icon}</span>
      </div>
      <div className="text-3xl sm:text-4xl font-bold">{value}</div>
    </div>
  );
}
