import React from "react";
import {Check} from "lucide-react";

interface Step {
    title: string;
}

interface WizardProgressProps {
    steps: Step[];
    currentStep: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep }) => {
    return (
        <nav aria-label="Progress">
            <ol className="flex items-center">
                {steps.map((step, index) => (
                    <li key={step.title} className="relative flex-1">
                        {/* Progress Bar */}
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div
                                className={`h-0.5 w-full ${
                                    index <= currentStep ? "bg-blue-600" : "bg-gray-200"
                                }`}
                                style={{marginLeft: index === 0 ? "0" : "0"}} // Hide left part for index 0
                            />
                        </div>

                        {/* Step Indicator */}
                        <div className="relative flex items-center justify-center">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white">
            {index < currentStep ? (
                <Check className="h-5 w-5 text-blue-600" />
            ) : index === currentStep ? (
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
            )}
          </span>
                            {/* Step Title */}
                            <span className="absolute -bottom-6 text-sm font-medium text-gray-500">
            {step.title}
          </span>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>

    );
};

export default WizardProgress;
