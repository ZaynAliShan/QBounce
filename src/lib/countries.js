// Country name -> 2-letter code for flagcdn.com. Subset for bundle size; extend as needed.
const COUNTRY_CODES = {
  'United States': 'us', 'United Kingdom': 'gb', 'Canada': 'ca', 'Australia': 'au',
  'Germany': 'de', 'France': 'fr', 'India': 'in', 'Brazil': 'br', 'Japan': 'jp',
  'Mexico': 'mx', 'Spain': 'es', 'Italy': 'it', 'Netherlands': 'nl', 'South Korea': 'kr',
  'Korea, Republic of': 'kr', 'China': 'cn', 'Russia': 'ru', 'Russian Federation': 'ru',
  'Argentina': 'ar', 'South Africa': 'za', 'Egypt': 'eg', 'Nigeria': 'ng',
  'Philippines': 'ph', 'Pakistan': 'pk', 'Bangladesh': 'bd', 'Viet Nam': 'vn',
  'Vietnam': 'vn', 'Indonesia': 'id', 'Turkey': 'tr', 'Iran': 'ir', 'Thailand': 'th',
  'Poland': 'pl', 'Ukraine': 'ua', 'Saudi Arabia': 'sa', 'Malaysia': 'my',
  'Belgium': 'be', 'Sweden': 'se', 'Austria': 'at', 'Switzerland': 'ch',
  'Colombia': 'co', 'Chile': 'cl', 'Portugal': 'pt', 'Ireland': 'ie',
  'Israel': 'il', 'New Zealand': 'nz', 'Singapore': 'sg', 'UAE': 'ae',
  'United Arab Emirates': 'ae', 'Greece': 'gr', 'Czech Republic': 'cz',
  'Romania': 'ro', 'Hungary': 'hu', 'Denmark': 'dk', 'Norway': 'no',
  'Finland': 'fi', 'Kenya': 'ke', 'Ghana': 'gh', 'Morocco': 'ma', 'Peru': 'pe',
  'Venezuela': 've', 'Ecuador': 'ec', 'Croatia': 'hr', 'Serbia': 'rs',
  'Algeria': 'dz', 'Iraq': 'iq', 'Qatar': 'qa', 'Kuwait': 'kw', 'Jordan': 'jo',
}

export function getCountryCode(countryName) {
  if (!countryName || typeof countryName !== 'string') return null
  const normalized = countryName.trim()
  return COUNTRY_CODES[normalized] ?? COUNTRY_CODES[normalized.replace(/\s+/g, ' ')]
}
