import { updateUser } from '../apis/userApi';

export const updateUserData = (userId: string, data: any) => {
    console.log(userId , data);
    
 return  async (dispatch: any, getState: any) => {
    try {
      const state = getState();
      const token = state.auth.token;
      dispatch({ type: 'UPDATE_USER_DATA_REQUEST' });
      const response = await updateUser(token, userId, data);
      dispatch({ type: 'UPDATE_USER_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      dispatch({ type: 'UPDATE_USER_DATA_FAILURE', payload: errorMessage });
    }
  };
};
