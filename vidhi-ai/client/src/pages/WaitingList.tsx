import React, { useState } from 'react';
import { Clock, UserPlus, X, Check, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockPatients } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';

interface WaitingPatient {
    id: string;
    token: number;
    patientId: string;
    name: string;
    arrivalTime: string;
    status: 'waiting' | 'in_consultation' | 'completed';
}

export default function WaitingList() {
    const navigate = useNavigate();
    const [waitingList, setWaitingList] = useState<WaitingPatient[]>([
        { id: 'w1', token: 1, patientId: '1', name: 'Aarav Patel', arrivalTime: '10:00 AM', status: 'waiting' },
        { id: 'w2', token: 2, patientId: '2', name: 'Diya Sharma', arrivalTime: '10:15 AM', status: 'waiting' },
        { id: 'w3', token: 3, patientId: '3', name: 'Vihaan Gupta', arrivalTime: '10:30 AM', status: 'waiting' },
    ]);

    const [newTokenName, setNewTokenName] = useState('');

    const handleAddToken = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTokenName) return;

        const newToken: WaitingPatient = {
            id: `w${Date.now()}`,
            token: waitingList.length + 1,
            patientId: 'temp',
            name: newTokenName,
            arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'waiting'
        };

        setWaitingList([...waitingList, newToken]);
        setNewTokenName('');
    };

    const handleStatusChange = (id: string, status: WaitingPatient['status']) => {
        setWaitingList(waitingList.map(p => p.id === id ? { ...p, status } : p));
    };

    const handleRemove = (id: string) => {
        setWaitingList(waitingList.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Waiting List</h1>
                    <p className="text-sm text-gray-500">Manage patient queue and tokens</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
                    Current Token: #{waitingList.find(p => p.status === 'in_consultation')?.token || waitingList.find(p => p.status === 'waiting')?.token || '-'}
                </div>
            </div>

            {/* Add Patient Form */}
            <div className="bg-white shadow rounded-lg p-4">
                <form onSubmit={handleAddToken} className="flex gap-4">
                    <Input
                        placeholder="Enter Patient Name"
                        value={newTokenName}
                        onChange={(e) => setNewTokenName(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add to Queue
                    </Button>
                </form>
            </div>

            {/* Queue List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {waitingList.map((patient) => (
                        <li key={patient.id} className={`px-4 py-4 sm:px-6 hover:bg-gray-50 ${patient.status === 'in_consultation' ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center flex-1">
                                    <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold ${patient.status === 'in_consultation' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        #{patient.token}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-lg font-medium text-gray-900">{patient.name}</div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                            Arrived at {patient.arrivalTime}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {patient.status === 'waiting' && (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleStatusChange(patient.id, 'in_consultation');
                                                navigate(`/consultation/${patient.patientId}`);
                                            }}
                                        >
                                            <Play className="mr-2 h-4 w-4" />
                                            Start
                                        </Button>
                                    )}

                                    {patient.status === 'in_consultation' && (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => handleStatusChange(patient.id, 'completed')}
                                        >
                                            <Check className="mr-2 h-4 w-4" />
                                            Complete
                                        </Button>
                                    )}

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-600 hover:bg-red-50"
                                        onClick={() => handleRemove(patient.id)}
                                        aria-label="Remove from queue"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {waitingList.length === 0 && (
                        <li className="px-4 py-8 text-center text-gray-500">
                            No patients in the waiting list.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
