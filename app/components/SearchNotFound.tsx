"use client";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return searchQuery ? (
    <>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.
      </Typography>
    </>
  ) : (
    <Typography variant="body2"> Please enter keywords</Typography>
  );
}
