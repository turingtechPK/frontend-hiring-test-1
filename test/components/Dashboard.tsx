import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai'


const Dashboard = () => {
    const [filterType, setFilterType] = useState('Status');
    const [openDropdown, setOpenDropDown] = useState(false);


    return (
        <div className='w-full h-screen px-10 flex flex-col flex-1 gap-3 sm:gap-5 pt-20 pb-10'>
            <h1 className='text-black mt-5 text-3xl font-semibold'>Turing Technologies Frontend Test</h1>
            <div>
                <div className='text-sm flex items-center '>
                    <h3>Filter by:</h3>
                    <div onClick={() => setOpenDropDown(!openDropdown)} className='hover:cursor-pointer flex justify-between items-center w-[100px] ml-2 m-2 text-sm text-primary '>{filterType === 'status' ? <p>Status</p> : <p>{filterType}</p>}
                        <AiOutlineDown className='text-sm' size={12} />
                    </div>
                </div>
                <div onClick={() => { setOpenDropDown(false) }} style={{ display: `${openDropdown ? 'block' : 'none'}`, position: 'fixed', background: 'white', padding: 4 }}>
                    <ul className='hover:cursor-pointer'>
                        <li className='w-[250px] ml-2 text-sm px-3 py-3 rounded-md text-primary outline-none border-none hover:bg-slate-200'>
                            All
                        </li>
                        <li className='w-[250px] rounded-md ml-2 text-sm px-3 py-3 text-primary outline-none border-none hover:bg-slate-200'>
                            Archived
                        </li>
                        <li className='w-[250px] ml-2 text-sm px-3 py-2 text-primary outline-none border-none rounded-md hover:bg-slate-200'>
                            Unarchived
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard