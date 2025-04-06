
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileDown, FileText, Filter, Search, Video } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartLineChart,
  Line
} from "recharts";

// Sample data for reports
const quizzes = [
  { id: 1, title: "Corporate Ethics Training", date: "Apr 5, 2025", participants: 128, completion: 89, avgScore: 76 },
  { id: 2, title: "Data Security Essentials", date: "Apr 3, 2025", participants: 156, completion: 92, avgScore: 82 },
  { id: 3, title: "HR Policy Awareness", date: "Mar 28, 2025", participants: 98, completion: 84, avgScore: 79 },
  { id: 4, title: "Project Management Fundamentals", date: "Mar 25, 2025", participants: 47, completion: 96, avgScore: 85 },
  { id: 5, title: "Customer Service Excellence", date: "Mar 20, 2025", participants: 112, completion: 88, avgScore: 74 },
];

const participants = [
  { id: 1, name: "Emma Johnson", email: "emma.j@company.com", quizzes: 4, avgScore: 88, lastAttempt: "Apr 5, 2025" },
  { id: 2, name: "Michael Chen", email: "m.chen@company.com", quizzes: 3, avgScore: 76, lastAttempt: "Apr 3, 2025" },
  { id: 3, name: "Sophia Rodriguez", email: "sophia.r@company.com", quizzes: 5, avgScore: 92, lastAttempt: "Apr 2, 2025" },
  { id: 4, name: "James Wilson", email: "j.wilson@company.com", quizzes: 2, avgScore: 65, lastAttempt: "Mar 29, 2025" },
  { id: 5, name: "Olivia Smith", email: "o.smith@company.com", quizzes: 5, avgScore: 84, lastAttempt: "Mar 28, 2025" },
  { id: 6, name: "William Brown", email: "w.brown@company.com", quizzes: 3, avgScore: 79, lastAttempt: "Mar 26, 2025" },
  { id: 7, name: "Ava Davis", email: "ava.d@company.com", quizzes: 4, avgScore: 90, lastAttempt: "Mar 25, 2025" },
  { id: 8, name: "Ethan Miller", email: "e.miller@company.com", quizzes: 2, avgScore: 72, lastAttempt: "Mar 22, 2025" },
];

const attempts = [
  { id: 1, quiz: "Corporate Ethics Training", participant: "Emma Johnson", date: "Apr 5, 2025", score: 84, time: "28:14", warnings: 0, status: "pass" },
  { id: 2, quiz: "Corporate Ethics Training", participant: "Michael Chen", date: "Apr 5, 2025", score: 76, time: "24:45", warnings: 2, status: "pass" },
  { id: 3, quiz: "Data Security Essentials", participant: "Sophia Rodriguez", date: "Apr 3, 2025", score: 92, time: "22:18", warnings: 0, status: "pass" },
  { id: 4, quiz: "Data Security Essentials", participant: "James Wilson", date: "Apr 3, 2025", score: 65, time: "29:55", warnings: 4, status: "fail" },
  { id: 5, quiz: "HR Policy Awareness", participant: "Olivia Smith", date: "Mar 28, 2025", score: 88, time: "25:30", warnings: 1, status: "pass" },
  { id: 6, quiz: "Project Management Fundamentals", participant: "William Brown", date: "Mar 25, 2025", score: 79, time: "19:47", warnings: 0, status: "pass" },
  { id: 7, quiz: "Customer Service Excellence", participant: "Ava Davis", date: "Mar 20, 2025", score: 90, time: "26:12", warnings: 0, status: "pass" },
  { id: 8, quiz: "Customer Service Excellence", participant: "Ethan Miller", date: "Mar 20, 2025", score: 62, time: "30:00", warnings: 5, status: "fail" },
];

const scoreDistributionData = [
  { score: "0-10%", count: 0 },
  { score: "11-20%", count: 0 },
  { score: "21-30%", count: 1 },
  { score: "31-40%", count: 2 },
  { score: "41-50%", count: 5 },
  { score: "51-60%", count: 8 },
  { score: "61-70%", count: 17 },
  { score: "71-80%", count: 42 },
  { score: "81-90%", count: 35 },
  { score: "91-100%", count: 12 },
];

