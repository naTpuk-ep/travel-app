import React, { useContext, useEffect, useState, useCallback } from "react";
import ImageGallery from "react-image-gallery";
import "./PhotoGallery.scss";
import LocalizationContext from "../../context/LocalizationContext";
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";
import IPlaceData from "../../models/place-data";
import Loader from "../Loader";

interface IPhotoGalleryParams {
  countryId: string;
}

const PhotoGallery: React.FunctionComponent<IPhotoGalleryParams> = (
  props: IPhotoGalleryParams
) => {
  const language = useContext(LocalizationContext);
  const auth = useContext(AuthContext);
  const { countryId } = props;
  const { loading, request } = useHttp();
  const [places, setPlaces] = useState<IPlaceData[]>([]);
  const [images, setImages] = useState<{ original: string }[]>([]);
  const [imageIndex, setImageIndex] = useState(0);

  const getCountries = useCallback(async () => {
    try {
      const data = await request(
        `https://rnovikov-travel-app-backend.herokuapp.com/places?country=${countryId}`,
        "GET"
      );
      setPlaces(data);
    } catch (e) {
      setPlaces([]);
    }
  }, [countryId, request]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  useEffect(() => {
    const imgs: {
      original: string;
      thumbnail: string;
      originalTitle: string;
      description: string;
    }[] = [];
    places.map((place) =>
      imgs.push({
        original: place.photoUrl,
        thumbnail: place.photoUrl,
        originalTitle: place.localizations[language].name,
        description: `${place.localizations[language].description}`,
      })
    );
    setImages(imgs);
  }, [language, places]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <ImageGallery
          items={images}
          showIndex
          onSlide={(currentIndex) => {
            setImageIndex(currentIndex);
          }}
          startIndex={imageIndex}
        />
      )}
    </div>
  );
};

export default PhotoGallery;
