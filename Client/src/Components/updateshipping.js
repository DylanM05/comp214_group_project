import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateShipping = () => {
    const [idStatusOptions, setIdStatusOptions] = useState([]);
    const [idStatus, setIdStatus] = useState('');
    const [idStage, setIdStage] = useState('');
    const [date, setDate] = useState(null); 
    const [notes, setNotes] = useState('');
    const [shipper, setShipper] = useState('');
    const [shipNum, setShipNum] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch IDSTATUS options for auto-complete
        const fetchIdStatusOptions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/idStatusOptions');
                setIdStatusOptions(response.data);
            } catch (error) {
                console.error('Error fetching IDSTATUS options:', error);
            }
        };

        fetchIdStatusOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/updateorder', {
                idstatus: idStatus,
                idstage: idStage,
                date: date ? formatDate(date) : null,
                notes: notes,
                shipper: shipper,
                shipnum: shipNum
            });
            setMessage(response.data);
    
            // Display a popup message when the update is successful
            alert('Shipping status updated successfully');
    
            clearForm();
        } catch (error) {
            setMessage('Error occurred while processing the request.');
            console.error(error);
        }
    };

    const clearForm = () => {
        setIdStatus('');
        setIdStage('');
        setDate(null);
        setNotes('');
        setShipper('');
        setShipNum('');
    };
    // Function to format the date as 'DD-MON-YY'
    const formatDate = (date) => {
        const options = { year: '2-digit', month: 'short', day: '2-digit' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Update Existing Order Status</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
                <div style={{ marginBottom: '15px', width: '100%' }}>
                    <label htmlFor="idStatus" style={{ marginBottom: '5px' }}>ID Status:</label>
                    <select id="idStatus" value={idStatus} onChange={(e) => setIdStatus(e.target.value)} style={{ width: '100%', height: '40px', padding: '5px', borderRadius: '4px' }}>
                        <option value="">Select ID Status</option>
                        {idStatusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '15px', width: '100%' }}>
                    <label htmlFor="idStage" style={{ marginBottom: '5px' }}>ID Stage:</label>
                    <select id="idStage" value={idStage} onChange={(e) => setIdStage(e.target.value)} style={{ width: '100%', height: '40px', padding: '5px', borderRadius: '4px' }}>
                        <option value="">Select ID Stage</option>
                        <option value="1">Order Received</option>
                        <option value="2">Order Ready to Ship</option>
                        <option value="3">Order Shipped</option>
                    </select>
                </div>
                <div style={{ marginBottom: '15px', width: '100%' }}>
                <label htmlFor="date" style={{ marginBottom: '5px' }}>Date:</label>
                <br />
                    <DatePicker
                    id="date"
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                    dateFormat="dd-MMM-yy"
                    placeholderText="Select Date"/>
                </div>
                <div style={{ marginBottom: '15px', width: '100%' }}>
                    <label htmlFor="notes" style={{ marginBottom: '5px' }}>Notes:</label>
                    <input type="text" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', height: '40px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '15px', width: '100%' }}>
                    <label htmlFor="shipper" style={{ marginBottom: '5px' }}>Shipper:</label>
                    <input type="text" id="shipper" value={shipper} onChange={(e) => setShipper(e.target.value)} style={{ width: '100%', height: '40px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <label htmlFor="shipNum" style={{ marginBottom: '5px' }}>Tracking Number:</label>
                    <input type="text" id="shipNum" value={shipNum} onChange={(e) => setShipNum(e.target.value)} style={{ width: '100%', height: '40px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <button type="submit" style={{ width: '100%', height: '40px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateShipping;
