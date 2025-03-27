import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuthStore} from '../store/authStore';
import {useTestStore} from '../store/testStore';
import Button from '../components/Button';
import {Drawer} from "../components/ui/Drawer.tsx";
import {
  CheckCircle,
  Clock,
  Copy,
  FileText,
  HelpCircle,
  KeyRound,
  ListOrdered,
  Pencil,
  PlusCircle,
  Share2,
  TerminalSquare,
  Users,
  XCircle
} from 'lucide-react';
import {Test} from '../types';


const Dashboard: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const { user } = useAuthStore();
  const { getUserTests, getTests, isLoading } = useTestStore();
  const [tests, setTests] = useState<Test[]>([]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedTest?.accessCode) {
      navigator.clipboard.writeText(selectedTest.accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    }
  };

  const openDrawer = (test: Test) => {
    setSelectedTest(test);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTest(null); // Reset selected test
  };

  useEffect(() => {
    const fetchTests = async () => {
      if (user) {
        if (user.role === 'teacher') {
          const userTests = await getUserTests(user.id);
          setTests(userTests);
        } else {
          const allTests = await getTests();
          // For students, only show published tests
          setTests(allTests.filter(test => test.isPublished));
        }
      }
    };

    fetchTests();
  }, [user, getUserTests, getTests]);
  console.log(selectedTest)

  return (
      <div className="min-h-screen flex flex-col">

        <div className="flex-grow bg-gray-50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.role === 'teacher' ? 'My Tests' : 'Available Tests'}
              </h1>

              {user?.role === 'teacher' && (
                  <Link to="/dashboard/create-test">
                    <Button>
                      <PlusCircle className="h-5 w-5 mr-2"/>
                      Create New Test
                    </Button>
                  </Link>
              )}
            </div>

            {/* Stats for teachers */}
            {user?.role === 'teacher' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                        <FileText className="h-6 w-6"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Tests</p>
                        <p className="text-2xl font-semibold text-gray-900">{tests.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <CheckCircle className="h-6 w-6"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Published</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {tests.filter(test => test.isPublished).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                        <XCircle className="h-6 w-6"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Drafts</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {tests.filter(test => !test.isPublished).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <Users className="h-6 w-6"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                        <p className="text-2xl font-semibold text-gray-900">0</p>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {/* Tests list */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : tests.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {tests.map((test) => (
                        <li key={test.id}>
                          <div
                              onClick={(e) => {
                                e.preventDefault();
                                openDrawer(test);
                              }}
                              className="block hover:bg-gray-50"
                          >
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <p className="text-lg font-medium text-indigo-600 truncate">
                                    {test.title}
                                  </p>
                                  {test.isPublished ? (
                                      <span
                                          className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Published
                              </span>
                                  ) : (
                                      <span
                                          className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Draft
                              </span>
                                  )}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"/>
                                  <p>{test.duration} minutes</p>
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                  <p className="flex items-center text-sm text-gray-500">
                                    <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"/>
                                    {test.questions.length} questions
                                  </p>
                                  {test.isPublished && test.accessCode && (
                                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                        <span className="font-medium">Access Code:</span>
                                        <span className="ml-1">{test.accessCode}</span>
                                      </p>
                                  )}
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                  <p>Created on {new Date(test.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                    ))}
                  </ul>
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <FileText className="mx-auto h-12 w-12 text-gray-400"/>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No tests found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {user?.role === 'teacher'
                        ? "You haven't created any tests yet."
                        : "There are no tests available for you at the moment."}
                  </p>
                  {user?.role === 'teacher' && (
                      <div className="mt-6">
                        <Link to="/dashboard/create-test">
                          <Button>
                            <PlusCircle className="h-5 w-5 mr-2"/>
                            Create your first test
                          </Button>
                        </Link>
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>
        {isDrawerOpen && selectedTest && (
            <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title={selectedTest?.title} width="max-w-xl">


              <div className="space-y-6 text-sm text-gray-800">
                {/* Description */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 h-5 w-5 text-gray-600"/>
                    <p>{selectedTest?.description}</p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => console.log('Share clicked')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Share"
                    >
                      <Share2 className="h-4 w-4 text-blue-600"/>
                    </button>
                    {selectedTest && (
                        <>
                          {console.log('Selected Test ID:', selectedTest.id)}
                          <Link
                              to={user?.role === 'teacher' ? `test/${selectedTest.id}/edit` : `/test/${selectedTest.id}`}
                              className="p-2 hover:bg-gray-100 rounded-lg transition"
                              title="Edit"
                          >
                            <Pencil className="h-4 w-4 text-green-600"/>
                          </Link>
                        </>
                    )}
                  </div>
                </div>

                {/* Access Code */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <KeyRound className="h-5 w-5 text-gray-600"/>
                    <p className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                      Access Code: {selectedTest?.accessCode}
                    </p>
                  </div>

                  <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Copy Access Code"
                  >
                    <Copy className={`h-4 w-4 ${copied ? 'text-green-600' : 'text-gray-600'}`}/>
                  </button>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-600"/>
                  <p>Duration: {selectedTest?.duration} minutes</p>
                </div>

                {/* Number of Questions */}
                <div className="flex items-center gap-3">
                  <ListOrdered className="h-5 w-5 text-gray-600"/>
                  <p>{selectedTest?.questions?.length} Questions</p>
                </div>

                {/* Questions Preview */}
                <div className="space-y-4">
                  {selectedTest?.questions.map((question, index) => (
                      <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {question.type === 'mcq' ? (
                              <HelpCircle className="h-4 w-4 text-blue-500"/>
                          ) : (
                              <TerminalSquare className="h-4 w-4 text-green-500"/>
                          )}
                          <span className="font-medium text-gray-700">
              Q{index + 1} ({question.type.toUpperCase()}):
            </span>
                        </div>
                        <p className="text-gray-800">{question.question}</p>
                        {question.options && (
                            <ul className="list-disc list-inside mt-2 text-gray-600">
                              {question.options.map((opt, i) => (
                                  <li
                                      key={i}
                                      className={i === question.correctAnswer ? 'font-semibold text-green-600' : ''}
                                  >
                                    {opt}
                                  </li>
                              ))}
                            </ul>
                        )}
                        {question.codeTemplate && (
                            <pre className="mt-2 bg-gray-100 p-3 rounded text-xs overflow-x-auto text-gray-700">
              {question.codeTemplate}
            </pre>
                        )}
                      </div>
                  ))}
                </div>
              </div>
            </Drawer>
        )}
      </div>
  );
};

export default Dashboard;