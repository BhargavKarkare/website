export interface ICDCode {
    code: string;
    description: string;
    category: string;
}

const mockICDCodes: ICDCode[] = [
    { code: 'J00', description: 'Acute nasopharyngitis [common cold]', category: 'Respiratory' },
    { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified', category: 'Respiratory' },
    { code: 'J10.1', description: 'Influenza with other respiratory manifestations', category: 'Respiratory' },
    { code: 'R50.9', description: 'Fever, unspecified', category: 'General' },
    { code: 'R05', description: 'Cough', category: 'Respiratory' },
    { code: 'K52.9', description: 'Noninfective gastroenteritis and colitis, unspecified', category: 'Digestive' },
    { code: 'A09', description: 'Infectious gastroenteritis and colitis, unspecified', category: 'Digestive' },
    { code: 'H66.9', description: 'Otitis media, unspecified', category: 'Ear' },
    { code: 'L20.9', description: 'Atopic dermatitis, unspecified', category: 'Skin' },
    { code: 'B08.4', description: 'Hand, foot and mouth disease', category: 'Infectious' },
];

export const searchICDCodes = async (query: string): Promise<ICDCode[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    return mockICDCodes.filter(item =>
        item.code.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
};
