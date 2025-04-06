"use client";

import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Clock,
  Plus,
  Trash,
  Upload,
} from "lucide-react";
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
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
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
      setQuestions(questions.filter((q) => q.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You need at least one question in the quiz.",
        variant: "destructive",
      });
    }
  };

  const updateQuestion = (id: number, data: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...data } : q))
    );
  };

  const handleQuestionTypeChange = (id: number, type: "mcq" | "truefalse") => {
    const updated = questions.map((q) =>
      q.id === id
        ? {
            ...q,
            type,
            options: type === "mcq" ? ["", "", "", ""] : ["True", "False"],
            correctAnswer: type === "mcq" ? 0 : true,
          }
        : q
    );
    setQuestions(updated);
  };

  const handleOptionChange = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const handleSubmit = () => {
    if (!title) {
      toast({
        title: "Missing Title",
        description: "Please enter a quiz title.",
        variant: "destructive",
      });
      return;
    }
    if (!startDate || !endDate) {
      toast({
        title: "Missing Dates",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quiz Created",
      description: "Your quiz has been created and saved.",
    });
  };

  return (
    <Layout title="Create Quiz">
      <div className="max-w-3xl mx-auto py-8">
        {/* Quiz Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
            <CardDescription>
              Fill in the quiz details and add questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe this quiz"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left", {
                        "text-muted-foreground": !startDate,
                      })}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left", {
                        "text-muted-foreground": !endDate,
                      })}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Passing Score (%)</Label>
                <Input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Switch
                checked={proctoring}
                onCheckedChange={setProctoring}
                id="proctoring"
              />
              <Label htmlFor="proctoring">Enable Proctoring</Label>
            </div>

            <div className="flex items-center space-x-4">
              <Switch
                checked={randomize}
                onCheckedChange={setRandomize}
                id="randomize"
              />
              <Label htmlFor="randomize">Randomize Questions</Label>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>Add your quiz questions below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleRemoveQuestion(q.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div>
                  <Label>Question Text</Label>
                  <Input
                    value={q.text}
                    onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                    placeholder="Enter your question here"
                  />
                </div>

                <div>
                  <Label>Question Type</Label>
                  <RadioGroup
                    value={q.type}
                    onValueChange={(val) =>
                      handleQuestionTypeChange(q.id, val as "mcq" | "truefalse")
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="mcq" id={`mcq-${q.id}`} />
                      <Label htmlFor={`mcq-${q.id}`}>Multiple Choice</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="truefalse" id={`tf-${q.id}`} />
                      <Label htmlFor={`tf-${q.id}`}>True/False</Label>
                    </div>
                  </RadioGroup>
                </div>

                {q.type === "mcq" ? (
                  <div className="space-y-3">
                    <Label>Options</Label>
                    <RadioGroup
                      value={q.correctAnswer.toString()}
                      onValueChange={(val) =>
                        updateQuestion(q.id, { correctAnswer: parseInt(val) })
                      }
                      className="space-y-2"
                    >
                      {q.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <RadioGroupItem value={i.toString()} id={`q${q.id}-opt${i}`} />
                          <Input
                            className="flex-1"
                            placeholder={`Option ${i + 1}`}
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(q.id, i, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">
                      Select the correct answer
                    </p>
                  </div>
                ) : (
                  <RadioGroup
                    value={q.correctAnswer === true ? "true" : "false"}
                    onValueChange={(val) =>
                      updateQuestion(q.id, { correctAnswer: val === "true" })
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id={`true-${q.id}`} />
                      <Label htmlFor={`true-${q.id}`}>True</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="false" id={`false-${q.id}`} />
                      <Label htmlFor={`false-${q.id}`}>False</Label>
                    </div>
                  </RadioGroup>
                )}
              </div>
            ))}

            <Button onClick={handleAddQuestion} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Question
            </Button>
          </CardContent>
        </Card>

        {/* Participants */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Assign Participants</CardTitle>
            <CardDescription>
              Add comma-separated email addresses of participants.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="employee1@example.com, employee2@example.com"
              value={participantEmails}
              onChange={(e) => setParticipantEmails(e.target.value)}
            />
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV (Coming Soon)
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSubmit}>Create Quiz</Button>
        </div>
      </div>
    </Layout>
  );
}
