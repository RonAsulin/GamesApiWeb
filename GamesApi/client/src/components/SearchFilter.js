import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";


function SearchFilter({ genres, onFilterSubmit, onReset }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [genreFilter, setGenreFilter] = useState("");

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: parseInt(value),
    }));
  };

  const handleGenreFilterChange = (e) => {
    setGenreFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      searchQuery,
      priceRange,
      genreFilter,
    };

    onFilterSubmit(filters);
  };

  const handleReset = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: ""});
    setGenreFilter("");
    onReset();
  };

  return (
    <div style={{width:'91.5%',marginBottom:20}}>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control style={{backgroundColor:'#CDCED6',borderColor:'#000'}}
            type="text"
            placeholder="Game Name"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </Col>
        <Col>
          <Form.Control style={{backgroundColor:'#CDCED6',borderColor:'#000'}}
            type="number"
            placeholder="Min Price"
            name="min"
            value={priceRange.min}
            onChange={handlePriceRangeChange}
          />
        </Col>
        <Col>
            <Form.Control style={{backgroundColor:'#CDCED6',borderColor:'#000'}}
            type="number"
            placeholder="Max Price"
            name="max"
            value={priceRange.max}
            onChange={handlePriceRangeChange}
            />
            
        </Col>
        <Col>
          <Form.Control as="select" value={genreFilter} onChange={handleGenreFilterChange} style={{backgroundColor:'#CDCED6',borderColor:'#000'}}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.genreId} value={genre.genreName}>
                {genre.genreName}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col style={{padding:4}}>
          <Button type="submit">Search</Button>
          <Button style={{marginLeft:10}} variant="danger" onClick={handleReset}>New</Button>
        </Col>
      </Row>
    </Form>
    </div>
  );
}

export default SearchFilter;
