import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useRankingStore} from '../store/rankingStore';
import {useAuthStore} from '../store/authStore';
import {Award, ChevronDown, ChevronUp, Medal, Search} from 'lucide-react';
import {Ranking} from '../utils/types.ts';

const RankingPage: React.FC = () => {
    const { getRankings, isLoading } = useRankingStore();
    const { user } = useAuthStore();
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'rank' | 'averageScore' | 'testsCompleted'>('rank');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [userRanking, setUserRanking] = useState<Ranking | null>(null);

    useEffect(() => {
        const fetchRankings = async () => {
            const data = await getRankings();
            console.log(data)
            setRankings(data);

            if (user) {
                const currentUserRanking = data.find(r => r.userId === user.id) || null;
                setUserRanking(currentUserRanking);
            }
        };

        fetchRankings();
    }, [getRankings, user]);

    const handleSort = (field: 'rank' | 'averageScore' | 'testsCompleted') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredRankings = rankings.filter(ranking =>
        ranking.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedRankings = [...filteredRankings].sort((a, b) => {
        let comparison = 0;

        if (sortField === 'rank') {
            comparison = a.rank - b.rank;
        } else if (sortField === 'averageScore') {
            comparison = a.averageScore - b.averageScore;
        } else if (sortField === 'testsCompleted') {
            comparison = a.testsCompleted - b.testsCompleted;
        }

        return sortDirection === 'asc' ? comparison : -comparison;
    });

    const getRankBadge = (rank: number) => {
        if (rank === 1) {
            return <Medal className="h-6 w-6 text-yellow-500" />;
        } else if (rank === 2) {
            return <Medal className="h-6 w-6 text-gray-400" />;
        } else if (rank === 3) {
            return <Medal className="h-6 w-6 text-amber-700" />;
        } else {
            return <span className="font-semibold">{rank}</span>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">


            <div className="flex-grow bg-gray-50 py-10">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <Award className="h-8 w-8 mr-2 text-indigo-600" />
                            Student Rankings
                        </h1>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border text-black border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* User's own ranking card (if student) */}
                    {user?.role === 'student' && userRanking && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
                            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Your Ranking</h2>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                        {getRankBadge(userRanking.rank)}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">{userRanking.userName}</h3>
                                    <div className="mt-1 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Average Score</p>
                                            <p className="font-semibold">{userRanking.averageScore.toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Tests Completed</p>
                                            <p className="font-semibold">{userRanking.testsCompleted}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Rankings table */}
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rank
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Organization
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort('averageScore')}
                                        >
                                            <div className="flex items-center">
                                                Average Score
                                                {sortField === 'averageScore' && (
                                                    sortDirection === 'asc' ?
                                                        <ChevronUp className="h-4 w-4 ml-1" /> :
                                                        <ChevronDown className="h-4 w-4 ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Marks
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                            onClick={() => handleSort('testsCompleted')}
                                        >
                                            <div className="flex items-center">
                                                Tests Completed
                                                {sortField === 'testsCompleted' && (
                                                    sortDirection === 'asc' ?
                                                        <ChevronUp className="h-4 w-4 ml-1" /> :
                                                        <ChevronDown className="h-4 w-4 ml-1" />
                                                )}
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {sortedRankings.map((ranking) => (
                                        <tr
                                            key={ranking.userId}
                                            className={ranking.userId === user?.id ? "bg-indigo-50" : "hover:bg-gray-50"}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center justify-center text-black">
                                                    {getRankBadge(ranking.rank)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={ranking.profilePicture || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'}
                                                            alt={ranking.userName}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <Link
                                                            to={`/profile/${ranking.userId}`}
                                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            {ranking.userName}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {ranking.organization || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{ranking.averageScore.toFixed(1)}%</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {ranking.score}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {ranking.testsCompleted}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default RankingPage;