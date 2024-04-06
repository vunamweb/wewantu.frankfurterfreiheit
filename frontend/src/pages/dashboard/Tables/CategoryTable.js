import React, { useState } from 'react';
import { Button, Modal,Form, Input } from 'antd';

import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { APIClient } from '../../../helpers/apiClient';



 function CategoryTable(props){
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
      const handleSubmit = (values) => {
        new APIClient().create('profession',values).then(val=>{
            if(val){
                
                val.profession=values.profession;
                val.description=values.description;
                const insert = [...tableData];
                insert.push(val);
                console.log(insert);
                setTableData(insert);
                onReset();
                setIsModalOpen(false);
            }
        })
      }
      const onReset = () => {
        form.resetFields();
      };
      const tableRowEdit = (index) => {
        console.log(tableData[index])
        setIsModalOpen(true);
        form.setFieldsValue({
            profession: tableData[index].profession,
            description: tableData[index].description,
        });
      };
    const [tableData, setTableData] = useState(props.categoryData);
    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
         const sorted = [...tableData].sort((a, b) => {
          return (
           a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
           }) * (sortOrder === "asc" ? 1 : -1)
          );
         });
         setTableData(sorted);
        }
       };
    const tableRowRemove = (index,profession_id) => {
        
        const dataRow = [...tableData];
        new APIClient().delete('profession/'+profession_id).then(val=>{
            console.log(val);
            dataRow.splice(index, 1);
            setTableData(dataRow);
        })
      };
    const columns = [
        { label: "profession_id", accessor: "profession_id", sortable: true },
        { label: "profession", accessor: "profession", sortable: true },
        { label: "description", accessor: "description", sortable: true },
       ];
    
 
    return(
        <React.Fragment>
            <div className="row justify-content-end" >
                <div className='col-2 ml-auto'>
                    <Button onClick={showModal}>
                        New Category
                    </Button>

                </div>
            </div>
            
            <Modal title="New Category" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
            <Form
                form={form}
                name="category"
                onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Profession"
                        name="profession"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your profession!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="description"
                        name="description"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your description!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
            </Form>
            </Modal>
            <table className="table">
                <TableHead columns={columns} handleSorting={handleSorting}/>
                <TableBody columns={columns} tableName='CategoryTable'  tableData={tableData} tableRowEdit={tableRowEdit} tableRowRemove={tableRowRemove}/>
            </table>
            
        </React.Fragment>
        
    )
 }
 
 export default CategoryTable;