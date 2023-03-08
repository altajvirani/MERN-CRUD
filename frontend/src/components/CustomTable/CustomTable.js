import { useState, useEffect } from 'react'
import axios from 'axios'
import CustomTableRow from './CustomTableRow/CustomTableRow'
import './CustomTable.css'
function CustomTable({ headers, editable, onClickEdit }) {
    const [data, setData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${process.env.REACT_APP_API}/read`)
                setData(result)
            } catch (error) {
                console.log(`Error fetching data: ${error}`)
            }
        }
        fetchData()
    }, [])
    const handleDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API}/delete/${id}`)
            .then(() => {
                setData(prevData => ({
                    ...prevData,
                    data: prevData.data.filter(obj => obj['_id'] !== id)
                }))
            }).catch(error => {
                console.error(`Error deleting record: ${error}`)
            })
    }

    return (
        <div className='custom-table-div'>
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        {headers.map((headerName, headerIndex) => {
                            return <th key={headerIndex}>{headerName}</th>
                        })}
                        {editable && <th style={{ width: '0' }} />}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).length !== 0 && data.data.map((row, rowIndex) => {
                        return <CustomTableRow
                            key={rowIndex}
                            rowIndex={rowIndex}
                            row={row}
                            editable={editable}
                            onClickEdit={onClickEdit}
                            handleDelete={handleDelete} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable