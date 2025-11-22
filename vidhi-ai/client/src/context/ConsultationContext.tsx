import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ICDCode {
    code: string;
    description: string;
    category: string;
}

export interface SOAPNote {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
}

export interface Consultation {
    id: string;
    patientId: string;
    patientName: string;
    age: string;
    gender: string;
    date: string;
    complaint: string;
    soap: SOAPNote;
    icdCodes: ICDCode[];
}

interface ConsultationContextType {
    consultations: Consultation[];
    saveConsultation: (consultation: Omit<Consultation, 'id' | 'date'>) => void;
    getConsultationsByPatient: (patientId: string) => Consultation[];
    deleteConsultation: (id: string) => void;
}

const ConsultationContext = createContext<ConsultationContextType | null>(null);

const STORAGE_KEY = 'vidhi_consultations';

export const ConsultationProvider = ({ children }: { children: React.ReactNode }) => {
    const [consultations, setConsultations] = useState<Consultation[]>([]);

    // Load consultations from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setConsultations(parsed);
            }
        } catch (error) {
            console.error('Failed to load consultations:', error);
        }
    }, []);

    // Save consultations to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consultations));
        } catch (error) {
            console.error('Failed to save consultations:', error);
        }
    }, [consultations]);

    const saveConsultation = (consultation: Omit<Consultation, 'id' | 'date'>) => {
        const newConsultation: Consultation = {
            ...consultation,
            id: `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            date: new Date().toISOString(),
        };

        setConsultations(prev => [newConsultation, ...prev]);
    };

    const getConsultationsByPatient = (patientId: string): Consultation[] => {
        return consultations.filter(c => c.patientId === patientId);
    };

    const deleteConsultation = (id: string) => {
        setConsultations(prev => prev.filter(c => c.id !== id));
    };

    return (
        <ConsultationContext.Provider
            value={{
                consultations,
                saveConsultation,
                getConsultationsByPatient,
                deleteConsultation,
            }}
        >
            {children}
        </ConsultationContext.Provider>
    );
};

export const useConsultations = () => {
    const context = useContext(ConsultationContext);
    if (!context) {
        throw new Error('useConsultations must be used within a ConsultationProvider');
    }
    return context;
};
