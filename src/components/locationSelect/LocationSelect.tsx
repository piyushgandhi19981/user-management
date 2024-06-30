import { useMemo, FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { LOCATIONS } from "../../constants/userManagement.constants";
import { LocationsType } from "../../interfaces/userManagement.interface";

interface LocationSelectProps {
  value: string | LocationsType;
  id: string;
  isMulti: boolean;
  onChange: (updatedLocation: string | LocationsType) => void;
}

const LocationSelect: FC<LocationSelectProps> = ({
  value,
  id,
  isMulti = false,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === value) return;
    onChange(event.target.value);
  };

  const inputLabelId = useMemo(() => `${id}_label`, [id]);

  return (
    <FormControl>
      <InputLabel id={inputLabelId}>Location</InputLabel>
      <Select
        labelId={inputLabelId}
        id={id}
        value={value}
        input={<OutlinedInput label="Location" />}
        onChange={handleChange}
        multiple={isMulti}
        placeholder="Location"
      >
        {LOCATIONS.map((location: string) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LocationSelect;
