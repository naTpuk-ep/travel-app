/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState, useCallback } from "react";
import ImageGallery from "react-image-gallery";
import "./PhotoGallery.scss";
import { Card } from "react-bootstrap";
import LocalizationContext from "../../context/LocalizationContext";
import useHttp from "../../hooks/http.hook";
import IPlaceData from "../../models/place-data";
import Loader from "../Loader";
import useDidMountEffect from "../../hooks/useDidMountEffect.hook";
import PlaceRating from "../PlaceRating";

interface IPhotoGalleryProps {
  countryId: string;
}

const PhotoGallery: React.FunctionComponent<IPhotoGalleryProps> = (
  props: IPhotoGalleryProps
) => {
  const language = useContext(LocalizationContext);
  const { countryId } = props;
  const { loading, request } = useHttp();
  const [places, setPlaces] = useState<IPlaceData[]>([]);
  const [images, setImages] = useState<{ original: string }[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [placeId, setPlaceId] = useState("0");

  const getCountries = useCallback(async () => {
    try {
      const data = await request(
        `https://rnovikov-travel-app-backend.herokuapp.com/places?country=${countryId}`,
        "GET"
      );
      setPlaces(data);
      setPlaceId(data[0]._id);
    } catch (e) {
      setPlaces([]);
    }
  }, [countryId, request]);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  useDidMountEffect(() => {
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

  const setImageRatings = (index: number) => {
    const id =
      places.find((place) => place.photoUrl === images[index].original)?._id ||
      "0";
    setPlaceId(id);
    setImageIndex(index);
  };

  return (
    <Card bg="light" className="card-row">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="img-gallery">
            <ImageGallery
              items={images}
              showIndex
              onSlide={(currentIndex) => {
                setImageRatings(currentIndex);
              }}
              startIndex={imageIndex}
            />
          </div>
          {placeId === "0" ? (
            ""
          ) : (
            <PlaceRating placeId={placeId} isCommentable />
          )}
        </>
      )}
    </Card>
  );
};

export default PhotoGallery;
