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
    de: {
      capital: string;
      description: string;
      name: string;
    };
    en: {
      capital: string;
      description: string;
      name: string;
    };
    ru: {
      capital: string;
      description: string;
      name: string;
    };
  };
  timezones: string[];
  videoUrl: string;
  _id: string;
}

export default ICountryData;
