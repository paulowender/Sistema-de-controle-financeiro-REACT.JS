import { Close, SaveOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { getField, getValue } from '../../helpers/input';
import Title from './Title';


export default function Form({
  title = 'Form',
  inputs = [],
  onCreate = (item) => { console.log('onCreate', item) },
  onEdit = (item) => { console.log('onEdit', item) },
  selected = null,
  buttonText = 'Save',
  onCancel = () => { console.log('onCancel') },
}) {

  const [fields, setFields] = useState({});

  const prepareFields = useCallback(async () => {
    let fields = {};
    inputs.forEach((input) => {
      input.onChange = (value) => {
        input.value = value
        const updated = { ...fields }
        updated[input.name] = input

        setFields(updated)
      }
      input.value = selected ? selected[input.name] : getValue(input)
      fields[input.name] = input
    })

    setFields(fields)
  }, [inputs]);

  useEffect(() => {
    prepareFields()
  }, [prepareFields]);

  const handleSave = () => {
    const values = Object.values(fields).map((field) => field.required ? field.value || false : true)

    if (values.includes(false)) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const item = {}
    Object.values(fields).forEach((field) => {
      item[field.name] = field.value
    })

    if (selected) {
      onEdit({
        ...selected,
        ...item,
      })
    } else {
      onCreate(item)
    }

    // clear fields
    onCancel()
    prepareFields()
  };

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <div className='d-flex flex-row justify-content-between align-items-center w-100'>
        {Object.values(fields).map((field, index) => {
          const props = { key: index, sx: { ml: 1 } }
          return React.cloneElement(getField(field), props)
        })}
        {selected && (
          <IconButton
            color='inherit'
            onClick={() => {
              prepareFields()
              onCancel()
            }}
          >
            <Close />
          </IconButton>
        )}
        <LoadingButton
          loading={false}
          loadingPosition='start'
          startIcon={<SaveOutlined />}
          variant='outlined'
          onClick={handleSave}
          sx={{ m: 1, p: 1 }}
        >
          {buttonText}
        </LoadingButton>
      </div>
    </React.Fragment>
  );
}
