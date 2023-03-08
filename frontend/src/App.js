import Insert from './Insert'
import Read from './Read'
import './components/CustomToast/CustomToast'
import './App.css'
import { useState } from 'react'
import CustomToast from './components/CustomToast/CustomToast'
function App() {
    const [showInsert, setShowInsert] = useState(false)
    const [prevData, setPrevData] = useState({})
    const swapComps = (data, showInsertFlag) => {
        setPrevData(data)
        setShowInsert(showInsertFlag)
    }
    return (
        <>
            {showInsert ?
                (<Insert
                    prevData={prevData}
                    onClickSubmit={swapComps} />) :
                (!showInsert && <Read onClickEdit={swapComps} />)
            }
            <CustomToast
                type={'success'}
                title={'Hooray!'}
                message={'Record Inserted Successfully.'}
                duration={3000}
                position={'bottom left'} />
        </>
    )
}

export default App
