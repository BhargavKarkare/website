import React from 'react';
import { useParams } from 'react-router-dom';
import { User, Phone, Calendar, Activity, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockPatients, mockVisits } from '../data/mockData';

export default function PatientProfile() {
    const { id } = useParams();
    const patient = mockPatients.find(p => p.id === id) || mockPatients[0];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                            {patient.name.charAt(0)}
                        </div>
                        <div className="ml-6">
                            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                            <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                                <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {patient.age} {patient.gender}</span>
                                <span className="flex items-center"><Phone className="h-4 w-4 mr-1" /> {patient.contact}</span>
                                <span className="flex items-center"><User className="h-4 w-4 mr-1" /> Parent: {patient.parent}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Button variant="outline">Edit Profile</Button>
                        <Button>Start Consultation</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Vitals & History */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Vitals Chart Placeholder */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <Activity className="h-5 w-5 mr-2 text-blue-500" />
                            Growth Chart
                        </h3>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400 border-2 border-dashed">
                            Chart Visualization Component Here
                        </div>
                    </div>

                    {/* Visit History */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                                Visit History
                            </h3>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {mockVisits.map((visit) => (
                                <li key={visit.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="text-sm font-bold text-blue-600 mb-1">{visit.date}</div>
                                            <p className="text-gray-900 font-medium">{visit.diagnosis}</p>
                                            <p className="text-sm text-gray-500 mt-1">{visit.complaint}</p>
                                        </div>
                                        <Button variant="ghost" size="sm">View Note</Button>
                                    </div>
                                    <div className="mt-3 flex space-x-4 text-sm text-gray-500">
                                        <span>Temp: {visit.vitals.temp}°C</span>
                                        <span>Weight: {visit.vitals.weight}kg</span>
                                        <span>Height: {visit.vitals.height}cm</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Info */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Allergies</dt>
                                <dd className="mt-1 text-sm text-red-600 font-medium">Peanuts, Penicillin</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Chronic Conditions</dt>
                                <dd className="mt-1 text-sm text-gray-900">None</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
                                <dd className="mt-1 text-sm text-gray-900">O+</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Lab Reports */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Lab Reports</h3>
                            <Button size="sm" variant="outline">Upload</Button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="flex items-center">
                                    <FileText className="h-4 w-4 text-gray-400 mr-3" />
                                    <span className="text-sm font-medium text-gray-900">Blood Count (CBC)</span>
                                </div>
                                <span className="text-xs text-gray-500">Oct 12, 2023</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="flex items-center">
                                    <FileText className="h-4 w-4 text-gray-400 mr-3" />
                                    <span className="text-sm font-medium text-gray-900">Urine Analysis</span>
                                </div>
                                <span className="text-xs text-gray-500">Sep 05, 2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
