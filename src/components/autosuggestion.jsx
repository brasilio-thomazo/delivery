import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";

import { getText } from "../utils";

export function AutoSuggestion({ options, keys, onSelected, ...rest }, ref) {
  let index = -1;
  const ul = useRef(null);
  const div = useRef(null);
  const visible = useRef(false);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({});
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (suggestions.length > 0 && !visible.current) {
      div.current.classList.toggle("visible");
      visible.current = true;
    } else if (suggestions.length === 0 && visible.current) {
      div.current.classList.toggle("visible");
      visible.current = false;
    }
  }, [suggestions.length]);

  function onChange(evt) {
    const value = evt.target.value;
    const _suggestions = options.filter((data) => {
      const str = getText(keys, data).toLocaleLowerCase();
      const key = value.toLocaleLowerCase();
      return str.indexOf(key) >= 0;
    });
    setSuggestions(value.length === 0 ? [] : _suggestions);
    setInputValue(value);
  }

  function onKeyDown(evt) {
    const childrens = ul.current.children;
    const max = childrens.length - 1;
    if (max < 0) return;
    let last = -1;

    switch (evt.key) {
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
        setSuggestion(data);
        setInputValue(getText(keys, data));
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

  function onSelect(data) {
    setSuggestions([]);
    setSuggestion(data);
    setInputValue(getText(keys, data));
    if (typeof onSelected === "function") onSelected(data);
  }

  useImperativeHandle(ref, () => ({
    suggestion,
    value: inputValue,
    setValue: (str) => setInputValue(str),
    clear() {
      setSuggestions([]);
      setSuggestion({});
      setInputValue("");
    },
  }));

  return (
    <div ref={div} className="autocomplete">
      <input
        {...rest}
        type="text"
        className="field"
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={inputValue}
      />
      <ul ref={ul} className="suggestions">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => onSelect(suggestion)}>
            {getText(keys, suggestion)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default forwardRef(AutoSuggestion);
