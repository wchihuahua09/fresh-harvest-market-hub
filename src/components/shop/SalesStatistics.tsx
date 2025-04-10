
import { useState } from "react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  AreaChart, 
  BarChart,
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Calendar,
  TrendingUp,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Package
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const SalesStatistics = () => {
  const [timeRange, setTimeRange] = useState("week");

  // 模拟销售趋势数据
  const salesTrendData = [
    { name: "周一", sales: 120, orders: 12 },
    { name: "周二", sales: 180, orders: 18 },
    { name: "周三", sales: 150, orders: 15 },
    { name: "周四", sales: 220, orders: 22 },
    { name: "周五", sales: 280, orders: 28 },
    { name: "周六", sales: 320, orders: 32 },
    { name: "周日", sales: 260, orders: 26 },
  ];

  // 模拟产品类别销售数据
  const categorySalesData = [
    { name: "蔬菜", sales: 4500 },
    { name: "水果", sales: 3800 },
    { name: "禽蛋", sales: 2600 },
    { name: "乳制品", sales: 1400 },
    { name: "肉类", sales: 3200 },
  ];

  // 模拟热门产品数据
  const topProducts = [
    { id: 1, name: "有机胡萝卜", sales: 1280, change: 15, image: "/placeholder.svg" },
    { id: 2, name: "新鲜苹果", sales: 980, change: -8, image: "/placeholder.svg" },
    { id: 3, name: "农家鸡蛋", sales: 860, change: 12, image: "/placeholder.svg" },
    { id: 4, name: "山羊奶酪", sales: 720, change: 25, image: "/placeholder.svg" },
  ];

  const statsCards = [
    {
      title: "总销售额",
      value: "¥12,456",
      change: 12.5,
      changeText: "相比上周",
      icon: TrendingUp,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "订单数量",
      value: "156",
      change: 8.2,
      changeText: "相比上周",
      icon: ShoppingCart,
      iconClass: "bg-green-100 text-green-600",
    },
    {
      title: "客户数量",
      value: "85",
      change: 5.1,
      changeText: "相比上周",
      icon: Users,
      iconClass: "bg-purple-100 text-purple-600",
    },
    {
      title: "产品销量",
      value: "432",
      change: -3.2,
      changeText: "相比上周",
      icon: Package,
      iconClass: "bg-orange-100 text-orange-600",
    },
  ];

  // 图表配置
  const chartConfig = {
    sales: {
      label: "销售额",
      theme: {
        light: "#4ade80",
        dark: "#4ade80",
      },
    },
    orders: {
      label: "订单数",
      theme: {
        light: "#94a3b8",
        dark: "#94a3b8",
      },
    },
  };

  const categoryChartConfig = {
    sales: {
      label: "销售额",
      color: "#4ade80",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-farm-brown">销售统计</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">今日</SelectItem>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
                <SelectItem value="year">今年</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">导出数据</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`p-2 rounded-full ${card.iconClass}`}>
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-3">
                {card.change >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={card.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {Math.abs(card.change)}%
                </span>
                <span className="text-gray-500 text-xs ml-1">{card.changeText}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>销售趋势</CardTitle>
            <CardDescription>查看销售额和订单数量的变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-80" config={chartConfig}>
              <AreaChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="sales" name="sales" stroke="#4ade80" fill="#4ade80" fillOpacity={0.3} />
                <Area type="monotone" dataKey="orders" name="orders" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>类别销售额</CardTitle>
            <CardDescription>各产品类别的销售情况</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-80" config={categoryChartConfig}>
              <BarChart data={categorySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" name="sales" fill="#4ade80" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>热门产品</CardTitle>
          <CardDescription>销售量最高的产品</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topProducts.map((product) => (
              <div key={product.id} className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-500 text-sm">销售额: ¥{product.sales}</p>
                  <div className="flex items-center mt-1">
                    {product.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs ${product.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {Math.abs(product.change)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <Tabs defaultValue="daily">
            <div className="flex items-center justify-between">
              <CardTitle>详细数据</CardTitle>
              <TabsList>
                <TabsTrigger value="daily">每日</TabsTrigger>
                <TabsTrigger value="weekly">每周</TabsTrigger>
                <TabsTrigger value="monthly">每月</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="daily" className="mt-4">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left font-medium">日期</th>
                    <th className="p-2 text-left font-medium">销售额</th>
                    <th className="p-2 text-left font-medium">订单数</th>
                    <th className="p-2 text-left font-medium">客户数</th>
                    <th className="p-2 text-left font-medium">变化</th>
                  </tr>
                </thead>
                <tbody>
                  {salesTrendData.map((day, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{day.name}</td>
                      <td className="p-2">¥{day.sales * 10}</td>
                      <td className="p-2">{day.orders}</td>
                      <td className="p-2">{Math.floor(day.orders * 0.8)}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          {index > 0 && (day.sales > salesTrendData[index - 1].sales) ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={index > 0 && (day.sales > salesTrendData[index - 1].sales) ? "text-green-600" : "text-red-600"}>
                            {index > 0 ? Math.abs(Math.floor((day.sales - salesTrendData[index - 1].sales) / salesTrendData[index - 1].sales * 100)) : 0}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left font-medium">周次</th>
                    <th className="p-2 text-left font-medium">销售额</th>
                    <th className="p-2 text-left font-medium">订单数</th>
                    <th className="p-2 text-left font-medium">客户数</th>
                    <th className="p-2 text-left font-medium">变化</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((week) => (
                    <tr key={week} className="border-b">
                      <td className="p-2">第{week}周</td>
                      <td className="p-2">¥{(Math.random() * 10000 + 5000).toFixed(2)}</td>
                      <td className="p-2">{Math.floor(Math.random() * 100 + 50)}</td>
                      <td className="p-2">{Math.floor(Math.random() * 50 + 20)}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          {Math.random() > 0.5 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={Math.random() > 0.5 ? "text-green-600" : "text-red-600"}>
                            {Math.floor(Math.random() * 20 + 1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left font-medium">月份</th>
                    <th className="p-2 text-left font-medium">销售额</th>
                    <th className="p-2 text-left font-medium">订单数</th>
                    <th className="p-2 text-left font-medium">客户数</th>
                    <th className="p-2 text-left font-medium">变化</th>
                  </tr>
                </thead>
                <tbody>
                  {["一月", "二月", "三月", "四月"].map((month, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{month}</td>
                      <td className="p-2">¥{(Math.random() * 50000 + 20000).toFixed(2)}</td>
                      <td className="p-2">{Math.floor(Math.random() * 400 + 200)}</td>
                      <td className="p-2">{Math.floor(Math.random() * 200 + 100)}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          {Math.random() > 0.5 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={Math.random() > 0.5 ? "text-green-600" : "text-red-600"}>
                            {Math.floor(Math.random() * 20 + 1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesStatistics;
