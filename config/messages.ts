/**
 * Centralized UI messages
 * All user-facing text in one place for easy maintenance and i18n
 */

export const MESSAGES = {
  auth: {
    loginSuccess: "Welcome back! You have successfully logged in.",
    loginError: "Failed to log in. Please check your credentials.",
    signupSuccess: "Account created successfully! Welcome aboard.",
    signupError: "Failed to create account. Please try again.",
    logoutSuccess: "You have been logged out successfully.",
    sessionExpired: "Your session has expired. Please log in again.",
    unauthorized: "You must be logged in to access this page.",
    tokenRefreshError: "Failed to refresh session. Please log in again.",
  },

  birthChart: {
    createSuccess: "Birth chart created successfully!",
    createError: "Failed to create birth chart. Please try again.",
    deleteSuccess: "Birth chart deleted successfully.",
    deleteError: "Failed to delete birth chart. Please try again.",
    fetchError: "Failed to load birth charts. Please try again.",
    notFound: "Birth chart not found.",
    selectPrompt: "Select a birth chart to begin your reading.",
  },

  conversation: {
    createError: "Failed to start conversation. Please try again.",
    deleteSuccess: "Conversation deleted successfully.",
    deleteError: "Failed to delete conversation. Please try again.",
    fetchError: "Failed to load conversations. Please try again.",
    sendError: "Failed to send message. Please try again.",
  },

  subscription: {
    fetchError: "Failed to load subscription details.",
    checkoutError: "Failed to start checkout process.",
    cancelSuccess: "Your subscription has been cancelled.",
    cancelError: "Failed to cancel subscription. Please try again.",
    reactivateSuccess: "Your subscription has been reactivated!",
    reactivateError: "Failed to reactivate subscription. Please try again.",
    usageLimitReached: "You have reached your usage limit for this period.",
    upgradePrompt: "Upgrade your plan for unlimited readings.",
  },

  websocket: {
    connected: "Connected to assistant.",
    disconnected: "Disconnected from assistant.",
    reconnecting: "Reconnecting to assistant...",
    connectionError: "Failed to connect to assistant. Please refresh the page.",
    messageError: "Failed to send message. Please try again.",
  },

  errors: {
    generic: "Something went wrong. Please try again.",
    network: "Network error. Please check your connection.",
    notFound: "The requested resource was not found.",
    serverError: "Server error. Please try again later.",
    validation: "Please check your input and try again.",
    rateLimit: "Too many requests. Please wait a moment.",
  },

  loading: {
    generic: "Loading...",
    birthCharts: "Loading your birth charts...",
    conversations: "Loading conversations...",
    subscription: "Loading subscription details...",
    sending: "Sending...",
  },

  empty: {
    birthCharts: "You haven't created any birth charts yet.",
    conversations: "No conversations yet. Start a new reading!",
    results: "No results found.",
  },

  actions: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    confirm: "Confirm",
    retry: "Retry",
    close: "Close",
    submit: "Submit",
    continue: "Continue",
    goBack: "Go Back",
  },
} as const;

export type Messages = typeof MESSAGES;
