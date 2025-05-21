import { Search } from "@mui/icons-material";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchResults, selectSearchStatus } from "../../containers/playlists/selectors";
import { searchTracks, Track } from "../../containers/playlists/slice";
import { RequestStatus } from "../../types/requests";
import SearchResultCard from "../cards/SearchResultCard";
import useMobile from "../../hooks/useMobile";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const { isMobile } = useMobile();
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const searchStatus = useSelector(selectSearchStatus);

  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const loading = searchStatus === RequestStatus.PENDING;
  const error = searchStatus === RequestStatus.ERROR;

  // Debounce the search to avoid making too many API calls
  const debouncedSearch = React.useRef(
    debounce((query: string) => {
      dispatch(searchTracks(query));
    }, 500)
  ).current;

  useEffect(() => {
    if (inputValue.trim() !== "") {
      debouncedSearch(inputValue);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);
  return (
    <Autocomplete
      disablePortal
      options={searchResults}
      getOptionLabel={(option: Track) => `${option.name} - ${option.artist}`}
      getOptionKey={(option) => option.id}
      renderOption={(props, option) => (
        <li {...props}>
          <SearchResultCard
            track={option}
            onClick={() => {
              setInputValue(`${option.name} - ${option.artist}`);
              setOpen(false);
            }}
          />
        </li>
      )}
      loading={loading}
      sx={{ width: isMobile ? "100%" : "400px" }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      popupIcon={<Search />}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a track"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      noOptionsText={error ? "Error getting tracks" : "No tracks found"}
    />
  );
};

export default SearchBar;
