import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Checkbox
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Field } from 'redux-form';
import { debounce, uniq } from 'lodash';
import { DateTimePicker } from '@material-ui/pickers';
import ChipInput from 'material-ui-chip-input';
export const GuardTextField = ({ label, input, meta, meta: { touched, invalid, error }, ...custom }: any) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      size="small"
      {...input}
      {...custom}
    />
  );
};


export const GuardCheckboxField = ({ input }: any) => {
  return (
    <Checkbox
      checked={input.value ? true : false}
      onChange={input.onChange}
    />
  );
};

export const GuardTextAreaField = ({ label, input, rows, ...custom }: any) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      placeholder={label}
      size="small"
      multiline={true}
      rows={rows}
      {...input}
      {...custom}
    />
  )
};

const renderFormHelper = ({ touched, error }: any) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export const GuardSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  defaultValue,
  ...custom
}: any) => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const inputLabel = React.useRef<any>(null);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);
  return (
    <FormControl variant="outlined" margin="normal" required fullWidth error={Boolean(touched && error)}>
      <InputLabel ref={inputLabel} htmlFor={input.name}>
        {label}
      </InputLabel>
      <Select
        labelWidth={labelWidth}
        {...input}
        {...custom}
        inputProps={{
          name: input.name,
          id: input.name,
        }}
      >
        {children}
      </Select>
      {renderFormHelper({ touched, error })}
    </FormControl>
  );
};

export const GuardAutoCompleteField = ({
  label,
  name,
  onSearch,
  value,
  onChange,
  field = 'name',
  disabled,
  required,
  size,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [_value, setValue] = React.useState(null);
  const [options, setOptions] = React.useState<any[]>([]);
  const handleChange = React.useCallback(
    debounce(async (_: any, query: string) => {
      if (!open) {
        return;
      }
      setLoading(true);
      try {
        const {
          data: { data },
        } = await onSearch({ query });
        setOptions(data.map(({ attributes }: any) => attributes));
      } finally {
        setLoading(false);
      }
    }, 300),
    [open],
  );
  React.useEffect(() => {
    if (open) {
      handleChange(null, '');
    }
  }, [open, handleChange]);
  React.useEffect(() => {
    setValue(value);
  }, [value]);
  return (
    <Autocomplete
      id={`${name}-autocomplete`}
      style={{ width: '100%' }}
      open={open}
      disabled={disabled}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => {
        return option[field] === value[field];
      }}
      getOptionLabel={option => {
        return (option && option[field]) || '';
      }}
      options={options}
      loading={loading}
      onChange={onChange}
      value={_value}
      onInputChange={handleChange}
      size={size}
      renderInput={params => {
        return (
          <Field
            {...params}
            loading={loading}
            name={name}
            label={label}
            required={required}
            component={AutoCompleteTextField}
          />
        );
      }}
    />
  );
};

const AutoCompleteTextField = ({ loading, input, ...params }: any) => {
  return (
    <GuardTextField
      {...params}
      {...input}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  );
};

export const GuardDateField = ({
  label,
  input: { onBlur, value, ...inputProps },
  meta: { touched, invalid, error },
  ...custom
}: any) => {
  const onChange = (date: any) => {
    Date.parse(date) ? inputProps.onChange(date.toISOString()) : inputProps.onChange(null);
  };
  return (
    <DateTimePicker
      {...inputProps}
      {...custom}
      value={value ? new Date(value) : null}
      onChange={onChange}
      disablePast
      ampm={false}
      format="YYYY/MM/DD HH:mm"
      inputVariant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      error={touched && invalid}
      helperText={touched && error}
    />
  );
};

export const GuardChipField = ({ label, required, meta: { touched, invalid, error }, input }: any) => {
  return (
    <ChipInput
      variant="outlined"
      margin="normal"
      fullWidth
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      required={required}
      {...input}
      onAdd={(addedChip: any) => {
        const values = uniq([...(input.value || []), addedChip]);
        input.onChange(values);
      }}
      onDelete={(deletedChip: any) => {
        const values = (input.value || []).filter((value: any) => value !== deletedChip);
        input.onChange(values);
      }}
      onBlur={() => input.onBlur()}
    />
  );
};
