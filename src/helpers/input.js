import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AsyncDropdown from './fields/async_dropdown';

export const getField = (input) => {
    const {
        id,
        type,
        label,
        name,
        value,
        required,
        disabled,
        readOnly,
        onChange = (value) => { },
        options = [],
        fetch,
        onFetch = (items) => { return items }
    } = input

    const getOptions = () => {
        return options.map((option) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.prefix && <span>{option.prefix}</span>}
                    {option.label}
                </MenuItem>
            )
        })
    }

    switch (type) {
        case 'text':
        case 'number':
        case 'date':
            return <TextField
                required={required}
                disabled={disabled}
                id={`field-${id}`}
                label={label}
                defaultValue={value}
                InputProps={{ readOnly }}
                // helperText={helperText}
                type={type}
                onChange={e => onChange(e.target.value)}
            />
        case 'checkbox':
            return <FormControlLabel
                required={required}
                sx={{ ml: 1, p: 1 }}
                control={
                    <Checkbox
                        required={required}
                        disabled={disabled}
                        id={`field-${id}`}
                        name={name}
                        onChange={e => onChange(e.target.checked)}
                        checked={value}
                    />
                }
                label={label}
            />
        case 'checkboxgroup':
            return <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
                <FormLabel component='legend'>Assign responsibility</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={false} onChange={(v) => { }} name='gilad' />
                        }
                        label='Gilad Gray'
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={false} onChange={(v) => { }} name='jason' />
                        }
                        label='Jason Killian'
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={false} onChange={(v) => { }} name='antoine' />
                        }
                        label='Antoine Llorca'
                    />
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
            </FormControl>
        case 'button':
            return <Button
                color='primary'
                variant='contained'
                onClick={() => onChange()}
                sx={{ m: 1, p: 1 }}
            >
                {label}
            </Button>
        case 'dropdown':
            if (fetch) {
                return <AsyncDropdown
                    id={id}
                    label={label}
                    value={value}
                    onChange={onChange}
                    fetch={fetch}
                    onFetch={onFetch}
                />
            }
            return (
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`field-${id}`}>{label}</InputLabel>
                    <Select
                        labelId={`field-${id}`}
                        id={`field-${id}`}
                        value={value || ''}
                        label={label}
                        onChange={e => onChange(e.target.value)}
                    >
                        {getOptions()}
                    </Select>
                </FormControl>
            )
        default:
            console.warn(`input type ${type} not found`)
            return <></>
    }
}

export const getValue = (input) => {
    const {
        type,
        value
    } = input
    switch (type) {
        case 'checkbox':
            return value || false
        case 'dropdown':
            return value || ''
        case 'date':
            return value || new Date().toISOString().slice(0, 10)
        default:
            return value || ''
    }
}