import { useState } from 'react';

interface Section {
    id: string;
    title: string;
    description: string;
    questions: {
        id: string;
        title: string;
        type: 'coding' | 'mcq';
    }[];
}

interface TestData {
    title: string;
    description: string;
    sections: Section[];
    price: string;
    published: boolean;
}

export function useTestWizard() {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [testData, setTestData] = useState<TestData>({
        title: '',
        description: '',
        sections: [],
        price: '',
        published: false
    });

    const updateTestData = (data: Partial<TestData>) => {
        setTestData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const canProceed = (): boolean => {
        switch (currentStep) {
            case 0:
                return !!testData.title && !!testData.description;
            case 1:
                return testData.sections.length > 0;
            case 2:
                return testData.sections.every(section => section.questions.length > 0);
            default:
                return true;
        }
    };

    return {
        currentStep,
        testData,
        updateTestData,
        nextStep,
        prevStep,
        isLastStep: currentStep === 3,
        canProceed: canProceed()
    };
}