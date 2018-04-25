import API from './api'
/* *****
ACTIONS
***** */
const updateConfigAction = (update) => {
  return { type: 'UPDATE_SITE_SETTINGS', update }
}
//  THUNKS
export const updateConfig = (update, options) => {
  return function (dispatch) {
    //  Redux query updates must be nullified
    options.update = () => null
    dispatch(API.patch('settings', update, options))
    .then(({ body }) => {
      dispatch(updateConfigAction(body))
      console.warn('TOAST: Site settings updated!')
    })
    .catch(err => {
      console.error(err)
      console.warn('TOAST: Unable to update site settings')
    })
  }
}

/* *****
REDUCERS
For security purposes, the only way AuthN/Z data is retrieved
is from the server during rendering.
Our reducer here specifies expected data (initially none, so {} as default)
as well as means of deleting the user object.
***** */
export default function settings (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SITE_SETTINGS':
      return action.update
    default: return state
  }
}
