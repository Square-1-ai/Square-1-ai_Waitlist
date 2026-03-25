/**
 * Google Analytics 4 Event Tracking Utilities
 *
 * Usage:
 * - trackFormStepView: Track when user views a step
 * - trackFormStepComplete: Track when user completes a step
 * - trackFormSubmit: Track final form submission
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'consent',
      targetOrAction: string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Track when a user views a form step
 */
export const trackFormStepView = (
  formType: 'student' | 'teacher',
  step: number,
  stepName: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_step_view', {
      form_type: formType,
      step_number: step,
      step_name: stepName,
      event_category: 'waitlist_form',
      event_label: `${formType}_step_${step}`,
    });
  }
};

/**
 * Track when a user completes a form step (successfully validates and moves to next)
 */
export const trackFormStepComplete = (
  formType: 'student' | 'teacher',
  step: number,
  stepName: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_step_complete', {
      form_type: formType,
      step_number: step,
      step_name: stepName,
      event_category: 'waitlist_form',
      event_label: `${formType}_step_${step}_complete`,
    });
  }
};

/**
 * Track when a user submits the entire form
 */
export const trackFormSubmit = (
  formType: 'student' | 'teacher',
  success: boolean,
  error?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_type: formType,
      success: success,
      error_message: error || undefined,
      event_category: 'waitlist_form',
      event_label: `${formType}_form_${success ? 'success' : 'failed'}`,
    });
  }
};

/**
 * Track form abandonment (when user leaves without completing)
 */
export const trackFormAbandon = (
  formType: 'student' | 'teacher',
  lastStep: number,
  stepName: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_abandon', {
      form_type: formType,
      last_step: lastStep,
      step_name: stepName,
      event_category: 'waitlist_form',
      event_label: `${formType}_abandon_step_${lastStep}`,
    });
  }
};

/**
 * Track validation errors
 */
export const trackFormError = (
  formType: 'student' | 'teacher',
  step: number,
  errorFields: string[]
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_validation_error', {
      form_type: formType,
      step_number: step,
      error_fields: errorFields.join(','),
      error_count: errorFields.length,
      event_category: 'waitlist_form',
      event_label: `${formType}_validation_error_step_${step}`,
    });
  }
};
