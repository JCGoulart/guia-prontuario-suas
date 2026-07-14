import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { BarProps } from 'recharts'

const data = [
  {
    label: 'Preenchimento/Registro',
    labelShort: 'Preenchimento',
    quantidade: 29,
    porcentagem: '27,4%',
  },
  {
    label: 'Instabilidade/Erros do Sistema',
    labelShort: 'Instabilidade',
    quantidade: 19,
    porcentagem: '17,9%',
  },
  {
    label: 'Dificuldade de Acesso/Login',
    labelShort: 'Acesso/Login',
    quantidade: 15,
    porcentagem: '14,2%',
  },
  {
    label: 'Sugestões de Funcionalidades',
    labelShort: 'Sugestões',
    quantidade: 12,
    porcentagem: '11,3%',
  },
]

const colors = ['#3b82f6', '#f59e0b', '#ef4444', '#22c55e']

interface CustomBarProps extends BarProps {
  payload?: Record<string, unknown>
  index?: number
}

function CustomBar(props: CustomBarProps) {
  const { x, y, width, height, index } = props
  if (x == null || y == null || width == null || height == null) return null
  const fill = colors[index ?? 0]
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={8}
      ry={8}
      fill={fill}
      className="hover:opacity-80 transition-opacity"
    />
  )
}

export default function DuvidasChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="labelShort"
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null
              const d = payload[0].payload
              return (
                <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {d.label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-bold">{d.quantidade}</span> ocorrências ({d.porcentagem})
                  </p>
                </div>
              )
            }}
          />
          <Bar dataKey="quantidade" radius={[8, 8, 0, 0]} maxBarSize={80} shape={<CustomBar />} />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2"
          >
            <span
              className="h-3 w-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: colors[index] }}
            />
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate">
                {item.labelShort}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {item.quantidade} ({item.porcentagem})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
