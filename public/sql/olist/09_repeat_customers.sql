-- business question: how much of the order base is repeat business?
WITH per_customer AS (
  SELECT c.customer_unique_id, COUNT(DISTINCT o.order_id) AS orders
  FROM customers c
  JOIN orders o ON o.customer_id = c.customer_id
  GROUP BY c.customer_unique_id
)
SELECT CASE WHEN orders > 1 THEN 'repeat' ELSE 'single_order' END AS segment,
       COUNT(*) AS customers,
       ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM per_customer), 2) AS pct
FROM per_customer
GROUP BY segment;
