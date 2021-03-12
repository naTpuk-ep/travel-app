interface ICountryData {
  ISOCode: string;
  capitalLocation: {
    coordinates: number[];
    type: string;
  };
  currency: string;
  flag: string;
  imageUrl: string;
  localizations: {
    capital: string;
    description: string;
    lang: string;
    name: string;
  };
  timezones: string[];
  videoUrl: string;
  _id: string;
}

export default ICountryData;
