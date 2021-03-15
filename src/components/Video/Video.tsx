import React, { FC } from "react";
import ReactPlayer from "react-player";
import "./Video.scss";

interface IProps {
  url: string | undefined;
}

const CountryDescription: FC<IProps> = ({ url }: IProps) => {
  return (
    <div className="video-container">
      <ReactPlayer url={url} controls />
    </div>
  );
};

export default CountryDescription;
