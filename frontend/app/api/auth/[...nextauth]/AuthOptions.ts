import { SessionStrategy } from "next-auth";
import DjangoProvider from "./DjangoProvider";

function getExpirationDate(exp: number) {
	const expirationTime = exp * 1000; // Convert from seconds to milliseconds
	return new Date(expirationTime);
}

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		DjangoProvider,
	],
	callbacks: {
		async signIn({ user, account }: any) {
			if (account && user) {
				return true;
			}
		},
		async jwt({ token, user }:any) {
			// Persist the OAuth access_token to the token right after signin
			// Initial sign in
			if (user) {
				token.accessToken = user.token;
				token.user = user.user;
				token.accessTokenExpires = user.exp;
			}
			return token;
		},
		async session({ session, token }:any) {
			// Send properties to the client, like an access_token from a provider.
			if (token) {
				session.user = token.user;
				session.accessToken = token.accessToken;
			}
			// pass error when token has expired
			if (
				Date.now() >
				(
					getExpirationDate(token?.accessTokenExpires) ||
					session.expires
				)?.getTime()
			) {
				session.error =
					"Your session has expired. Please log in again.";
			}

			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	session: {
		strategy: "jwt" as SessionStrategy,
		maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
	},
};
