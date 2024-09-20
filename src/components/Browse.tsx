import * as React from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
interface IBrowseProps {}

const Browse: React.FunctionComponent<IBrowseProps> = (props) => {
  // custom hook
  useNowPlayingMovies();
  
  return (
    <div>
      <Header />
    </div>
  );
};

export default Browse;
