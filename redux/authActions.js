

const createAction = (type) => (payload) => ({ type, payload });

export const setUsername = createAction("SET_USERNAME");
export const setPassword = createAction("SET_PASSWORD");
export const setCaptcha = createAction("SET_CAPTCHA");
export const setInputCaptcha = createAction("SET_INPUT_CAPTCHA");
export const setErrorMessage = createAction("SET_ERROR_MESSAGE");

export const setSignupUsername = createAction("SET_SIGNUP_USERNAME");
export const setSignupEmail = createAction("SET_SIGNUP_EMAIL");
export const setSignupPassword = createAction("SET_SIGNUP_PASSWORD");
export const setSignupErrorMessage = createAction("SET_SIGNUP_ERROR_MESSAGE");

export const saveUserData = createAction("SAVE_USER_DATA");
