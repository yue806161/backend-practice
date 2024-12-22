import { z } from "zod";


export interface IAuth {
    user_id: string;
    email: string;
    refresh_token_hash: string;
    expire_at: Date;
    status: 'active'|'revoked';
    created_at: Date;
    updated_at: Date;
}


export const AuthSchema = z.object({
    user_id: z.string(),
    email: z.string().email(),
    refresh_token_hash: z.string(),
    expire_at: z.date(),
    status: z.enum(['active','revoked']),
    created_at: z.date(),
    updated_at: z.date(),
})