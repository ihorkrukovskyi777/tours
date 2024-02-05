// if (value.length < 1) errorMsg = 'This field is requared'
// if (value.length > 50) errorMsg = '"First [name]" max length is 50 symbols';
// if (hasNumber.test(value)) errorMsg = '"First [name]" should be without numbers';

const hasNumber = /\d/;
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const minLength = ({val, minLength})=> {

    return val.length > minLength ? true : 'ERROR_VALIDATION'
}
const maxLength = ({val, maxLength})=> {
    return maxLength > val.length  ? true : 'ERROR_VALIDATION_MAXLENGTH'
}
const withoutNumbers = ({val})=> {
    return !hasNumber.test(val) ? true : 'ERROR_VALIDATION_WITHOUT_NUMBER'
}

const email = ({val})=> {
    return validEmailRegex.test(val) ? true : 'email_error'
}

const phone = (arr)=> {
    let val = arr.val.val;
    let arrNumbers = arr.val.mask.toString();

    const valuePhone = val.toString().split('').filter(e => e.trim().length).join('').length;
    const validateArray = arrNumbers.split(',').map(i => Number(i));
    return validateArray.includes(valuePhone) === true ? true : 'phone_number_error';
}

const strategyValid = {
    minLength , maxLength , withoutNumbers , email , phone
}

export const valid = (val, types) => {
    for (const type of types) {
        const isValid = strategyValid[type.type]({...type, val})
        if(isValid !== true) {
            return isValid
        }
    }
    return false
}


export const validationFirstName = (val)=> {
    return valid(val , [{type: 'minLength' , minLength: 0} , {type: 'maxLength' , maxLength: 50} , {type: 'withoutNumbers'}])
}

export const validationEmail = (val)=> {
    return valid(val , [{type: 'email'}])
}

export const validationPhone = (val)=> {

    return valid(val , [{type: 'phone'}])
}