import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type SeatStatus = 'available' | 'reserved';
type SectionType = 'standard' | 'prime' | 'vip';

interface Seat {
  id: string; // e.g., 'A1'
  row: string;
  number: number | 'R';
  status: SeatStatus;
}

interface RowConfig {
  row: string;
  left: (number | 'R')[];
  middle: (number | 'R')[];
  right: (number | 'R')[];
}

const SECTIONS: { title: string; price: number; type: SectionType; rows: RowConfig[] }[] = [
  {
    title: 'Standard Seats',
    price: 14.50,
    type: 'standard',
    rows: [
      { row: 'A', left: [1,2,3], middle: [4,'R','R',7], right: [8,9,10] },
      { row: 'B', left: [1,2,3], middle: [4,5,6,7], right: [8,'R',10] },
      { row: 'C', left: [1,2,3], middle: [4,5,6,7], right: [8,9,10] },
    ]
  },
  {
    title: 'Prime Zone (Optimal View)',
    price: 18.00,
    type: 'prime',
    rows: [
      { row: 'D', left: [1,2,3], middle: ['R','R',6,7], right: [8,9,10] },
      { row: 'E', left: [1,2,3], middle: [4,5,6,7], right: [8,9,10] },
      { row: 'F', left: [1,2,3], middle: [4,5,6,7], right: [8,9,10] },
    ]
  },
  {
    title: 'VIP Recliners (Spacious)',
    price: 22.00,
    type: 'vip',
    rows: [
      { row: 'G', left: [1,2], middle: [3,4,5,6], right: ['R','R'] },
      { row: 'H', left: [1,2], middle: [3,4,5,6], right: [7,8] },
    ]
  }
];

