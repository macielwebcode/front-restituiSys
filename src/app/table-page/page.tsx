'use client'

import React from 'react';
import { useEffect, useState } from 'react';

export default function TablePage () {

  const [data, setData] = useState<any[]>([]);

  

  const factoryTable = () => {
    fetch('http://localhost:3000/api/upload')
      .then(res => res.json())
      .then(json => setData(json));
  }

  useEffect(() => {
    factoryTable();
  }, []);


  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const [unitPrice, setUnitPrice] = useState(null);

  /**
   *
   * @param id - The id of the product
   * @param currentUnitPrice - The current unit price of the product
   */



  const updateInventory = ({ id, newUnitPrice }: any) => {
    fetch('/api/upload', {
      method: "PATCH",
      body: JSON.stringify({
        unit_price: newUnitPrice
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        // reset inEditMode and unit price state values
        onCancel();

        // fetch the updated data
        factoryTable();
      })
  }



  const onEdit = ({ id, currentUnitPrice }: any) => {
    setInEditMode({
      status: true,
      rowKey: id
    })
    setUnitPrice(currentUnitPrice);
  }

  const onSave = ({ id, newUnitPrice }: any) => {
    updateInventory({ id, newUnitPrice });
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null
    })
    // reset the unit price state value
    setUnitPrice(null);
  }


  console.log('criente', data)


  return (
    <>
      <div className="container">
        <h1>Simple Inventory Table</h1>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Unit Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>{item.product_category}</td>
                  <td>
                    {
                      inEditMode.status && inEditMode.rowKey === item.id ? (
                        <input value={unitPrice}
                          onChange={(event) => setUnitPrice(event.target.value)}
                        />
                      ) : (
                        item.unit_price
                      )
                    }
                  </td>
                  <td>
                    {
                      inEditMode.status && inEditMode.rowKey === item.id ? (
                        <React.Fragment>
                          <button
                            className={"btn-success"}
                            onClick={() => onSave({ id: item.id, newUnitPrice: unitPrice })}
                          >
                            Save
                          </button>

                          <button
                            className={"btn-secondary"}
                            style={{ marginLeft: 8 }}
                            onClick={() => onCancel()}
                          >
                            Cancel
                          </button>
                        </React.Fragment>
                      ) : (
                        <button
                          className={"btn-primary"}
                          onClick={() => onEdit({ id: item.id, currentUnitPrice: item.unit_price })}
                        >
                          Edit
                        </button>
                      )
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}