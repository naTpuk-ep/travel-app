interface IPlaceData {
  _id: string;
  countryId: string;
  photoUrl: string;
  localizations: {
    de: { capital: string; description: string; name: string };
    en: { capital: string; description: string; name: string };
    ru: { capital: string; description: string; name: string };
  };
}
export default IPlaceData;
