export enum CoughDuration {
  SHORT = '1 week or less',
  MEDIUM = '1 to 2 weeks',
  LONG = '2 weeks or more',
  UNKNOWN = "UNKNOWN",
}

export enum ImagePreviewSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum KeySite {
  QAID = "QAID",   
  QAIG = "QAIG",   
  QASD = "QASD", 
  QASG = "QASG", 
  QLD = "QLD",
  QLG = "QLG", 
  QPID = "QPID", 
  QPIG = "QPIG",
  QPSD = "QPSD", 
  QPSG = "QPSG", 
  APXD = "APXD", 
  APXG = "APXG", 
  QSLD = "QSLD", 
  QSLG = "QSLG",  
}

export enum LungFeature {
  DRY_LUNG = "Dry Lung (A-lines)",
  INTERSTITIAL_B_LINES = "Interstitial Syndrome with B-lines",
  CONFLUENT_B_LINES = "Confluent B-lines",
  SUBPLEURAL_CONSOLIDATIONS = "Subpleural consolidations of <1 cm or irregular/broken pleural line",
  CONSOLIDATIONS = "Consolidations ≥1cm",
  PLEURAL_EFFUSION = "Pleural effusion",
}