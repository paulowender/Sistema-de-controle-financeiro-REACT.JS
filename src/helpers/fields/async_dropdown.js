import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { tr } from "../../lang";

const AsyncDropdown = ({ id, label, value, onChange, fetch = () => { } }) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch().then((data) => {
            setItems(data)
            setLoading(false)
        })
    }, [])

    if (loading) return (
        <FormControl sx={{ m: 1, minWidth: 120, alignItems: 'center' }}>
            <Tooltip title={`${tr('fetching')} ${label}`}>
                <CircularProgress disableShrink aria-label="Loading" />
            </Tooltip>
        </FormControl>
    )

    return (
        <FormControl sx={{ ml: 1, minWidth: 120 }}>
            <InputLabel id={`field-${id}`}>{label}</InputLabel>
            <Select
                labelId={`field-${id}`}
                id={`field-${id}`}
                value={value || ''}
                label={label}
                onChange={e => onChange(e.target.value)}
            >
                {items.map(({ value, label }) => {
                    return <MenuItem key={value} value={value}>{label}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default AsyncDropdown;