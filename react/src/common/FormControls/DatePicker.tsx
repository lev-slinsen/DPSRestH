import React, {useState} from 'react';
import style from './FormControl.module.css';
import moment from 'moment';
import 'antd/dist/antd.css';
import './antdCustom.css';
import FormItem, {FormItemProps} from "antd/lib/form/FormItem";
import locale from 'antd/es/date-picker/locale/ru_RU';
import DatePicker from "antd/lib/date-picker";
import classNames from 'classnames/bind';
import {Alert, Popover} from "antd";

interface I_datePickerProps extends FormItemProps {
    input: {
        onChange: (e: any, v?: any) => void,
        value: moment.Moment | string | undefined
    }
    onOpenChange?: (status: boolean) => void;
    label: string
    meta: { error: any, warning: any, valid: any }
    dates: string[]
}

export const RenderDateTimePicker: React.FC<I_datePickerProps> = ({
                                                                      label,
                                                                      meta: {error, warning, valid},
                                                                      input: {onChange, value},
                                                                      dates,
                                                                      ...props
                                                                  }: I_datePickerProps) => {
    const dateFormat = 'YYYY-MM-DD';
    let cx = classNames.bind(style);
    let [isTouched, setIsTouched] = useState(false);

    const disabledDate = (current: any): boolean => {
        if (dates.indexOf(current.format(dateFormat)) >= 0) {
            return true
        }
        return current && current < moment().endOf('day');
    };

    const getValidateStatus = ({isTouched, error, warning, valid}: any) => {
        if (isTouched) {
            if (error) return "error";
            if (warning) return "warning";
            if (valid) return "success";
        }
        return undefined;
    };

    const valueToMoment = (value: moment.Moment | string | undefined, dateFormat: string) => {
        if (value === undefined || value === null || value === "") {
            return undefined;
        }
        return moment(value, dateFormat);
    };

    let classForField = cx(style.fieldWrapper, {
        success: !error && valid,
        error: error && isTouched,
    });

    return (
        <>
            <FormItem
                label={label}
                validateStatus={getValidateStatus({isTouched, error, warning, valid})}
                required={true}
                className={classForField}
            >
                <DatePicker
                    onChange={(e: any, v) => {
                        e !== null &&
                        onChange(e.format(dateFormat));
                    }}
                    value={valueToMoment(value, dateFormat)}
                    format={dateFormat}
                    {...props}
                    locale={locale}
                    defaultValue={moment().endOf('day')}
                    disabledDate={disabledDate}
                    showTime={false}
                    onOpenChange={() => {
                        setIsTouched(true)
                    }}
                />

            </FormItem>
            {
                (isTouched && error) &&
                <span style={{marginTop: '-24px', marginBottom: '24px'}}
                      className={style.errorMessage}>{error}</span>
            }
        </>
    )
};


