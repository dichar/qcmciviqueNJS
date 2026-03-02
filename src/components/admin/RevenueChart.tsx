import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { format, subDays, startOfDay, eachDayOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DailyRevenue {
  date: string;
  displayDate: string;
  revenue: number;
  count: number;
}

interface RevenueChartProps {
  className?: string;
}

export const RevenueChart = ({ className }: RevenueChartProps) => {
  const [data, setData] = useState<DailyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7' | '14' | '30' | '90'>('30');
  const [chartType, setChartType] = useState<'area' | 'bar'>('bar');

  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true);
      try {
        const daysAgo = parseInt(period);
        const startDate = startOfDay(subDays(new Date(), daysAgo));

        const { data: purchases, error } = await supabase
          .from('user_purchases')
          .select('purchased_at, amount_paid')
          .gte('purchased_at', startDate.toISOString())
          .order('purchased_at', { ascending: true });

        if (error) throw error;

        // Create a map for all days in the range
        const days = eachDayOfInterval({
          start: startDate,
          end: new Date()
        });

        const revenueByDay = new Map<string, { revenue: number; count: number }>();
        
        // Initialize all days with 0
        days.forEach(day => {
          const dateKey = format(day, 'yyyy-MM-dd');
          revenueByDay.set(dateKey, { revenue: 0, count: 0 });
        });

        // Aggregate purchases by day
        purchases?.forEach(purchase => {
          const dateKey = format(new Date(purchase.purchased_at), 'yyyy-MM-dd');
          const existing = revenueByDay.get(dateKey) || { revenue: 0, count: 0 };
          revenueByDay.set(dateKey, {
            revenue: existing.revenue + Number(purchase.amount_paid),
            count: existing.count + 1
          });
        });

        // Convert to array
        const chartData: DailyRevenue[] = [];
        revenueByDay.forEach((value, key) => {
          chartData.push({
            date: key,
            displayDate: format(new Date(key), 'd MMM', { locale: fr }),
            revenue: Math.round(value.revenue * 100) / 100,
            count: value.count
          });
        });

        // Sort by date
        chartData.sort((a, b) => a.date.localeCompare(b.date));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [period]);

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.count, 0);
  const avgDaily = data.length > 0 ? totalRevenue / data.length : 0;
  const todayKey = format(new Date(), 'yyyy-MM-dd');
  const todayStats = data.find((d) => d.date === todayKey);
  const todayRevenue = todayStats?.revenue ?? 0;
  const todayCount = todayStats?.count ?? 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
          <p className="text-slate-400 text-xs mb-1">{label}</p>
          <p className="text-white font-bold text-lg">{payload[0].value.toFixed(2)}€</p>
          <p className="text-slate-400 text-xs">{payload[0].payload.count} vente(s)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-white text-lg">Revenus quotidiens</CardTitle>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                  Aujourd'hui: {todayCount} clients {todayRevenue.toFixed(2)}€
                </span>
              </div>
              <p className="text-slate-400 text-sm">Évolution des ventes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={chartType} onValueChange={(v: 'area' | 'bar') => setChartType(v)}>
              <SelectTrigger className="w-[100px] bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="area">Courbe</SelectItem>
                <SelectItem value="bar">Barres</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={(v: '7' | '14' | '30' | '90') => setPeriod(v)}>
              <SelectTrigger className="w-[130px] bg-slate-800 border-slate-600 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7">7 jours</SelectItem>
                <SelectItem value="14">14 jours</SelectItem>
                <SelectItem value="30">30 jours</SelectItem>
                <SelectItem value="90">90 jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700/50">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Total période</p>
            <p className="text-white font-bold text-xl">{totalRevenue.toFixed(2)}€</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Ventes</p>
            <p className="text-white font-bold text-xl">{totalOrders}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Moy./jour</p>
            <p className="text-white font-bold text-xl">{avgDaily.toFixed(2)}€</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary"></div>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="displayDate" 
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}€`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="displayDate" 
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}€`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
