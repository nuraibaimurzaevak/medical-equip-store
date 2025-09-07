import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageStock = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactionType, setTransactionType] = useState("приход");
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [reportPeriod, setReportPeriod] = useState("day");
  const [report, setReport] = useState(null);

  // Загрузка продуктов
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Ошибка загрузки продуктов:", err);
    }
  };

  // Добавление прихода/расхода
  const addTransaction = async (e) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0 || pricePerUnit <= 0) {
      alert("Выберите продукт и укажите корректное количество и цену");
      return;
    }

    try {
      await axios.post("/api/stock/transaction", {
        product: selectedProduct,
        type: transactionType,
        quantity,
        pricePerUnit,
      });
      alert("Транзакция успешно добавлена");
      setQuantity(0);
      setPricePerUnit(0);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении транзакции");
    }
  };

  // Загрузка отчёта
  const fetchReport = async () => {
    try {
      const res = await axios.get(`/api/reports?period=${reportPeriod}`);
      setReport(res.data);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки отчёта");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Управление складом</h2>

      <h3>Продукты</h3>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Категория</th>
            <th>Производитель</th>
            <th>Цена</th>
            <th>Остаток</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.category?.name || "-"}</td>
              <td>{p.manufacturer?.name || "-"}</td>
              <td>{p.price} ₽</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Добавить приход / расход</h3>
      <form onSubmit={addTransaction}>
        <select
          value={selectedProduct || ""}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          <option value="" disabled>
            Выберите продукт
          </option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="приход">Приход</option>
          <option value="расход">Расход</option>
        </select>

        <input
          type="number"
          placeholder="Количество"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Цена за единицу"
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(Number(e.target.value))}
          required
        />

        <button type="submit">Добавить</button>
      </form>

      <h3>Отчёт</h3>
      <select
        value={reportPeriod}
        onChange={(e) => setReportPeriod(e.target.value)}
      >
        <option value="day">День</option>
        <option value="week">Неделя</option>
        <option value="month">Месяц</option>
        <option value="year">Год</option>
      </select>
      <button onClick={fetchReport}>Сформировать отчёт</button>

      {report && (
        <div style={{ marginTop: "20px" }}>
          <h4>Отчёт за {reportPeriod}</h4>
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Продукт</th>
                <th>Получено</th>
                <th>Продано</th>
                <th>Остаток</th>
                <th>Выручка</th>
                <th>Себестоимость</th>
                <th>Прибыль</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(report).map((name) => {
                const r = report[name];
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{r.received}</td>
                    <td>{r.sold}</td>
                    <td>{r.remaining}</td>
                    <td>{r.revenue} ₽</td>
                    <td>{r.cost} ₽</td>
                    <td>{r.revenue - r.cost} ₽</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageStock;
