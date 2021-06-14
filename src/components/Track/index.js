import React from "react";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";
import InfiniteScroll from "../Common/InfiniteScroll";

import Info from "./Info";

const cache = new CellMeasurerCache({
  defaultWidth: 100,
  fixedWidth: true,
});

const rowRenderer =
  (data) =>
  ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
        {({ measure }) => (
          <div style={style}>
            <Info track={data[index]} measure={measure} />
          </div>
        )}
      </CellMeasurer>
    );
  };

const Track = ({ tracks }) => {
  return (
    <div>
      <InfiniteScroll cache={cache} rowRenderer={rowRenderer(tracks)} data={tracks} />
    </div>
  );
};

export default Track;
