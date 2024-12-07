import { API_BASE_URL } from "@/config";
import axios from "axios";
import { Provider } from "next-auth/providers/index";

const DjangoProvider: Provider = {
	id: "django-provider",
	name: "Django",
	type: "credentials",
	credentials: {
		email: { label: "Email", type: "email" },
		password: { label: "Password", type: "password" },
	},
	authorize: async (credentials, req: any): Promise<any> => {
		try {
			const response = await axios.post(`${API_BASE_URL}/accounts/login/`, {
				...credentials,
			});
			const {data } = response;
			return Promise.resolve(data);
		} catch (error:any) {
			console.log(error)
			if (error.response.data?.email || error.response.data?.password) {
				return Promise.reject(
					new Error(
						error.response.data.email || error.response.data.password
					)
				);
			}
			return Promise.reject(
				new Error(
					error.response.data?.error ||
						"Error Logging in"
				)
			);
		}
	},
};

export default DjangoProvider;
