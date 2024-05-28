import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, TextField } from "@mui/material"

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
        helperText,
        onChange = (value) => { },
    } = input

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
            return <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormLabel component="legend">Assign responsibility</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={false} onChange={(v) => { }} name="gilad" />
                            }
                            label="Gilad Gray"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={false} onChange={(v) => { }} name="jason" />
                            }
                            label="Jason Killian"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={false} onChange={(v) => { }} name="antoine" />
                            }
                            label="Antoine Llorca"
                        />
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                </FormControl>
            </Box>
        case 'button':
            return <Button
                color="primary"
                variant="contained"
                onClick={() => onChange()}
                sx={{ m: 1, p: 1 }}
            >
                {label}
            </Button>
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
            return value || 0
        case 'date':
            return value || new Date().toISOString().slice(0, 10)
        default:
            return value || ''
    }
}