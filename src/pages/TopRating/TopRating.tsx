/* eslint-disable no-underscore-dangle */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./TopRating.scss";
import { nanoid } from "nanoid";
import StarRatings from "react-star-ratings";
import Loader from "../../components/Loader";
import LocalizationContext from "../../context/LocalizationContext";
import LOCALIZATIONS from "../../assets/data/localizations";
import useHttp from "../../hooks/http.hook";
import IPlaceAverageRatingData from "../../models/place-average-rating-data";
import PlaceRating from "../../components/PlaceRating";

const TopRating: React.FunctionComponent = () => {
  const language = useContext(LocalizationContext);
  const { loading, request } = useHttp();

  const [topRating, setTopRating] = useState<IPlaceAverageRatingData[]>([]);

  const getTopAverageRating = useCallback(async () => {
    try {
      const data = await request(
        "https://rnovikov-travel-app-backend.herokuapp.com/places/average-rating",
        "GET"
      );
      setTopRating(data);
    } catch (e) {
      setTopRating([]);
    }
  }, [request]);

  useEffect(() => {
    getTopAverageRating();
  }, [getTopAverageRating]);

  return (
    <>
      <h1>Top 10 places</h1>
      {loading ? (
        <Loader />
      ) : (
        topRating.map((tRating, i) => {
          return (
            <Card bg="light" className="rating-card" key={nanoid()}>
              <Card.Title className="rating-card__title">
                {i + 1} {tRating.localizations[language].name}{" "}
                {LOCALIZATIONS.topRating.avarageRating[language]}
                <StarRatings
                  rating={Number(tRating.average)}
                  starRatedColor="Orange"
                  starDimension="25px"
                  starSpacing="1px"
                />
                ({tRating.average}) {LOCALIZATIONS.topRating.basedOn[language]}{" "}
                {tRating.ratings.length}{" "}
                {LOCALIZATIONS.topRating.reviews[language]}
              </Card.Title>
              <Card.Img variant="top" src={tRating.photoUrl} />
              <Card.Body>
                <Card.Text>
                  {tRating.localizations[language].description}
                </Card.Text>
              </Card.Body>
              <PlaceRating placeId={tRating._id} isCommentable={false} />
            </Card>
          );
        })
      )}
    </>
  );
};

export default TopRating;
