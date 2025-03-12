import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';
import LungOutlineMarkers from './LungOutlineMarkers';
import { useMarkers } from '@/context/markersContext';
import { KeySite } from '@/models/enums';

// Mapping from section name to key sites
const sectionMap: { [section: string]: KeySite[] } = {
  Front: [KeySite.QAID, KeySite.QAIG, KeySite.QASD, KeySite.QASG, KeySite.APXD, KeySite.APXG],
  Right: [KeySite.QLD, KeySite.QSLD],
  Back: [KeySite.QPID, KeySite.QPIG, KeySite.QPSD, KeySite.QPSG],
  Left: [KeySite.QLG, KeySite.QSLG],
};

// Mapping from section name to lung outline image
const lungImages: { [section: string]: any } = {
  Front: require('@/assets/images/torso-outline/torso-front-gray.png'),
  Right: require('@/assets/images/torso-outline/torso-right-gray.png'),
  Back: require('@/assets/images/torso-outline/torso-back-gray.png'),
  Left: require('@/assets/images/torso-outline/torso-left-gray.png'),
};

/**
 * The Protocol component displays a list of sections with lung images and markers.
 * Each section contains a title, a lung image, and markers on the image.
 * The markers can be pressed to select them.
 * @returns 
 */
const Protocol: React.FC = () => {
  const { markers } = useMarkers();

  // Create sections dynamically from the global markers
  const sections = Object.entries(sectionMap).map(([sectionTitle, keySites]) => ({
    title: sectionTitle.toString(),
    lungOutlineImage: lungImages[sectionTitle],
    markers: markers.filter(marker =>
      marker.keySite ? keySites.includes(marker.keySite) : false
    ),
  }));

  const row1 = sections.slice(0, 2);
  const row2 = sections.slice(2, 4);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {row1.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <LungOutlineMarkers
              markers={section.markers}
              lungOutlineImage={section.lungOutlineImage}
            />
          </View>
        ))}
      </View>
      {
        <View style={styles.row}>
          {row2.map(section => (
            <View key={section.title} style={styles.section}>
              <LungOutlineMarkers
                markers={section.markers}
                lungOutlineImage={section.lungOutlineImage}
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>

            </View>
          ))}
        </View>
      }
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 6,
    color: '#666666D0',
  },
});

export default Protocol;