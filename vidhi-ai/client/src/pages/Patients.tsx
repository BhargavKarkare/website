import { useState } from 'react';
import { Search, Plus, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { usePatients } from '../context/PatientContext';
import { Link } from 'react-router-dom';

export default function Patients() {
    const { patients, addPatientsBulk } = usePatients();
    const [searchTerm, setSearchTerm] = useState('');
    const [showImportModal, setShowImportModal] = useState(false);
    const [importText, setImportText] = useState('');
    const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.contact && patient.contact.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const parseImportData = (text: string) => {
        const lines = text.trim().split('\n').filter(line => line.trim());
        const parsedPatients = [];

        for (const line of lines) {
            // Try CSV format: Name, Age, Gender, Contact
            if (line.includes(',')) {
                const parts = line.split(',').map(p => p.trim());
                if (parts.length >= 3) {
                    parsedPatients.push({
                        name: parts[0],
                        age: parts[1],
                        gender: parts[2] || 'Male',
                        contact: parts[3] || '',
                        address: parts[4] || ''
                    });
                }
            }
            // Try tab-separated format
            else if (line.includes('\t')) {
                const parts = line.split('\t').map(p => p.trim());
                if (parts.length >= 3) {
                    parsedPatients.push({
                        name: parts[0],
                        age: parts[1],
                        gender: parts[2] || 'Male',
                        contact: parts[3] || '',
                        address: parts[4] || ''
                    });
                }
            }
            // Try simple format: Name (Age, Gender)
            else {
                const match = line.match(/^(.+?)\s*\((\d+),?\s*(\w+)\)/);
                if (match) {
                    parsedPatients.push({
                        name: match[1].trim(),
                        age: match[2],
                        gender: match[3],
                        contact: '',
                        address: ''
                    });
                }
            }
        }

        return parsedPatients;
    };

    const handleImport = () => {
        try {
            const parsedPatients = parseImportData(importText);

            if (parsedPatients.length === 0) {
                setImportStatus({
                    type: 'error',
                    message: 'No valid patient data found. Please check the format.'
                });
                return;
            }

            addPatientsBulk(parsedPatients);
            setImportStatus({
                type: 'success',
                message: `Successfully imported ${parsedPatients.length} patient(s)!`
            });
            setImportText('');

            setTimeout(() => {
                setShowImportModal(false);
                setImportStatus(null);
            }, 2000);
        } catch (error) {
            setImportStatus({
                type: 'error',
                message: 'Failed to import patients. Please check the format.'
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setShowImportModal(true)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Import Patients
                    </Button>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Patient
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                    className="pl-10"
                    placeholder="Search by name or contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Patient List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {filteredPatients.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <div className="text-gray-400 mb-3">
                            <Search className="h-12 w-12 mx-auto" />
                        </div>
                        <p className="text-sm text-gray-500">No patients found</p>
                        <p className="text-xs text-gray-400 mt-1">Try importing patients or add them manually</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {filteredPatients.map((patient) => (
                            <li key={patient.id}>
                                <Link to={`/patients/${patient.id}`} className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {patient.name.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-blue-600 truncate">{patient.name}</div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <span className="truncate">{patient.age} years • {patient.gender}</span>
                                                        {patient.contact && (
                                                            <>
                                                                <span className="mx-2">•</span>
                                                                <span className="truncate">{patient.contact}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-xs text-gray-400">
                                                    Added {new Date(patient.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Import Patients</h2>
                                <button
                                    onClick={() => {
                                        setShowImportModal(false);
                                        setImportStatus(null);
                                        setImportText('');
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Paste patient data in one of these formats:
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs space-y-2 font-mono">
                                        <div>
                                            <strong>CSV:</strong> Name, Age, Gender, Contact, Address
                                        </div>
                                        <div className="text-gray-600">
                                            Aarav Kumar, 5, Male, 9876543210, Mumbai<br />
                                            Diya Sharma, 3, Female, 9876543211, Delhi
                                        </div>
                                        <div className="mt-2">
                                            <strong>Simple:</strong> Name (Age, Gender)
                                        </div>
                                        <div className="text-gray-600">
                                            Rohan Patel (7, Male)<br />
                                            Ananya Singh (6, Female)
                                        </div>
                                    </div>
                                </div>

                                <textarea
                                    className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                                    placeholder="Paste patient data here..."
                                    value={importText}
                                    onChange={(e) => setImportText(e.target.value)}
                                />

                                {importStatus && (
                                    <div className={`flex items-center gap-2 p-3 rounded-lg ${importStatus.type === 'success'
                                        ? 'bg-green-50 text-green-800'
                                        : 'bg-red-50 text-red-800'
                                        }`}>
                                        {importStatus.type === 'success' ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5" />
                                        )}
                                        <span className="text-sm font-medium">{importStatus.message}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowImportModal(false);
                                            setImportStatus(null);
                                            setImportText('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleImport}
                                        disabled={!importText.trim()}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Import
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
