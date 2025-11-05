import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user and token
export const storeUserData = async (user, token) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error saving data', error);
  }
};


export const getUserData = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const token = await AsyncStorage.getItem('token');
    console.log(user,token)
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  } catch (error) {
    console.error('Error getting data', error);
    return { user: null, token: null };
  }
};
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing data', error);
  }
};
