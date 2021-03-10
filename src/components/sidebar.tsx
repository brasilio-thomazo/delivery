import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSidebar } from "../store/actions";

type Props = React.PropsWithChildren<{}>;
export const SideBar: React.FC<Props> = () => {
  const { components, visible, title } = useSelector(
    (state: AppState) => state.sidebar
  );

  const div = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) div.current?.classList.toggle("visible");
    else div.current?.classList.remove("visible");
  }, [visible]);

  const hide = useCallback(() => {
    dispatch(hideSidebar(title, components));
  }, [dispatch, title, components]);

  return (
    <div ref={div} className="sidebar">
      <div className="content">{components}</div>
      <div className="header">
        <button type="button" onClick={hide}>
          <span className="far fa-caret-square-up"></span>
        </button>
        <div className="title">{title}</div>
      </div>
    </div>
  );
};
