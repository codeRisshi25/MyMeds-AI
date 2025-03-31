import { useEffect } from 'react';
import { Stack, useRouter, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { ThemeProvider } from '@/context/ThemeContext';
import { View, ActivityIndicator } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
  useFrameworkReady();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ThemeProvider>
          <AuthStateHandler />
          <StatusBar style="light" />
        </ThemeProvider>
      </ClerkProvider>
    </View>
  );
}

function AuthStateHandler() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
      </SignedOut>
    </>
  );
}