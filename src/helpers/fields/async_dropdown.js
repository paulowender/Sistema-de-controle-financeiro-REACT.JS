import { Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { tr } from "../../lang";

const AsyncDropdown = ({ id, label, value, onChange, options = [], fetch = () => { } }) => {

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!options.length) {
            setLoading(true);
            fetch().then((data) => {
                setItems(data);
                setLoading(false);
            })
        } else {
            setItems(options);
        }
    }, [fetch, options]);

    const getOptions = () => {
        return items.map(({ value, label }) => {
            return <MenuItem key={value} value={value}>{label}</MenuItem>
        })
    }

    //     return <LoadingButton
    //     size="small"
    //     onClick={() => setLoading(true)}
    //     loading={loading}
    //     loadingIndicator="Loading..."
    //     variant="outlined"
    //   >
    //     <span>Fetch data</span>
    //   </LoadingButton>

    return (
        <FormControl sx={{ m: 1, p: 1 }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <InputLabel id={`field-${id}`}>{label}</InputLabel>
            <Select
                labelId={`field-${id}`}
                id={`field-${id}`}
                value={value}
                label={label}
                onChange={e => onChange(e.target.value)}
            >
                <MenuItem value=''>
                    {tr('choose')}
                </MenuItem>
                {getOptions()}
            </Select>
        </FormControl>
    );
}

export default AsyncDropdown;