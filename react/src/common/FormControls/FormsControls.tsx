import React from 'react';
import {createTextMask} from 'redux-form-input-masks';
import classNames from 'classnames/bind';
import style from './FormControl.module.css';

export const phoneMask = createTextMask({
    pattern: '8-(099) 999-9999',
});

interface I_meta {
    touched: boolean,
    error: string | undefined,
    warning: string | undefined
}

interface I_renderFieldProps {
    input: any
    label: string
    type: string
    meta: I_meta
}

interface I_renderFormWrapperProps {
    label: string
    required: boolean
    meta: I_meta
    children: any
}

interface I_renderDropDownProps extends I_renderFieldProps {
    times: string[]
}

export const ReduxFormWrapper = ({
                                     label, required,
                                     meta: {touched, error, warning},
                                     children
                                 }: I_renderFormWrapperProps) => {
    let cx = classNames.bind(style);
    let classForField = cx(style.fieldWrapper, {
        success: touched && !error && !warning,
        error: error && touched,
    });

    return (
        <div className={classForField}>
            <span className={required ? style.titleRequired : style.title}>{label}</span>
            {children}
            {
                (touched && error) && <span className={style.errorMessage}>{error}</span>
            }
        </div>
    )
};

export const renderField = ({input, label, type, meta}: any) => {
    return (
        <ReduxFormWrapper required={type !== "radio"} label={label} meta={meta}>
            <input {...input} type={type}/>
        </ReduxFormWrapper>
    )
};

export const RenderTextarea = ({input, label, type, meta}: any, ...props: any) => {
    return (
        <ReduxFormWrapper required={false} label={label} meta={meta}>
            <textarea {...input} type={type}/>
        </ReduxFormWrapper>
    )
};
export const DropDownSelect = ({input, label, times, meta}: I_renderDropDownProps) => {
    const renderSelectOptions = (option: string, index: number) => (
        <option key={option} value={index}>{option}</option>
    );
    return (
        <ReduxFormWrapper required={true} label={label} meta={meta}>
            <select {...input}>
                <option value={""}>Выбрать время</option>
                {times.map(renderSelectOptions)}
            </select>
        </ReduxFormWrapper>
    );
};
