import { IStorage } from './storage';
import { ITransport } from './transport';

export type AuthCredentials = {
	email: string;
	password: string;
	otp?: string;
};

export type AuthToken = string;

export type AuthResultType = 'DynamicToken' | 'StaticToken' | null;

export type AuthResult = {
	access_token: string;
	expires: number;
	refresh_token?: string;
};

export type AuthMode = 'json' | 'cookie';

export type AuthOptions = {
	mode?: AuthMode;
	autoRefresh?: boolean;
	msRefreshBeforeExpires?: number;
	staticToken?: string;
	transport: ITransport;
	storage: IStorage;
};

export abstract class IAuth {
	abstract readonly token: string | null;

	abstract login(credentials: AuthCredentials): Promise<AuthResult>;
	abstract refresh(): Promise<AuthResult | false>;
	abstract static(token: AuthToken): Promise<boolean>;
	abstract logout(): Promise<void>;
}
