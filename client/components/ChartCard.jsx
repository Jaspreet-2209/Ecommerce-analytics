import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { motion } from 'framer-motion';

export default function ChartCard({ title, type, data }) {
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffb6b6'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[var(--card-bg)] text-[var(--foreground)] p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto hover:shadow-xl hover:text-[black] transition-shadow duration-300"
    >
      <h2 className="text-xl text-[white] font-semibold mb-6 border-b border-[var(--accent)] pb-2">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' && (
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis  dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar  dataKey="count" fill="url(#barGradient)">
              {data.map((entry, index) => (
                <Cell  key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        )}

        {type === 'pie' && (
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              isAnimationActive={true}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}

        {type === 'line' && (
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={900}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
}
