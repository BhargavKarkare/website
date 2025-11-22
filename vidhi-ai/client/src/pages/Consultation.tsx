import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Save, Stethoscope, Loader2, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { mockPatients } from '../data/mockData';
import { type ICDCode } from '../services/icdService';
import { useConsultations } from '../context/ConsultationContext';

export default function Consultation() {
    const { id } = useParams();
    const patient = mockPatients.find(p => p.id === id);
    const { saveConsultation, getConsultationsByPatient } = useConsultations();

    // Get recent consultations for this patient
    const recentConsultations = patient ? getConsultationsByPatient(patient.id) : [];

    // Patient Details
    const [patientName, setPatientName] = useState(patient?.name || '');
    const [age, setAge] = useState(patient?.age || '');
    const [gender, setGender] = useState(patient?.gender || 'Male');
    const [chiefComplaint, setChiefComplaint] = useState('');
    const [speciality, setSpeciality] = useState('Pediatrics');

    // Clinical Note
    const [clinicalNote, setClinicalNote] = useState('');

    // SOAP
    const [soap, setSoap] = useState({
        subjective: '',
        objective: '',
        assessment: '',
        plan: ''
    });

    // ICD Codes
    const [selectedICDs, setSelectedICDs] = useState<ICDCode[]>([]);

    // Loading states
    const [isGeneratingSOAP, setIsGeneratingSOAP] = useState(false);
    const [isGeneratingICD, setIsGeneratingICD] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // ICD-10 Code Database (JSON-based)
    const icdDatabase: Record<string, ICDCode[]> = {
        fever: [
            { code: 'R50.9', description: 'Fever, unspecified', category: 'Symptoms' },
            { code: 'R50.81', description: 'Fever presenting with conditions classified elsewhere', category: 'Symptoms' }
        ],
        cough: [
            { code: 'R05', description: 'Cough', category: 'Respiratory' },
            { code: 'R05.1', description: 'Acute cough', category: 'Respiratory' }
        ],
        'upper respiratory': [
            { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified', category: 'Respiratory' },
            { code: 'J00', description: 'Acute nasopharyngitis (common cold)', category: 'Respiratory' }
        ],
        'sore throat': [
            { code: 'J02.9', description: 'Acute pharyngitis, unspecified', category: 'Respiratory' },
            { code: 'R07.0', description: 'Pain in throat', category: 'Symptoms' }
        ],
        'runny nose': [
            { code: 'J34.89', description: 'Other specified disorders of nose and nasal sinuses', category: 'Respiratory' },
            { code: 'R09.82', description: 'Postnasal drip', category: 'Respiratory' }
        ],
        vomiting: [
            { code: 'R11.10', description: 'Vomiting, unspecified', category: 'Digestive' },
            { code: 'R11.11', description: 'Vomiting without nausea', category: 'Digestive' }
        ],
        diarrhea: [
            { code: 'R19.7', description: 'Diarrhea, unspecified', category: 'Digestive' },
            { code: 'K52.9', description: 'Noninfective gastroenteritis and colitis, unspecified', category: 'Digestive' }
        ],
        gastroenteritis: [
            { code: 'A09', description: 'Infectious gastroenteritis and colitis, unspecified', category: 'Digestive' },
            { code: 'K52.9', description: 'Noninfective gastroenteritis and colitis, unspecified', category: 'Digestive' }
        ],
        'abdominal pain': [
            { code: 'R10.9', description: 'Unspecified abdominal pain', category: 'Digestive' },
            { code: 'R10.84', description: 'Generalized abdominal pain', category: 'Digestive' }
        ],
        rash: [
            { code: 'R21', description: 'Rash and other nonspecific skin eruption', category: 'Skin' },
            { code: 'B09', description: 'Unspecified viral infection characterized by skin lesions', category: 'Infectious' }
        ],
        'ear pain': [
            { code: 'H92.09', description: 'Otalgia, unspecified ear', category: 'Ear' },
            { code: 'H66.90', description: 'Otitis media, unspecified', category: 'Ear' }
        ],
        wheezing: [
            { code: 'R06.2', description: 'Wheezing', category: 'Respiratory' },
            { code: 'J21.9', description: 'Acute bronchiolitis, unspecified', category: 'Respiratory' }
        ],
        asthma: [
            { code: 'J45.909', description: 'Unspecified asthma, uncomplicated', category: 'Respiratory' }
        ]
    };

    const handleGenerateSOAP = () => {
        if (!clinicalNote.trim()) {
            alert('Please enter clinical notes before generating SOAP.');
            return;
        }

        setIsGeneratingSOAP(true);

        // AI-like SOAP Generation
        setTimeout(() => {
            const notes = clinicalNote.toLowerCase();
            const complaint = chiefComplaint.toLowerCase();

            // Parse symptoms
            const symptoms = {
                fever: notes.includes('fever') || complaint.includes('fever'),
                cough: notes.includes('cough') || complaint.includes('cough'),
                runnyNose: notes.includes('runny nose') || notes.includes('rhinorrhea') || notes.includes('nasal'),
                soreThroat: notes.includes('sore throat') || notes.includes('throat pain'),
                vomiting: notes.includes('vomit'),
                diarrhea: notes.includes('diarrhea') || notes.includes('loose stools'),
                abdominalPain: notes.includes('stomach') || notes.includes('abdominal') || notes.includes('belly'),
                rash: notes.includes('rash'),
                wheezing: notes.includes('wheez') || notes.includes('breathing difficulty')
            };

            // Extract duration
            let duration = '2-3 days';
            const durationMatch = notes.match(/(\d+)\s*(day|days|week|weeks)/);
            if (durationMatch) {
                duration = `${durationMatch[1]} ${durationMatch[2]}`;
            }

            // Generate Subjective
            let subjective = `Chief Complaint: ${chiefComplaint}\n\n`;
            subjective += `History of Present Illness:\n`;
            subjective += `${patientName}, a ${age} year old ${gender.toLowerCase()}, presents with ${chiefComplaint} for the past ${duration}.\n\n`;
            subjective += `${clinicalNote}\n\n`;

            const symptomList = [];
            if (symptoms.fever) symptomList.push('- Fever: Maximum temperature 101-102°F, intermittent, responds to antipyretics');
            if (symptoms.cough) symptomList.push(`- Cough: ${notes.includes('dry') ? 'Dry, non-productive' : 'Productive with clear/white sputum'}`);
            if (symptoms.runnyNose) symptomList.push('- Nasal discharge: Clear rhinorrhea');
            if (symptoms.soreThroat) symptomList.push('- Sore throat: Mild to moderate');
            if (symptoms.vomiting) symptomList.push('- Vomiting: Non-bilious, non-bloody');
            if (symptoms.diarrhea) symptomList.push('- Diarrhea: Loose, watery stools');
            if (symptoms.abdominalPain) symptomList.push('- Abdominal pain: Crampy, periumbilical');

            if (symptomList.length > 0) {
                subjective += symptomList.join('\n') + '\n\n';
            }

            subjective += `Past Medical History: No significant past illnesses, immunizations up to date\n`;
            subjective += `Allergies: No known drug allergies\n`;
            subjective += `Family History: Non-contributory\n`;
            subjective += `Social History: Attends school/daycare regularly`;

            // Generate Objective
            const ageNum = parseFloat(age) || 5;
            const weight = Math.round(ageNum * 3.5 + 10);
            const height = Math.round(ageNum * 6 + 80);

            let objective = `Vital Signs:\n`;
            objective += `- Temperature: ${symptoms.fever ? '38.2°C (100.8°F)' : '37.2°C (99.0°F)'}\n`;
            objective += `- Heart Rate: ${symptoms.fever ? '105' : '95'} bpm\n`;
            objective += `- Respiratory Rate: ${symptoms.wheezing ? '28' : '22'}/min\n`;
            objective += `- SpO2: ${symptoms.wheezing ? '96' : '98'}% on room air\n`;
            objective += `- Blood Pressure: 95/60 mmHg\n`;
            objective += `- Weight: ${weight} kg\n`;
            objective += `- Height: ${height} cm\n\n`;

            objective += `General Appearance:\n`;
            objective += `- Alert, ${symptoms.fever ? 'mildly fussy' : 'active and playful'}, well-hydrated, ${symptoms.fever || symptoms.wheezing ? 'mild' : 'no'} distress\n\n`;

            objective += `HEENT:\n`;
            objective += `- Head: Normocephalic, atraumatic\n`;
            objective += `- Eyes: PERRLA, conjunctivae clear\n`;
            objective += `- Ears: TMs clear bilaterally, no erythema or effusion\n`;
            objective += `- Nose: ${symptoms.runnyNose ? 'Clear rhinorrhea, mild nasal congestion' : 'Nares patent, no discharge'}\n`;
            objective += `- Throat: ${symptoms.soreThroat ? 'Mild pharyngeal erythema, no exudates, tonsils not enlarged' : 'Oropharynx clear'}\n`;
            objective += `- Neck: Supple, no lymphadenopathy\n\n`;

            objective += `Respiratory:\n`;
            objective += `- ${symptoms.wheezing ? 'Mild wheezing bilaterally, no crackles' : 'Clear to auscultation bilaterally'}\n`;
            objective += `- Good air entry, no retractions\n\n`;

            objective += `Cardiovascular:\n`;
            objective += `- Regular rate and rhythm, no murmurs\n`;
            objective += `- Capillary refill <2 seconds\n\n`;

            objective += `Abdomen:\n`;
            objective += `- ${symptoms.abdominalPain ? 'Soft, mild tenderness in periumbilical region' : 'Soft, non-tender, non-distended'}\n`;
            objective += `- Normal bowel sounds\n\n`;

            if (symptoms.rash) {
                objective += `Skin: Maculopapular rash on trunk and extremities, no petechiae\n\n`;
            } else {
                objective += `Skin: Warm, dry, good turgor, no rashes\n\n`;
            }

            objective += `Neurological: Alert and oriented, age-appropriate behavior`;

            // Generate Assessment
            let assessment = `Primary Diagnosis:\n`;

            if (symptoms.fever && (symptoms.cough || symptoms.runnyNose || symptoms.soreThroat)) {
                assessment += `1. Acute Viral Upper Respiratory Tract Infection (URTI)\n`;
                assessment += `   - Most likely viral etiology (rhinovirus, adenovirus, or influenza)\n`;
                assessment += `   - Symptoms consistent with common cold/flu syndrome\n`;
            } else if (symptoms.abdominalPain && (symptoms.vomiting || symptoms.diarrhea)) {
                assessment += `1. Acute Gastroenteritis\n`;
                assessment += `   - Likely viral etiology (rotavirus, norovirus)\n`;
                assessment += `   - Mild dehydration risk\n`;
            } else if (symptoms.wheezing) {
                assessment += `1. Acute Bronchiolitis / Reactive Airway Disease\n`;
                assessment += `   - Viral-induced bronchospasm\n`;
            } else if (symptoms.rash && symptoms.fever) {
                assessment += `1. Viral Exanthem\n`;
                assessment += `   - Non-specific viral rash with fever\n`;
            } else {
                assessment += `1. ${chiefComplaint}\n`;
                assessment += `   - Clinical presentation consistent with common pediatric illness\n`;
            }

            assessment += `\nClinical Impression:\n`;
            assessment += `Patient presents with symptoms consistent with the above diagnosis. `;
            assessment += `No signs of bacterial infection or serious complications. `;
            assessment += `Child is well-appearing with stable vital signs.`;

            // Generate Plan
            let plan = `1. Supportive Care:\n`;
            plan += `   - Encourage adequate fluid intake (oral rehydration)\n`;
            plan += `   - Rest and monitor symptoms\n`;
            plan += `   - Maintain normal diet as tolerated\n\n`;

            plan += `2. Medications:\n`;
            if (symptoms.fever) {
                const paracetamolDose = Math.round(weight * 15);
                const ibuprofenDose = Math.round(weight * 10);
                plan += `   - Paracetamol ${paracetamolDose}mg (15mg/kg) PO every 6 hours PRN for fever >100.4°F\n`;
                plan += `   - Ibuprofen ${ibuprofenDose}mg (10mg/kg) PO every 8 hours PRN (alternative)\n`;
            }
            if (symptoms.cough || symptoms.runnyNose) {
                plan += `   - Saline nasal drops for congestion\n`;
                plan += `   - Honey (1 tsp) for cough relief if age >1 year\n`;
            }
            if (symptoms.vomiting) {
                plan += `   - Ondansetron 2-4mg PO/ODT PRN for severe vomiting\n`;
            }
            if (symptoms.diarrhea) {
                plan += `   - Probiotics may be beneficial\n`;
                plan += `   - ORS (Oral Rehydration Solution) for hydration\n`;
            }
            plan += `\n3. Non-Pharmacological Measures:\n`;
            if (symptoms.fever) {
                plan += `   - Tepid sponging if fever persists\n`;
                plan += `   - Light clothing, comfortable room temperature\n`;
            }
            if (symptoms.cough || symptoms.runnyNose) {
                plan += `   - Humidifier in room\n`;
                plan += `   - Elevate head of bed\n`;
            }

            plan += `\n4. Parent Education:\n`;
            plan += `   - Expected course: 5-7 days for viral illnesses\n`;
            plan += `   - Warning signs requiring immediate return:\n`;
            plan += `     * High fever >104°F or fever lasting >3 days\n`;
            plan += `     * Difficulty breathing or rapid breathing\n`;
            plan += `     * Persistent vomiting or signs of dehydration\n`;
            plan += `     * Decreased activity or lethargy\n`;
            plan += `     * Rash that doesn't blanch\n\n`;

            plan += `5. Follow-up:\n`;
            plan += `   - Return visit in 3-5 days if symptoms persist or worsen\n`;
            plan += `   - Return immediately if any warning signs develop\n`;
            plan += `   - Telephone follow-up in 24-48 hours`;

            setSoap({
                subjective,
                objective,
                assessment,
                plan
            });
            setIsGeneratingSOAP(false);
        }, 2000);
    };

    const handleGenerateICD = () => {
        if (!soap.assessment.trim()) {
            alert('Please generate SOAP notes first before generating ICD-10 codes.');
            return;
        }

        setIsGeneratingICD(true);

        // JSON-based ICD-10 Generation
        setTimeout(() => {
            const suggestedCodes: ICDCode[] = [];
            const searchText = (chiefComplaint + ' ' + clinicalNote + ' ' + soap.assessment).toLowerCase();

            // Search through ICD database
            Object.keys(icdDatabase).forEach(keyword => {
                if (searchText.includes(keyword)) {
                    icdDatabase[keyword].forEach(code => {
                        // Avoid duplicates
                        if (!suggestedCodes.find(c => c.code === code.code)) {
                            suggestedCodes.push(code);
                        }
                    });
                }
            });

            // If no codes found, add a general code
            if (suggestedCodes.length === 0) {
                suggestedCodes.push({
                    code: 'R69',
                    description: 'Illness, unspecified',
                    category: 'General'
                });
            }

            // Limit to top 5 most relevant codes
            setSelectedICDs(suggestedCodes.slice(0, 5));
            setIsGeneratingICD(false);
        }, 1500);
    };

    const handleSaveConsultation = () => {
        if (!patientName.trim() || !chiefComplaint.trim()) {
            alert('Please fill in patient name and chief complaint before saving.');
            return;
        }

        saveConsultation({
            patientId: patient?.id || 'new',
            patientName,
            age,
            gender,
            complaint: chiefComplaint,
            soap,
            icdCodes: selectedICDs,
        });

        // Clear form
        setChiefComplaint('');
        setClinicalNote('');
        setSoap({ subjective: '', objective: '', assessment: '', plan: '' });
        setSelectedICDs([]);

        // Show success
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'g') {
                e.preventDefault();
                handleGenerateSOAP();
            }
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                handleGenerateICD();
            }
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleSaveConsultation();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [clinicalNote, soap, patientName, chiefComplaint]);

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {/* Success Notification */}
                {showSuccess && (
                    <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Consultation saved successfully!</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">New Consultation</h1>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveConsultation} className="bg-teal-500 hover:bg-teal-600">
                            <Save className="mr-2 h-4 w-4" />
                            Save (Ctrl+S)
                        </Button>
                    </div>
                </div>

                {/* Patient Details */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                        Patient Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Patient Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="Enter patient name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Age (years) <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="e.g., 5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                            <select
                                value={speciality}
                                onChange={(e) => setSpeciality(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option>Pediatrics</option>
                                <option>General Medicine</option>
                                <option>Cardiology</option>
                                <option>Dermatology</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chief Complaint <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={chiefComplaint}
                                onChange={(e) => setChiefComplaint(e.target.value)}
                                placeholder="e.g., Fever and cough"
                            />
                        </div>
                    </div>
                </div>

                {/* Clinical Note */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinical Note</h2>
                    <textarea
                        value={clinicalNote}
                        onChange={(e) => setClinicalNote(e.target.value)}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Type or speak your clinical findings..."
                    />
                    <div className="mt-4 flex gap-3">
                        <Button
                            onClick={handleGenerateSOAP}
                            disabled={isGeneratingSOAP || !clinicalNote.trim()}
                            className="flex-1 bg-teal-500 hover:bg-teal-600"
                        >
                            {isGeneratingSOAP ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Stethoscope className="mr-2 h-4 w-4" />
                                    Generate SOAP (Ctrl+G)
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={handleGenerateICD}
                            disabled={isGeneratingICD || !soap.assessment.trim()}
                            className="flex-1 bg-blue-500 hover:bg-blue-600"
                        >
                            {isGeneratingICD ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Generate ICD-10 (Ctrl+I)
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* SOAP Note */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">SOAP Note</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-teal-800 uppercase tracking-wide mb-2">
                                Subjective
                            </label>
                            <textarea
                                value={soap.subjective}
                                onChange={(e) => setSoap({ ...soap, subjective: e.target.value })}
                                className="w-full p-3 bg-teal-50 border-none rounded-md focus:ring-1 focus:ring-teal-500 resize-none"
                                rows={6}
                                placeholder="Patient's symptoms and history..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-800 uppercase tracking-wide mb-2">
                                Objective
                            </label>
                            <textarea
                                value={soap.objective}
                                onChange={(e) => setSoap({ ...soap, objective: e.target.value })}
                                className="w-full p-3 bg-blue-50 border-none rounded-md focus:ring-1 focus:ring-blue-500 resize-none"
                                rows={6}
                                placeholder="Physical exam findings..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-800 uppercase tracking-wide mb-2">
                                Assessment
                            </label>
                            <textarea
                                value={soap.assessment}
                                onChange={(e) => setSoap({ ...soap, assessment: e.target.value })}
                                className="w-full p-3 bg-purple-50 border-none rounded-md focus:ring-1 focus:ring-purple-500 resize-none"
                                rows={4}
                                placeholder="Diagnosis and clinical impression..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-800 uppercase tracking-wide mb-2">
                                Plan
                            </label>
                            <textarea
                                value={soap.plan}
                                onChange={(e) => setSoap({ ...soap, plan: e.target.value })}
                                className="w-full p-3 bg-green-50 border-none rounded-md focus:ring-1 focus:ring-green-500 resize-none"
                                rows={8}
                                placeholder="Treatment plan and follow-up..."
                            />
                        </div>
                    </div>
                </div>

                {/* ICD-10 Codes */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">ICD-10 Codes</h2>
                    {selectedICDs.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center py-8">
                            No ICD-10 codes generated yet. Click "Generate ICD-10" to get suggestions.
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {selectedICDs.map((code) => (
                                <div
                                    key={code.code}
                                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md"
                                >
                                    <div>
                                        <span className="font-bold text-blue-900 mr-2">{code.code}</span>
                                        <span className="text-gray-700">{code.description}</span>
                                        <span className="ml-2 text-xs text-gray-500">({code.category})</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedICDs(selectedICDs.filter(c => c.code !== code.code))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Consultations Sidebar */}
            <div className="w-80 bg-white shadow rounded-lg p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Consultations</h3>
                {recentConsultations.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                        No consultations saved yet for this patient.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {recentConsultations.map((consultation) => (
                            <div
                                key={consultation.id}
                                className="p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-900">
                                        {consultation.complaint}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(consultation.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                    {consultation.soap.assessment || 'No assessment'}
                                </p>
                                {consultation.icdCodes.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {consultation.icdCodes.slice(0, 2).map((code) => (
                                            <span
                                                key={code.code}
                                                className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                                            >
                                                {code.code}
                                            </span>
                                        ))}
                                        {consultation.icdCodes.length > 2 && (
                                            <span className="text-xs text-gray-500">
                                                +{consultation.icdCodes.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
