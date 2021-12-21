import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { Form, Row, Col, Breadcrumb } from 'react-bootstrap';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import {CKEditor} from '@ckeditor/ckeditor5-react'
// import ImageEditor from '@toast-ui/react-image-editor'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';




const EditForm = () => {
    const { id } = useParams()
    const [formData, setformData] = useState({ fields: [] })
    const [userData, setuserData] = useState({})
    const [crop, setCrop] = useState();

    const imageEditor = React.createRef();

    const mail = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        axios.get(`http://localhost:7000/form/${id}`).then(response => {
            setformData(response.data)
        }).catch(error => {
            toast.error("Please try again")
        })
    }, [])

    useEffect(() => {
        formData.fields.sort((num1, num2) => {
            return num1.sortOrder - num2.sortOrder
        })
    }, [formData])

    const logoutForm = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    // const onSetCrop=(crop)=>{
    //     setCrop(crop)
    // }
    

    const radioField = (data, index) => {
        const radioOpt = data.options.split(',')
        return <Form.Group key={data.name + index} as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
                {data.name}
            </Form.Label>
            <Col sm="10">
                {
                    radioOpt.map((data1, index1) => {
                        return <Form.Check
                            key={data1 + index}
                            required={data.isRequired}
                            type={data.type}
                            name={data.name}
                            value={data1}
                            label={data1}
                            id={data1 + index1}
                        />
                    })
                }
            </Col>
        </Form.Group>
    }

    const multiSelectField = (data, index) => {
        const ckeckBoxOpt = data.options.split(',')

        return <Form.Group key={data.name + index} as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
                {data.name}
            </Form.Label>
            <Col sm="10">
                {
                    ckeckBoxOpt.map((data1, index1) => {
                        return <Form.Check
                            key={data1 + index}
                            required={data.isRequired}
                            type="checkbox"
                            value={data1}
                            label={data1}
                            id={data1 + index1}
                        />
                    })
                }
            </Col>
        </Form.Group>
    }

    const selectField = (data, index) => {
        const selectOpt = data.options.split(',')
        return <Form.Group key={data.name + index} as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
                {data.name}
            </Form.Label>
            <Col sm="10">
                <Form.Select defaultValue="default" aria-label="Default select example">
                    <option value="default" disabled>Choose option</option>
                    {selectOpt.map((data1, index1) => {
                        return <option key={data1 + index1} value={data1}>{data1}</option>
                    })}
                </Form.Select>
            </Col>
        </Form.Group>
    }

    const htmlField = (data, index) => {
        return <Form.Group key={data.name + index} as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
                {data.name}
            </Form.Label>
            <Col sm="10">
                {/* <CKEditor
                    editor={ClassicEditor}
                ></CKEditor> */}
            </Col>
        </Form.Group>
    }
    const normalInput = (data, index) => {
        return <Form.Group key={data.name + index} as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
                {data.name}
            </Form.Label>
            <Col sm="10">
                <Form.Control type={data.type} placeholder={data.options} required={data.isRequired} />
            </Col>
        </Form.Group>
    }

    const fieldsMap = useMemo(() => {
        return formData.fields.length > 0 && formData.fields.map((data, index) => {
            let tag;
            switch (data.type) {
                case "select":
                    tag = selectField(data, index)
                    break
                case "HTML":
                    tag = htmlField(data, index)
                    break
                case "radio":
                    tag = radioField(data, index)
                    break
                case "multiSelect":
                    tag = multiSelectField(data, index)
                    break
                default:
                    tag = normalInput(data, index)
                    break;
            }
            return tag
        })
    }, [formData])

    return (
        <div style={{ margin: '1rem auto', width: '80%' }}>
            <div className='form-title'>
                <div className='Acontent-left'>
                    <p>Welcome ,{mail}</p>
                    <button onClick={logoutForm}>Logout</button>
                </div>
                <div className='Acontent-right'>
                    <h1>Basic Details</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin/dynamicForm" active>Forms</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className='EditForm-Content'>
                <div className='EditForm-banner'>
                   <ReactCrop src={formData.image} crop={crop}  onChange={()=>onSetCrop(crop)}/>
                </div>
                <div className='EditForm-fields'>
                    <Form >
                        {fieldsMap}
                    </Form>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default EditForm