import React from "react";
import HackerSearch from "../components/hacker-search";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="dark:bg-black bg-zinc-50  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative ">
      <HackerSearch />
    </div>
  );
};

export default HomePage;
