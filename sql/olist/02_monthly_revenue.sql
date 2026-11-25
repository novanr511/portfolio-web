-- business question: is the order book growing, and is GMV following?
SELECT strftime('%Y-%m', o.order_purchase_timestamp) AS month,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(SUM(i.price), 2) AS gmv_brl
FROM orders o
JOIN order_items i ON i.order_id = o.order_id
GROUP BY month
ORDER BY month;
