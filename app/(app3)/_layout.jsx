import { Stack } from 'expo-router';

export default function App3Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false, 
        }}
      />
      </Stack>
  );
}