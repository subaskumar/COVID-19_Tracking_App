// import React, { useState, useEffect } from "react";
// import { FormControl } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// const CuntryFilter = () =>{
//     const [country, setInputCountry] = useState("worldwide");
//     const [countries, setCountries] = useState([]);
//     const onCountryChange = (event) =>{

//     }

//     return (
//         <FormControl className="app__dropdown">
//         <TextField
//             id="outlined-select-currency"
//             select
//             label="Select"
//             value={country}
//             onChange={onCountryChange}
//             helperText="Please select your currency"
//           >
//             {countries.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>

//       </FormControl>
//     )
// }
// export default CuntryFilter;