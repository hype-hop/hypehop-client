import checkUserFromServerComponent from '../user/checkUserFromServerComponent';

export default async function MyInformationLayout({ children }) {
  await checkUserFromServerComponent(null);
  return <div>{children}</div>;
}
