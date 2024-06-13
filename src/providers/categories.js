import { useEffect, useState } from "react";
import { tr } from "../lang";
import { CategoryService } from "../services/category";

export const CatetegoryProvider = () => {

  const [service] = useState(new CategoryService());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    service.getAll().then((data) => {
      setCategories(data);
      setLoading(false);
    })
  }, [service]);


  const onCreate = (category) => {
    service.add(category);
  };

  const onDelete = (ID) => {
    service.remove(ID);
  };

  const fields = [
    {
      id: 'description',
      type: 'text',
      label: tr('description'),
      name: 'description',
      required: true
    },
    {
      id: 'type',
      type: 'checkbox',
      label: tr('type'),
      name: 'type',
      value: 'expense',
      options: [
        {
          label: tr('expense'),
          value: 'expense'
        },
        {
          label: tr('income'),
          value: 'income'
        }
      ]
    }
  ]

  return {
    categories,
    fields,
    onCreate,
    onDelete,
    loading
  };
}