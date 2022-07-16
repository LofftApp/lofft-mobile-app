export const authError = error => {
  switch (error) {
    case 'auth/email-already-in-use':
      return {
        type: 'Error',
        message: 'This e-mail is already registered',
      };
    case 'auth/invalid-email':
      return {type: 'Error', message: 'Please use a valid e-mail'};
    case 'auth/wrong-password':
      return {type: 'Error', message: 'Wrong password entered'};
    default:
      return {type: 'Error', message: 'Something went wrong'};
  }
};
