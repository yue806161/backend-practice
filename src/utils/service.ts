import bcrypt from 'bcrypt';

export async function hash(content: string, saltLenth = 10): Promise<string> {
  return await bcrypt.hash(content, saltLenth);
}
