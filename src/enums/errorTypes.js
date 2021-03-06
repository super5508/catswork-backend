const ErrorTypes = {
  NOT_FOUND: "404/not-found",
  MISSING_TOKEN: "422/missing-token",
  EMAIL_EXISTS: "422/email-exists",
  USERNAME_EXISTS: "422/username-exists",
  USER_VERFIED: "422/user-already-verified",
  USER_NOT_FOUND: "404/user-not-found",
  INVALID_LOGIN: "401/invalid-login",
  INCORRECT_PASSWORD: "401/incorrect-password",
  UNVERIFIED_EMAIL: "401/unverified-email",
  AUTHENTICATION_OTP_MESSSGE_PROBLEM: '500/unable-to-send-authentication-message',
  SQL_ERROR: `500/problem-crating-new-user`, 
  INCORRECT_OTP: '400/Incorrect-otp-entered',
  USER_INFO_EXSIST: '422/user-info-already-exsist',
  MISSING_PARAMETER: `422/missing-parameter` // Can't add new user, edit user
}

module.exports = ErrorTypes