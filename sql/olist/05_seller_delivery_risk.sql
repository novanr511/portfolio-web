-- business question: which sellers have both volume and a late-delivery problem?
WITH joined AS (
  SELECT i.seller_id, i.price,
         CASE WHEN o.order_delivered_customer_date IS NOT NULL
                   AND o.order_delivered_customer_date > o.order_estimated_delivery_date
              THEN 1 ELSE 0 END AS is_late
  FROM order_items i
  JOIN orders o ON o.order_id = i.order_id
)
SELECT seller_id,
       COUNT(*) AS line_items,
       SUM(is_late) AS late_line_items,
       ROUND(100.0 * SUM(is_late) / COUNT(*), 2) AS late_rate_pct,
       ROUND(SUM(price), 2) AS gmv_brl
FROM joined
GROUP BY seller_id
HAVING COUNT(*) >= 100
ORDER BY late_rate_pct DESC
LIMIT 20;
