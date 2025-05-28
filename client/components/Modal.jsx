// components/Modal.jsx

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] text-[var(--foreground)] rounded-2xl p-8 w-full max-w-xl shadow-2xl relative transition-all duration-300">
        <button
          className="absolute top-4 right-4 text-[var(--accent)] hover:text-[var(--accent-light)] text-2xl font-bold transition duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold mb-6 border-b border-[var(--accent)] pb-3">
          {title}
        </h2>
        <div className="text-base space-y-3 max-h-[350px] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
