
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Video, VideoOff, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock quiz data
const quizData = {
  title: "Corporate Ethics Training",
  description: "This quiz assesses your understanding of corporate ethics policies.",
  duration: 30, // minutes
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT typically considered a breach of corporate ethics?",
      type: "mcq",
      options: [
        "Sharing sensitive company information with competitors",
        "Using company resources for authorized work purposes",
        "Accepting gifts from suppliers without disclosure",
        "Hiring family members without proper declaration"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "True or False: It's acceptable to use company equipment for personal purposes as long as it doesn't interfere with work.",
      type: "truefalse",
      options: ["True", "False"],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "Which approach is recommended when facing an ethical dilemma at work?",
      type: "mcq",
      options: [
        "Handle it yourself to show initiative",
        "Ignore it if it doesn't directly affect you",
        "Consult the company's code of conduct",
        "Wait for someone else to address it"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "Who is ultimately responsible for maintaining ethical standards within a company?",
      type: "mcq",
      options: [
        "The CEO only",
        "The ethics committee only",
        "HR department only",
        "All employees at every level"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      text: "True or False: Whistleblower protections typically only apply to government employees, not those in private companies.",
      type: "truefalse",
      options: ["True", "False"],
      correctAnswer: 1
    }
  ]
};

export default function QuizAttempt() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizData.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { toast } = useToast();

  // Timer functionality
  useEffect(() => {
    if (!isStarted || isFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isStarted, isFinished]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleStartQuiz = () => {
    setIsStarted(true);
    // Simulate a tab switch warning after 5 seconds
    setTimeout(() => {
      setWarningMessage("We detected that you switched tabs. This will be recorded.");
      setShowWarning(true);
    }, 5000);
  };

  const handleFinish = () => {
    // Calculate score
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        correct++;
      }
    });
    
    const calculatedScore = Math.round((correct / quizData.questions.length) * 100);
    setScore(calculatedScore);
    setIsFinished(true);
  };

  const toggleCamera = () => {
    setCameraEnabled(!cameraEnabled);
    toast({
      title: cameraEnabled ? "Camera Disabled" : "Camera Enabled",
      description: cameraEnabled ? "Proctoring camera has been turned off" : "Proctoring camera has been turned on",
    });
  };

  const progressPercentage = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const answered = answers.filter(a => a !== null).length;
  const currentQuizQuestion = quizData.questions[currentQuestion];

  // If quiz hasn't started yet, show welcome screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">{quizData.title}</CardTitle>
            <CardDescription>{quizData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-medium text-blue-800 mb-2">Quiz Instructions</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-700">
                <li>You have {quizData.duration} minutes to complete this quiz</li>
                <li>There are {quizData.questions.length} questions in total</li>
                <li>Your webcam will be active for proctoring purposes</li>
                <li>Switching tabs or leaving the window will be flagged</li>
                <li>The quiz will auto-submit when the time expires</li>
              </ul>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Proctoring Information</h3>
              <p className="text-gray-600 mb-4">This quiz uses camera proctoring to ensure integrity. Your camera will be active during the quiz session.</p>
              
              <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center mb-4">
                {cameraEnabled ? (
                  <div className="text-center text-white">
                    <Video className="w-10 h-10 mx-auto mb-2" />
                    <p>Camera feed will appear here</p>
                    <p className="text-sm text-gray-400 mt-1">Make sure your face is clearly visible</p>
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <VideoOff className="w-10 h-10 mx-auto mb-2" />
                    <p>Camera is currently disabled</p>
                    <p className="text-sm text-gray-400 mt-1">Enable camera to continue</p>
                  </div>
                )}
              </div>
              
              <Button onClick={toggleCamera} variant="outline" className="w-full">
                {cameraEnabled ? (
                  <>
                    <VideoOff className="w-4 h-4 mr-2" />
                    Disable Camera
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Enable Camera
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartQuiz} className="w-full" disabled={!cameraEnabled}>
              Start Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If quiz is finished, show results screen
  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Completed</CardTitle>
            <CardDescription>Thank you for completing the quiz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              {score >= 70 ? (
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              ) : (
                <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center text-red-500">
                  <XCircle className="w-12 h-12" />
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-1">{score}%</h2>
              <p className={score >= 70 ? "text-green-600" : "text-red-600"}>
                {score >= 70 ? "Passed" : "Failed"}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span>Questions</span>
                <span>{quizData.questions.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Correct Answers</span>
                <span>{Math.round((score / 100) * quizData.questions.length)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Time Taken</span>
                <span>{formatTime((quizData.duration * 60) - timeLeft)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/quiz/dashboard">Back to Dashboard</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Main quiz interface
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with timer and progress */}
      <header className="bg-white border-b shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{quizData.title}</h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              <span className="text-sm font-medium">Questions:</span>
              <span className="text-sm">{answered}/{quizData.questions.length} answered</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 text-red-500" />
              <span className={`font-mono ${timeLeft < 60 ? "text-red-500 animate-pulse" : ""}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            {cameraEnabled && (
              <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                <Video className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Recording</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main quiz content */}
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Main question area */}
          <div className="flex-1">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {currentQuestion + 1} of {quizData.questions.length}
                </CardTitle>
                <Progress value={progressPercentage} className="h-1" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium">{currentQuizQuestion.text}</div>
                
                <RadioGroup 
                  value={answers[currentQuestion]?.toString() || ""} 
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {currentQuizQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentQuestion < quizData.questions.length - 1 ? (
                  <Button onClick={handleNextQuestion}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                    Finish Quiz
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <div className="text-center">
              <Button variant="link" onClick={handleFinish}>
                Submit Quiz Early
              </Button>
            </div>
          </div>
          
          {/* Proctoring sidebar */}
          <div className="w-full md:w-72">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Proctoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center">
                    {cameraEnabled ? (
                      <div className="text-white text-center">
                        <Video className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs">Camera active</p>
                      </div>
                    ) : (
                      <div className="text-white text-center">
                        <VideoOff className="w-6 h-6 mx-auto mb-1" />
                        <p className="text-xs">Camera disabled</p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={toggleCamera}
                  >
                    {cameraEnabled ? "Disable Camera" : "Enable Camera"}
                  </Button>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 text-xs text-yellow-800">
                    <p className="font-medium mb-1">Proctoring Rules:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Keep your face visible</li>
                      <li>Don't leave the quiz window</li>
                      <li>No additional persons allowed</li>
                      <li>No reference materials</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Question Navigator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {quizData.questions.map((_, index) => (
                      <Button
                        key={index}
                        variant={currentQuestion === index ? "default" : "outline"}
                        className={`w-full h-8 p-0 ${
                          answers[index] !== null 
                            ? "bg-green-100 border-green-300 text-green-800" 
                            : ""
                        } ${currentQuestion === index ? "ring-2 ring-offset-2" : ""}`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Warning Dialog */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Warning Detected</DialogTitle>
            <DialogDescription>
              {warningMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowWarning(false)}>
              Acknowledge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
