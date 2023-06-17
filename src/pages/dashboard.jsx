import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom';
import PaginatedCalls from '../components/PaginatedCalls';

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token)
          navigate("/login");
      }, []);

    return (
        <div>
            <NavBar />
            <div className=' p-10'>
                <h1 style={{fontSize: 30}} className='mb-4' >Turing Technologies Frontend Test</h1>
                <PaginatedCalls />
            </div>
        </div>
    )
}

export default Dashboard