export default function SelectSeatsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Initialize with F6 and F7 selected
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['F6', 'F7']);
  
  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const getSeatPrice = (seatId: string) => {
    const row = seatId.charAt(0);
    if (['A','B','C'].includes(row)) return 14.50;
    if (['D','E','F'].includes(row)) return 18.00;
    if (['G','H'].includes(row)) return 22.00;
    return 14.50;
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + getSeatPrice(seat), 0);
  }, [selectedSeats]);

  const renderSeat = (row: string, val: number | 'R', type: SectionType) => {
    if (val === 'R') {
      return (
        <View key={`${row}-R`} style={styles.seatReserved}>
          <Text style={styles.seatReservedText}>✕</Text>
        </View>
      );
    }
    
    const seatId = `${row}${val}`;
    const isSelected = selectedSeats.includes(seatId);
    
    let baseSeatStyle = styles.seatAvailable;
    let baseTextStyle = styles.seatAvailableText;
    
    if (type === 'vip') {
      baseSeatStyle = styles.seatVip;
      baseTextStyle = styles.seatVipText;
    } else if (type === 'prime') {
      baseSeatStyle = styles.seatPrime;
      baseTextStyle = styles.seatPrimeText;
    }

    return (
      <TouchableOpacity 
        key={seatId} 
        style={[
          styles.seatBase, 
          baseSeatStyle, 
          isSelected && styles.seatSelected
        ]}
        onPress={() => toggleSeat(seatId)}
        activeOpacity={0.7}
      >
        <Text style={[baseTextStyle, isSelected && styles.seatSelectedText]}>
          {isSelected ? val : val}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={20} color="#1c1c18" />
            </TouchableOpacity>
            <View style={styles.headerTitleCol}>
              <Text style={styles.headerTitle}>Choose Your Spot</Text>
              <View style={styles.headerSubtitleRow}>
                <Text style={styles.headerSubtitleText}>Neo Tokyo 2099</Text>
                <Text style={styles.headerSubtitleDot}>•</Text>
                <Text style={styles.headerSubtitleText}>Audi 04</Text>
              </View>
            </View>
          </View>
          <View style={styles.profileBtn}>
            <MaterialIcons name="face" size={20} color="#994700" />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Movie Ribbon */}
        <View style={styles.ribbonCard}>
          <View style={styles.ribbonTop}>
            <View style={styles.ribbonTitleRow}>
              <Text style={styles.ribbonTitle}>Neo Tokyo 2099</Text>
              <View style={styles.ribbonPgBadge}>
                <Text style={styles.ribbonPgText}>PG-13</Text>
              </View>
            </View>
            <View style={styles.ribbonScore}>
              <MaterialIcons name="star" size={14} color="#b27b00" />
              <Text style={styles.ribbonScoreText}>9.4</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsScroll}>
            <View style={styles.tagOrange}>
              <MaterialIcons name="videocam" size={12} color="#9a3412" />
              <Text style={styles.tagOrangeText}>IMAX 3D</Text>
            </View>
            <View style={styles.tagMuted}>
              <MaterialIcons name="meeting-room" size={12} color="#584235" />
              <Text style={styles.tagMutedText}>Audi 04</Text>
            </View>
            <View style={styles.tagMuted}>
              <MaterialIcons name="schedule" size={12} color="#584235" />
              <Text style={styles.tagMutedText}>Today 20:30</Text>
            </View>
            <View style={styles.tagBlue}>
              <Text style={styles.tagBlueText}>Dolby Atmos</Text>
            </View>
          </ScrollView>
        </View>

        {/* Screen Arc Simulation */}
        <View style={styles.screenWrap}>
          <View style={styles.screenArcContainer}>
            <View style={styles.screenArc} />
          </View>
          <View style={styles.screenLabelWrap}>
            <Text style={styles.screenLabel}>CINEMA SCREEN</Text>
          </View>
        </View>

        {/* Status Legend */}
        <View style={styles.legendWrap}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotAvailable]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotSelected]} />
            <Text style={styles.legendTextDark}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={styles.legendDotReserved}><Text style={styles.legendDotReservedText}>✕</Text></View>
            <Text style={styles.legendTextReserved}>Reserved</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.legendDotVip]} />
            <Text style={styles.legendTextVip}>VIP ($22)</Text>
          </View>
        </View>

        {/* Interactive Matrix */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.matrixContainer}>
            {SECTIONS.map((section, idx) => (
              <View 
                key={section.type} 
                style={[
                  styles.sectionBox,
                  section.type === 'standard' && styles.sectionBoxStandard,
                  section.type === 'prime' && styles.sectionBoxPrime,
                  section.type === 'vip' && styles.sectionBoxVip,
                ]}
              >
                <View style={styles.sectionHeader}>
                  <Text style={[
                    styles.sectionHeaderTitle,
                    section.type === 'standard' && { color: '#78716c' },
                    section.type === 'prime' && { color: '#994700' },
                    section.type === 'vip' && { color: '#7e22ce' },
                  ]}>
                    {section.title}
                  </Text>
                  <Text style={[
                    styles.sectionHeaderPrice,
                    section.type === 'standard' && { color: '#57534e' },
                    section.type === 'prime' && { color: '#994700' },
                    section.type === 'vip' && { color: '#7e22ce' },
                  ]}>
                    ${section.price.toFixed(2)}
                  </Text>
                </View>

                {section.rows.map(row => (
                  <View key={row.row} style={styles.matrixRow}>
                    <Text style={[styles.rowLabel, { color: section.type === 'prime' ? '#bfa094' : section.type === 'vip' ? '#c084fc' : '#a8a29e' }]}>{row.row}</Text>
                    
                    <View style={styles.seatGroup}>
                      {row.left.map((val, i) => <View key={`${row.row}-l-${i}`}>{renderSeat(row.row, val, section.type)}</View>)}
                    </View>
                    
                    <View style={styles.aisle} />
                    
                    <View style={styles.seatGroup}>
                      {row.middle.map((val, i) => <View key={`${row.row}-m-${i}`}>{renderSeat(row.row, val, section.type)}</View>)}
                    </View>
                    
                    <View style={styles.aisle} />
                    
                    <View style={styles.seatGroup}>
                      {row.right.map((val, i) => <View key={`${row.row}-r-${i}`}>{renderSeat(row.row, val, section.type)}</View>)}
                    </View>

                    <Text style={[styles.rowLabel, { color: section.type === 'prime' ? '#bfa094' : section.type === 'vip' ? '#c084fc' : '#a8a29e' }]}>{row.row}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Selected Seats Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View style={styles.summaryTopLeft}>
              <View style={styles.summaryIconWrap}>
                <MaterialIcons name="event-seat" size={14} color="#994700" />
              </View>
              <Text style={styles.summaryTitle}>Selected Seats</Text>
            </View>
            <View style={styles.summaryBadge}>
              <Text style={styles.summaryBadgeText}>{selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Selected</Text>
            </View>
          </View>
          
          <View style={styles.chipsWrap}>
            {selectedSeats.length === 0 ? (
              <Text style={styles.noSeatsText}>Tap any available seat to choose your spot.</Text>
            ) : (
              selectedSeats.map(seat => (
                <View key={seat} style={styles.seatChip}>
                  <Text style={styles.seatChipText}>Row {seat.charAt(0)} • Seat {seat.substring(1)}</Text>
                  <Text style={styles.seatChipPrice}>${getSeatPrice(seat).toFixed(2)}</Text>
                </View>
              ))
            )}
          </View>
          
          {selectedSeats.length > 0 && (
            <View style={styles.summaryFooter}>
              <View style={styles.timerRow}>
                <MaterialIcons name="schedule" size={14} color="#ff7a00" />
                <Text style={styles.timerText}>Reserved for <Text style={styles.timerTextBold}>09:48</Text></Text>
              </View>
              <View style={styles.primeViewRow}>
                <MaterialIcons name="verified" size={12} color="#525e7f" />
                <Text style={styles.primeViewText}>Prime Central View</Text>
              </View>
            </View>
          )}
        </View>

        {/* Concessions Micro-banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoLeft}>
            <View style={styles.promoIconWrap}>
              <MaterialIcons name="fastfood" size={20} color="#ff7a00" />
            </View>
            <View>
              <Text style={styles.promoTitle}>Combo Duo Deluxe</Text>
              <Text style={styles.promoSub}>Large Warm Popcorn + 2 Sodas</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.promoBtn}>
            <Text style={styles.promoBtnText}>+ $12.00</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomCta, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.bottomPriceCol}>
          <Text style={styles.bottomPriceLabel}>Total Price</Text>
          <Text style={styles.bottomPriceValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.continueBtn} activeOpacity={0.8} onPress={() => router.push('/(tabs)/snacks')}>
          <Text style={styles.continueBtnText}>Continue to Snacks</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f3',
  },
  safeHeader: {
    backgroundColor: 'rgba(252, 249, 243, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(235, 232, 226, 0.6)',
    zIndex: 50,
  },
  headerRow: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f6f3ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1c1c18',
    letterSpacing: -0.5,
  },
  headerSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerSubtitleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#584235',
  },
  headerSubtitleDot: {
    color: '#e0c0af',
    fontSize: 12,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffeedd',
    borderWidth: 1,
    borderColor: '#ffdbc8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 12,
  },
  // Ribbon
  ribbonCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(224, 192, 175, 0.3)',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ribbonTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ribbonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ribbonTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1c1c18',
    letterSpacing: -0.5,
  },
  ribbonPgBadge: {
    backgroundColor: '#f5efe6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  ribbonPgText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#584235',
  },
  ribbonScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff8e7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ffe4a0',
  },
  ribbonScoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#b27b00',
  },
  tagsScroll: {
    gap: 8,
  },
  tagOrange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ffedd5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagOrangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9a3412',
  },
  tagMuted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0eee8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagMutedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#584235',
  },
  tagBlue: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagBlueText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369a1',
  },
  // Screen
  screenWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  screenArcContainer: {
    width: 320,
    height: 28,
    overflow: 'hidden',
    alignItems: 'center',
  },
  screenArc: {
    width: 400,
    height: 200,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: 'rgba(255, 122, 0, 0.7)',
    position: 'absolute',
    top: 10, // Moves the circle down so we only see the top arc
  },
  screenLabelWrap: {
    backgroundColor: '#ffedd5',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
    marginTop: -4,
  },
  screenLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#994700',
  },
  // Legend
  legendWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#f6f3ed',
    borderWidth: 1,
    borderColor: 'rgba(224, 192, 175, 0.3)',
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendDotAvailable: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#d6d3d1',
  },
  legendDotSelected: {
    backgroundColor: '#ff7a00',
  },
  legendDotReserved: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#e7e5e4',
    borderWidth: 1,
    borderColor: '#d6d3d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendDotReservedText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#a8a29e',
  },
  legendDotVip: {
    backgroundColor: '#f3e8ff',
    borderWidth: 2,
    borderColor: '#9333ea',
  },
  legendText: { fontSize: 12, fontWeight: '600', color: '#584235' },
  legendTextDark: { fontSize: 12, fontWeight: '700', color: '#1c1c18' },
  legendTextReserved: { fontSize: 12, fontWeight: '600', color: '#a8a29e' },
  legendTextVip: { fontSize: 12, fontWeight: '700', color: '#7e22ce' },
  // Matrix
  matrixContainer: {
    paddingHorizontal: 16,
    gap: 16,
    minWidth: 360,
  },
  sectionBox: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  sectionBoxStandard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(224, 192, 175, 0.2)',
  },
  sectionBoxPrime: {
    backgroundColor: '#fffbf7',
    borderColor: '#ffdbc8',
  },
  sectionBoxVip: {
    backgroundColor: '#faf5ff',
    borderColor: '#e9d5ff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionHeaderPrice: {
    fontSize: 12,
    fontWeight: '700',
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  rowLabel: {
    width: 16,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '700',
  },
  seatGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  aisle: {
    width: 10,
  },
  seatBase: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatAvailable: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  seatAvailableText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#57534e',
  },
  seatPrime: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0ded5',
  },
  seatPrimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#44403c',
  },
  seatVip: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#d8b4fe',
  },
  seatVipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7e22ce',
  },
  seatSelected: {
    backgroundColor: '#ff7a00',
    borderWidth: 0,
    transform: [{ scale: 1.05 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  seatSelectedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  seatReserved: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#e7e5e4',
    borderWidth: 1,
    borderColor: '#d6d3d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatReservedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#a8a29e',
  },
  // Summary Card
  summaryCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(224, 192, 175, 0.3)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffeedd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#584235',
    letterSpacing: 0.5,
  },
  summaryBadge: {
    backgroundColor: '#ffedd5',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
  },
  summaryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9a3412',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noSeatsText: {
    fontSize: 12,
    color: '#78716c',
    fontStyle: 'italic',
  },
  seatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f6f3ed',
    borderWidth: 1,
    borderColor: 'rgba(224, 192, 175, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  seatChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1c1c18',
  },
  seatChipPrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ff7a00',
  },
  summaryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0eee8',
    paddingTop: 8,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerText: {
    fontSize: 12,
    color: '#584235',
  },
  timerTextBold: {
    fontWeight: '700',
    color: '#1c1c18',
  },
  primeViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  primeViewText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#525e7f',
  },
  // Promo
  promoBanner: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: '#ffedd5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1c18',
  },
  promoSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#584235',
  },
  promoBtn: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#fdba74',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  promoBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#994700',
  },
  // Bottom CTA
  bottomCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(252, 249, 243, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(224, 192, 175, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomPriceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#584235',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bottomPriceValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1c1c18',
  },
  continueBtn: {
    flex: 1,
    marginLeft: 16,
    maxWidth: 220,
    height: 48,
    backgroundColor: '#ff7a00',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
});
