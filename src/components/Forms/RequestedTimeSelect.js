import React from 'react'
import { FormControl, Select, InputLabel, MenuItem, FormHelperText } from '@mui/material'

const RequestedTimeSelect = (props) => {
    const tenHourAheadValues = Array.from({ length: 10 }, (v, i) => i).map(i => {
        let newUpdateReqTime = new Date()
        //newUpdateReqTime.setHours(1 + newUpdateReqTime.getHours() + Math.floor(newUpdateReqTime.getMinutes() / 60))
        //this.selectedValue = newUpdateReqTime.toISOString()
        //this.timeSlots.push(newUpdateReqTime.toISOString())
        //console.log(newUpdateReqTime)
        //for (let i = 0; i < 10; i++) {
        newUpdateReqTime.setHours(1 * (i + 1) + newUpdateReqTime.getHours() + Math.floor(newUpdateReqTime.getMinutes() / 60))
        newUpdateReqTime.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
        //this.timeSlots.push(newUpdateReqTime.toISOString())
        //}
        return <MenuItem
            key={i}
            value={newUpdateReqTime.toString()}>
            {newUpdateReqTime.toLocaleString('en-US')}
        </MenuItem>
    })

    return (
        <FormControl margin="normal" required fullWidth>
            <InputLabel
                id="select-label"
                style={props.InputLabelProps.style}>Requested Delivery Time</InputLabel>
            <Select
                labelId="select-label"
                id="select"
                defaultValue={props.value}
                value={props.value}
                name={props.name}
                label="Requested Delivery Time"
                onChange={props.onChange}
            >
                <MenuItem value={props.value}>{new Date(props.value).toLocaleString('en-US')}</MenuItem>
                {tenHourAheadValues}
                {/* <MenuItem value="Order Placed">Order Placed</MenuItem>
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Preparing">Preparing</MenuItem>
                <MenuItem value="Ready For Pickup">Ready For Pickup</MenuItem>
                <MenuItem value="Delivery">Out For Delivery</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem> */}
            </Select>
            <FormHelperText id="helper-text">{props.helperText}</FormHelperText>
        </FormControl>
    )
}

export default RequestedTimeSelect
