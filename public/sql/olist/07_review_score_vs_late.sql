-- business question: do late deliveries show up in customer review scores?
WITH flagged AS (
  SELECT r.review_score,
         CASE WHEN o.order_delivered_customer_date IS NOT NULL
                   AND o.order_delivered_customer_date > o.order_estimated_delivery_date
              THEN 'late' ELSE 'on_time_or_unknown' END AS delivery_band
  FROM order_reviews r
  JOIN orders o ON o.order_id = r.order_id
)
SELECT delivery_band,
       COUNT(*) AS reviews,
       ROUND(AVG(review_score), 3) AS avg_score
FROM flagged
GROUP BY delivery_band;
