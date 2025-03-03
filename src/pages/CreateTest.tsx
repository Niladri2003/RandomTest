import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTestStore } from '../store/testStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Trash2, Save, FileText, Code } from 'lucide-react';
import { Question } from '../types';

const CreateTest: React.FC = () => {
  const { user } = useAuthStore();
  const { createTest, isLoading } = useTestStore();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([]);
  const [currentQuestionType, setCurrentQuestionType] = useState<'mcq' | 'coding'>('mcq');
  
  const addQuestion = () => {
    if (currentQuestionType === 'mcq') {
      setQuestions([
        ...questions,
        {
          type: 'mcq',
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]);
    } else {
      setQuestions([
        ...questions,
        {
          type: 'coding',
          question: '',
          codeTemplate: '// Write your code here',
          testCases: [{ input: '', expectedOutput: '' }]
        }
      ]);
    }
  };
  
  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  
  const updateQuestion = (index: number, field: string, value: string | number) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };
  
  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options![optionIndex] = value;
      setQuestions(newQuestions);
    }
  };
  
  const updateTestCase = (
    questionIndex: number, 
    testCaseIndex: number, 
    field: 'input' | 'expectedOutput', 
    value: string
  ) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].testCases) {
      newQuestions[questionIndex].testCases![testCaseIndex][field] = value;
      setQuestions(newQuestions);
    }
  };
  
  const addTestCase = (questionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].testCases) {
      newQuestions[questionIndex].testCases!.push({ input: '', expectedOutput: '' });
      setQuestions(newQuestions);
    }
  };
  
  const removeTestCase = (questionIndex: number, testCaseIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].testCases && newQuestions[questionIndex].testCases!.length > 1) {
      newQuestions[questionIndex].testCases!.splice(testCaseIndex, 1);
      setQuestions(newQuestions);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      const newTest = await createTest({
        title,
        description,
        createdBy: user.id,
        duration,
        questions,
        isPublished: publish,
        accessCode: publish ? generateAccessCode() : undefined
      });
      
      navigate(`/test/${newTest.id}/edit`);
    } catch (error) {
      console.error('Failed to create test:', error);
    }
  };
  
  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Test</h1>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={(e) => handleSubmit(e, false)}
                isLoading={isLoading}
              >
                <Save className="h-5 w-5 mr-2" />
                Save as Draft
              </Button>

              <Button
                onClick={(e) => handleSubmit(e, true)}
                isLoading={isLoading}
              >
                Publish Test
              </Button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={(e) => handleSubmit(e, false)}>
                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-2">
                      Test Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-3 text-gray-900 w-full shadow-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., JavaScript Fundamentals Quiz"
                        required
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-3 text-gray-900 w-full shadow-sm resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide instructions or details about this test"
                    />
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col">
                    <label htmlFor="duration" className="text-sm font-semibold text-gray-700 mb-2">
                      Duration (minutes) <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="duration"
                        type="number"
                        min={5}
                        max={180}
                        className="border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-3 text-gray-900 w-full shadow-sm"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum: 5 minutes, Maximum: 180 minutes</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Questions</h3>

                    {questions.map((question, qIndex) => (
                      <div key={qIndex} className="mb-8 p-6 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-md font-medium">
                            Question {qIndex + 1} ({question.type === 'mcq' ? 'Multiple Choice' : 'Coding'})
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Question Text
                            </label>
                            <textarea
                              rows={2}
                              className="border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-3 text-gray-900 w-full shadow-sm"
                              value={question.question}
                              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                              placeholder="Enter your question here"
                            />
                          </div>

                          {question.type === 'mcq' && (
                              <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                                {/* Options Label */}
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                  Options
                                </label>

                                {/* Options List */}
                                <div className="space-y-3">
                                  {question.options?.map((option, oIndex) => (
                                      <div key={oIndex} className="flex items-center gap-3 bg-white p-3 rounded-md shadow-sm border border-gray-300">
                                        {/* Radio Button */}
                                        <input
                                            type="radio"
                                            name={`correct-answer-${qIndex}`}
                                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
                                            checked={question.correctAnswer === oIndex}
                                            onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                        />

                                        {/* Option Input */}
                                        <input
                                            type="text"
                                            className="flex-1 text-gray-900 p-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                                            value={option}
                                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                            placeholder={`Option ${oIndex + 1}`}
                                        />

                                        {/* Delete Option Button */}
                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-700 transition"
                                            onClick={() => removeOption(qIndex, oIndex)}
                                        >
                                          ✖
                                        </button>
                                      </div>
                                  ))}
                                </div>

                                {/* Hint */}
                                <p className="text-xs text-gray-500 mt-3">
                                  Select the radio button next to the correct answer.
                                </p>

                                {/* Add Option Button */}
                                <button
                                    type="button"
                                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition"
                                    onClick={() => addOption(qIndex)}
                                >
                                  + Add Option
                                </button>
                              </div>
                          )}


                          {question.type === 'coding' && (
                            <div>
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Code Template
                                </label>
                                <textarea
                                  rows={5}
                                  className="font-mono shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  value={question.codeTemplate}
                                  onChange={(e) => updateQuestion(qIndex, 'codeTemplate', e.target.value)}
                                  placeholder="Provide a code template for students to start with"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Test Cases
                                </label>
                                {question.testCases?.map((testCase, tIndex) => (
                                  <div key={tIndex} className="flex flex-col sm:flex-row sm:space-x-4 mb-4 p-3 bg-gray-50 rounded-md">
                                    <div className="flex-1 mb-2 sm:mb-0">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Input
                                      </label>
                                      <input
                                        type="text"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={testCase.input}
                                        onChange={(e) => updateTestCase(qIndex, tIndex, 'input', e.target.value)}
                                        placeholder="e.g., sum(2, 3)"
                                      />
                                    </div>
                                    <div className="flex-1 mb-2 sm:mb-0">
                                      <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Expected Output
                                      </label>
                                      <input
                                        type="text"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={testCase.expectedOutput}
                                        onChange={(e) => updateTestCase(qIndex, tIndex, 'expectedOutput', e.target.value)}
                                        placeholder="e.g., 5"
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeTestCase(qIndex, tIndex)}
                                        className="text-red-600 border-red-300 hover:bg-red-50"
                                        disabled={question.testCases?.length === 1}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addTestCase(qIndex)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  Add Test Case
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="mt-4">
                      <div className="flex space-x-4 mb-4">
                        <Button
                          type="button"
                          variant={currentQuestionType === 'mcq' ? 'primary' : 'outline'}
                          onClick={() => setCurrentQuestionType('mcq')}
                        >
                          <FileText className="h-5 w-5 mr-2" />
                          Multiple Choice
                        </Button>
                        <Button
                          type="button"
                          variant={currentQuestionType === 'coding' ? 'primary' : 'outline'}
                          onClick={() => setCurrentQuestionType('coding')}
                        >
                          <Code className="h-5 w-5 mr-2" />
                          Coding Question
                        </Button>
                      </div>
                      <Button
                        type="button"
                        onClick={addQuestion}
                        fullWidth
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Add {currentQuestionType === 'mcq' ? 'Multiple Choice' : 'Coding'} Question
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CreateTest;