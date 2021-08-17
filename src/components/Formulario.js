import { useForm } from "./useForm";
import Message from "./Message"
import Loader from "./Loader";



const initialForm = {
    name: '',
    email: '',
    subject:'',
    comments:''

}

const validationsForm = (form)=>{
let errors = {};
let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
let regexComments = /^.{1,255}$/;

if(!form.name.trim()){
    errors.name = 'Name is required'
}else if(!regexName.test(form.name.trim())){
    errors.name = 'this field accepts only letters and blank spaces';
}


if(!form.email.trim()){
    errors.email = 'Email is required'
}else if(!regexEmail.test(form.email.trim())){
    errors.email = 'Incorrect email';
}



if(!form.subject.trim()){
    errors.subject = 'This field is required'
}
if(!form.comments.trim()){
    errors.comments = 'This field is required'
}else if(!regexComments.test(form.comments.trim())){
    errors.comments = 'Must be less or equal to 300 characters';
}



return errors;
}; 

let styles ={
color:'red'
}

const Formulario = () => {
    const {
        form, 
        loading, 
        errors, 
        response, 
        handleChange, 
        handleBlur, 
        handleSubmit

    } = useForm(initialForm, validationsForm)

    return (
<div>
    <div className="container">
    <h1>FORMULARIO DE CONTACTO</h1>
    <form onSubmit={handleSubmit}>
        <input type="text" name ="name"placeholder="name" onBlur={handleBlur} onChange={handleChange} value={form.name} required />
        {errors.name && <p style={styles}>{errors.name}</p>}
        <input type="email" name ="email"placeholder="email" onBlur={handleBlur} onChange={handleChange} value={form.email} required />
        {errors.email && <p style={styles}>{errors.email}</p>}
        <input type="text" name ="subject"placeholder="subject" onBlur={handleBlur} onChange={handleChange} value={form.subject} required />
        {errors.subject && <p style={styles}>{errors.subject}</p>}
        <textarea name="comments"placeholder="message" cols="50" rows="5" onBlur={handleBlur} onChange={handleChange} value={form.comments} required ></textarea>
        {errors.comments && <p style={styles}>{errors.comments}</p>}
        <input  className="submitBtn"type="submit" value="submit"></input>
    </form>
    </div>
    {response &&( <Message msg="Your message has been sent successfully!" bgColor="#198754"/>)}
    {loading && <Loader />}
</div>

      );
}
 
export default Formulario;