// Demo patient data for demo mode
export const demoPatient = {
    id: 'demo-patient-001',
    name: 'Aarav Kumar',
    age: '5 years',
    gender: 'Male',
    dateOfBirth: '2019-03-15',
    guardianName: 'Mrs. Priya Kumar',
    guardianPhone: '+91 98765 43210',
    allergies: ['Penicillin'],
    bloodGroup: 'O+',
    weight: 18.5,
    height: 110,
    bmi: 15.3
};

export const demoVitals = {
    heartRate: 95,
    respiratoryRate: 22,
    temperature: 37.8,
    spO2: 98,
    weight: 18.5,
    height: 110,
    bmi: 15.3
};

export const demoComplaint = `5-year-old male child presents with fever for 2 days. Mother reports temperature up to 101°F. Associated with mild cough and runny nose. Child is active and playful. Eating and drinking normally. No difficulty breathing. No rash. No vomiting or diarrhea.`;

export const demoSOAP = {
    subjective: `Patient Aarav Kumar, 5-year-old male, presents with chief complaint of fever for 2 days duration.

History of Present Illness:
- Fever onset 2 days ago, maximum temperature 101°F (38.3°C)
- Associated symptoms: mild cough, clear rhinorrhea
- No difficulty breathing, no chest pain
- Appetite maintained, adequate oral intake
- Activity level: child remains playful and active
- No rash, vomiting, or diarrhea
- No known sick contacts

Past Medical History:
- No significant past illnesses
- Immunizations up to date per schedule
- Known allergy: Penicillin (rash)

Family History: Non-contributory
Social History: Attends kindergarten`,

    objective: `Vital Signs:
- Temperature: 37.8°C (100°F)
- Heart Rate: 95 bpm
- Respiratory Rate: 22/min
- SpO2: 98% on room air
- Weight: 18.5 kg
- Height: 110 cm
- BMI: 15.3 kg/m²

General: Alert, active, well-hydrated, no acute distress

HEENT:
- Mild nasal congestion with clear discharge
- Throat: Mildly erythematous, no exudates
- Tympanic membranes: Clear bilaterally
- No cervical lymphadenopathy

Respiratory: Clear to auscultation bilaterally, no wheezing or crackles

Cardiovascular: Regular rate and rhythm, no murmurs

Abdomen: Soft, non-tender, normal bowel sounds

Skin: No rash, good perfusion`,

    assessment: `1. Acute Viral Upper Respiratory Tract Infection (URTI)
2. Fever, unspecified

Clinical Impression: Likely viral etiology given presentation with fever, rhinorrhea, and mild pharyngitis. No signs of bacterial infection. Child is well-appearing with good hydration status.`,

    plan: `1. Supportive Care:
   - Adequate hydration - encourage fluids
   - Rest as needed
   - Monitor temperature

2. Medications:
   - Paracetamol 250mg (15mg/kg) PO every 6 hours as needed for fever >100.4°F
   - Avoid aspirin due to age

3. Symptomatic Relief:
   - Saline nasal drops for congestion
   - Honey (1 tsp) for cough relief (age >1 year)

4. Parent Education:
   - Expected course: 5-7 days
   - Warning signs: difficulty breathing, persistent high fever >3 days, decreased activity, poor oral intake, rash

5. Follow-up:
   - Return visit if symptoms worsen or persist beyond 5 days
   - Return immediately if warning signs develop

6. Prognosis: Excellent with supportive care`
};

export const demoICDCodes = [
    {
        code: 'J06.9',
        description: 'Acute upper respiratory infection, unspecified',
        category: 'Respiratory',
        verified: true
    },
    {
        code: 'R50.9',
        description: 'Fever, unspecified',
        category: 'Symptoms',
        verified: true
    }
];

export const demoMedications = [
    {
        name: 'Paracetamol',
        dosage: '250mg',
        frequency: 'Every 6 hours as needed',
        route: 'Oral',
        duration: '5 days',
        instructions: 'Give only if temperature >100.4°F'
    }
];

export const demoVisitHistory = [
    {
        date: '2024-09-15',
        complaint: 'Routine checkup',
        diagnosis: 'Healthy child',
        doctor: 'Dr. Demo'
    },
    {
        date: '2024-06-20',
        complaint: 'Vaccination',
        diagnosis: 'Immunization - DTaP, IPV',
        doctor: 'Dr. Demo'
    },
    {
        date: '2024-03-10',
        complaint: 'Mild fever',
        diagnosis: 'Viral fever',
        doctor: 'Dr. Demo'
    }
];
