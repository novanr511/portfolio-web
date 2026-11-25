-- business question: where is the GMV exposed to late delivery concentrated?
WITH late_items AS (
  SELECT i.price, c.customer_state
  FROM order_items i
  JOIN orders o ON o.order_id = i.order_id
  JOIN customers c ON c.customer_id = o.customer_id
  WHERE o.order_delivered_customer_date IS NOT NULL
    AND o.order_delivered_customer_date > o.order_estimated_delivery_date
)
SELECT customer_state,
       COUNT(*) AS late_line_items,
       ROUND(SUM(price), 2) AS late_gmv_brl
FROM late_items
GROUP BY customer_state
ORDER BY late_gmv_brl DESC;
