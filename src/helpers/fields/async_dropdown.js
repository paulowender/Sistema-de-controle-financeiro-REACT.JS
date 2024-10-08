import { Box, FormControl, FormHelperText, InputLabel, LinearProgress, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { tr } from "../../lang";

const AsyncDropdown = ({ id, label, value, onFetch, onChange, fetch = () => { } }) => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch().then((data) => {
            if (onFetch) {
                const items = onFetch(data)
                setItems(items)
            } else {
                setItems(data)
            }
            setLoading(false)
        })
    }, [])

    const LoadingHelper = () => {
        return (
            <FormHelperText>
                <Tooltip title={`${tr('fetching')} ${label}`}>
                    <LinearProgress aria-label="Loading" />
                </Tooltip>
            </FormHelperText>
        )
    }

    const handleChange = (e) => {
        const item = items.find((i) => i.value === e.target.value)

        onChange(item)
    }

    return (
        <FormControl sx={{ ml: 1, minWidth: 120 }} disabled={loading}>
            <InputLabel id={`field-${id}`}>{label}</InputLabel>
            <Select
                labelId={`field-${id}`}
                id={`field-${id}`}
                value={value || ''}
                label={label}
                onChange={handleChange}
            >
                {items.map(({ value, label, prefix }) => (
                    <MenuItem key={value} value={value}>
                        {prefix && (
                            <Box
                                sx={{
                                    display: 'inline',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1
                                }}>
                                {prefix}
                            </Box>
                        )}
                        {label}
                    </MenuItem>
                ))}
            </Select>
            {loading && <LoadingHelper />}
        </FormControl>
    );
}

export default AsyncDropdown;