
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronDown, ChevronUp, Clock, Plus, Trash, Upload, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  type: "mcq" | "truefalse";
  options: string[];
  correctAnswer: number | boolean;
}

const INITIAL_QUESTION: Question = {
  id: 1,
  text: "",
  type: "mcq",
  options: ["", "", "", ""],
  correctAnswer: 0,
};

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState(30);
  const [passingScore, setPassingScore] = useState(60);
  const [proctoring, setProctoring] = useState(true);
  const [randomize, setRandomize] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([{ ...INITIAL_QUESTION }]);
  const [participantEmails, setParticipantEmails] = useState("");
  
  const { toast } = useToast();

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: "",
      type: "mcq",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You need at least one question in the quiz.",
        variant: "destructive"
      });
    }
  };

  const updateQuestion = (id: number, data: Partial<Question>) => {
    setQuestions(
      questions.map(q => (q.id === id ? { ...q, ...data } : q))
    );
  };

  const handleQuestionTypeChange = (id: number, type: "mcq" | "truefalse") => {
    const question = questions.find(q => q.id === id);
    if (question) {
      const updatedQuestion: Question = {
        ...question,
        type,
        options: type === "mcq" ? ["", "", "", ""] : ["True", "False"],
        correctAnswer: type === "mcq" ? 0 : true,
      };
      updateQuestion(id, updatedQuestion);
    }
  };

  const handleOptionChange = (questionId: number, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!title) {
      toast({
        title: "Missing Information",
        description: "Please enter a quiz title.",
        variant: "destructive"
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please select start and end dates.",
        variant: "destructive"
      });
      return;
    }

    // Additional validation could be added here

    // Success toast when all validation passes
    toast({
      title: "Quiz Created",
      description: "Your quiz has been created and saved.",
    });
  };

  return (
    <Layout title="Create Quiz">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
            <CardDescription>
              Set the basic information for your new quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Company Policies Quiz" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the purpose of this quiz" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <div className="flex">
                  <Input 
                    id="duration" 
                    type="number" 
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min={1}
                  />
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => setDuration(prev => prev + 5)}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => setDuration(prev => Math.max(1, prev - 5))}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passing">Passing Score (%)</Label>
                <div className="flex">
                  <Input 
                    id="passing" 
                    type="number" 
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    min={1}
                    max={100}
                  />
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => setPassingScore(prev => Math.min(100, prev + 5))}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="ml-2" onClick={() => setPassingScore(prev => Math.max(1, prev - 5))}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="proctoring" 
                checked={proctoring}
                onCheckedChange={setProctoring}
              />
              <Label htmlFor="proctoring">Enable Proctoring</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="randomize" 
                checked={randomize}
                onCheckedChange={setRandomize}
              />
              <Label htmlFor="randomize">Randomize Questions</Label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>
              Add and configure questions for your quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-4 p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Question {index + 1}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => handleRemoveQuestion(question.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                  <Input 
                    id={`question-${question.id}`} 
                    placeholder="Enter your question here" 
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <RadioGroup 
                    defaultValue={question.type} 
                    className="flex space-x-4"
                    onValueChange={(value) => handleQuestionTypeChange(question.id, value as "mcq" | "truefalse")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mcq" id={`type-mcq-${question.id}`} />
                      <Label htmlFor={`type-mcq-${question.id}`}>Multiple Choice</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="truefalse" id={`type-tf-${question.id}`} />
                      <Label htmlFor={`type-tf-${question.id}`}>True/False</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {question.type === "mcq" ? (
                  <div className="space-y-3">
                    <Label>Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={optionIndex.toString()} 
                          id={`option-${question.id}-${optionIndex}`}
                          checked={question.correctAnswer === optionIndex}
                          onClick={() => updateQuestion(question.id, { correctAnswer: optionIndex })}
                        />
                        <Input 
                          placeholder={`Option ${optionIndex + 1}`} 
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-1">Select the radio button next to the correct answer</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Label>Answer</Label>
                    <RadioGroup 
                      defaultValue={question.correctAnswer === true ? "true" : "false"} 
                      className="flex space-x-4"
                      onValueChange={(value) => updateQuestion(question.id, { correctAnswer: value === "true" })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id={`true-${question.id}`} />
                        <Label htmlFor={`true-${question.id}`}>True</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id={`false-${question.id}`} />
                        <Label htmlFor={`false-${question.id}`}>False</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            ))}
            
            <Button onClick={handleAddQuestion} className="w-full" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Question
            </Button>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Participants</CardTitle>
            <CardDescription>
              Add participants who will take this quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emails">Participant Emails</Label>
              <Textarea 
                id="emails" 
                placeholder="Enter email addresses, one per line"
                className="min-h-[120px]"
                value={participantEmails}
                onChange={(e) => setParticipantEmails(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Enter one email address per line, or upload a CSV file
              </p>
            </div>
            
            <Button variant="outline" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </Button>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4 mb-10">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSubmit}>Create Quiz</Button>
        </div>
      </div>
    </Layout>
  );
}
