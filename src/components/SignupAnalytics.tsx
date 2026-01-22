import React, { useState, useEffect } from 'react';
import { hasCompletedSignup, getSignupTimestamp, getSignupSource } from '@/lib/utils';

interface SignupAnalyticsProps {
  showDetails?: boolean;
  className?: string;
}

const SignupAnalytics: React.FC<SignupAnalyticsProps> = ({
  showDetails = false,
  className = '',
}) => {
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [signupTimestamp, setSignupTimestamp] = useState<string | null>(null);
  const [signupSource, setSignupSource] = useState<string | null>(null);

  useEffect(() => {
    // Check cookies on component mount
    setHasSignedUp(hasCompletedSignup());
    setSignupTimestamp(getSignupTimestamp());
    setSignupSource(getSignupSource());
  }, []);

  if (!hasSignedUp) {
    return null; // Don't show anything if user hasn't signed up
  }

  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Welcome! You're already signed up to the Invasion Day movement.
          </p>
          {showDetails && signupTimestamp && (
            <p className="text-xs text-green-600 mt-1">
              Signed up on: {new Date(signupTimestamp).toLocaleDateString()}
              {signupSource && ` • Source: ${signupSource}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupAnalytics;
