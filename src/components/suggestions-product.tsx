import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  SyntheticEvent,
} from "react";

import { useSelector } from "react-redux";

interface Props {
  onSelected: (data: Product) => void | undefined;
  value?: string;
}

const AutoSuggestion: React.ForwardRefRenderFunction<
  SuggestionRef,
  React.PropsWithChildren<Props>
> = (props, ref) => {
  const { onSelected } = props;
  let index = -1;
  const ul = useRef<HTMLUListElement>(null);
  const div = useRef<HTMLDivElement>(null);
  const visible = useRef(false);
  const { all } = useSelector((state: AppState) => state.product);

  const [suggestions, setSuggestions] = useState([] as Product[]);
  const [inputValue, setInputValue] = useState("");

  //useEffect(() => {
  //  setInputValue(value);
  //}, [value]);

  useEffect(() => {
    if (suggestions.length > 0 && !visible.current) {
      div.current?.classList.toggle("visible");
      visible.current = true;
    } else if (suggestions.length === 0 && visible.current) {
      div.current?.classList.toggle("visible");
      visible.current = false;
    }
  }, [suggestions.length]);

  function onSelect(data: Product) {
    setSuggestions([]);
    setInputValue([data.type.name, data.name].join(" "));
    if (typeof onSelected === "function") onSelected(data);
  }

  function handleChange(e: SyntheticEvent) {
    const { value } = e.target as HTMLInputElement;
    const list = all.filter((data) => {
      const key = value.toLocaleLowerCase();
      const str = [data.type.name, data.name].join(" ");
      return str.toLocaleLowerCase().indexOf(key) >= 0;
    });
    setSuggestions(value.length === 0 ? [] : list);
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
        setInputValue([data.type.name, data.name].join(" "));
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
        {suggestions.map((data, i) => (
          <li key={i} onClick={() => onSelect(data)}>
            {[data.type.name, data.name].join(" ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SuggestionsProduct = React.forwardRef(AutoSuggestion);
