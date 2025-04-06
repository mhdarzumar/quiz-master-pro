
import { BarChart, LineChart, PieChart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie as RechartPie,
  Cell,
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statCards = [
  {
    title: "Total Quizzes",
    value: "24",
    icon: BarChart,
    description: "12% increase from last month",
    trend: "up",
  },
  {
    title: "Total Participants",
    value: "512",
    icon: Users,
    description: "8% increase from last month",
    trend: "up",
  },
  {
    title: "Completion Rate",
    value: "87%",
    icon: PieChart,
    description: "3% decrease from last month",
    trend: "down",
  },
  {
    title: "Avg. Score",
    value: "76%",
    icon: LineChart,
    description: "5% increase from last month",
    trend: "up",
  },
];

const pieData = [
  { name: "Completed", value: 72, color: "#4F46E5" },
  { name: "In Progress", value: 18, color: "#F59E0B" },
  { name: "Not Started", value: 10, color: "#EF4444" },
];

const barData = [
  { name: "Management", passed: 85, failed: 15 },
  { name: "IT", passed: 90, failed: 10 },
  { name: "HR", passed: 75, failed: 25 },
  { name: "Sales", passed: 70, failed: 30 },
  { name: "Marketing", passed: 80, failed: 20 },
];

const recentQuizzes = [
  {
    title: "Company Policy Review",
    participants: 86,
    completion: 92,
    avgScore: 78,
    date: "Apr 3, 2025",
  },
  {
    title: "Data Security Training",
    participants: 120,
    completion: 88,
    avgScore: 82,
    date: "Apr 1, 2025",
  },
  {
    title: "Leadership Assessment",
    participants: 45,
    completion: 95,
    avgScore: 74,
    date: "Mar 28, 2025",
  },
  {
    title: "Product Knowledge Test",
    participants: 68,
    completion: 85,
    avgScore: 71,
    date: "Mar 26, 2025",
  },
];

import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Card key={index} className="quiz-stat-card">
            <div className="flex items-center justify-between mb-2">
              <p className="quiz-stat-title">{card.title}</p>
              <card.icon className="w-5 h-5 text-quiz-primary opacity-80" />
            </div>
            <p className="quiz-stat-value">{card.value}</p>
            <p className={`text-sm mt-2 ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {card.description}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Completion Status</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <RechartPie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartPie>
                <Tooltip />
                <Legend />
              </RechartPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartBarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="passed" stackId="a" fill="#4F46E5" name="Passed" />
                <Bar dataKey="failed" stackId="a" fill="#EF4444" name="Failed" />
              </RechartBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz Title</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Avg. Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentQuizzes.map((quiz, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.participants}</TableCell>
                  <TableCell>{quiz.completion}%</TableCell>
                  <TableCell>{quiz.avgScore}%</TableCell>
                  <TableCell>{quiz.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${
                        new Date(quiz.date) > new Date() 
                          ? 'border-yellow-500 text-yellow-500' 
                          : 'border-green-500 text-green-500'
                      }`}
                    >
                      {new Date(quiz.date) > new Date() ? 'Upcoming' : 'Completed'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
