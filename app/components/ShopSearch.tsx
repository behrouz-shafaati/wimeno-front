"use client";
import { useEffect, useState } from "react";
// import { paramCase } from "change-case";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
// next
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  Autocomplete,
  InputAdornment,
  Popper,
} from "@mui/material";
// hooks
import useIsMountedRef from "@/src/hooks/useIsMountedRef";
// api
import { useLazySearchQuery } from "@/src/redux/api/shopApiSlice";
// routes

// components
import Image from "./Image";
import Iconify from "./Iconify";
import InputStyle from "./mui/InputStyle";
import SearchNotFound from "./SearchNotFound";
import Link from "next/link";

// ----------------------------------------------------------------------

const PopperStyle = styled((props: any) => (
  <Popper placement="bottom-start" {...props} />
))({
  width: "280px !important",
});

// ----------------------------------------------------------------------

type ShopItemProps = {
  props: any;
  shop: any;
  inputValue: any;
};

const ShopItem = ({ props, shop, inputValue }: ShopItemProps) => {
  const { title, logo } = shop;
  const matches = match(title, inputValue);
  const parts = parse(title, matches);
  return (
    <li {...props}>
      <Link
        href={`/${shop.shopStringId}`}
        className="w-full h-full flex flex-row items-center"
      >
        <div className="w-12 h-12 mr-1">
          <Image alt={title} src={logo?.url} className="rounded-md" />
        </div>
        {parts.map((part, index) => (
          <Typography
            key={index}
            component="span"
            variant="subtitle2"
            color={part.highlight ? "primary" : "textPrimary"}
          >
            {part.text}
          </Typography>
        ))}
      </Link>
    </li>
  );
};

// ----------------------------------------------------------------------

type TabelItemProps = {
  props: any;
  tabel: any;
  inputValue: any;
};

const TabelItem = ({ props, tabel, inputValue }: TabelItemProps) => {
  const { shop, number, code } = tabel;
  const matches = match(code, inputValue);
  const parts = parse(code, matches);
  return (
    <li {...props}>
      <Link
        href={`/${shop.shopStringId}?tabel=${number}`}
        className="w-full h-full flex flex-row items-center"
      >
        <div className="w-12 h-12 mr-1">
          <Image
            alt={shop.title}
            src={shop?.logo?.url}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <Typography
            component="span"
            variant="subtitle1"
            color={"textPrimary"}
            className="font-bold"
          >
            {shop.title}
          </Typography>

          {/* {parts.map((part, index) => (
          <Typography
            key={index}
            component="span"
            variant="subtitle2"
            color={part.highlight ? "primary" : "textPrimary"}
          >
            {part.text}
          </Typography>
        ))} */}
          <Typography
            component="span"
            variant="subtitle2"
            color={"textPrimary"}
          >
            Tabel {number}
          </Typography>
        </div>
      </Link>
    </li>
  );
};

// ----------------------------------------------------------------------

export default function ShopSearch() {
  // const { push } = useRouter();

  const [search, { data, isError, isLoading, isSuccess }] =
    useLazySearchQuery();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isSuccess && isMountedRef.current) {
      console.log("response:", data);
      setSearchResults(data);
    }
  }, [data, isLoading, isSuccess]);

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchQuery(value);
      if (value) {
        search(value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (name: any) => {
    // push(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
  };

  const handleKeyUp = (event: any) => {
    if (event.key === "Enter") {
      handleClick(searchQuery);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(tabel) => {
        return tabel.number;
      }}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={230}
          placeholder="Search tabel code"
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, result, { inputValue }) => {
        return (
          <TabelItem props={props} tabel={result} inputValue={inputValue} />
        );
        // return <ShopItem props={props} shop={result} inputValue={inputValue} />;
      }}
    />
  );
}
