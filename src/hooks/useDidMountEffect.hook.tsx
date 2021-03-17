/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

const useDidMountEffect = (
  func: () => void,
  deps: React.DependencyList | undefined
): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
