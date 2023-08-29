import React, { useMemo } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export type PickerEnum = 'date_time' | 'time' | 'date' | 'month' | 'year';

export interface DateTimePickerProps
  extends Omit<ReactDatePickerProps, 'picker' | 'value' | 'onChange' | 'onChangeRaw'> {
  // Deprecated
  picker?: PickerEnum;
  dateTimeMode?: PickerEnum;
  showTime?: boolean;
  // Deprecated
  format?: string;
  dateTimeFormat?: string;
  value?: Date | string;
  onChange?: (value: string, event: React.SyntheticEvent<any> | undefined) => void;
}

const getDatePickerTypeProps: (
  picker: PickerEnum,
  format: string | undefined,
) => Partial<ReactDatePickerProps> = (picker, format) => {
  if (picker === 'date_time') {
    return {
      showTimeSelect: true,
      dateFormat: format || 'MM/dd/yyyy h:mm a',
    };
  }

  if (picker === 'time') {
    return {
      showTimeSelect: true,
      showTimeSelectOnly: true,
      dateFormat: format || 'HH:mm',
    };
  }

  if (picker === 'month') {
    return {
      showMonthYearPicker: true,
      dateFormat: format || 'yyyy/MM',
    };
  }

  if (picker === 'year') {
    return {
      showYearPicker: true,
      dateFormat: format || 'yyyy',
    };
  }

  return {
    dateFormat: format || 'dd/mm/yyyy',
  };
};

// eslint-disable-next-line react/display-name
const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>((props, ref) => {
  const { dateTimeMode = 'date', dateTimeFormat, value, onChange, showTime, ...rest } = props;

  const datePickerProps = useMemo(
    () => getDatePickerTypeProps(dateTimeMode, dateTimeFormat),
    [dateTimeMode, dateTimeFormat],
  );

  const selectedDate = useMemo(() => {
    if (value instanceof Date) {
      return value;
    }
    return value ? new Date(value) : undefined;
  }, [value]);

  const handleOnChange: ReactDatePickerProps['onChange'] = (date, event) => {
    if (date instanceof Date && typeof onChange === 'function') {
      onChange(date.toISOString(), event);
    }
  };

  return (
    <DatePicker
      // @ts-expect-error TODO: Fix typechecking
      customInputRef={ref}
      selected={selectedDate}
      showTimeInput={showTime}
      onChange={handleOnChange}
      {...datePickerProps}
      {...rest}
    />
  );
});

export { DateTimePicker };
