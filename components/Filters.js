import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import SearchInput from './SearchInput';
import SelectField from '../components/form-control/SelectField'
import { useSelector } from 'react-redux';
const Filters = (props) => {
    const {filters , setFilters , setPage} = props;
    const categories = useSelector(state => state.categories.categories)
    const typingTimeoutRef = useRef(null);

    const [searchField , setSearchField] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("")


    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        setFilters({...filters , category: e.target.value, page: 1})
        setPage(1);
      };

    const handleChangeSort = (e) => {
        setSort(e.target.value);
        setFilters({...filters , sort: e.target.value, page: 1})
        setPage(1);
      };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchField(e.target.value);
        
        if(typingTimeoutRef.current) { 
            clearTimeout(typingTimeoutRef.current);
        };
        typingTimeoutRef.current = setTimeout(() => {
            setFilters({...filters, search: value})
        }, 500)
    }
    
    console.log(sort);

    return (
        <Box sx={{display: 'flex' , flexDirection: 'column' , px: 2}}>
        <Box sx={{my: 4,  display: 'flex' , alignItems: 'center'}}>
                <Box> 
                <SearchInput value={searchField} onChange={handleSearchChange}/>
                </Box>
        </Box>
        <Box sx={{display: 'flex' , alignItems: {
            xs: 'flex-start',
            sm: 'center'
        } , justifyContent: 'space-between', mt:2 , flexDirection: {
            xs: 'column',
            sm: 'row'
        }, gap: {
            xs: 2,
            sm: 0
        }}}>
        <Box sx={{width: {
            xs: '100%',
            sm: 200
        }}}>
            <FormControl fullWidth variant='outlined' >
  <InputLabel id="demo-simple-select-label">Categories</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={categories}
    label="Categories"
    onChange={handleChangeCategory}
  >
   <MenuItem value="all">All Products</MenuItem>
    {categories.map((ct, idx) => (
        <MenuItem key={idx} value={ct.name}>{ct.name}</MenuItem>
    ))}
  </Select>
                </FormControl>
            </Box> 


            <Box sx={{width: {
            xs: '100%',
            sm: 200
        }}}>
            <FormControl fullWidth variant='outlined' >
  <InputLabel id="demo-simple-select-label-sort">Sort</InputLabel>
  <Select
    labelId="demo-simple-select-label-sort"
    id="demo-simple-select-sort"
    value={sort}
    label="Sort"
    onChange={handleChangeSort}
  >
    
        <MenuItem value="-createdAt">Newest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        <MenuItem value="-sold">Best sales</MenuItem>
        <MenuItem value="-price">High - Low</MenuItem>
        <MenuItem value="price">Low - High</MenuItem>
   
  </Select>
                </FormControl>
            </Box> 
        </Box>
        
        </Box>
    );
};

export default Filters;

