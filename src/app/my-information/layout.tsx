import checkUserFromServerComponent from '../user/checkUserFromServerComponent';

export default async function MyInformationLayout({ children }) {
  await checkUserFromServerComponent();
  return <div>{children}</div>;
}
