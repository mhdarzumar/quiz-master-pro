
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Bell, Edit, KeyRound, Mail, Save, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [passwordValues, setPasswordValues] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  
  const [emailSettings, setEmailSettings] = useState({
    quizCreated: true,
    participantJoined: true,
    quizCompleted: true,
    lowCompletionRate: false,
    reportGenerated: true,
    dailySummary: false,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    browser: true,
    email: true,
    mobileApp: false,
  });
  
  const [defaultQuizSettings, setDefaultQuizSettings] = useState({
    duration: 30,
    passingScore: 70,
    attemptsAllowed: 1,
    showResults: true,
    randomizeQuestions: true,
    enableProctoring: true,
    allowResume: false,
  });
  
  const { toast } = useToast();
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleSavePassword = () => {
    if (passwordValues.new !== passwordValues.confirm) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    
    setPasswordValues({
      current: "",
      new: "",
      confirm: "",
    });
  };
  
  const handleSaveEmailSettings = () => {
    toast({
      title: "Email Preferences Saved",
      description: "Your email notification settings have been updated.",
    });
  };
  
  const handleSaveDefaultSettings = () => {
    toast({
      title: "Default Quiz Settings Saved",
      description: "Your default quiz settings have been updated.",
    });
  };
  
  return (
    <Layout title="Settings">
      <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="quiz-defaults">Quiz Defaults</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@company.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" defaultValue="Training Manager" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="hr">
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="A brief description about yourself"
                  className="min-h-[100px]"
                  defaultValue="Corporate training specialist with 8+ years of experience developing and implementing training programs."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  value={passwordValues.current}
                  onChange={(e) => setPasswordValues({...passwordValues, current: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={passwordValues.new}
                  onChange={(e) => setPasswordValues({...passwordValues, new: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={passwordValues.confirm}
                  onChange={(e) => setPasswordValues({...passwordValues, confirm: e.target.value})}
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Password Requirements:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>At least 8 characters long</li>
                      <li>Must include uppercase and lowercase letters</li>
                      <li>Must include at least one number</li>
                      <li>Must include at least one special character</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSavePassword}>
                <KeyRound className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Authenticator App</h4>
                  <p className="text-sm text-gray-500">Use an authenticator app to generate verification codes</p>
                </div>
                <Button variant="outline">Set Up</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Authentication</h4>
                  <p className="text-sm text-gray-500">Receive verification codes via text message</p>
                </div>
                <Button variant="outline">Set Up</Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Backup Codes</h4>
                  <p className="text-sm text-gray-500">Generate one-time use backup codes</p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage which emails you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Quiz Created</h4>
                  <p className="text-sm text-gray-500">Receive an email when a new quiz is created</p>
                </div>
                <Switch 
                  checked={emailSettings.quizCreated}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, quizCreated: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Participant Joined</h4>
                  <p className="text-sm text-gray-500">Receive an email when a participant joins a quiz</p>
                </div>
                <Switch 
                  checked={emailSettings.participantJoined}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, participantJoined: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Quiz Completed</h4>
                  <p className="text-sm text-gray-500">Receive an email when a participant completes a quiz</p>
                </div>
                <Switch 
                  checked={emailSettings.quizCompleted}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, quizCompleted: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Low Completion Rate</h4>
                  <p className="text-sm text-gray-500">Receive an email when a quiz has a low completion rate</p>
                </div>
                <Switch 
                  checked={emailSettings.lowCompletionRate}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, lowCompletionRate: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Report Generated</h4>
                  <p className="text-sm text-gray-500">Receive an email when a report is generated</p>
                </div>
                <Switch 
                  checked={emailSettings.reportGenerated}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, reportGenerated: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Daily Summary</h4>
                  <p className="text-sm text-gray-500">Receive a daily summary of quiz activity</p>
                </div>
                <Switch 
                  checked={emailSettings.dailySummary}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, dailySummary: checked})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveEmailSettings}>
                <Mail className="mr-2 h-4 w-4" />
                Save Email Preferences
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Browser Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                </div>
                <Switch 
                  checked={notificationSettings.browser}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, browser: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={notificationSettings.email}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Mobile App Notifications</h4>
                  <p className="text-sm text-gray-500">Receive notifications in the mobile app</p>
                </div>
                <Switch 
                  checked={notificationSettings.mobileApp}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, mobileApp: checked})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast({ title: "Notification Settings Saved" })}>
                <Bell className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz-defaults">
          <Card>
            <CardHeader>
              <CardTitle>Default Quiz Settings</CardTitle>
              <CardDescription>Set default values for new quizzes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultDuration">Default Duration (minutes)</Label>
                  <Input 
                    id="defaultDuration" 
                    type="number" 
                    value={defaultQuizSettings.duration}
                    onChange={(e) => setDefaultQuizSettings({...defaultQuizSettings, duration: Number(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultPassing">Default Passing Score (%)</Label>
                  <Input 
                    id="defaultPassing" 
                    type="number" 
                    value={defaultQuizSettings.passingScore}
                    onChange={(e) => setDefaultQuizSettings({...defaultQuizSettings, passingScore: Number(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultAttempts">Default Attempts Allowed</Label>
                  <Input 
                    id="defaultAttempts" 
                    type="number" 
                    value={defaultQuizSettings.attemptsAllowed}
                    onChange={(e) => setDefaultQuizSettings({...defaultQuizSettings, attemptsAllowed: Number(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailTemplate">Default Email Template</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="emailTemplate">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Invitation</SelectItem>
                      <SelectItem value="formal">Formal Invitation</SelectItem>
                      <SelectItem value="friendly">Friendly Reminder</SelectItem>
                      <SelectItem value="urgent">Urgent Completion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Quiz Behavior</h3>
                
                <div className="flex items-center justify-between py-1">
                  <div>
                    <h4 className="text-sm font-medium">Show Results Immediately</h4>
                    <p className="text-xs text-gray-500">Show participants their results immediately after submission</p>
                  </div>
                  <Switch 
                    checked={defaultQuizSettings.showResults}
                    onCheckedChange={(checked) => setDefaultQuizSettings({...defaultQuizSettings, showResults: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-1">
                  <div>
                    <h4 className="text-sm font-medium">Randomize Questions</h4>
                    <p className="text-xs text-gray-500">Randomize the order of questions for each participant</p>
                  </div>
                  <Switch 
                    checked={defaultQuizSettings.randomizeQuestions}
                    onCheckedChange={(checked) => setDefaultQuizSettings({...defaultQuizSettings, randomizeQuestions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-1">
                  <div>
                    <h4 className="text-sm font-medium">Enable Proctoring</h4>
                    <p className="text-xs text-gray-500">Enable webcam and audio proctoring for quizzes</p>
                  </div>
                  <Switch 
                    checked={defaultQuizSettings.enableProctoring}
                    onCheckedChange={(checked) => setDefaultQuizSettings({...defaultQuizSettings, enableProctoring: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between py-1">
                  <div>
                    <h4 className="text-sm font-medium">Allow Resume</h4>
                    <p className="text-xs text-gray-500">Allow participants to resume a quiz if their session is interrupted</p>
                  </div>
                  <Switch 
                    checked={defaultQuizSettings.allowResume}
                    onCheckedChange={(checked) => setDefaultQuizSettings({...defaultQuizSettings, allowResume: checked})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveDefaultSettings}>
                Save Default Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Manage your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-gray-500">
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Change Logo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="Acme Corporation" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">1-50 employees</SelectItem>
                      <SelectItem value="medium">51-200 employees</SelectItem>
                      <SelectItem value="large">201-1000 employees</SelectItem>
                      <SelectItem value="enterprise">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" defaultValue="https://acme.example.com" />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Branding</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex">
                      <Input 
                        id="primaryColor" 
                        defaultValue="#4F46E5" 
                        className="rounded-r-none"
                      />
                      <div className="w-10 h-10 bg-quiz-primary rounded-r-md border border-l-0"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex">
                      <Input 
                        id="secondaryColor" 
                        defaultValue="#818CF8" 
                        className="rounded-r-none"
                      />
                      <div className="w-10 h-10 bg-quiz-secondary rounded-r-md border border-l-0"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex">
                      <Input 
                        id="accentColor" 
                        defaultValue="#C7D2FE" 
                        className="rounded-r-none"
                      />
                      <div className="w-10 h-10 bg-quiz-accent rounded-r-md border border-l-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => toast({ title: "Company Settings Saved" })}>
                Save Company Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
