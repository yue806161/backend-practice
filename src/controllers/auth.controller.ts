import { Request, Response } from 'express';

export async function signIn(req: Request, res: Response) {}
export async function signOut(req: Request, res: Response) {}
export async function signOutAll(req: Request, res: Response) {}

export async function refreshToken(req: Request, res: Response) {}
export async function revokeToken(req: Request, res: Response) {}

export async function changePassword(req: Request, res: Response) {}

export async function verifyEmail(req: Request, res: Response) {}
export async function resendVerificationEmail(req: Request, res: Response) {}

export async function getOauthProviders(req: Request, res: Response) {}
export async function oauthSignIn(req: Request, res: Response) {}
export async function oauthCallback(req: Request, res: Response) {}

export async function getLogin(req: Request, res: Response) {}
export async function getLoginSuspicious(req: Request, res: Response) {}
