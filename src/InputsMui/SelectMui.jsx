import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectMui({onSelected}) {
  const [age, setAge] = React.useState("nom");

  const handleChange = (event) => {
    onSelected(event.target.value)
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: 220 }} >
        <InputLabel id="demo-simple-select-required-label">Par :</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label="Age *"
          onChange={handleChange}
        
          
        >
          <MenuItem value={"nom"}>Nom</MenuItem>
          <MenuItem value={"prenom"}>Prenoms</MenuItem>
          <MenuItem value={"numeroCin"}>CIN</MenuItem>
          <MenuItem value={"numero"}>Téléphone</MenuItem>
          <MenuItem value={"id"}>Identifiant Sapss</MenuItem>

        </Select>
        
      </FormControl>
    </div>
  );
}