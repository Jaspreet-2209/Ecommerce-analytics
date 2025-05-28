// Enhanced Dashboard with Modern Design & Layout Improvements
import { useEffect, useState } from 'react';
import MetricCard from '@/components/MetricCard';
import Modal from '@/components/Modal';
import ChartCard from '@/components/ChartCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const datedData = data.map((item, idx) => ({
          ...item,
          createdAt: new Date(Date.now() - idx * 86400000),
        }));
        setProducts(datedData);
      });
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];
  let filtered = [...products];

  if (categoryFilter !== 'all') {
    filtered = filtered.filter((p) => p.category === categoryFilter);
  }

  if (sortOption === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const totalProducts = filtered.length;
  const averagePrice = (
    filtered.reduce((acc, p) => acc + p.price, 0) / totalProducts || 0
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      {/* Navbar */}
      <nav className="bg-[var(--card-bg)] backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-[var(--accent)] rounded-b-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--accent)]">
            <span className="bg-[var(--muted)] px-2 py-1 rounded">E-Commerce Analytics</span>
          </h1>
          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="px-3 py-2 border rounded-md bg-[var(--card-bg)] backdrop-blur-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border rounded-md bg-[var(--card-bg)] backdrop-blur-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="none">Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <MetricCard title={<span className="font-bold">Total Products</span>} value={<strong>{totalProducts}</strong>} icon="📦" onClick={() => setSelectedMetric('products')} />
            <MetricCard title={<span className="font-bold">Average Price</span>} value={<strong>${averagePrice}</strong>} icon="💲" onClick={() => setSelectedMetric('averagePrice')} />
            <MetricCard title={<span className="font-bold">Categories</span>} value={<strong>{categories.length}</strong>} icon="🗂️" onClick={() => setSelectedMetric('categories')} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-10">
          {/* Bar Chart */}
          <div className="text-lg font-semibold text-[var(--accent)] mb-2">
            📊 <span className="bg-[var(--muted)] px-2 py-1 rounded font-bold">Bar Chart Overview</span>
          </div>
          <p className="text-sm mb-4">
            This bar chart shows the <strong>number of products</strong> available in each category, helping identify which categories <strong>dominate the inventory</strong>.
          </p>
          <ChartCard
            title="Products per Category"
            type="bar"
            data={categories.map((cat) => ({ category: cat, count: filtered.filter((p) => p.category === cat).length }))}
          />

          {/* Pie Chart */}
          <div className="text-lg font-semibold text-[var(--accent)] mt-10 mb-2">
            🥧 <span className="bg-[var(--muted)] px-2 py-1 rounded font-bold">Pie Chart Insights</span>
          </div>
          <p className="text-sm mb-4">
            The pie chart visualizes the <strong>proportion of total products</strong> each category holds, giving quick insight into <strong>inventory distribution</strong>.
          </p>
          <ChartCard
            title="Product Share by Category"
            type="pie"
            data={categories.map((cat) => ({ category: cat, count: filtered.filter((p) => p.category === cat).length }))}
          />

          {/* Line Chart */}
          <div className="text-lg font-semibold text-[var(--accent)] mt-10 mb-2">
            📈 <span className="bg-[var(--muted)] px-2 py-1 rounded font-bold">Price Trend Line</span>
          </div>
          <p className="text-sm mb-4">
            This line chart simulates <strong>product price trends</strong> over time, allowing you to visualize how <strong>pricing varies</strong> across recent entries.
          </p>
          <ChartCard
            title="Price Trend (Simulated)"
            type="line"
            data={filtered.map((p, idx) => ({ date: `Day ${idx + 1}`, price: p.price }))}
          />
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMetric && (
            <Modal title={`Details: ${selectedMetric}`} onClose={() => setSelectedMetric(null)}>
              {selectedMetric === 'products' && (
                <ul className="space-y-1 text-sm max-h-60 overflow-y-auto">
                  {filtered.map((p) => (
                    <li key={p.id} className="border-b py-1">
                      <strong>{p.title}</strong>
                    </li>
                  ))}
                </ul>
              )}
              {selectedMetric === 'averagePrice' && (
                <p className="text-sm">
                  <strong>Total Value:</strong> ${filtered.reduce((acc, p) => acc + p.price, 0).toFixed(2)}
                  <br />
                  <strong>Total Products:</strong> {totalProducts}
                </p>
              )}
              {selectedMetric === 'categories' && (
                <ul className="list-disc pl-5 text-sm">
                  {categories.map((c) => (
                    <li key={c}>
                      <strong>{c}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
