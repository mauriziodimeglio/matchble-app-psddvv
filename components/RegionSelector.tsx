
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

interface RegionSelectorProps {
  selectedRegion: string;
  selectedProvince: string;
  onRegionSelect: (region: string) => void;
  onProvinceSelect: (province: string) => void;
  error?: string;
}

const italianRegions = [
  {
    name: 'Abruzzo',
    provinces: ['Chieti', 'L&apos;Aquila', 'Pescara', 'Teramo']
  },
  {
    name: 'Basilicata',
    provinces: ['Matera', 'Potenza']
  },
  {
    name: 'Calabria',
    provinces: ['Catanzaro', 'Cosenza', 'Crotone', 'Reggio Calabria', 'Vibo Valentia']
  },
  {
    name: 'Campania',
    provinces: ['Avellino', 'Benevento', 'Caserta', 'Napoli', 'Salerno']
  },
  {
    name: 'Emilia-Romagna',
    provinces: ['Bologna', 'Ferrara', 'Forlì-Cesena', 'Modena', 'Parma', 'Piacenza', 'Ravenna', 'Reggio Emilia', 'Rimini']
  },
  {
    name: 'Friuli-Venezia Giulia',
    provinces: ['Gorizia', 'Pordenone', 'Trieste', 'Udine']
  },
  {
    name: 'Lazio',
    provinces: ['Frosinone', 'Latina', 'Rieti', 'Roma', 'Viterbo']
  },
  {
    name: 'Liguria',
    provinces: ['Genova', 'Imperia', 'La Spezia', 'Savona']
  },
  {
    name: 'Lombardia',
    provinces: ['Bergamo', 'Brescia', 'Como', 'Cremona', 'Lecco', 'Lodi', 'Mantova', 'Milano', 'Monza e Brianza', 'Pavia', 'Sondrio', 'Varese']
  },
  {
    name: 'Marche',
    provinces: ['Ancona', 'Ascoli Piceno', 'Fermo', 'Macerata', 'Pesaro e Urbino']
  },
  {
    name: 'Molise',
    provinces: ['Campobasso', 'Isernia']
  },
  {
    name: 'Piemonte',
    provinces: ['Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Torino', 'Verbano-Cusio-Ossola', 'Vercelli']
  },
  {
    name: 'Puglia',
    provinces: ['Bari', 'Barletta-Andria-Trani', 'Brindisi', 'Foggia', 'Lecce', 'Taranto']
  },
  {
    name: 'Sardegna',
    provinces: ['Cagliari', 'Nuoro', 'Oristano', 'Sassari', 'Sud Sardegna']
  },
  {
    name: 'Sicilia',
    provinces: ['Agrigento', 'Caltanissetta', 'Catania', 'Enna', 'Messina', 'Palermo', 'Ragusa', 'Siracusa', 'Trapani']
  },
  {
    name: 'Toscana',
    provinces: ['Arezzo', 'Firenze', 'Grosseto', 'Livorno', 'Lucca', 'Massa-Carrara', 'Pisa', 'Pistoia', 'Prato', 'Siena']
  },
  {
    name: 'Trentino-Alto Adige',
    provinces: ['Bolzano', 'Trento']
  },
  {
    name: 'Umbria',
    provinces: ['Perugia', 'Terni']
  },
  {
    name: 'Valle d&apos;Aosta',
    provinces: ['Aosta']
  },
  {
    name: 'Veneto',
    provinces: ['Belluno', 'Padova', 'Rovigo', 'Treviso', 'Venezia', 'Verona', 'Vicenza']
  },
];

export default function RegionSelector({ selectedRegion, selectedProvince, onRegionSelect, onProvinceSelect, error }: RegionSelectorProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const filteredRegions = italianRegions.filter(region => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return region.name.toLowerCase().includes(query) ||
           region.provinces.some(p => p.toLowerCase().includes(query));
  });

  const handleRegionSelect = (regionName: string) => {
    onRegionSelect(regionName);
    setExpandedRegion(regionName);
  };

  const handleProvinceSelect = (provinceName: string) => {
    onProvinceSelect(provinceName);
    setShowModal(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Regione e Provincia</Text>
      
      <TouchableOpacity
        style={[styles.selector, error && styles.selectorError]}
        onPress={() => setShowModal(true)}
      >
        <View style={styles.selectorContent}>
          <IconSymbol
            ios_icon_name="map.fill"
            android_material_icon_name="map"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.selectorText}>
            {selectedRegion && selectedProvince
              ? `${selectedProvince}, ${selectedRegion}`
              : selectedRegion
              ? selectedRegion
              : 'Seleziona regione e provincia'}
          </Text>
        </View>
        <IconSymbol
          ios_icon_name="chevron.right"
          android_material_icon_name="chevron_right"
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleziona Regione e Provincia</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeButton}>
              <IconSymbol
                ios_icon_name="xmark.circle.fill"
                android_material_icon_name="cancel"
                size={28}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <IconSymbol
              ios_icon_name="magnifyingglass"
              android_material_icon_name="search"
              size={20}
              color={colors.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Cerca regione o provincia..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <IconSymbol
                  ios_icon_name="xmark.circle.fill"
                  android_material_icon_name="cancel"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.regionsList} contentContainerStyle={styles.regionsListContent}>
            {filteredRegions.map((region, index) => (
              <React.Fragment key={index}>
                <View style={styles.regionItem}>
                  <TouchableOpacity
                    style={styles.regionHeader}
                    onPress={() => {
                      if (expandedRegion === region.name) {
                        setExpandedRegion(null);
                      } else {
                        handleRegionSelect(region.name);
                      }
                    }}
                  >
                    <Text style={[
                      styles.regionName,
                      selectedRegion === region.name && styles.regionNameSelected
                    ]}>
                      {region.name}
                    </Text>
                    <IconSymbol
                      ios_icon_name={expandedRegion === region.name ? "chevron.down" : "chevron.right"}
                      android_material_icon_name={expandedRegion === region.name ? "expand_more" : "chevron_right"}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>

                  {(expandedRegion === region.name || searchQuery) && (
                    <View style={styles.provincesList}>
                      {region.provinces
                        .filter(p => !searchQuery || p.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((province, pIndex) => (
                          <React.Fragment key={pIndex}>
                            <TouchableOpacity
                              style={[
                                styles.provinceItem,
                                selectedProvince === province && styles.provinceItemSelected
                              ]}
                              onPress={() => {
                                handleRegionSelect(region.name);
                                handleProvinceSelect(province);
                              }}
                            >
                              <Text style={[
                                styles.provinceName,
                                selectedProvince === province && styles.provinceNameSelected
                              ]}>
                                {province}
                              </Text>
                              {selectedProvince === province && (
                                <IconSymbol
                                  ios_icon_name="checkmark.circle.fill"
                                  android_material_icon_name="check_circle"
                                  size={20}
                                  color={colors.primary}
                                />
                              )}
                            </TouchableOpacity>
                          </React.Fragment>
                        ))}
                    </View>
                  )}
                </View>
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  selectorError: {
    borderColor: colors.live,
  },
  selectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  selectorText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.live,
  },
  modal: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.xl,
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  regionsList: {
    flex: 1,
  },
  regionsListContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  regionItem: {
    marginBottom: spacing.md,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  regionNameSelected: {
    color: colors.primary,
  },
  provincesList: {
    marginTop: spacing.sm,
    marginLeft: spacing.lg,
    gap: spacing.xs,
  },
  provinceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  provinceItemSelected: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  provinceName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  provinceNameSelected: {
    fontWeight: '800',
    color: colors.primary,
  },
});
