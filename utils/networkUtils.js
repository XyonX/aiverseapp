export const checkInternetConnection = async () => {
  try {
    const response = await fetch('/api/ping');
    return response.ok;
  } catch (error) {
    return navigator.onLine;
  }
};

export const getErrorMessage = (error) => {
  if (error.code) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/user-disabled':
        return 'This account has been disabled';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed';
      default:
        return error.message || 'An unexpected error occurred';
    }
  }
  return error.message || 'An unexpected error occurred';
}; 