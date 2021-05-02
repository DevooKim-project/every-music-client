import React, { useContext, useState, useEffect, useMemo, useReducer, useCallback } from "react";

import { Context, Provider } from "../context";
import "./Header.css";

export default React.memo(function Header() {
  return (
    <div className="test">
      <h1>This is Header</h1>
    </div>
  );
});
