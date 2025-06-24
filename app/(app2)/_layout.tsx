import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./utils/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
  </AuthProvider>
  );
}
