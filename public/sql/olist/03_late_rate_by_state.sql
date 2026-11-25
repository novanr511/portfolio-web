-- business question: which customer states carry the highest late-delivery rate?
WITH delivered AS (
  SELECT o.*, c.customer_state,
         CASE WHEN o.order_delivered_customer_date > o.order_estimated_delivery_date
              THEN 1 ELSE 0 END AS is_late
  FROM orders o
  JOIN customers c ON c.customer_id = o.customer_id
  WHERE o.order_delivered_customer_date IS NOT NULL
)
SELECT customer_state,
       COUNT(*) AS delivered_orders,
       SUM(is_late) AS late_orders,
       ROUND(100.0 * SUM(is_late) / COUNT(*), 2) AS late_rate_pct
FROM delivered
GROUP BY customer_state
HAVING COUNT(*) >= 100
ORDER BY late_rate_pct DESC;
