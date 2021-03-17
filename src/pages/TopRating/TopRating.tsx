import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Loader from "../../components/Loader";
import AuthContext from "../../context/AuthContext";
import LocalizationContext from "../../context/LocalizationContext";
import useHttp from "../../hooks/http.hook";
import IPlaceAverageRatingData from "../../models/place-average-rating-data";

const TopRating: React.FunctionComponent = () => {
  const auth = useContext(AuthContext);
  const language = useContext(LocalizationContext);
  const { loading, request } = useHttp();

  const [topRating, setTopRating] = useState<IPlaceAverageRatingData[]>([]);

  const getTopAverageRating = useCallback(async () => {
    try {
      const data = await request(
        "http://localhost:3000/places/average-rating",
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
      {loading ? (
        <Loader />
      ) : (
        topRating.map((tRating) => {
          return (
            <Card bg="light">
              <Card.Title className="country-card__flag-img">
                {tRating.localizations[language].name}
                {tRating.average}
              </Card.Title>
              <Card.Img variant="top" src={tRating.photoUrl} />
              <Card.Body>
                <Card.Text>
                  {tRating.localizations[language].description}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })
      )}
    </>
  );
};

export default TopRating;
