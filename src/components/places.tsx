import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  SyntheticEvent,
} from "react";

import { placesSearch } from "../services";
import { PlacesRef } from "../models";

type Props = React.PropsWithRef<{
  onSelected: (data: string) => void | undefined;
  value: string;
}>;

export const Places = React.forwardRef<PlacesRef, Props>((props, ref) => {
  const { onSelected, value } = props;
  let index = -1;
  const ul = useRef<HTMLUListElement>(null);
  const div = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  const [suggestions, setSuggestions] = useState([] as Array<string>);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (suggestions.length > 0 && !visible.current) {
      div.current?.classList.toggle("visible");
      visible.current = true;
    } else if (suggestions.length === 0 && visible.current) {
      div.current?.classList.toggle("visible");
      visible.current = false;
    }
  }, [suggestions.length]);

  function handleChange(e: SyntheticEvent) {
    const { value } = e.target as HTMLInputElement;
    placesSearch(value).then((res) => {
      setSuggestions(
        value.length === 0 ? [] : res.data.features.flatMap((f) => f.place_name)
      );
    });
    setInputValue(value);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const childrens = ul.current?.children;
    if (!childrens) return;
    const max = childrens.length - 1;
    if (max < 0) return;
    let last = -1;

    switch (e.key) {
      case "ArrowDown":
        last = index;
        index = index + 1 > max ? 0 : index + 1;
        break;
      case "ArrowUp":
        last = index;
        index = index - 1 < 0 ? max : index - 1;
        break;
      case "Enter":
        const data = suggestions[index];
        index = -1;
        setInputValue(data);
        setSuggestions([]);
        if (typeof onSelected === "function") onSelected(data);
        break;
      default:
        return;
    }
    childrens[last]?.classList.toggle("active");
    childrens[index]?.classList.toggle("active");
    return;
  }

  function onSelect(data: string) {
    setSuggestions([]);
    setInputValue(data);
    if (typeof onSelected === "function") onSelected(data);
  }

  useImperativeHandle(ref, () => ({
    value: inputValue,
    setValue: (str: string) => setInputValue(str),
    clear() {
      setSuggestions([]);
      setInputValue("");
    },
  }));

  return (
    <div ref={div} className="autocomplete">
      <input
        type="text"
        className="field"
        onKeyDown={onKeyDown}
        onChange={handleChange}
        value={inputValue}
      />
      <ul ref={ul} className="suggestions">
        {suggestions.map((suggestion, i) => (
          <li key={i} onClick={() => onSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Places;
