'use server';

import { redirect } from 'next/navigation';
import BASE_URL from '../../config';

export default async function loginAction(prevState: { message: string }, formData: FormData, callBackUrl: string) {
  try {
    const email = formData.get('email') as string;
    console.log(email);
    const password = formData.get('password') as string;

    const result = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!result.ok) {
      return { message: 'API 호출 실패' };
    }

    redirect(callBackUrl || '/');
    return { message: '성공' };
  } catch (error) {
    return { message: '이메일 혹은 비밀번호가 잘못되었습니다.' };
  }
}
