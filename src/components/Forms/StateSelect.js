import React from 'react'
import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'

const StateSelect = (props) => {
    return (
        <FormControl margin="normal" required fullWidth>
            <InputLabel
                id="select-label"
                style={props.InputLabelProps.style}>State</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                value={props.value}
                name={props.name}
                label="State"
                onChange={props.onChange}
            >
                <MenuItem value="">N/A</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DC">District of Columbia</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="PR">Puerto Rico</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
            </Select>
            <FormHelperText id="helper-text">{props.helperText}</FormHelperText>
        </FormControl>
    )
}

export default StateSelect
