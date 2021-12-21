import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function AdminLogin() {
    
    const [formData, setFormDatatate] = useState()

    const inputFormData=(e)=>{
        console.log(e.target.value);
        setFormDatatate({...formData,[e.target.name]:e.target.value})
    }

    const submitFormData=(e)=>{
        e.preventDefault()
        console.log(formData);
        window.location.href = '/admin/dynamicForm'
    }

    const resetFormData=(e)=>{
        setTimeout(() => {
            window.location.reload()
        }, 1300);
    }
    return (
        <div className='admin-login'>
                    <Form className='admin-form' onSubmit={(e)=>{submitFormData(e)}}>
                         <h1>Admin Login</h1><br></br>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='userName'  onChange={inputFormData} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={inputFormData} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="primary" type="reset" onClick={resetFormData}>
                            Reset
                        </Button>
                    </Form> 
        </div>
    )
}

export default AdminLogin
