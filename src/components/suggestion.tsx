import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  SyntheticEvent,
} from "react";

import { getText } from "../services";

type Props = React.PropsWithRef<{
  options: Array<Object>;
  keys: Array<String>;
  onSelected: (data: Object) => void;
}>;

interface SuggestionRef {
  suggestion: Object;
  value: string;
  setValue: (str: string) => void;
  clear: () => void;
}

//import { getText } from "../utils";

export const Suggestions = React.forwardRef<SuggestionRef, Props>(
  (props, ref) => {
    const { options, keys, onSelected } = props;
    let index = -1;
    const ul = useRef<HTMLUListElement>(null);
    const div = useRef<HTMLDivElement>(null);
    const visible = useRef(false);

    const [suggestions, setSuggestions] = useState([] as Array<Object>);
    const [suggestion, setSuggestion] = useState({});
    const [inputValue, setInputValue] = useState("");

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
      const _suggestions = options.filter((data) => {
        const str = getText(keys, data).toLocaleLowerCase();
        const key = value.toLocaleLowerCase();
        return str.indexOf(key) >= 0;
      });
      setSuggestions(value.length === 0 ? [] : _suggestions);
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

    function onSelect(data: Object) {
      setSuggestions([]);
      setSuggestion(data);
      setInputValue(getText(keys, data));
      if (typeof onSelected === "function") onSelected(data);
    }

    useImperativeHandle(ref, () => ({
      suggestion,
      value: inputValue,
      setValue: (str: string) => setInputValue(str),
      clear() {
        setSuggestions([]);
        setSuggestion({});
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
              {getText(keys, suggestion)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
