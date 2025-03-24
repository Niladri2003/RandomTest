import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useTestStore } from '../store/testStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Test } from '../types';
import { Edit2, Mail, Building2, Calendar, Award, FileText, CheckCircle, Save } from 'lucide-react';

const ProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user: currentUser, updateProfile } = useAuthStore();
    const { getUserTests } = useTestStore();

    const [user, setUser] = useState<User | null>(null);
    const [tests, setTests] = useState<Test[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        bio: '',
        organization: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            // In a real app, we would fetch the user data from the API
            // For now, we'll use the current user's data
            if (currentUser) {
                setUser(currentUser);
                setEditForm({
                    name: currentUser.name,
                    bio: currentUser.bio || '',
                });

                if (currentUser.role === 'teacher') {
                    const userTests = await getUserTests(currentUser.id);
                    setTests(userTests);
                }
            }
        };

        fetchUserData();
    }, [currentUser, getUserTests]);

    const handleSaveProfile = async () => {
        if (!user) return;

        setIsSaving(true);
        try {
            const updatedUser = await updateProfile(user.id, {
                name: editForm.name,
                bio: editForm.bio,
                organization: editForm.organization
            });

            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
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

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow bg-gray-50 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        {/* Profile Header */}
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-bold leading-6 text-gray-900">Profile</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    {user.role === 'teacher' ? 'Teacher' : 'Student'} Profile
                                </p>
                            </div>

                            {currentUser?.id === user.id && !isEditing && (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </Button>
                            )}
                        </div>

                        <div className="border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-5 sm:px-6">
                                {/* Profile Info */}
                                <div className="col-span-2">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            <Input
                                                label="Name"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            />

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Bio
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    value={editForm.bio}
                                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                                />
                                            </div>

                                            <Input
                                                label="Organization"
                                                value={editForm.organization}
                                                onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                                            />

                                            <div className="flex space-x-4">
                                                <Button
                                                    onClick={handleSaveProfile}
                                                    isLoading={isSaving}
                                                >
                                                    <Save className="h-4 w-4 mr-2" />
                                                    Save Changes
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <dl className="space-y-4">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                    <Mail className="h-4 w-4 mr-2" />
                                                    Email
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                            </div>

                                            {user.organization && (
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <Building2 className="h-4 w-4 mr-2" />
                                                        Organization
                                                    </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{user.organization}</dd>
                                                </div>
                                            )}

                                            {user.bio && (
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{user.bio}</dd>
                                                </div>
                                            )}

                                            <div>
                                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    Joined
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {user.joinedAt?.toLocaleDateString()}
                                                </dd>
                                            </div>
                                        </dl>
                                    )}
                                </div>

                                {/* Stats */}
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Statistics</h4>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                        {user.role === 'teacher' ? (
                                            <>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <FileText className="h-4 w-4 mr-2" />
                                                        Tests Created
                                                    </dt>
                                                    <dd className="mt-1 text-2xl font-semibold text-indigo-600">
                                                        {user.testsCreated}
                                                    </dd>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Tests Completed
                                                    </dt>
                                                    <dd className="mt-1 text-2xl font-semibold text-indigo-600">
                                                        {user.testsCompleted}
                                                    </dd>
                                                </div>

                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                                        <Award className="h-4 w-4 mr-2" />
                                                        Average Score
                                                    </dt>
                                                    <dd className="mt-1 text-2xl font-semibold text-indigo-600">
                                                        {user.averageScore?.toFixed(1)}%
                                                    </dd>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        {user.role === 'teacher' && tests.length > 0 && (
                            <div className="border-t border-gray-200">
                                <div className="px-4 py-5 sm:px-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Tests</h4>
                                    <div className="space-y-4">
                                        {tests.map(test => (
                                            <Link
                                                key={test.id}
                                                to={`/test/${test.id}/edit`}
                                                className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h5 className="text-base font-medium text-gray-900">{test.title}</h5>
                                                        <p className="mt-1 text-sm text-gray-500">{test.description}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        test.isPublished
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                            {test.isPublished ? 'Published' : 'Draft'}
                          </span>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    Created on {new Date(test.createdAt).toLocaleDateString()}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProfilePage;