import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO, useSignIn } from "@clerk/clerk-expo";


export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        }
    }
    , []);
}

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    // WarmUp Browser for the Google Sign in
    useWarmUpBrowser();
    const { startSSOFlow } = useSSO();
    const { colors } = useTheme();
    const [error, setError] = useState('');

    const googleLogin = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_google",
                redirectUrl: AuthSession.makeRedirectUri(),
            });
            if (createdSessionId) {
                if (setActive) {
                    setActive({ session: createdSessionId });
                }
            } else {

            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const microsoftLogin = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_microsoft",
                redirectUrl: AuthSession.makeRedirectUri(),
            });
            if (createdSessionId) {
                if (setActive) {
                    setActive({ session: createdSessionId });
                }
            }
            else {
            }
        } catch (err) {
            console.error(err);
        }
    }, []);
    const githubLogin = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: "oauth_github",
                redirectUrl: AuthSession.makeRedirectUri(),
            });
            if (createdSessionId) {
                if (setActive) {
                    setActive({ session: createdSessionId });
                }
            }
            else {
            }
        } catch (err) {
            console.error(err);
        }
    }, []);


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop' }}
                    style={styles.logo}
                />
                <Text style={[styles.title, { color: '#000' }]}>MyMeds</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Your personal medication assistant
                </Text>
            </View>

            {error ? (
                <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
            ) : null}
            <View style={styles.form}>
                <TouchableOpacity
                    style={[styles.googleButton, { backgroundColor: colors.primary }]}
                    onPress={googleLogin}
                >
                    <Image
                        source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                        style={styles.googleIcon}
                    />
                    <Text style={[styles.googleButtonText, { color: colors.text }]}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <TouchableOpacity
                    style={[styles.googleButton, { backgroundColor: colors.primary }]}
                    onPress={githubLogin}
                >
                    <Image
                        source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
                        style={styles.googleIcon}
                    />
                    <Text style={[styles.googleButtonText, { color: colors.text }]}>
                        Continue with GitHub
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <TouchableOpacity
                    style={[styles.googleButton, { backgroundColor: colors.primary }]}
                    onPress={microsoftLogin}
                >
                    <Image
                        source={require('@/assets/images/msoft.png')}
                        style={styles.googleIcon}
                    />
                    <Text style={[styles.googleButtonText, { color: colors.text }]}>
                        Continue with Microsoft
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.privacyText, { color: colors.textSecondary }]}>
                By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter_700Bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
    error: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginBottom: 16,
    },
    form: {
        gap: 16,
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    signInButton: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        height: 55,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    googleButtonText: {
        fontSize: 16,
        fontFamily: 'Inter_500Medium',
    },
    footerText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginBottom: 16,
    },
    privacyText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
    },
});