const completionTrendData = [
  { date: "Mar 5", completionRate: 78 },
  { date: "Mar 10", completionRate: 82 },
  { date: "Mar 15", completionRate: 80 },
  { date: "Mar 20", completionRate: 85 },
  { date: "Mar 25", completionRate: 88 },
  { date: "Mar 30", completionRate: 86 },
  { date: "Apr 5", completionRate: 91 },
];

export default function Reports() {
  return (
    <Layout title="Reports">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz Reports & Analytics</h1>
          <p className="text-gray-500">View participation data and quiz results</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export to PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="attempts">Attempts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Distribution of quiz scores across all participants</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart data={scoreDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4F46E5" name="Participants" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Completion Trend</CardTitle>
                <CardDescription>Quiz completion rate over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartLineChart data={completionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completionRate"
                      stroke="#4F46E5"
                      name="Completion Rate (%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </RechartLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Attempts</CardTitle>
              <CardDescription>The most recent quiz attempts across all quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Warnings</TableHead>
                    <TableHead>Recording</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.slice(0, 5).map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-medium">{attempt.quiz}</TableCell>
                      <TableCell>{attempt.participant}</TableCell>
                      <TableCell>{attempt.date}</TableCell>
                      <TableCell>{attempt.score}%</TableCell>
                      <TableCell>
                        <Badge 
                          className={attempt.status === "pass" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}
                          variant="outline"
                        >
                          {attempt.status === "pass" ? "Passed" : "Failed"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {attempt.warnings > 0 ? (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            {attempt.warnings}
                          </Badge>
                        ) : (
                          <span>0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Video className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quizzes">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>Performance data for all quizzes</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search quizzes..." 
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell>{quiz.date}</TableCell>
                      <TableCell>{quiz.participants}</TableCell>
                      <TableCell>{quiz.completion}%</TableCell>
                      <TableCell>{quiz.avgScore}%</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-1 h-4 w-4" />
                          Export
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="participants">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Participant Performance</CardTitle>
                <CardDescription>Overall performance of quiz participants</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search participants..." 
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Participants</SelectItem>
                    <SelectItem value="high">High Performers</SelectItem>
                    <SelectItem value="low">Low Performers</SelectItem>
                    <SelectItem value="recent">Recent Attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Quizzes Taken</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Last Attempt</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.quizzes}</TableCell>
                      <TableCell>{participant.avgScore}%</TableCell>
                      <TableCell>{participant.lastAttempt}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            participant.avgScore >= 80 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : participant.avgScore >= 70 
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                          variant="outline"
                        >
                          {participant.avgScore >= 80 
                            ? "Excellent" 
                            : participant.avgScore >= 70 
                            ? "Good" 
                            : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attempts">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Quiz Attempts</CardTitle>
                <CardDescription>Individual quiz attempt records with proctoring data</CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search attempts..." 
                    className="pl-8"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Attempts</SelectItem>
                    <SelectItem value="pass">Passed</SelectItem>
                    <SelectItem value="fail">Failed</SelectItem>
                    <SelectItem value="warnings">With Warnings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Time Taken</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Warnings</TableHead>
                    <TableHead>Recording</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-medium">{attempt.quiz}</TableCell>
                      <TableCell>{attempt.participant}</TableCell>
                      <TableCell>{attempt.date}</TableCell>
                      <TableCell>{attempt.score}%</TableCell>
                      <TableCell>{attempt.time}</TableCell>
                      <TableCell>
                        <Badge 
                          className={attempt.status === "pass" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}
                          variant="outline"
                        >
                          {attempt.status === "pass" ? "Passed" : "Failed"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {attempt.warnings > 0 ? (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            {attempt.warnings}
                          </Badge>
                        ) : (
                          <span>0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Video className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
