import { View, Text, StyleSheet } from 'react-native';

export default function TicketsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tickets Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCF9F3' },
  text: { fontSize: 18, fontWeight: 'bold' }
});
