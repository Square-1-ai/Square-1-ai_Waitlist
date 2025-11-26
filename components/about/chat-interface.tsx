"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, MoreHorizontal, X, User } from "lucide-react"

const questions = [
  {
    question: "What new skills should I learn to improve my education?",
    answer: "Learn skills like time management, reading skills, basic coding, communication, and critical thinking. These help you study smarter and understand subjects better."
  },
  {
    question: "How do I learn faster?",
    answer: "Use short study sessions, take notes, practice daily, and test yourself often. Learning in small steps makes your brain remember faster."
  },
  {
    question: "How can I become good at problem-solving?",
    answer: "Practice puzzles, break big problems into small parts, ask \"why,\" and try different solutions. The more you practice, the better you become."
  },
  {
    question: "How can I improve my English speaking?",
    answer: "Speak every day, listen to English videos, read simple books, and learn new words. Practice with friends or a chatbot to build confidence."
  },
  {
    question: "How can I improve my computer skills?",
    answer: "Start with basic typing, using the internet safely, and learning common tools like Word, Excel, and PowerPoint. Then try beginner coding or simple projects."
  }
];

export function ChatInterface() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [isTypingQuestion, setIsTypingQuestion] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Reset states
    setDisplayedQuestion('');
    setDisplayedAnswer('');
    setShowAnswer(false);
    setIsTyping(false);
    setIsTypingQuestion(true);

    // Type the question first
    let questionIndex = 0;
    const questionTypingInterval = setInterval(() => {
      if (questionIndex < currentQuestion.question.length) {
        setDisplayedQuestion(currentQuestion.question.slice(0, questionIndex + 1));
        questionIndex++;
      } else {
        setIsTypingQuestion(false);
        clearInterval(questionTypingInterval);
        
        // After question is typed, start typing the answer after a delay
        setTimeout(() => {
          setShowAnswer(true);
          setIsTyping(true);
          
          let answerIndex = 0;
          const answerTypingInterval = setInterval(() => {
            if (answerIndex < currentQuestion.answer.length) {
              setDisplayedAnswer(currentQuestion.answer.slice(0, answerIndex + 1));
              answerIndex++;
            } else {
              setIsTyping(false);
              clearInterval(answerTypingInterval);
            }
          }, 30);
        }, 500);
      }
    }, 40);

    return () => clearInterval(questionTypingInterval);
  }, [currentQuestionIndex, currentQuestion.question, currentQuestion.answer]);

  // auto-advance with loop
  useEffect(() => {
    if (!isTyping && !isTypingQuestion && showAnswer) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(idx => {
          // Loop back to 0 when reaching the end
          if (idx >= questions.length - 1) {
            return 0;
          }
          return idx + 1;
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isTyping, isTypingQuestion, showAnswer, currentQuestionIndex]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 bg-white">
              <AvatarFallback className="bg-blue-900 text-white">
                <Bot className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-white">Square 1 Ai</h2>
              <p className="text-blue-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Online Now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white hover:bg-blue-950 p-2 rounded">
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <button className="text-white hover:bg-blue-950 p-2 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div id="chat-area" className="bg-gray-50 p-6 h-[300px] flex flex-col justify-center space-y-6">
          {/* User Question */}
          <div className="flex justify-end gap-3">
            <div>
              <p className="text-gray-500 mb-2 text-right">You</p>
              <div className="bg-gray-200 rounded-2xl rounded-tr-none p-4 max-w-sm">
                <p className="text-gray-800">
                  {displayedQuestion}
                  {isTypingQuestion && <span className="inline-block w-1 h-4 bg-gray-800 ml-1 animate-pulse" />}
                </p>
              </div>
            </div>
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarFallback className="bg-gray-400 text-white">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Square 1 Ai Answer (only show after question is complete) */}
          {showAnswer && (
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-blue-900 text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-gray-500 mb-2">Square 1 Ai</p>
                <div className="bg-blue-900 rounded-2xl rounded-tl-none p-4 max-w-sm">
                  <p className="text-white">
                    {displayedAnswer}
                    {isTyping && <span className="inline-block w-1 h-4 bg-white ml-1 animate-pulse" />}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <input
              type="text"
              placeholder="Reply to EduBot..."
              className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              disabled
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
