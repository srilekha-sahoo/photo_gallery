import React, { useState } from "react";
import { MDBCol } from "mdbreact";

const SearchBar = (props) => {

  return (
    <MDBCol md="12">
      <form className="form-inline mb-4">
        <input 
          className="form-control form-control-sm ml-3 w-75" 
          type="text" 
          placeholder="Search" 
          aria-label="Search"
          autoFocus='autoFocus'
          value={props.searchValue}
          onChange={props.handleInputChange}
        />
      </form>
    </MDBCol>
  );
}

export default SearchBar;