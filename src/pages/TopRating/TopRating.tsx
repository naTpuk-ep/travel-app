/* eslint-disable no-underscore-dangle */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { nanoid } from "nanoid";
import StarRatings from "react-star-ratings";
import Loader from "../../components/Loader";
import LocalizationContext from "../../context/LocalizationContext";
import LOCALIZATIONS from "../../assets/data/localizations";
import useHttp from "../../hooks/http.hook";
import IPlaceAverageRatingData from "../../models/place-average-rating-data";
import PlaceRating from "../../components/PlaceRating";
import "./TopRating.scss";

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
    <div className="rating-page">
      <h2>
        <Badge variant="secondary">
          {LOCALIZATIONS.topRating.header[language]}
        </Badge>
      </h2>
      {loading ? (
        <Loader />
      ) : (
        topRating.map((tRating, i) => {
          return (
            <Card bg="light" className="rating-card" key={nanoid()}>
              <Card.Header className="rating-card__header">
                <StarRatings
                  className="mr1"
                  rating={Number(tRating.average)}
                  starRatedColor="Orange"
                  starDimension="25px"
                  starSpacing="1px"
                />
                <span>
                  {i + 1} {tRating.localizations[language].name}{" "}
                  {LOCALIZATIONS.topRating.avarageRating[language]} (
                  {tRating.average}) {LOCALIZATIONS.topRating.basedOn[language]}{" "}
                  {tRating.ratings.length}{" "}
                  {LOCALIZATIONS.topRating.reviews[language]}
                </span>
              </Card.Header>
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
    </div>
  );
};

export default TopRating;
