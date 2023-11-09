import React, { useState } from 'react'
import "./Image.scss";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Image = ({img,open}) => {
    console.log(img);
    const [slideNumber, setSlideNumber] = useState(0);

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
          newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
          newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
      };
  return (
    <div >
{
open &&
<div className="images">
              <CloseIcon className="close" onClick={() => open(false)} />
              <ArrowBackIosIcon
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={img[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <ArrowForwardIosIcon
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
}

    </div>
  )
}

export default Image
