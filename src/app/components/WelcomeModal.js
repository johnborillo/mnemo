'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import JournalEntryForm from './JournalEntryForm';

const WelcomeModal = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const handlePrivacyAccept = () => {
    if (privacyAccepted) {
      nextStep();
    }
  };

  const handleFirstEntryComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    onComplete();
  };

  const ButtonGroup = ({ showBack = true, nextLabel = 'Next', onNext }) => (
    <div className="flex justify-between pt-6">
      {showBack ? (
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-2xl shadow hover:bg-gray-300 transition-all duration-200"
        >
          Back
        </button>
      ) : <div />}

      <button
        onClick={onNext}
        className="px-6 py-2 bg-[#4B6858] text-white rounded-2xl shadow-lg hover:bg-[#3d5547] transition-all duration-200"
      >
        {nextLabel}
      </button>
    </div>
  );

  // --- Step 1: Welcome ---
  const renderStep1 = () => (
    <div className="text-center space-y-6">
      <div
        className="w-full h-48 bg-center bg-no-repeat bg-cover rounded-xl mx-auto"
        style={{ backgroundImage: 'url("/images/background2.png")' }}
      />
      <div>
        <DialogTitle className="text-2xl mb-2">Welcome to mnemo ("nee-mo")</DialogTitle>
        <p className="text-gray-600 mb-6">
          Not all days feel the same. mnemo helps you see what stretches yours.
        </p>
        <ButtonGroup showBack={false} nextLabel="Get Started" onNext={nextStep} />
      </div>
    </div>
  );

  // --- Step 2: Pain Point ---
  const renderStep2 = () => (
    <div className="space-y-6 text-center">
      <DialogTitle className="text-xl">Why Do Days Blur Together?</DialogTitle>
      <p className="text-gray-600 text-sm">
        As routines take over, time seems to fly. Our brains form fewer distinct memories
        on repetitive days, making weeks and even years vanish in hindsight.
      </p>
      <ButtonGroup onNext={nextStep} />
    </div>
  );

  // --- Step 3: The Idea (Science) ---
  const renderStep3 = () => (
    <div className="space-y-6 text-center">
      <DialogTitle className="text-xl">The Power of Novelty</DialogTitle>
      <p className="text-gray-600 text-sm">
        Novelty—trying new things, meeting new people, exploring new places—creates richer
        memories and stretches time in retrospect. A day full of new experiences feels
        longer and more meaningful.
      </p>
      <ButtonGroup onNext={nextStep} />
    </div>
  );

  // --- Step 4: The Solution ---
  const renderStep4 = () => (
    <div className="space-y-6 text-center">
      <DialogTitle className="text-xl">How mnemo Helps</DialogTitle>
      <p className="text-gray-600 text-sm">
        The word <em>mnemo</em> comes from the Ancient Greek word <em>mnēmē</em>, meaning “memory” or “remembrance.”
        Each day, you’ll reflect on how your day felt and what made it stand out. mnemo then
        calculates a novelty score, aligns it with your perception of time, and highlights
        emerging patterns. Over time, you’ll discover what makes your days feel fuller,
        slower, or more <strong>memorable</strong>.
      </p>
      <ButtonGroup nextLabel="Continue" onNext={nextStep} />
    </div>
  );

  // --- Step 5: Privacy ---
  const renderStep5 = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <DialogTitle className="text-xl">Privacy Policy</DialogTitle>
      <div className="text-sm text-gray-600 space-y-4">
        <p><strong>Effective Date:</strong> September 25, 2025</p>
        <p>
          mnemo is an offline-first Progressive Web App (PWA). Your data stays private and
          under your control. We never collect or transmit your information.
        </p>
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Data Storage</h3>
          <p>
            All journal entries are stored locally on your device using your browser’s
            database. mnemo does not back up data to the cloud. Clearing browser data or
            uninstalling the app will delete your entries.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-2xl shadow hover:bg-gray-300 transition-all duration-200"
        >
          Back
        </button>
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I agree
            </span>
          </label>
          <button
            onClick={handlePrivacyAccept}
            disabled={!privacyAccepted}
            className={`px-6 py-2 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 ${privacyAccepted
              ? 'bg-[#4B6858] text-white hover:bg-[#3d5547]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );

  // --- Step 6: First Entry ---
  const renderStep6 = () => (
    <div className="space-y-4">
      <DialogTitle className="text-xl mb-2">Welcome to Your Journal Journey</DialogTitle>
      <p className="text-gray-600 text-sm">
        Let's start with your first reflection. On a scale of 0 to 100 (where 100 feels very long and 0 very short),
        how long did today feel? This will help us establish your baseline for tracking how your days feel over time.
      </p>
      <div className="bg-gray-50 rounded-lg p-4">
        <JournalEntryForm isFirstEntry={true} onEntryComplete={handleFirstEntryComplete} />
      </div>
      <div className="pt-4">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-2xl shadow hover:bg-gray-300 transition-all duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => { }}>
      <DialogContent className="max-w-2xl max-h-[100vh] overflow-hidden">
        <DialogHeader>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
