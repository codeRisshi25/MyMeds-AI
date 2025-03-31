import { Tabs } from 'expo-router';
import { Chrome as Home, CirclePlus as PlusCircle, Calendar, User, Search } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
  const { colors } = useTheme();

  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    return null; // The redirect will be handled by the parent layout
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
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
      <Tabs.Screen 
      name='scan'
      options={{
        title: 'Scan',
        tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
      }}
      />
    </Tabs>
  );
}