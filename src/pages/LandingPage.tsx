import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Code, Users, Award, Clock } from 'lucide-react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Create, Share, and Evaluate Tests with Ease
              </h1>
              <p className="text-xl mb-8">
                TestCraft helps educators and employers create engaging assessments with MCQs and coding challenges to evaluate skills effectively.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg">Get Started for Free</Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="TestCraft Platform" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Effective Testing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools you need to create comprehensive assessments and evaluate performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <CheckCircle className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multiple Choice Questions</h3>
              <p className="text-gray-600">
                Create diverse MCQs with multiple options, images, and detailed explanations for correct answers.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Code className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coding Challenges</h3>
              <p className="text-gray-600">
                Set up coding problems with custom test cases to evaluate programming skills in real-time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-gray-600">
                Share tests with students or employees using secure access codes or direct links.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Award className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automated Grading</h3>
              <p className="text-gray-600">
                Save time with automatic grading for MCQs and code execution against test cases.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timed Assessments</h3>
              <p className="text-gray-600">
                Set time limits for tests to simulate exam conditions and assess performance under pressure.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Get comprehensive insights into test performance with detailed reports and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educators and employers love using TestCraft for their assessment needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Sarah Johnson" 
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Computer Science Professor</p>
                </div>
              </div>
              <p className="text-gray-700">
                "TestCraft has revolutionized how I evaluate my students' programming skills. The coding challenges with automated testing save me hours of grading time."
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Michael Chen" 
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Tech Recruiter</p>
                </div>
              </div>
              <p className="text-gray-700">
                "We use TestCraft for our technical interviews. The platform allows us to standardize our assessment process and identify top talent efficiently."
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                  alt="Emily Rodriguez" 
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-gray-600 text-sm">High School Teacher</p>
                </div>
              </div>
              <p className="text-gray-700">
                "My students love the interactive nature of TestCraft. The immediate feedback helps them learn from their mistakes and improve their understanding."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Testing Process?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of educators and employers who use TestCraft to create engaging assessments.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;