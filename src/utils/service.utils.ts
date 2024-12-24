import bcrypt from 'bcrypt';

export async function hash(content: string, saltLenth = 10): Promise<string> {
  return await bcrypt.hash(content, saltLenth);
}

// 0x14eeae1f0000000000000000000000002817a5041ce4ba834d657468136d5867821975ee
//                                 0x2817a5041ce4ba834d657468136d5867821975ee

// 0x14eeae1f00000000000000000000000000ab6ce9f46af89b6c28cd7666ae9cdca9b29575
//                                 0x00ab6ce9f46af89b6c28cd7666ae9cdca9b29575
