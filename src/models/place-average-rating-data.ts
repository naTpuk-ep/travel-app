import IPlaceData from "./place-data";

interface IPlaceAverageRatingData extends IPlaceData {
  ratings: { rating: string }[];
  average: string;
}

export default IPlaceAverageRatingData;
