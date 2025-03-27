import React from "react";
import {useTestWizard} from "../hooks/useTestWizard.tsx";
import TestBasicInfo from "../components/mockTest/steps/TestBasicInfo";
import CreateSection from "../components/mockTest/CreateSection.tsx";
import AddQuestions from "../components/mockTest/steps/AddQuestions";
import ReviewAndPublish from "../components/mockTest/steps/ReviewAndPublish";
import WizardProgress from "../components/mockTest/WizardProgress";

interface Step {
  title: string;
  component: JSX.Element;
}

const CreateTest: React.FC = () => {
  const {
    currentStep,
    testData,
    updateTestData,
    nextStep,
    prevStep,
    isLastStep,
    canProceed,
  } = useTestWizard();

  const steps: Step[] = [
    {
      title: "Basic Info",
      component: (
          <TestBasicInfo data={testData} onUpdate={updateTestData} onNext={nextStep} />
      ),
    },
    {
      title: "Create Sections",
      component: (
          <CreateSection
              data={testData}
              onUpdate={updateTestData}
              onNext={nextStep}
              onBack={prevStep}
          />
      ),
    },
    {
      title: "Add Questions",
      component: (
          <AddQuestions
              data={testData}
              onUpdate={updateTestData}
              onNext={nextStep}
              onBack={prevStep}
          />
      ),
    },
    {
      title: "Review & Publish",
      component: (
          <ReviewAndPublish
              data={testData}
              onBack={prevStep}
              onPublish={() => {
                console.log("Publishing test:", testData);
              }}
          />
      ),
    },
  ];

  return (
      <div className="min-h-screen flex flex-col ">
        <div className={"flex-row flex justify-center items-start w-full gap-4"}>
            <div className="w-[80%] pt-5">
              <WizardProgress steps={steps} currentStep={currentStep} />
              <div className="mt-8 bg-white rounded-lg border p-6">
                  {steps[currentStep].component}
              </div>
            </div>
          <div className="text-black mt-[5%] w-[15%]">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold text-xl mb-2 text-blue-700">Step Tips</h2>
              <p className="text-md text-blue-900">
                {currentStep === 0 && "Enter the basic details to get started.This details will be shown to the candidates before beginning the test.Try to write a descriptive title and description."}
                {currentStep === 1 && "Create and organize sections for your questions, ensuring they follow a structured order. Remember, candidates will see them in the same sequence as listed, so arrange the sections accordingly."}
                {currentStep === 2 && "Before adding questions, ensure you select the appropriate section. You can download the template Excel file for Hashel's free question uploading. Provide a clear description and explanation for each question."}
                {currentStep === 3 && "Review your entries and publish your form."}
              </p>
            </div>
          </div>
      </div>
      </div>
  );
};

export default CreateTest;
