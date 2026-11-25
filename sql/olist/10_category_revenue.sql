-- business question: which categories carry the GMV?
SELECT COALESCE(t.product_category_name_english, p.product_category_name) AS category,
       ROUND(SUM(i.price), 2) AS gmv_brl,
       COUNT(*) AS line_items
FROM order_items i
JOIN products p ON p.product_id = i.product_id
LEFT JOIN category_translation t ON t.product_category_name = p.product_category_name
GROUP BY category
ORDER BY gmv_brl DESC
LIMIT 15;
