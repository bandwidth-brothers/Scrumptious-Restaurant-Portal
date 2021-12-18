import React from 'react'
import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'

const PreparationStatusSelect = (props) => {
    return (
        <FormControl margin="normal" required fullWidth>
            <InputLabel
                id="select-label"
                style={props.InputLabelProps.style}>Status</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                defaultValue={props.value}
                value={props.value}
                name={props.name}
                label="Status"
                onChange={props.onChange}
            >
                <MenuItem disabled value="Order Placed">Order Placed</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Preparing">Preparing</MenuItem>
                <MenuItem value="Ready For Pickup">Ready For Pickup</MenuItem>
                <MenuItem disabled value="Delivery">Out For Delivery</MenuItem>
                <MenuItem disabled value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
            <FormHelperText id="helper-text">{props.helperText}</FormHelperText>
        </FormControl>
    )
}

export default PreparationStatusSelect
