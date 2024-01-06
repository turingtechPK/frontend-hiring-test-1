import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import PropTypes from 'prop-types';

const InputField = ({ label, type, value, onChange, required, startAdornment, multiline, rows, placeholder }) => {
  return (
    <>
      <Typography>
        {label}
      </Typography>
      <TextField
        placeholder={placeholder}
        type={type}
        fullWidth
        required={required}
        size="small"
        value={value}
        onChange={onChange}
        multiline={multiline}
        rows={rows}
        InputProps={{
          startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
        }}
      />
    </>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  startAdornment: PropTypes.element,
  multiline: PropTypes.bool,
  required: PropTypes.bool.isRequired,
  rows: PropTypes.number,
};

export default InputField