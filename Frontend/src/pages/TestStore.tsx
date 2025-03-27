import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTestStore} from '../store/testStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Test} from '../types';
import {Calendar, ChevronDown, ChevronUp, Clock, FileText, Filter, Search} from 'lucide-react';

type SortField = 'title' | 'createdAt' | 'duration';
type SortDirection = 'asc' | 'desc';

const TestStore: React.FC = () => {
    const {getTests, isLoading} = useTestStore();

    const [tests, setTests] = useState<Test[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);

    // Mock categories and difficulties for demo
    const categories = ['Programming', 'Web Development', 'Data Structures', 'Algorithms', 'Database'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

    useEffect(() => {
        const fetchTests = async () => {
            const allTests = await getTests();
            // Only show published tests
            setTests(allTests.filter(test => test.isPublished));
        };

        fetchTests();
    }, [getTests]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleDifficulty = (difficulty: string) => {
        setDifficultyFilter(prev =>
            prev.includes(difficulty)
                ? prev.filter(d => d !== difficulty)
                : [...prev, difficulty]
        );
    };

    const filteredAndSortedTests = tests
        .filter(test => {
            const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                test.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategories = selectedCategories.length === 0 ||
                selectedCategories.some(cat => test.title.includes(cat));

            const matchesDifficulty = difficultyFilter.length === 0 ||
                difficultyFilter.some(diff => test.title.includes(diff));

            return matchesSearch && matchesCategories && matchesDifficulty;
        })
        .sort((a, b) => {
            let comparison = 0;

            switch (sortField) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'createdAt':
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
                case 'duration':
                    comparison = a.duration - b.duration;
                    break;
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            <div className="flex-grow bg-gray-50 py-10">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Available Tests</h1>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400"/>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Search tests"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <Filter className="h-5 w-5 mr-2"/>
                                    Filters
                                </h2>

                                <div className="space-y-6">
                                    {/* Categories */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                                        <div className="space-y-2">
                                            {categories.map(category => (
                                                <label key={category} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={() => toggleCategory(category)}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Difficulty */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">Difficulty</h3>
                                        <div className="space-y-2">
                                            {difficulties.map(difficulty => (
                                                <label key={difficulty} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                        checked={difficultyFilter.includes(difficulty)}
                                                        onChange={() => toggleDifficulty(difficulty)}
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{difficulty}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tests List */}
                        <div className="lg:col-span-5">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <div
                                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                                </div>
                            ) : filteredAndSortedTests.length > 0 ? (
                                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                    <div className="divide-y divide-gray-200">
                                        {/* Sort Headers */}
                                        <div className="px-4 py-3 bg-gray-50">
                                            <div className="grid grid-cols-3 gap-4">
                                                <button
                                                    className="flex items-center text-sm font-medium text-gray-700"
                                                    onClick={() => handleSort('title')}
                                                >
                                                    Title
                                                    {sortField === 'title' && (
                                                        sortDirection === 'asc' ?
                                                            <ChevronUp className="h-4 w-4 ml-1"/> :
                                                            <ChevronDown className="h-4 w-4 ml-1"/>
                                                    )}
                                                </button>

                                                <button
                                                    className="flex items-center text-sm font-medium text-gray-700"
                                                    onClick={() => handleSort('duration')}
                                                >
                                                    Duration
                                                    {sortField === 'duration' && (
                                                        sortDirection === 'asc' ?
                                                            <ChevronUp className="h-4 w-4 ml-1"/> :
                                                            <ChevronDown className="h-4 w-4 ml-1"/>
                                                    )}
                                                </button>

                                                <button
                                                    className="flex items-center text-sm font-medium text-gray-700"
                                                    onClick={() => handleSort('createdAt')}
                                                >
                                                    Created
                                                    {sortField === 'createdAt' && (
                                                        sortDirection === 'asc' ?
                                                            <ChevronUp className="h-4 w-4 ml-1"/> :
                                                            <ChevronDown className="h-4 w-4 ml-1"/>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Test Items */}
                                        {filteredAndSortedTests.map(test => (
                                            <Link
                                                key={test.id}
                                                to={`/test-window/${test.id}`}
                                                className="block hover:bg-gray-50"
                                            >
                                                <div className="px-4 py-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-medium text-indigo-600">
                                                                {test.title}
                                                            </h3>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                {test.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="flex items-center text-sm text-gray-500">
                                                                <Clock
                                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"/>
                                                                {test.duration} minutes
                                                            </p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                                <FileText
                                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"/>
                                                                {test.questions.length} questions
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                            <Calendar
                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"/>
                                                            <p>
                                                                Created {new Date(test.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow">
                                    <FileText className="mx-auto h-12 w-12 text-gray-400"/>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No tests found</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Try adjusting your search or filter criteria
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default TestStore;