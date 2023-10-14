import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders').then(response => {
           setOrders(response.data); 
        });
    }, []);

    return(
        <Layout>
            <h1>Orders page</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>ID Comanda</th>
                        <th>Data</th>
                        <th>Info Client</th>
                        <th>Produse</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                            <td>
                                Nume: {order.name}; E-mail: {order.email}; Contact: {order.phone}<br />
                                Adresa: {order.city}, {order.address}, {order.postCode}<br />
                            </td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data?.name} x {l.quantity}<br />
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}