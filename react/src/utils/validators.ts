export const required = (value: any) => value ? undefined : 'Заполните Поле';

export const maxLength = (max: number) => (value: any) =>
    value && value.length > max ? `Должно быть не более ${max} знаков!` : undefined;

export const maxLength15 = maxLength(15);
export const maxLength100 = maxLength(100);

export const number = (value: any) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const phoneLength9 = (value: any) => value && value.length !== 9 ? 'Должно быть 9 знаков' : undefined;

export const minLength = (min: number) => (value: any) =>
    value && value.length < min ? `Должно быть минимум ${min} знаков!` : undefined;

export const minLength3 = minLength(3);
export const minLength10 = minLength(10);

export const email = (value: any) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;