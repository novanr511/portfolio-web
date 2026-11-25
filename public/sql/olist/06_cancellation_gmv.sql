-- business question: how much GMV sits in orders that were cancelled?
SELECT o.order_status,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(SUM(i.price), 2) AS gmv_brl
FROM orders o
JOIN order_items i ON i.order_id = o.order_id
WHERE o.order_status IN ('canceled', 'unavailable')
GROUP BY o.order_status;
