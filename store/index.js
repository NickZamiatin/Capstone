const initialState = {
  login: false,
  singup: false,
  email: '',
  password: null,
  passwordConfirm: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        login: true
      }
    case 'SIGNUP':
      return {
        ...state,
        singup: true
      }
    case 'EMAIL':
      return {
        ...state,
        email: action.email
      }
    case 'PASSWORD':
      return {
        ...state,
        password: action.password
      }
    case 'PASSWORDCONFIRM':
      return {
        ...state,
        passwordConfirm: action.passwordConfirm
      }
  }

  return state
}

export default reducer;