import { Container, Row } from 'react-bootstrap'
import CustomForm from './components/CustomForm/CustomForm'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Insert.css'
function Insert({ prevData, onClickSubmit }) {
  const [formData, setFormData] = useState({})
  const formFields = {
    'Name': {
      type: 'text',
      placeholder: 'Eg. John Doe',
      pattern: '^[a-zA-Z ]+',
      required: true
    },
    'Roll Number': {
      type: 'number',
      placeholder: 'Eg. 26',
      min: 1,
      required: true
    },
    'E-Mail ID': {
      type: 'email',
      placeholder: 'Eg. johndoe123@gmail.com',
      required: true
    },
    'Phone Number': {
      type: 'tel',
      placeholder: 'Eg. 9876543210',
      pattern: '^[0-9]{10}$',
      required: true
    }
  }
  const receiveFormData = data => setFormData(data)
  useEffect(() => {
    const onReceivedFormData = async () => {
      if (Object.keys(formData).length !== 0) {
        try {
          const response = Object.keys(prevData).length === 0 ?
            await axios.post(`${process.env.REACT_APP_API}/insert`, formData) :
            await axios.put(`${process.env.REACT_APP_API}/update/${prevData['_id']}`, formData)
          console.log(`Record inserted successfully. ${response}`)
          onClickSubmit(null, false)
        } catch (error) {
          console.error(`Error inserting record: ${error}`)
        }
      }
    }
    onReceivedFormData()
  }, [formData, prevData, onClickSubmit])

  return (
    <Container fluid className='cont'>
      <Row
        className='form-row'>
        <CustomForm
          formFields={formFields}
          getFormData={receiveFormData}
          prevData={prevData} />
      </Row>
    </Container>
  )
}

export default Insert