import { connection } from 'next/server';
import LogInForm from '../../components/sign/LogInForm';

async function LoginPage() {
  await connection();

  return <LogInForm />;
}

export default LoginPage;
