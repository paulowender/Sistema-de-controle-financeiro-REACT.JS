import { Button } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getField, getValue } from '../../helpers/input';
import Title from './Title';


export default function Form({
  title = 'Add Transaction',
  inputs = [],
  onCreate = (item) => { console.log('onCreate', item) },
  onEdit = (item) => { console.log('onEdit', item) },
  id = null
}) {

  const [fields, setFields] = useState([]);

  const prepareFields = () => {
    let fields = [];
    inputs.forEach((input, index) => {
      input.onChange = (value) => {
        let newFields = [...fields];
        newFields[index].value = value;
        setFields(newFields);
      }
      input.value = getValue(input)

      fields.push(input)
    })

    setFields(fields)
  }

  useEffect(() => {
    prepareFields()
  }, []);

  const handleSave = () => {
    const values = fields.map((field) => field.required ? field.value || false : true)

    if (values.includes(false)) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const item = {}
    fields.forEach((field, index) => {
      item[field.name] = field.value
    })

    if (id) {
      item.id = id
      onEdit(item)
    } else {
      onCreate(item)
    }

    // clear fields
    prepareFields()
  };

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <div className='d-flex flex-row justify-content-between align-items-center w-100'>
        {fields.map((field, index) => {
          const props = { key: index, sx: { ml: 1 } }
          return React.cloneElement(getField(field), props)
        })}
        <Button
          color="primary"
          variant="contained"
          onClick={handleSave}
          sx={{ m: 1, p: 1 }}
        >
          {title}
        </Button>
      </div>
    </React.Fragment>
  );
}
