import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Camera, Clock, Pill } from 'lucide-react-native';
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const upcomingMedications = [
    { id: 1, name: 'Paracetamol', dosage: '500mg', time: '9:00 AM' },
    { id: 2, name: 'Aspirin', dosage: '300mg', time: '12:00 PM' },
    { id: 3, name: 'Metformin', dosage: '850mg', time: '6:00 PM' },
    { id: 4, name: 'Lisinopril', dosage: '10mg', time: '8:00 AM' },
    { id: 5, name: 'Atorvastatin', dosage: '20mg', time: '10:00 PM' },
    { id: 6, name: 'Omeprazole', dosage: '40mg', time: '7:00 AM' },
    { id: 7, name: 'Losartan', dosage: '50mg', time: '5:00 PM' },
    { id: 8, name: 'Simvastatin', dosage: '10mg', time: '9:00 PM' },
    { id: 9, name: 'Levothyroxine', dosage: '75mcg', time: '6:30 AM' },
  ].sort(() => Math.random() - 0.5);
  const time = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12 && currentHour > 6) {
      return ' Morning';
    } else if (currentHour < 18 && currentHour >= 12) {
      return ' Afternoon';
    } else {
      return ' Evening';
    }
  }
  const {user} = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.greetingWrapper}>
      </View>
      <Text style={styles.greeting}>Good{time()}, {user?.firstName}</Text>
      <View style={styles.todaySection}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <ScrollView style={styles.medicationList}>
          {upcomingMedications.map((med) => (
            <View key={med.id} style={styles.medicationCard}>
              <View style={styles.medicationInfo}>
                <Pill size={24} color="#0891b2" />
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDosage}>{med.dosage}</Text>
                </View>
              </View>
              <View style={styles.timeContainer}>
                <Clock size={16} color="#666" />
                <Text style={styles.timeText}>{med.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={() => router.push('/(tabs)/scan')}>
        <>
          <Text style={styles.scanButtonText}>Scan New Prescription </Text>
        </>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  greetingWrapper: {
    backgroundColor: '#0891b2',
    padding: 2,
    zIndex: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1a1a1a',
    marginTop: 60,
    marginBottom: 30,
  },
  todaySection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  medicationList: {
    flex: 1,
  },
  medicationCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationDetails: {
    marginLeft: 12,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#1a1a1a',
  },
  medicationDosage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginTop: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#0891b2',
  },
  scanButton: {
    backgroundColor: '#0891b2',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});