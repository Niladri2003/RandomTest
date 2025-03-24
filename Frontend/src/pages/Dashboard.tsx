import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTestStore } from '../store/testStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { PlusCircle, FileText, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { Test } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { getUserTests, getTests, isLoading } = useTestStore();
  const [tests, setTests] = useState<Test[]>([]);
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.role === 'teacher' ? 'My Tests' : 'Available Tests'}
            </h1>
            
            {user?.role === 'teacher' && (
              <Link to="/create-test">
                <Button>
                  <PlusCircle className="h-5 w-5 mr-2" />
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
                    <FileText className="h-6 w-6" />
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
                    <CheckCircle className="h-6 w-6" />
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
                    <XCircle className="h-6 w-6" />
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
                    <Users className="h-6 w-6" />
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
                    <Link 
                      to={user?.role === 'teacher' ? `/test/${test.id}/edit` : `/test/${test.id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-lg font-medium text-indigo-600 truncate">
                              {test.title}
                            </p>
                            {test.isPublished ? (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Published
                              </span>
                            ) : (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Draft
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>{test.duration} minutes</p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
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
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No tests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {user?.role === 'teacher' 
                  ? "You haven't created any tests yet." 
                  : "There are no tests available for you at the moment."}
              </p>
              {user?.role === 'teacher' && (
                <div className="mt-6">
                  <Link to="/create-test">
                    <Button>
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Create your first test
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/*<Footer />*/}
    </div>
  );
};

export default Dashboard;