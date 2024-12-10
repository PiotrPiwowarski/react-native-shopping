import {create} from 'zustand';

const useStore = create((set) => ({
    baseUrl: 'http://192.168.100.133:8080',

    handleLogoutButton: async (navigation) => {
		try {
			const token = await AsyncStorage.getItem('jwtToken');
			await axios.post(
				`${useStore.getState().baseUrl}/api/users/logout`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			await AsyncStorage.removeItem('jwtToken');
			navigation.navigate('Home');
		} catch (error) {
			console.error('Błąd wylogowania', error);
		}
	}
}));

export default useStore;