import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, FileText, Mic, Loader2, Stethoscope, ArrowLeft, Info, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { demoPatient, demoVitals, demoComplaint, demoSOAP, demoICDCodes } from '../data/demoData';

export default function DemoMode() {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [complaint, setComplaint] = useState(demoComplaint);
    const [soap, setSoap] = useState({
        subjective: '',
        objective: '',
        assessment: '',
        plan: ''
    });
    const [vitals] = useState(demoVitals);
    const [selectedICDs, setSelectedICDs] = useState<typeof demoICDCodes>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [demoConsultations, setDemoConsultations] = useState<any[]>([]);

    // Load demo consultations from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('vidhi_demo_consultations');
            if (saved) {
                setDemoConsultations(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Failed to load demo consultations:', error);
        }
    }, []);

    const handleGenerateSOAP = () => {
        setIsGenerating(true);

        // Simulate AI generation with realistic delay
        setTimeout(() => {
            setSoap(demoSOAP);
            setSelectedICDs(demoICDCodes);
            setIsGenerating(false);
        }, 2000);
    };

    const handleSaveVisit = () => {
        if (!complaint.trim()) {
            alert('Please enter a complaint before saving.');
            return;
        }

        const newConsultation = {
            id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            patientId: demoPatient.id,
            patientName: demoPatient.name,
            date: new Date().toISOString(),
            complaint,
            soap,
            icdCodes: selectedICDs,
        };

        const updated = [newConsultation, ...demoConsultations];
        setDemoConsultations(updated);
        localStorage.setItem('vidhi_demo_consultations', JSON.stringify(updated));

        // Clear form
        setComplaint('');
        setSoap({
            subjective: '',
            objective: '',
            assessment: '',
            plan: ''
        });
        setSelectedICDs([]);

        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleExportPDF = () => {
        alert('Demo Mode: PDF export available in full version. Sign up to unlock this feature!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Demo Mode Banner */}
            <div className="bg-gradient-primary text-white py-3 px-4 shadow-lg">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Info className="h-5 w-5" />
                        <span className="font-medium">Demo Mode - Try VIDHI AI with sample data</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-lg transition-colors"
                        >
                            Sign Up Free
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm hover:text-teal-100 transition-colors"
                        >
                            Exit Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Notification */}
                {showSuccess && (
                    <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Demo consultation saved!</span>
                    </div>
                )}

                <div className="mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Recent Consultations Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="card p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-teal-600" />
                                Recent Consultations
                            </h3>
                            <div className="space-y-2">
                                {demoConsultations.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">No consultations yet</p>
                                ) : (
                                    demoConsultations.slice(0, 10).map((consultation) => (
                                        <div
                                            key={consultation.id}
                                            className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                                        >
                                            <div className="text-xs text-gray-500 mb-1">
                                                {new Date(consultation.date).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                                {consultation.complaint}
                                            </p>
                                            {consultation.icdCodes && consultation.icdCodes.length > 0 && (
                                                <div className="mt-1 flex flex-wrap gap-1">
                                                    {consultation.icdCodes.slice(0, 2).map((code: any) => (
                                                        <span
                                                            key={code.code}
                                                            className="text-xs px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded"
                                                        >
                                                            {code.code}
                                                        </span>
                                                    ))}
                                                    {consultation.icdCodes.length > 2 && (
                                                        <span className="text-xs text-gray-500">+{consultation.icdCodes.length - 2}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Left Panel: Patient Info & Input */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Patient Card */}
                        <div className="card p-6 animate-slide-up">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-white">
                                    {demoPatient.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{demoPatient.name}</h2>
                                    <p className="text-sm text-gray-500">{demoPatient.age} • {demoPatient.gender}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Guardian:</span>
                                    <span className="font-medium">{demoPatient.guardianName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Blood Group:</span>
                                    <span className="font-medium">{demoPatient.bloodGroup}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Allergies:</span>
                                    <span className="font-medium text-red-600">{demoPatient.allergies.join(', ')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Vitals Card */}
                        <div className="card p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                            <h3 className="font-semibold text-gray-900 mb-4">Vitals</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500 block">Heart Rate</span>
                                    <span className="font-medium text-lg">{vitals.heartRate} bpm</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Resp. Rate</span>
                                    <span className="font-medium text-lg">{vitals.respiratoryRate}/min</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Temperature</span>
                                    <span className="font-medium text-lg">{vitals.temperature}°C</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">SpO₂</span>
                                    <span className="font-medium text-lg">{vitals.spO2}%</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Weight</span>
                                    <span className="font-medium text-lg">{vitals.weight} kg</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">BMI</span>
                                    <span className="font-medium text-lg">{vitals.bmi}</span>
                                </div>
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className="card p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <h3 className="font-medium text-gray-900 mb-3">Clinical Notes Input</h3>
                            <textarea
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus-ring resize-none custom-scrollbar"
                                placeholder="Type symptoms, history, and observations..."
                                value={complaint}
                                onChange={(e) => setComplaint(e.target.value)}
                            />
                            <div className="mt-4 flex gap-3">
                                <Button
                                    onClick={handleGenerateSOAP}
                                    disabled={isGenerating || !complaint}
                                    className="flex-1 btn-glow"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Stethoscope className="mr-2 h-4 w-4" />
                                            Generate SOAP
                                        </>
                                    )}
                                </Button>
                                <Button variant="secondary" title="Voice Input (Demo)">
                                    <Mic className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: SOAP Notes */}
                    <div className="lg:col-span-2">
                        <div className="card animate-slide-up" style={{ animationDelay: '300ms' }}>
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <h3 className="font-bold text-gray-900 flex items-center">
                                    <FileText className="mr-2 h-5 w-5 text-teal-600" />
                                    SOAP Note
                                </h3>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleExportPDF}>
                                        Export PDF
                                    </Button>
                                    <Button size="sm" onClick={handleSaveVisit} className="btn-glow">
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Visit
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                                {/* ICD Codes Display */}
                                {selectedICDs.length > 0 && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <label className="block text-sm font-medium text-blue-900 mb-2">
                                            Diagnosis Codes (ICD-10)
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedICDs.map((code) => (
                                                <span
                                                    key={code.code}
                                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300"
                                                >
                                                    <span className="font-bold mr-1">{code.code}</span>
                                                    {code.description}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Subjective */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-teal-800 uppercase tracking-wide">
                                        Subjective
                                    </label>
                                    <textarea
                                        className="w-full p-4 bg-teal-50 border-none rounded-lg focus-ring resize-none custom-scrollbar"
                                        rows={6}
                                        value={soap.subjective}
                                        onChange={(e) => setSoap({ ...soap, subjective: e.target.value })}
                                        placeholder="Patient history and complaints..."
                                    />
                                </div>

                                {/* Objective */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-800 uppercase tracking-wide">
                                        Objective
                                    </label>
                                    <textarea
                                        className="w-full p-4 bg-blue-50 border-none rounded-lg focus-ring resize-none custom-scrollbar"
                                        rows={6}
                                        value={soap.objective}
                                        onChange={(e) => setSoap({ ...soap, objective: e.target.value })}
                                        placeholder="Physical exam findings and vitals..."
                                    />
                                </div>

                                {/* Assessment */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-purple-800 uppercase tracking-wide">
                                        Assessment
                                    </label>
                                    <textarea
                                        className="w-full p-4 bg-purple-50 border-none rounded-lg focus-ring resize-none custom-scrollbar"
                                        rows={3}
                                        value={soap.assessment}
                                        onChange={(e) => setSoap({ ...soap, assessment: e.target.value })}
                                        placeholder="Diagnosis..."
                                    />
                                </div>

                                {/* Plan */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-green-800 uppercase tracking-wide">
                                        Plan
                                    </label>
                                    <textarea
                                        className="w-full p-4 bg-green-50 border-none rounded-lg focus-ring resize-none custom-scrollbar"
                                        rows={8}
                                        value={soap.plan}
                                        onChange={(e) => setSoap({ ...soap, plan: e.target.value })}
                                        placeholder="Treatment plan, medications, and follow-up..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
