import React from "react";
import { useTestWizard } from "../hooks/useTestWizard.tsx";
import TestBasicInfo from "../components/mockTest/steps/TestBasicInfo";
import CreateSection from "../components/mockTest/CreateSection.tsx";
import AddQuestions from "../components/mockTest/steps/AddQuestions";
import ReviewAndPublish from "../components/mockTest/steps/ReviewAndPublish";
import WizardProgress from "../components/mockTest/WizardProgress";
import Navbar from "../components/Navbar.tsx";

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
      <div className="min-h-screen flex flex-col bg-blue-200">
          <Navbar/>
          <div className={"flex-col flex justify-center items-center w-full "}>
            <div className="w-[80%] pt-5">

              <WizardProgress steps={steps} currentStep={currentStep} />
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                  {steps[currentStep].component}
              </div>
          </div>
      </div>
      </div>
  );
};

export default CreateTest;
