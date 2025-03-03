import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTestStore } from '../store/testStore';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Clock, AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Test, Question } from '../types';

const TestView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTestById, isLoading } = useTestStore();
  const { user } = useAuthStore();
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');
  const [needsAccessCode, setNeedsAccessCode] = useState(false);
  
  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;
      
      try {
        const fetchedTest = await getTestById(id);
        if (fetchedTest) {
          setTest(fetchedTest);
          
          // Initialize time
          setTimeLeft(fetchedTest.duration * 60);
          
          // Check if access code is needed
          if (fetchedTest.isPublished && fetchedTest.accessCode && user?.role === 'student') {
            setNeedsAccessCode(true);
          }
          
          // Initialize answers
          const initialAnswers: Record<string, string | number> = {};
          fetchedTest.questions.forEach(q => {
            if (q.type === 'mcq') {
              initialAnswers[q.id] = '';
            } else if (q.type === 'coding') {
              initialAnswers[q.id] = q.codeTemplate || '';
            }
          });
          setAnswers(initialAnswers);
        }
      } catch (error) {
        console.error('Failed to fetch test:', error);
      }
    };
    
    fetchTest();
  }, [id, getTestById, user]);
  
  useEffect(() => {
    if (!needsAccessCode && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [needsAccessCode, timeLeft]);
  
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // In a real app, we would submit the answers to the server
    // For this demo, we'll just show a success message and redirect
    setTimeout(() => {
      alert('Test submitted successfully!');
      navigate('/dashboard');
    }, 1500);
  };
  
  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (test?.accessCode === accessCode) {
      setNeedsAccessCode(false);
      setAccessError('');
    } else {
      setAccessError('Invalid access code. Please try again.');
    }
  };
  
  const currentQuestion: Question | undefined = test?.questions[currentQuestionIndex];
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!test) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Not Found</h2>
            <p className="text-gray-600 mb-4">The test you're looking for doesn't exist or you don't have access to it.</p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (needsAccessCode) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{test.title}</h2>
            <p className="text-gray-600 mb-6">This test requires an access code to begin.</p>
            
            <form onSubmit={handleAccessCodeSubmit}>
              <div className="mb-4">
                <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Access Code
                </label>
                <input
                  type="text"
                  id="accessCode"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter the access code"
                  required
                />
                {accessError && (
                  <p className="mt-1 text-sm text-red-600">{accessError}</p>
                )}
              </div>
              
              <Button type="submit" fullWidth>
                Start Test
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Test header */}
          <div className="bg-white shadow rounded-lg mb-6 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
                <p className="text-gray-600 mt-1">{test.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {test.questions.length}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(test.questions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === test.questions.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Question content */}
          {currentQuestion && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              
              {currentQuestion.type === 'mcq' && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <label key={index} className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                        checked={answers[currentQuestion.id] === index}
                        onChange={() => handleAnswerChange(currentQuestion.id, index)}
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {currentQuestion.type === 'coding' && (
                <div>
                  <textarea
                    rows={10}
                    className="font-mono w-full p-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    value={answers[currentQuestion.id] as string}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  />
                  
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">Test Cases:</h3>
                    <div className="space-y-2">
                      {currentQuestion.testCases?.map((testCase, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Input:</p>
                              <p className="font-mono text-sm">{testCase.input}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Expected Output:</p>
                              <p className="font-mono text-sm">{testCase.expectedOutput}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Question navigation */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-md font-medium mb-4">Question Navigator</h3>
            <div className="flex flex-wrap gap-2">
              {test.questions.map((q, index) => (
                <button
                  key={q.id}
                  className={`h-10 w-10 rounded-md flex items-center justify-center font-medium ${
                    currentQuestionIndex === index
                      ? 'bg-indigo-600 text-white'
                      : answers[q.id] !== '' && answers[q.id] !== q.codeTemplate
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit button */}
          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Submit Test
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TestView;