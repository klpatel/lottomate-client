export const AppConstants = {
    // local storeage constants
    USER_TOKEN: 'userToken' as const,
    USER_INFO: 'userInfo' as const,
  
    EMAIL_FORMAT: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
    PASSWORD_FORMAT: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$*&])[A-Za-z0-9\\d@#$*&].{7,15}',
  
    // User interface constants
    WARNIGN_ERROR_MESSAGE: 'Something went wrong! Please reload the page.' as const,
    TEXT_FIELD_EMAIL_LABEL: 'Email' as const,
    TEXT_FIELD_EMAIL_PLACEHOLDER: 'Ex. username@domain.com' as const,
    TEXT_FIELD_EMAIL_ERROR_REQUIRED: 'Email is <strong>required</strong>' as const,
    TEXT_FIELD_EMAIL_ERROR_INVALID: 'Please enter a valid email address' as const,
    TEXT_FIELD_PASSWORD_LABEL: 'Password' as const,
    TEXT_FIELD_PASSWORD_ERROR_REQUIRED: 'Password is <strong>required</strong>' as const,
    TEXT_FIELD_PASSWORD_ERROR_INVALID: 'At leas one Upper and Lower case letter, one Number, one special character (@#$*&) and 8-16 characters' as const,
  
  };