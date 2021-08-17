import {useState} from 'react';
import { helpHttp } from './helper/helperHttp';

export const  useForm=(initialForm, validateForm)=>{
    const [form, setForm] = useState(initialForm);
    const [errors, setError] = useState({});
    const [loading,setLoading] = useState(false);
    const [response,setResponse] = useState(null);

    const handleChange =(e)=>{
const{name, value} = e.target;
setForm({
    ...form, [name]:value

});

    };

    const handleBlur =(e)=>{
handleChange(e);
setError(validateForm(form));

    };

    const handleSubmit =(e)=>{
e.preventDefault();
setError(validateForm(form));

if(Object.keys(errors).length === 0){
alert('Sending information');
setLoading(true);
helpHttp().post("https://formsubmit.co/ajax/virginia.morilla@gmail.com", {
    body:form,
    headers:{"Content-Type":"application/json",
    Accept:"application/json",
},
}).then((res)=>{setLoading(false);
setResponse(true);
setForm(initialForm);
setTimeout(()=>setResponse(false),5000);


});
}else{
    return;
}

    };

    return{
        form, 
        loading, 
        errors, 
        response, 
        handleChange, 
        handleBlur, 
        handleSubmit
    };
};