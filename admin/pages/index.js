import Layout from "@/components/layout";
import axios from "axios";
import { subHours } from "date-fns";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
  const {data: session} = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(res => {
      setOrders(res.data);
    });
  }, []);

  function ordersTotal(orders){
    let sum = 0;
    orders.forEach(order => {
      const {line_items} = order;
      line_items.forEach(item => {
        const lineSum = item.quantity * (item.price_data.unit_amount / 100);
        sum = sum + lineSum;
      });
    });
    return new Intl.NumberFormat('ro-RO').format(sum);
  }

  const ordersToday = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24));
  const ordersMonth = orders.filter(o => new Date(o.createdAt) > subHours(new Date, 24 * 30));

  return(
    <Layout>
      <div className="flex justify-between">
        <h2>
          Hello, {session?.user?.name}
        </h2>
        <div className="flex bg-gray-300">
          <img src={session?.user?.image} className="h-8 w-8 overflow-hidden rounded-lg"/>
          {session?.user?.name}
        </div>
      </div>
      <div>
        <h2 className="font-bold">Orders Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="tile">
            <h3 className="header">Today</h3>
            <div className="data">{ordersToday.length} orders</div>
          </div>
          <div className="tile">
            <h3 className="header">Last Month</h3>
            <div className="data">{ordersMonth.length} orders</div>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Income</h2>
            <div className="grid grid-cols-2 gap-4">
            <div className="tile">
              <h3 className="header">Today</h3>
              <div className="data">{ordersTotal(ordersToday)} lei</div>
              <div className="data_2">from {ordersToday.length} orders</div>
            </div>
            <div className="tile">
              <h3 className="header">Last Month</h3>
              <div className="data">{ordersTotal(ordersMonth)} lei</div>
              <div className="data_2">from {ordersMonth.length} orders</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
