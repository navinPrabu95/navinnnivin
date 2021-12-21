import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { Form, Row, Col, Button, Table, Breadcrumb } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import './AdminStyle.css'


export default function DynamicForm() {
    const [dynamicData, setdynamicData] = useState({
        name: "",
        validity: "",
        status: "",
        image: "",
        users: ""
    })
    const [fieldsData, setfieldsData] = useState([])


    const tableMap = useMemo(() => {
        return fieldsData.length > 0 ? fieldsData.map((data, index) => {
            return <tr key={data.name + index}>
                <td><Form.Control type="text" onChange={(e) => { fieldsData[index][e.target.name] = e.target.value }} name="name" defaultValue={data.name} placeholder="Enter field name" required /></td>
                <td><Form.Select name='type' onChange={(e) => { fieldsData[index][e.target.name] = e.target.value }} defaultValue={data.type ? data.type : "default"} aria-label="Default select example" required>
                    <option value="default" disabled>Select Type</option>
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="date">Date</option>
                    <option value="select">Select</option>
                    <option value="multiSelect">MultiSelect</option>
                    <option value="HTML">HTML</option>
                </Form.Select>
                </td>
                <td><Form.Control as="textarea" defaultValue={data.options} onChange={(e) => { fieldsData[index][e.target.name] = e.target.value }} name="options" placeholder="enter options or description" required /></td>
                <td style={{ textAlign: "center" }}> <Form.Check
                    defaultChecked={data.isRequired}
                    type="checkbox"
                    name="isRequired"
                    onChange={(e) => { fieldsData[index][e.target.name] = e.target.checked }}
                    required
                /></td>
                <td style={{ textAlign: "center" }}>
                    <Form.Check
                        defaultChecked={data.isPublic}
                        type="checkbox"
                        name="isPublic"
                        onChange={(e) => { fieldsData[index][e.target.name] = e.target.checked }}
                        required
                    /></td>
                <td style={{ textAlign: "center" }}>
                    <Form.Check
                        defaultChecked={data.isPrintable}
                        type="checkbox"
                        name="isPrintable"
                        onChange={(e) => { fieldsData[index][e.target.name] = e.target.checked }}
                        required
                    /></td>
                <td>
                    <Form.Control type="number"
                        defaultValue={data.sortOrder}
                        onChange={(e) => { fieldsData[index][e.target.name] = e.target.value }} name="sortOrder" placeholder="Enter order" required />
                </td>
                <td>
                    <div style={{ display: "flex" }}>
                        <Button variant="warning" style={{ marginRight: "4px" }}
                            onClick={() => {
                                fieldsData.splice(index, 1);
                                setfieldsData([...fieldsData])
                            }}
                        >-</Button>
                        {index === fieldsData.length - 1 && <Button variant="success"
                            onClick={() => {
                                setfieldsData([...fieldsData, {
                                    name: "",
                                    type: "",
                                    options: "",
                                    isPublic: false,
                                    isRequired: false,
                                    isPrintable: false,
                                    sortOrder: ""
                                }])
                            }}
                        >+</Button>}
                    </div>
                </td>
            </tr>
        }) : <tr>
            <td colSpan={9} style={{ textAlign: 'center' }}>
                <Button variant="success"
                    onClick={() => {
                        setfieldsData([{
                            name: "",
                            type: "",
                            options: "",
                            isRequired: false,
                            isPublic: false,
                            isPrintable: false,
                            sortOrder: ""
                        }])
                    }}
                >Add new</Button></td>
        </tr>
    }, [fieldsData.length])

    const submitDynamicForm =  async (e) => {
        e.preventDefault()

        console.log(dynamicData);

        const data = new FormData()

        data.append('file', dynamicData.image)
        data.append('upload_preset', 'mediaTest')
        data.append('cloud_name', 'naveen1995')

        const resultData =  await axios.post('https://api.cloudinary.com/v1_1/naveen1995/image/upload', data)
            .then(result => {
                

                axios.post('http://localhost:7000/form/new', {
                    name: dynamicData.name,
                    status: dynamicData.status,
                    users: dynamicData.users.split(","),
                    validity: dynamicData.validity,
                    image: result.data.url,
                    fields: fieldsData
                }).then((response) => {
                    toast.success(response.data.success)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1300);
                }).catch((error) => {
                    if (error.response.data.error) {
                        toast.error(error.response.data.error)
                    } else {
                        toast.error("please try again")
                    }
                })
            })
    }

    return (
        <div style={{ width: "80%", margin: "2% 10%", }}>
            <ToastContainer />
            <div className='form-title'>
                <div className='Acontent-left'>
                    <p>Welcome</p>
                    <button>Logout</button>
                </div>
                <div className='Acontent-right'>
                    <h1>Create New Form</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin/dynamicForm" >DynamicForms</Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Create New Form
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div className='dynamic-form'>
                <Form onSubmit={(e) => { submitDynamicForm(e) }}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Form Name</Form.Label>
                            <Form.Control type="text" onChange={(e) => { setdynamicData({ ...dynamicData, [e.target.name]: e.target.value }) }} name="name" placeholder="Enter form name" required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridValid">
                            <Form.Label>Validity</Form.Label>
                            <Form.Control type="date" name="validity" onChange={(e) => { setdynamicData({ ...dynamicData, [e.target.name]: e.target.value }) }} placeholder="Enter form validity" required />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridStatus">
                            <Form.Label>Form Status</Form.Label>
                            <Form.Select name='status' onChange={(e) => { setdynamicData({ ...dynamicData, [e.target.name]: e.target.value }) }} defaultValue="default" aria-label="Default select example" required>
                                <option value="default" disabled>Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridImage">
                            <Form.Label>Banner Image</Form.Label>
                            <Form.Control onChange={(e) => { setdynamicData({ ...dynamicData, [e.target.name]: e.target.files[0]}) }} type="file" name="image" required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAccess">
                            <Form.Label>Accessible User</Form.Label>
                            <Form.Control as="textarea" onChange={(e) => { setdynamicData({ ...dynamicData, [e.target.name]: e.target.value }) }} style={{ height: '70px' }} name="users" placeholder="enter accessible users" required />
                        </Form.Group>
                    </Row>
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Field Name</th>
                                <th>Field Type</th>
                                <th>Options | Desc</th>
                                <th>Is Required</th>
                                <th>Is Public</th>
                                <th>Is Printable</th>
                                <th>Sort Order</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableMap}
                        </tbody>
                    </Table>
                    <Button variant="primary" type="submit">
                        Create New Form
                    </Button>
                </Form>
            </div>
        </div>
    )
}
