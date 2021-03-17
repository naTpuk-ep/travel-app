import React, { useState, useEffect, useCallback, useContext } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Button, Form, Spinner } from "react-bootstrap";
import useHttp from "../../hooks/http.hook";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import "./PlaceRating.scss";
import Loader from "../Loader";
import AuthContext from "../../context/AuthContext";

interface IPlaceRatingParams {
  placeId: string;
  isCommentable: boolean;
}

interface IRating {
  id: string;
  userId: string;
  placeId: string;
  rating: number;
  date: Date;
  comment: string;
  user: [
    {
      name: string;
      email: string;
    }
  ];
}

const PlaceRating: React.FunctionComponent<IPlaceRatingParams> = (
  props: IPlaceRatingParams
) => {
  const { placeId, isCommentable } = props;
  const language = useContext(LocalizationContext);
  const { loading, request } = useHttp();
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [ratingForm, setRatingForm] = useState({
    rating: 3,
    comment: "",
  });
  const auth = useContext(AuthContext);

  const getRatings = useCallback(async () => {
    try {
      const data = await request(
        `https://rnovikov-travel-app-backend.herokuapp.com/rating?place=${placeId}`,
        "GET"
      );
      setRatings(data);
    } catch (e) {
      setRatings([]);
    }
  }, [placeId, request]);

  useEffect(() => {
    getRatings();
  }, [getRatings]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingForm({ ...ratingForm, [event.target.name]: event.target.value });
  };

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const changeRatingHandler = (value: number) => {
    setRatingForm({ ...ratingForm, rating: value });
  };

  const publishRatingHandler = async () => {
    try {
      const data = await request(
        "https://rnovikov-travel-app-backend.herokuapp.com/rating/publish",
        "POST",
        {
          ...{
            placeId,
            userId: auth.userId,
            date: Date.now(),
            comment: ratingForm.comment,
            rating: ratingForm.rating,
            email: auth.email,
            token: auth.token,
          },
        }
      );
      data.publishRating.user = [
        {
          email: auth.email,
          name: auth.name,
        },
      ];
      setRatings([...ratings, data.publishRating]);
    } catch (e) {
      if (e.response.data.message) {
        auth.logout();
      }
      getRatings();
    }
  };

  return (
    <div className="rating-container">
      {isCommentable ? (
        <>
          {auth.isAuthenticated ? (
            <div className="rating-container__record">
              <div className="rating-container__record-header">
                <div className="rating-container__record-name">
                  {capitalizeFirstLetter(auth.name)}
                </div>
                <div className="rating-container__record-email">
                  ({auth.email})
                </div>
                <div className="rating-container__record-date">
                  {LOCALIZATIONS.photoGallery.you[language]}
                </div>
              </div>
              <StarRatings
                rating={ratingForm.rating}
                starRatedColor="Orange"
                starDimension="35px"
                starSpacing="1px"
                changeRating={changeRatingHandler}
                numberOfStars={5}
                name="rating"
              />
              <Form.Group controlId="ratingComment">
                <Form.Label>
                  {" "}
                  {LOCALIZATIONS.photoGallery.comment[language]}:
                </Form.Label>
                <Form.Control
                  onChange={changeHandler}
                  name="comment"
                  as="textarea"
                  className="rating-container__record-commentarea"
                  rows={3}
                  maxLength={60}
                />
                <Form.Text className="text-muted">
                  {LOCALIZATIONS.photoGallery.commentDescription[language]}
                </Form.Text>
              </Form.Group>
              <Button
                block
                size="sm"
                onClick={publishRatingHandler}
                disabled={loading}
                variant="primary"
                type="submit"
              >
                {loading ? (
                  <div className="loader-sm-comment">
                    <Spinner animation="border" />
                  </div>
                ) : (
                  LOCALIZATIONS.photoGallery.publish[language]
                )}
              </Button>
            </div>
          ) : (
            <div className="rating-container__record">
              <div className="rating-container__record-header">
                <div className="rating-container__record-link">
                  {LOCALIZATIONS.photoGallery.leaveRating[language]}{" "}
                  <Link to="/signin">
                    {LOCALIZATIONS.photoGallery.login[language]}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}

      {loading ? (
        <Loader />
      ) : (
        ratings
          .slice(0)
          .reverse()
          .map((rating) => {
            return (
              <div className="rating-container__record" key={nanoid()}>
                <div className="rating-container__record-header">
                  <div className="rating-container__record-name">
                    {capitalizeFirstLetter(rating.user[0].name)}
                  </div>
                  <div className="rating-container__record-email">
                    ({rating.user[0].email})
                  </div>
                  <div className="rating-container__record-date">
                    {new Date(rating.date).toLocaleDateString()}
                  </div>
                </div>
                <StarRatings
                  rating={rating.rating}
                  starRatedColor="Orange"
                  starDimension="25px"
                  starSpacing="1px"
                />
                {rating.comment ? (
                  <div className="rating-container__record-comment">
                    {rating.comment}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })
      )}
    </div>
  );
};

export default PlaceRating;
