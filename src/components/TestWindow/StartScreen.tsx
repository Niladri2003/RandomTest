import React, {useState} from 'react';
import {Mail, Key, AlertCircle} from 'lucide-react';
import {TestInfo, UserAuth} from '../../utils/types.ts';

interface StartScreenProps {
    testInfo: TestInfo;
    onStart: (userAuth: UserAuth) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({testInfo, onStart}) => {
    const [email, setEmail] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!email.trim() || !accessCode.trim()) {
            setError('Please enter both email and access code');
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        // In a real app, you would validate the access code against a backend
        // For demo purposes, we'll accept any non-empty access code
        onStart({
            email,
            accessCode,
            isAuthenticated: true
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {testInfo.title}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please enter your credentials to start the test
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="mb-6 p-4 bg-blue-50 rounded-md">
                        <h3 className="text-lg font-medium text-blue-800 mb-2">Test Information</h3>
                        <p className="text-sm text-blue-700 mb-2">{testInfo.description}</p>
                        <div className="text-sm text-blue-700">
                            <p>
                                <strong>Duration:</strong> {Math.floor(testInfo.duration / 3600)} hours {Math.floor((testInfo.duration % 3600) / 60)} minutes
                            </p>
                            <p className="mt-2"><strong>Sections:</strong></p>
                            <ul className="list-disc pl-5 mt-1">
                                {testInfo.sections.map(section => (
                                    <li key={section.id}>{section.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 rounded-md flex items-start">
                            <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={18}/>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700">
                                Access Code
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    id="accessCode"
                                    name="accessCode"
                                    type="text"
                                    required
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                                    placeholder="Enter your access code"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Start Test
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StartScreen;