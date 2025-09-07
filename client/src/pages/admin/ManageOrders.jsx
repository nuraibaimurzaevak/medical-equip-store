import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загрузить все заказы
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Ошибка загрузки заказов:", err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузить историю изменений
  const fetchHistory = async (orderId) => {
    try {
      const res = await axios.get(`/api/orders/${orderId}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error("Ошибка загрузки истории:", err);
    }
  };

  // Обновить заказ
  const updateOrder = async (id, updates) => {
    try {
      await axios.put(`/api/orders/${id}`, updates, { withCredentials: true });
      fetchOrders();
      alert("Заказ обновлён");
    } catch (err) {
      console.error("Ошибка обновления заказа:", err);
      alert("Ошибка обновления заказа");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Управление заказами</h2>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Пользователь</th>
              <th>Товары</th>
              <th>Стоимость</th>
              <th>Статус</th>
              <th>Изменить</th>
              <th>История</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name} ({order.user?.email})</td>
                <td>
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.product?.name} × {p.quantity}
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice} ₽</td>
                <td>{order.status}</td>
                <td>
                  <button
                    onClick={() =>
                      updateOrder(order._id, {
                        status: "processing",
                        totalPrice: order.totalPrice,
                      })
                    }
                  >
                    В обработку
                  </button>
                  <button
                    onClick={() =>
                      updateOrder(order._id, {
                        status: "shipped",
                        totalPrice: order.totalPrice,
                      })
                    }
                  >
                    Отправлен
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      fetchHistory(order._id);
                    }}
                  >
                    История
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* История изменений */}
      {selectedOrder && (
        <div style={{ marginTop: "20px" }}>
          <h3>История изменений заказа {selectedOrder._id}</h3>
          {history.length === 0 ? (
            <p>Нет изменений</p>
          ) : (
            <ul>
              {history.map((h) => (
                <li key={h._id}>
                  <b>{h.field}</b>: {h.oldValue} → {h.newValue} (
                  {new Date(h.changedAt).toLocaleString()}){" "}
                  {h.changedBy ? `— ${h.changedBy.name}` : ""}
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setSelectedOrder(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
