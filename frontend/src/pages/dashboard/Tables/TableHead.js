import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { getProfessions } from '../../../helpers/authUtils';
import { Select } from "antd";


const TableHead = ({ columns, handleSorting, setCategoryID }) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const handleSortingChange = (accessor) => {
        const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    const onChange = (value) => {
        setCategoryID(value);
    }

    const { t } = useTranslation();

    const professions = getProfessions();

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                        ? sortField === accessor && order === "asc"
                            ? "up" : sortField === accessor && order === "desc" ? "down" : "default" : "";
                    if (label == t('t_category').toUpperCase())
                        return <th className={cl} key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : null}>
                            <Select
                                showSearch
                                id="category"
                                name="category"
                                className="form-control searchcenterselect title"
                                placeholder={t('t_category').toUpperCase()}
                                onChange={onChange}
                            //options={professions.map((item) => ({
                            // label: item.profession,
                            //    value: item.profession_id
                            // }))}
                            >
                                <Select.Option value="all">All</Select.Option>
                                {professions !== null && professions.map((item) => (
                                    <Select.Option value={item.profession_id}>{item.profession}</Select.Option>
                                ))}

                            </Select>
                        </th>;
                    else
                        return <th className={cl} key={accessor} onClick={sortable ? () => handleSortingChange(accessor) : null}>{label}</th>;
                })}
                <th ></th>
            </tr>
        </thead>
    );
};

export default TableHead;