import AuthProvider from '@/components/feature/AuthProvider';

const AuthTemplate = ({ children }: StrictPropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthTemplate;
