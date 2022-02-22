// from react and react dom
import react, { useContext } from "react";

// contex
import { ContexStore } from "../context";

// icons
import HeadphonesIcon from "@mui/icons-material/Headphones";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// styles
import "../Styles/NoSearch.css";

const NoSearch = () => {
  const details = useContext(ContexStore);

  return (
    <>
      <div className="search_music">
        <div className="icon">
          <HeadphonesIcon className="headphone" />
        </div>
        <div className="text">
          <div className="main_quote">
            <FormatQuoteIcon className="front_quote" />
            &nbsp;Music is the soundtrack of your life&nbsp;
            <FormatQuoteIcon className="back_quote" />
          </div>
          <span className="side_quote">-Add melody to your life</span>
        </div>
      </div>
    </>
  );
};
export default NoSearch;
