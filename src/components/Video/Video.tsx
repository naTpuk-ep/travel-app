import React, { FC } from "react";
import ReactPlayer from "react-player";
import "./Video.scss";

interface IVideoProps {
  url: string | undefined;
}

const CountryDescription: FC<IVideoProps> = ({ url }: IVideoProps) => {
  return (
    <div className="video-container">
      <ReactPlayer url={url} width="100%" controls className="react-player" />
    </div>
  );
};

export default CountryDescription;
