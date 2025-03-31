import { Tabs } from 'expo-router';
import { Home, CirclePlus as PlusCircle, Calendar, User, Search } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0, // Remove the white line
          elevation: 0, // Remove shadow on Android
          height: 60,

        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
        <Tabs.Screen
          name='scan'
          options={{
            title: 'Scan',
            tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
          }}
        />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}