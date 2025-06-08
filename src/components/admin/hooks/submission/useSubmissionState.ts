
import { useState } from "react";
import type { SubmissionState } from "../../types/SubmissionTypes";

export const useSubmissionState = () => {
  const [state, setState] = useState<SubmissionState>({
    isLoading: false,
    error: null,
    success: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const setSuccess = (success: string | null) => {
    setState(prev => ({ ...prev, success }));
  };

  const resetState = () => {
    setState({
      isLoading: false,
      error: null,
      success: null,
    });
  };

  return {
    ...state,
    setLoading,
    setError,
    setSuccess,
    resetState,
  };
};
