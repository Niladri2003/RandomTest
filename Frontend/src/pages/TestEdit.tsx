import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useTestStore} from '../store/testStore';
import Button from '../components/Button';
import Input from '../components/Input';
import {Code, Copy, FileText, Plus, Save, Share2, Trash2} from 'lucide-react';
import {Question, Test} from '../types';

const TestEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTestById, updateTest, deleteTest, isLoading } = useTestStore();
  
  const [test, setTest] = useState<Test | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [accessCode, setAccessCode] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [currentQuestionType, setCurrentQuestionType] = useState<'mcq' | 'coding'>('mcq');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return;
      
      try {
        const fetchedTest = await getTestById(id);
        if (fetchedTest) {
          setTest(fetchedTest);
          setTitle(fetchedTest.title);
          setDescription(fetchedTest.description);
          setDuration(fetchedTest.duration);
          setQuestions(fetchedTest.questions);
          setAccessCode(fetchedTest.accessCode || '');
          setIsPublished(fetchedTest.isPublished);
        }
      } catch (error) {
        console.error('Failed to fetch test:', error);
      }
    };
    
    fetchTest();
  }, [id, getTestById]);
  
  const addQuestion = () => {
    if (currentQuestionType === 'mcq') {
      setQuestions([
        ...questions,
        {
          id: String(Date.now()),
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
          id: String(Date.now()),
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
  
  const handleSave = async (publish: boolean = false) => {
    if (!id || !test) return;
    
    setIsSaving(true);
    
    try {
      const updatedTest = await updateTest(id, {
        title,
        description,
        duration,
        questions,
        isPublished: publish || isPublished,
        accessCode: publish ? accessCode || generateAccessCode() : accessCode
      });
      
      setTest(updatedTest);
      setIsPublished(updatedTest.isPublished);
      setAccessCode(updatedTest.accessCode || '');
      
      if (publish) {
        setShowShareModal(true);
      }
    } catch (error) {
      console.error('Failed to update test:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
      setIsDeleting(true);
      
      try {
        await deleteTest(id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to delete test:', error);
        setIsDeleting(false);
      }
    }
  };
  
  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };
  
  if (isLoading && !test) {
    return (
      <div className="min-h-screen flex flex-col">
        {/*<Navbar />*/}
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/*<Navbar />*/}
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Test</h1>
            
            <div className="flex space-x-4">
              {isPublished ? (
                <Button 
                  variant="outline"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Test
                </Button>
              ) : (
                <Button 
                  onClick={() => handleSave(true)}
                  isLoading={isSaving}
                >
                  Publish Test
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => handleSave(false)}
                isLoading={isSaving}
              >
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </Button>
              
              <Button 
                variant="danger"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Test
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <Input
                    label="Test Title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    label="Duration (minutes)"
                    id="duration"
                    type="number"
                    min={5}
                    max={180}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required
                  />
                </div>
                
                {isPublished && (
                  <div>
                    <Input
                      label="Access Code"
                      id="accessCode"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Students will need this code to access the test.
                    </p>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Questions</h3>
                  
                  {questions.map((question, qIndex) => (
                    <div key={question.id} className="mb-8 p-6 border border-gray-200 rounded-lg">
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
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={question.question}
                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          />
                        </div>
                        
                        {question.type === 'mcq' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Options
                            </label>
                            {question.options?.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center mb-2">
                                <input
                                  type="radio"
                                  name={`correct-answer-${qIndex}`}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                  checked={question.correctAnswer === oIndex}
                                  onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                />
                                <input
                                  type="text"
                                  className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  value={option}
                                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                />
                              </div>
                            ))}
                            <p className="text-sm text-gray-500 mt-1">
                              Select the radio button next to the correct answer.
                            </p>
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Share Test</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                    value={accessCode}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(accessCode)}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Share this code with your students to access the test.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Direct Link
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                    value={`${window.location.origin}/test/${id}`}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`${window.location.origin}/test/${id}`)}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Students will still need the access code to take the test.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowShareModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      

    </div>
  );
};

export default TestEdit;

