import { format } from 'date-fns';
import React, { useState } from 'react';

import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface CustomDateTimePickerProps {
  formattedDateTime: string | null;
  setFormattedDateTime: React.Dispatch<React.SetStateAction<string | null>>;
}

const CustomDateTimePicker = ({
  setFormattedDateTime,
  formattedDateTime,
}: CustomDateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [second, setSecond] = useState<string>('00');
  const [period, setPeriod] = useState<string>('오전');

  const padZero = (value: string) => value.padStart(2, '0'); // 앞에 0을 추가하는 함수

  const updateFormattedDateTime = (
    date: Date | null,
    hour: string,
    minute: string,
    second: string,
    period: string,
  ) => {
    if (!date) return;
    setFormattedDateTime(
      `${format(date, 'yyyy-MM-dd')} ${period} ${hour}:${minute}:${second}`,
    );
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    updateFormattedDateTime(date, hour, minute, second, period);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    const name = e.target.name;

    if (name === 'hour') setHour(value);
    else if (name === 'minute') setMinute(value);
    else if (name === 'second') setSecond(value);
  };

  const handleBlur = (name: string, value: string) => {
    const paddedValue = padZero(value);

    if (name === 'hour') setHour(paddedValue);
    else if (name === 'minute') setMinute(paddedValue);
    else if (name === 'second') setSecond(paddedValue);

    updateFormattedDateTime(selectedDate, hour, minute, second, period);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    updateFormattedDateTime(selectedDate, hour, minute, second, value);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">날짜와 시간 선택</h2>

      <div className="space-y-4">
        <Input
          readOnly
          placeholder="날짜와 시간을 선택하세요"
          value={formattedDateTime}
          className="cursor-pointer w-full"
        />
        <div className="flex items-center justify-center w-full">
          <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} />
        </div>

        <div className="space-y-2">
          <div id="time-select" className="flex items-center space-x-2">
            {/* AM/PM Select */}
            <Select onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[25%]">
                <SelectValue placeholder={period} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="오전">오전</SelectItem>
                <SelectItem value="오후">오후</SelectItem>
              </SelectContent>
            </Select>
            {/* Hour Input */}
            <Input
              type="text"
              value={hour}
              name="hour"
              onChange={handleTimeChange}
              onBlur={(e) => handleBlur('hour', e.target.value)}
              className="w-[25%] text-center"
              maxLength={2}
            />
            {/* Minute Input */}
            <Input
              type="text"
              value={minute}
              name="minute"
              onChange={handleTimeChange}
              onBlur={(e) => handleBlur('minute', e.target.value)}
              className="w-[25%] text-center"
              maxLength={2}
            />
            {/* Second Input */}
            <Input
              type="text"
              value={second}
              name="second"
              onChange={handleTimeChange}
              onBlur={(e) => handleBlur('second', e.target.value)}
              className="w-[25%] text-center"
              maxLength={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDateTimePicker;
