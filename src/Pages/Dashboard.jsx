import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Button, Select, Option } from "@material-tailwind/react";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post('https://backend.freedomainfortestingtheadults.online/orders/fetchorders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='bg-gray-100'>
            <Typography variant="h2" className="font-bold text-center p-2">ORDERS</Typography>
            <div className="dashboard container mx-auto p-4">
                
                {orders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                ))}
            </div>
        </div>
    );
};

const OrderCard = ({ order }) => {

    // const [status, setStatus] = useState(order.paymentStatus);

    // const handleStatusChange = (newStatus) => {
    //     setStatus(newStatus);
    // };

    return (
        <Card className="mb-6 p-6 shadow-lg">
            
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" className="font-bold">
                    Order ID: {order.id}
                </Typography>
                <Typography variant="small" className="font-bold">
                    Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </Typography>
            </div>

            <div className="mb-4">
                <Typography variant="paragraph"><strong>Name:</strong> {order.orderInfo.Name}</Typography>
                <Typography variant="paragraph"><strong>Email:</strong> {order.orderInfo.Email}</Typography>
                <Typography variant="paragraph"><strong>Phone:</strong> {order.orderInfo.Phone}</Typography>
                <Typography variant="paragraph"><strong>Address:</strong> {order.orderInfo.StreetAddress}{order.orderInfo.City}, {order.orderInfo.State}, {order.orderInfo.Pincode}</Typography>
                <Typography variant="paragraph"><strong>Total Amount:</strong> Rs. {order.totalAmount}</Typography>
                <Typography variant="paragraph"><strong>Payment Method:</strong> {order.orderInfo.PaymentMethod}</Typography>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {order.items.map((item, idx) => (
                    <div key={idx} className="item flex flex-col md:flex-row items-center">
                        <img src={item.imageUrl} alt={item.name} className="h-24 w-24 object-cover rounded-lg mb-2" />
                        <div className='flex flex-col md:items-start md:p-4'>
                            <Typography variant="paragraph" className="text-justify md:text-left">{item.name}</Typography>
                            <Typography variant="paragraph" className="text-center md:text-left">Quantity: {item.quantity}</Typography>
                            <Typography variant="paragraph" className="text-center md:text-left">Price: Rs. {item.price}</Typography>
                        </div>
                    </div>
                ))}
            </div>
            
            {order.orderInfo.OrderNotes && (
                    <Typography variant="paragraph"><strong>Order Notes:</strong> {order.orderInfo.OrderNotes}</Typography>
            )}

            {/* <div className="status-controls mb-4">
                <Typography variant="small" className="font-bold mb-2">Order Status:</Typography>
                <Select 
                    value={status} 
                    onChange={(e) => handleStatusChange(e.target.value)} 
                    className="w-80"
                >
                    <Option value="confirmed">Confirm</Option>
                    <Option value="shipped">Ship</Option>
                    <Option value="delivered">Deliver</Option>
                    <Option value="canceled">Cancel</Option>
                </Select>
                <Typography variant="small" className="font-bold mt-2">Current Status: {status.charAt(0).toUpperCase() + status.slice(1)}</Typography>
            </div> */}
        </Card>
    );
};

export default Dashboard;
