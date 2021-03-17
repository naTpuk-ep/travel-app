import React, { FC } from "react";
import { Card } from "react-bootstrap";
import ReactPlayer from "react-player";
import "./Video.scss";

interface IVideoProps {
  url: string | undefined;
}

const CountryDescription: FC<IVideoProps> = ({ url }: IVideoProps) => {
  return (
    <Card bg="light" className="video-container">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        className="react-player"
      />
    </Card>
  );
};

export default CountryDescription;
