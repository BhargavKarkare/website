import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Patient {
    id: string;
    name: string;
    age: string;
    gender: string;
    contact?: string;
    address?: string;
    createdAt: string;
}

interface PatientContextType {
    patients: Patient[];
    addPatient: (patient: Omit<Patient, 'id' | 'createdAt'>) => void;
    addPatientsBulk: (patients: Omit<Patient, 'id' | 'createdAt'>[]) => void;
    updatePatient: (id: string, patient: Partial<Patient>) => void;
    deletePatient: (id: string) => void;
    getPatientById: (id: string) => Patient | undefined;
}

const PatientContext = createContext<PatientContextType | null>(null);

const STORAGE_KEY = 'vidhi_patients';

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
    const [patients, setPatients] = useState<Patient[]>([]);

    // Load patients from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setPatients(parsed);
            }
        } catch (error) {
            console.error('Failed to load patients:', error);
        }
    }, []);

    // Save patients to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
        } catch (error) {
            console.error('Failed to save patients:', error);
        }
    }, [patients]);

    const addPatient = (patient: Omit<Patient, 'id' | 'createdAt'>) => {
        const newPatient: Patient = {
            ...patient,
            id: `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
        };
        setPatients(prev => [newPatient, ...prev]);
    };

    const addPatientsBulk = (newPatients: Omit<Patient, 'id' | 'createdAt'>[]) => {
        const patientsWithIds = newPatients.map((patient, index) => ({
            ...patient,
            id: `patient_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
        }));
        setPatients(prev => [...patientsWithIds, ...prev]);
    };

    const updatePatient = (id: string, updatedData: Partial<Patient>) => {
        setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    const deletePatient = (id: string) => {
        setPatients(prev => prev.filter(p => p.id !== id));
    };

    const getPatientById = (id: string): Patient | undefined => {
        return patients.find(p => p.id === id);
    };

    return (
        <PatientContext.Provider
            value={{
                patients,
                addPatient,
                addPatientsBulk,
                updatePatient,
                deletePatient,
                getPatientById,
            }}
        >
            {children}
        </PatientContext.Provider>
    );
};

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error('usePatients must be used within a PatientProvider');
    }
    return context;
};
