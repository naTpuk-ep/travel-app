import React, { useState, useEffect, useCallback, useContext } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Button, Form } from "react-bootstrap";
import useHttp from "../../hooks/http.hook";
import "./PlaceRating.scss";
import Loader from "../Loader";
import AuthContext from "../../context/AuthContext";

interface IPlaceRatingParams {
  placeId: string;
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
  const { placeId } = props;
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
      getRatings();
    }
  };

  return (
    <div className="rating-container">
      {auth.isAuthenticated ? (
        <div className="rating-container__record">
          <div className="rating-container__record-header">
            <div className="rating-container__record-name">
              {capitalizeFirstLetter(auth.name)}
            </div>
            <div className="rating-container__record-email">({auth.email})</div>
            <div className="rating-container__record-date">You</div>
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
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              onChange={changeHandler}
              name="comment"
              as="textarea"
              className="rating-container__record-commentarea"
              rows={3}
              maxLength={60}
            />
            <Form.Text className="text-muted">
              Leave short comment (60 characters)
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
                <Loader />
              </div>
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      ) : (
        <div className="rating-container__record">
          <div className="rating-container__record-header">
            <div className="rating-container__record-link">
              To leave rating please <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
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
