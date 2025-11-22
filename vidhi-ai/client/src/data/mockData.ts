export const mockPatients = [
    {
        id: '1',
        name: 'Aarav Patel',
        age: '5y',
        gender: 'Male',
        parent: 'Suresh Patel',
        contact: '9876543210',
        lastVisit: '2024-03-10',
        condition: 'Viral Fever'
    },
    {
        id: '2',
        name: 'Diya Sharma',
        age: '3y',
        gender: 'Female',
        parent: 'Priya Sharma',
        contact: '9876543211',
        lastVisit: '2024-03-12',
        condition: 'Cough & Cold'
    },
    {
        id: '3',
        name: 'Vihaan Gupta',
        age: '7y',
        gender: 'Male',
        parent: 'Rahul Gupta',
        contact: '9876543212',
        lastVisit: '2024-03-15',
        condition: 'Stomach Ache'
    }
];

export const mockVisits = [
    {
        id: 'v1',
        date: '2024-03-15',
        complaint: 'Stomach pain since last night',
        diagnosis: 'Gastritis',
        vitals: { temp: 37.2, weight: 22, height: 120 }
    },
    {
        id: 'v2',
        date: '2024-02-10',
        complaint: 'Routine checkup',
        diagnosis: 'Healthy',
        vitals: { temp: 36.8, weight: 21.5, height: 119 }
    }
];
