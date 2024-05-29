import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { APIClient } from '../../../helpers/apiClient';
import { useTranslation } from 'react-i18next';


function CategoryTable(props) {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = (values) => {
        new APIClient().create('profession', values).then(val => {
            if (val) {

                val.profession = values.profession;
                val.description = values.description;
                const insert = [...tableData];
                insert.push(val);
                setTableData(insert);
                localStorage.setItem('professions', JSON.stringify(insert));
                onReset();
                setIsModalOpen(false);
            }
        })
    }
    const onReset = () => {
        form.resetFields();
    };
    const tableRowEdit = (index) => {
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
    const tableRowRemove = (index, profession_id) => {

        const dataRow = [...tableData];


        new APIClient().delete('profession/' + profession_id).then(val => {
            //dataRow.splice(index, 1);
            //setTableData(dataRow);
            //let a=val ? (typeof (val) == 'object' ? val : JSON.parse(val)) : null;
            if (typeof (val) == 'string') {
                alert('profession in use')
            }
            else {
                dataRow.splice(index, 1);
                localStorage.setItem('professions', JSON.stringify(dataRow));
                setTableData(dataRow);

            }
        })

    };
    const columns = [
        { label: "profession_id", accessor: "profession_id", sortable: true },
        { label: "profession", accessor: "profession", sortable: true },
        { label: "description", accessor: "description", sortable: true },
    ];


    return (
        <React.Fragment>
            <div className="row justify-content-end" >
                <div className='col-2 ml-auto'>
                    <Button onClick={showModal}>
                        {t("t_new_category")}
                    </Button>

                </div>
            </div>

            <Modal title={t("t_new_category")} open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="category"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label={t("profession")}
                        name="profession"
                        rules={[
                            {
                                required: true,
                                message: t("t_profession_required"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t("description")}
                        name="description"
                        rules={[
                            {
                                required: false,
                                message: t("t_description_required"),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <table className="table">
                <TableHead columns={columns} handleSorting={handleSorting} />
                <TableBody columns={columns} tableName='CategoryTable' tableData={tableData} tableRowEdit={tableRowEdit} tableRowRemove={tableRowRemove} />
            </table>

        </React.Fragment>

    )
}

export default CategoryTable;